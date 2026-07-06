"""The anycubic_cloud component."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CONF_CARD_CONFIG,
    COORDINATOR,
    DOMAIN,
    PLATFORMS,
)
from .coordinator import AnycubicCloudDataUpdateCoordinator
from .panel import async_register_panel, async_unregister_panel
from .services import SERVICES


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Anycubic Cloud from a config entry."""

    coordinator = AnycubicCloudDataUpdateCoordinator(hass, entry)

    await coordinator.async_config_entry_first_refresh()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {
        COORDINATOR: coordinator,
    }

    # Modernisiertes Laden der Plattformen für HA 2026.05.1
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(update_listener))

    # register service calls - Sicherer Abgleich der Service-Struktur
    for service_item in SERVICES:
        # Falls SERVICES Tupel enthält, andernfalls direkt als Objekt behandeln
        if isinstance(service_item, tuple):
            service_name, service_class = service_item
        else:
            service_class = service_item
            service_name = getattr(service_class, "name", None)

        if service_name and not hass.services.has_service(DOMAIN, service_name):
            service_instance = service_class(hass)
            hass.services.async_register(
                DOMAIN,
                service_name,
                service_instance.async_call_service,
                getattr(service_class, "schema", None),
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

    unload_ok = await hass.config_entries.async_unload_platforms(
        entry, PLATFORMS
    )

    if unload_ok and entry.entry_id in hass.data[DOMAIN]:
        host = hass.data[DOMAIN].pop(entry.entry_id)
        await host[COORDINATOR].stop_anycubic_mqtt_connection_if_started()

    # unregister service calls
    if unload_ok and not hass.data[DOMAIN]:  # check if this is the last entry to unload
        for service_item in SERVICES:
            if isinstance(service_item, tuple):
                service_name = service_item[0]
            else:
                service_name = getattr(service_item, "name", None)
            
            if service_name:
                hass.services.async_remove(DOMAIN, service_name)

        # unregister panel
        await async_unregister_panel(hass)

    return unload_ok