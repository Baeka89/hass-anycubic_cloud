"""Selects for Anycubic Cloud Printers."""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from homeassistant.components.select import SelectEntity, SelectEntityDescription
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

SPEED_MODES = {
    0: "Leise",
    1: "Standard",
    2: "Schnell"
}
INV_SPEED_MODES = {v: k for k, v in SPEED_MODES.items()}


@dataclass(frozen=True)
class AnycubicSelectEntityDescription(
    SelectEntityDescription, AnycubicCloudEntityDescription
):
    """Describes Anycubic Cloud select entity."""


FDM_SELECT_DESCRIPTIONS: list[AnycubicSelectEntityDescription] = list([
    AnycubicSelectEntityDescription(
        key="print_speed_mode",
        name="Druckgeschwindigkeit",
        translation_key="print_speed_mode",
        options=list(SPEED_MODES.values()),
        printer_entity_type=PrinterEntityType.FDM,
    ),
])

PRIMARY_MULTI_COLOR_BOX_SELECT_TYPES: list[AnycubicSelectEntityDescription] = list([
    # Hier können zukünftige spezifische Auswahllisten für das erste ACE eingetragen werden
])

SECONDARY_MULTI_COLOR_BOX_SELECT_TYPES: list[AnycubicSelectEntityDescription] = list([
    # Hier können zukünftige spezifische Auswahllisten für das zweite ACE eingetragen werden
])


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up the Anycubic Cloud select entry."""

    coordinator: AnycubicCloudDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id][
        COORDINATOR
    ]

    coordinator.add_entities_for_seen_printers(
        async_add_entities=async_add_entities,
        entity_constructor=AnycubicSelect,
        platform=Platform.SELECT,
        available_descriptors=list(
            FDM_SELECT_DESCRIPTIONS
            + PRIMARY_MULTI_COLOR_BOX_SELECT_TYPES
            + SECONDARY_MULTI_COLOR_BOX_SELECT_TYPES
        ),
    )


class AnycubicSelect(AnycubicCloudEntity, SelectEntity):
    """Representation of a Anycubic Cloud select control."""

    entity_description: AnycubicSelectEntityDescription
    
    _attr_has_entity_name = True

    def __init__(
        self,
        hass: HomeAssistant,
        coordinator: AnycubicCloudDataUpdateCoordinator,
        printer_id: int,
        entity_description: AnycubicSelectEntityDescription,
    ) -> None:
        """Initiate Anycubic Select."""
        super().__init__(hass, coordinator, printer_id, entity_description)
        self._attr_name = entity_description.name

    @property
    def available(self) -> bool:
        """Return if entity is available."""
        return printer_state_for_key(
            self.coordinator,
            self._printer_id,
            self.entity_description.key
        ) is not None

    @property
    def current_option(self) -> str | None:
        """Return the selected option."""
        state = printer_state_for_key(self.coordinator, self._printer_id, self.entity_description.key)
        if state is None:
            return None
        return SPEED_MODES.get(int(state), "Standard")

    async def async_select_option(self, option: str) -> None:
        """Change the selected option."""
        mode_id = INV_SPEED_MODES.get(option, 1)
        key = self.entity_description.key
        
        if key == "print_speed_mode":
            await self.coordinator.api.set_speed_mode(mode_id)
        else:
            await self.coordinator.set_select_option(self._printer_id, key, option)
            
        await self.coordinator.async_request_refresh()