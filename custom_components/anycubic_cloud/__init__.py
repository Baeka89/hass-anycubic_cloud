"""The anycubic_cloud component."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er

from .const import (
    COORDINATOR,
    DOMAIN,
    LOGGER,
    PLATFORMS,
)
from .coordinator import AnycubicCloudDataUpdateCoordinator
from .helpers import printer_entity_unique_id


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Anycubic Cloud from a config entry."""
    from .panel import async_sync_panel
    from .services import SERVICES

    coordinator = AnycubicCloudDataUpdateCoordinator(hass, entry)

    await coordinator.async_config_entry_first_refresh()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {
        COORDINATOR: coordinator,
    }

    _migrate_entity_ids(hass, entry, coordinator)

    # Modernisiertes Laden der Plattformen für HA 2026.05.1
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(update_listener))

    # register service calls
    for service_name, service in SERVICES:
        if not hass.services.has_service(DOMAIN, service_name):
            hass.services.async_register(
                DOMAIN,
                service_name,
                service(hass).async_call_service,
                service.schema,
            )

    await async_sync_panel(hass)

    return True


def _migrate_entity_ids(
    hass: HomeAssistant, entry: ConfigEntry, coordinator: AnycubicCloudDataUpdateCoordinator,
) -> None:
    """Keep entity_id, names and settings while stabilizing registry identity."""
    from .button import GLOBAL_BUTTON_TYPES
    from .switch import GLOBAL_SWITCH_TYPES

    registry = er.async_get(hass)
    global_keys = {description.key for description in GLOBAL_BUTTON_TYPES + GLOBAL_SWITCH_TYPES}
    devices = coordinator._printer_device_map or {}
    entries = er.async_entries_for_config_entry(registry, entry.entry_id)
    for entity in sorted(entries, key=lambda item: (item.disabled_by is not None, item.entity_id)):
        if '-' not in entity.unique_id:
            continue
        key = entity.unique_id.rsplit('-', 1)[1]
        is_global = key in global_keys
        printer_id = devices.get(entity.device_id or '')
        if printer_id is None and not is_global and entity.device_id:
            device = dr.async_get(hass).async_get(entity.device_id)
            if device:
                user_id = coordinator.data.get('user_info', {}).get('id')
                for domain, identifier in device.identifiers:
                    if domain != DOMAIN:
                        continue
                    for prefix in ('ace_primary_', 'ace_secondary_', f'{user_id}-'):
                        if identifier.startswith(prefix) and identifier[len(prefix):].isdigit():
                            printer_id = int(identifier[len(prefix):])
                            break
                    if printer_id is not None:
                        break
        if printer_id is None and not is_global:
            continue
        unique_id = printer_entity_unique_id(coordinator, printer_id or 0, key, global_entity=is_global)
        duplicate_id = registry.async_get_entity_id(entity.domain, DOMAIN, unique_id)
        if duplicate_id and duplicate_id != entity.entity_id:
            # Preserve old entity IDs for user inspection, but prevent duplicate controls.
            if entity.disabled_by is None:
                registry.async_update_entity(entity.entity_id, disabled_by=er.RegistryEntryDisabler.INTEGRATION)
        else:
            registry.async_update_entity(entity.entity_id, new_unique_id=unique_id)


async def update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    from .panel import async_sync_panel
    from .services import SERVICES

    unload_ok = await hass.config_entries.async_unload_platforms(
        entry, PLATFORMS
    )

    if unload_ok and entry.entry_id in hass.data[DOMAIN]:
        host = hass.data[DOMAIN].pop(entry.entry_id)
        await host[COORDINATOR].async_shutdown()
        await host[COORDINATOR].stop_anycubic_mqtt_connection_if_started()

    if unload_ok:
        await async_sync_panel(hass)

    # unregister service calls
    if unload_ok and not hass.data[DOMAIN]:  # check if this is the last entry to unload
        try:
            for service_name, _ in SERVICES:
                hass.services.async_remove(DOMAIN, service_name)

            # unregister panel
            await async_sync_panel(hass)
        except Exception:  # noqa: BLE001 - see rationale below
            # Diese Aufräumschritte (Services/Panel) dürfen niemals den
            # eigentlichen Unload/Reload zum Absturz bringen. Ein Fehler
            # hier hat vorher dazu geführt, dass unload_ok nie zurückgegeben
            # wurde, obwohl die Plattformen (und damit alle Entities) schon
            # entladen waren - der Reload blieb danach in einem kaputten
            # Zwischenzustand ohne Entities hängen.
            LOGGER.exception(
                "Error cleaning up services/panel while unloading Anycubic Cloud entry"
            )

    return unload_ok
