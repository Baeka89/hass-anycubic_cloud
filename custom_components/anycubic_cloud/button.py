"""Support for Anycubic Cloud button."""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from homeassistant.components.button import ButtonEntity, ButtonEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory, Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    COORDINATOR,
    DOMAIN,
    ENTITY_ID_DRYING_START_PRESET_,
    MAX_DRYING_PRESETS,
    PrinterEntityType,
)
from .entity import AnycubicCloudEntity, AnycubicCloudEntityDescription
from .helpers import printer_attributes_for_key, printer_state_for_key

if TYPE_CHECKING:
    from .coordinator import AnycubicCloudDataUpdateCoordinator


@dataclass(frozen=True)
class AnycubicButtonEntityDescription(
    ButtonEntityDescription, AnycubicCloudEntityDescription
):
    """Describes Anycubic Cloud button entity."""


PRIMARY_DRYING_PRESET_BUTTON_TYPES: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key=f"{ENTITY_ID_DRYING_START_PRESET_}{x + 1}",
        name=f"ACE Trocknung Preset {x + 1}",
        translation_key=f"{ENTITY_ID_DRYING_START_PRESET_}{x + 1}",
        printer_entity_type=PrinterEntityType.DRY_PRESET_PRIMARY,
    ) for x in range(MAX_DRYING_PRESETS)
])

SECONDARY_DRYING_PRESET_BUTTON_TYPES: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key=f"secondary_{ENTITY_ID_DRYING_START_PRESET_}{x + 1}",
        name=f"ACE Trocknung Preset {x + 1}",
        translation_key=f"secondary_{ENTITY_ID_DRYING_START_PRESET_}{x + 1}",
        printer_entity_type=PrinterEntityType.DRY_PRESET_SECONDARY,
    ) for x in range(MAX_DRYING_PRESETS)
])

BUTTON_TYPES: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key="dry_start_custom",
        name="ACE Trocknung Manuell Starten",
        translation_key="dry_start_custom",
        printer_entity_type=PrinterEntityType.ACE_PRIMARY,
    ),
    AnycubicButtonEntityDescription(
        key="secondary_dry_start_custom",
        name="ACE Trocknung Manuell Starten",
        translation_key="secondary_dry_start_custom",
        printer_entity_type=PrinterEntityType.ACE_SECONDARY,
    ),
])

GLOBAL_BUTTON_TYPES: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key="manual_mqtt_connection_refresh",
        name="MQTT Verbindung erneuern",
        translation_key="manual_mqtt_connection_refresh",
        entity_category=EntityCategory.CONFIG,
        printer_entity_type=PrinterEntityType.GLOBAL,
    ),
])

FDM_BUTTON_DESCRIPTIONS: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key="print_pause",
        name="Druck Pausieren",
        translation_key="print_pause",
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicButtonEntityDescription(
        key="print_resume",
        name="Druck Fortsetzen",
        translation_key="print_resume",
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicButtonEntityDescription(
        key="print_stop",
        name="Druck Stoppen",
        translation_key="print_stop",
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicButtonEntityDescription(
        key="clear_completed_print_job",
        name="Druckauftrag abschließen",
        translation_key="clear_completed_print_job",
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicButtonEntityDescription(
        key="multi_color_box_filament_extrude",
        name="Filament Vorschub (Extrude)",
        translation_key="multi_color_box_filament_extrude",
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicButtonEntityDescription(
        key="multi_color_box_filament_retract",
        name="Filament Rückzug (Retract)",
        translation_key="multi_color_box_filament_retract",
        printer_entity_type=PrinterEntityType.FDM,
    ),
])

PRIMARY_MULTI_COLOR_BOX_BUTTON_TYPES: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key="dry_stop",
        name="ACE Trocknung Stoppen",
        translation_key="dry_stop",
        printer_entity_type=PrinterEntityType.ACE_PRIMARY,
    ),
])

SECONDARY_MULTI_COLOR_BOX_BUTTON_TYPES: list[AnycubicButtonEntityDescription] = list([
    AnycubicButtonEntityDescription(
        key="secondary_dry_stop",
        name="ACE Trocknung Stoppen",
        translation_key="secondary_dry_stop",
        printer_entity_type=PrinterEntityType.ACE_SECONDARY,
    ),
])


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the button from a config entry."""

    coordinator: AnycubicCloudDataUpdateCoordinator = hass.data[DOMAIN][
        entry.entry_id
    ][COORDINATOR]
    coordinator.add_entities_for_seen_printers(
        async_add_entities=async_add_entities,
        entity_constructor=AnycubicButton,
        platform=Platform.BUTTON,
        available_descriptors=list(
            BUTTON_TYPES
            + PRIMARY_DRYING_PRESET_BUTTON_TYPES
            + SECONDARY_DRYING_PRESET_BUTTON_TYPES
            + GLOBAL_BUTTON_TYPES
            + FDM_BUTTON_DESCRIPTIONS
            + PRIMARY_MULTI_COLOR_BOX_BUTTON_TYPES
            + SECONDARY_MULTI_COLOR_BOX_BUTTON_TYPES
        ),
    )


class AnycubicButton(AnycubicCloudEntity, ButtonEntity):
    """Representation of a Anycubic Cloud button."""

    entity_description: AnycubicButtonEntityDescription

    def __init__(
        self,
        hass: HomeAssistant,
        coordinator: AnycubicCloudDataUpdateCoordinator,
        printer_id: int,
        entity_description: AnycubicButtonEntityDescription,
    ) -> None:
        """Initiate Anycubic Button."""
        super().__init__(hass, coordinator, printer_id, entity_description)

    async def async_press(self) -> None:
        """Press the button."""
        if TYPE_CHECKING:
            assert self.coordinator.anycubic_api, "Connection to API is missing"

        if self.entity_description.key in ["dry_start_custom", "secondary_dry_start_custom"]:
            prefix = "secondary_" if "secondary" in self.entity_description.key else ""

            # Die manuellen Eingabefelder (number.py) speichern ihren Wert nicht in
            # coordinator.data['states'] (das wird ausschließlich aus den Cloud-
            # Statuswerten gebaut), sondern zentral auf dem Coordinator. Nur so
            # sieht dieser Button den Wert, den der Nutzer im Number-Entity gesetzt hat.
            temp_val = self.coordinator.get_manual_drying_input(
                self._printer_id, f"{prefix}drying_temperature_input", 50.0
            )
            time_val = self.coordinator.get_manual_drying_input(
                self._printer_id, f"{prefix}drying_time_input", 6.0
            )

            await self.coordinator.button_press_custom_dry(
                self._printer_id, 
                int(float(temp_val)), 
                int(float(time_val)), 
                is_secondary=("secondary" in self.entity_description.key)
            )
        else:
            await self.coordinator.button_press_event(self._printer_id, self.entity_description.key)

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        attrib = printer_attributes_for_key(self.coordinator, self._printer_id, self.entity_description.key)
        if attrib is not None:
            return attrib
        else:
            return None