"""The anycubic_cloud component."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CONF_CARD_CONFIG,
    COORDINATOR,
    DOMAIN,
    LOGGER,
    PLATFORMS,
)
from .coordinator import AnycubicCloudDataUpdateCoordinator


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Anycubic Cloud from a config entry."""
    from .panel import async_register_panel
    from .services import SERVICES

    coordinator = AnycubicCloudDataUpdateCoordinator(hass, entry)

    await coordinator.async_config_entry_first_refresh()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {
        COORDINATOR: coordinator,
    }

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

    # register panel
    await async_register_panel(
        hass,
        entry.options.get(CONF_CARD_CONFIG)
    )

    return True


async def update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    from .panel import async_unregister_panel
    from .services import SERVICES

    unload_ok = await hass.config_entries.async_unload_platforms(
        entry, PLATFORMS
    )

    if unload_ok and entry.entry_id in hass.data[DOMAIN]:
        host = hass.data[DOMAIN].pop(entry.entry_id)
        await host[COORDINATOR].stop_anycubic_mqtt_connection_if_started()

    # unregister service calls
    if unload_ok and not hass.data[DOMAIN]:  # check if this is the last entry to unload
        try:
            for service_name, _ in SERVICES:
                hass.services.async_remove(DOMAIN, service_name)

            # unregister panel
            await async_unregister_panel(hass)
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