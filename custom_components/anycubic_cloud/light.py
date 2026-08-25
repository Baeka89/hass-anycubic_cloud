"""Light entity for Anycubic Cloud (EXPERIMENTAL).

Controls a printer's video/box light via a previously unused cloud API call.
One caveat remains from the API layer: the underlying command requires an
active (or the printer's latest) print project - it cannot necessarily be
toggled at any arbitrary time. Confirmation now arrives and is parsed from
the printer's MQTT light/report message (see
AnycubicPrinter._process_mqtt_update_light), so this reflects a real,
confirmed on/off state rather than an assumed/optimistic one.

Only created for printers that report VIDEO_LIGHT and/or BOX_LIGHT support
in their capability flags (see helpers.check_descriptor_state_light_not_supported).
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from homeassistant.components.light import ColorMode, LightEntity, LightEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    COORDINATOR,
    DOMAIN,
    PrinterEntityType,
)
from .entity import AnycubicCloudEntity, AnycubicCloudEntityDescription
from .helpers import printer_state_for_key

if TYPE_CHECKING:
    from .coordinator import AnycubicCloudDataUpdateCoordinator


@dataclass(frozen=True)
class AnycubicLightEntityDescription(
    LightEntityDescription, AnycubicCloudEntityDescription
):
    """Describes Anycubic Cloud light entity."""


LIGHT_TYPES: list[AnycubicLightEntityDescription] = list([
    AnycubicLightEntityDescription(
        key="printer_light_is_on",
        translation_key="printer_light",
        printer_entity_type=PrinterEntityType.LIGHT,
    ),
])


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up the Anycubic Cloud light entry."""

    coordinator: AnycubicCloudDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id][
        COORDINATOR
    ]
    coordinator.add_entities_for_seen_printers(
        async_add_entities=async_add_entities,
        entity_constructor=AnycubicLight,
        platform=Platform.LIGHT,
        available_descriptors=list(LIGHT_TYPES),
    )


class AnycubicLight(AnycubicCloudEntity, LightEntity):
    """Representation of an Anycubic printer's video/box light.

    EXPERIMENTAL - see the module docstring for caveats.
    """

    entity_description: AnycubicLightEntityDescription

    _attr_color_mode = ColorMode.ONOFF
    _attr_supported_color_modes = {ColorMode.ONOFF}

    def __init__(
        self,
        hass: HomeAssistant,
        coordinator: AnycubicCloudDataUpdateCoordinator,
        printer_id: int,
        entity_description: AnycubicLightEntityDescription,
    ) -> None:
        """Initiate Anycubic Light."""
        super().__init__(hass, coordinator, printer_id, entity_description)

    @property
    def is_on(self) -> bool | None:
        """Return true if the light is on.

        None until the first light/report MQTT message has been seen for
        this printer (e.g. right after startup, before anyone has queried
        or toggled the light since HA last connected).
        """
        return printer_state_for_key(
            self.coordinator, self._printer_id, self.entity_description.key
        )

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the light on."""
        await self.coordinator.set_light_status(self._printer_id, light_on=True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the light off."""
        await self.coordinator.set_light_status(self._printer_id, light_on=False)