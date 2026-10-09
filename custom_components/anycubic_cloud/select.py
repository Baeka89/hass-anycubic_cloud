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
from .helpers import printer_attributes_for_key

if TYPE_CHECKING:
    from .coordinator import AnycubicCloudDataUpdateCoordinator


@dataclass(frozen=True)
class AnycubicSelectEntityDescription(
    SelectEntityDescription, AnycubicCloudEntityDescription
):
    """Describes Anycubic Cloud select entity."""


FDM_SELECT_DESCRIPTIONS: list[AnycubicSelectEntityDescription] = list([
    AnycubicSelectEntityDescription(
        key="print_speed_mode",
        translation_key="print_speed_mode",
        options=[],
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

    def _speed_attributes(self) -> dict[str, Any]:
        return printer_attributes_for_key(
            self.coordinator, self._printer_id, "job_speed_mode"
        ) or {}

    @property
    def options(self) -> list[str]:
        """Use the modes advertised by this printer, without guessed IDs."""
        return [str(mode["description"]) for mode in
                self._speed_attributes().get("available_modes") or []]

    @property
    def available(self) -> bool:
        return self.coordinator.last_update_success and bool(self.options)

    @property
    def current_option(self) -> str | None:
        attributes = self._speed_attributes()
        for mode in attributes.get("available_modes") or []:
            if mode["mode"] == attributes.get("print_speed_mode_code"):
                return str(mode["description"])
        return None

    async def async_select_option(self, option: str) -> None:
        for mode in self._speed_attributes().get("available_modes") or []:
            if str(mode["description"]) == option:
                await self.coordinator.set_select_option(
                    self._printer_id, self.entity_description.key, int(mode["mode"])
                )
                await self.coordinator.async_request_refresh()
                return
        raise ValueError(f"Unsupported print speed mode: {option}")
