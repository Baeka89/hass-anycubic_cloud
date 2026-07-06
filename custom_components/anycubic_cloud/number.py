"""Numbers for Anycubic Cloud Printers."""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from homeassistant.components.number import NumberEntity, NumberEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, Platform, UnitOfTemperature, UnitOfTime
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
class AnycubicNumberEntityDescription(
    NumberEntityDescription, AnycubicCloudEntityDescription
):
    """Describes Anycubic Cloud number entity."""


PRIMARY_MULTI_COLOR_BOX_NUMBER_TYPES: list[AnycubicNumberEntityDescription] = list([
    AnycubicNumberEntityDescription(
        key="dry_status_target_temperature",
        name="ACE Trocknung Zieltemperatur",
        translation_key="dry_status_target_temperature",
        native_min_value=0,
        native_max_value=70,
        native_step=1,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        printer_entity_type=PrinterEntityType.ACE_PRIMARY,
    ),
    AnycubicNumberEntityDescription(
        key="drying_temperature_input",
        name="ACE Manuelle Trocknung Temperatur",
        translation_key="drying_temperature_input",
        native_min_value=40,
        native_max_value=70,
        native_step=1,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        printer_entity_type=PrinterEntityType.ACE_PRIMARY,
    ),
    AnycubicNumberEntityDescription(
        key="drying_time_input",
        name="ACE Manuelle Trocknung Dauer",
        translation_key="drying_time_input",
        native_min_value=1,
        native_max_value=24,
        native_step=1,
        native_unit_of_measurement=UnitOfTime.HOURS,
        printer_entity_type=PrinterEntityType.ACE_PRIMARY,
    ),
])

SECONDARY_MULTI_COLOR_BOX_NUMBER_TYPES: list[AnycubicNumberEntityDescription] = list([
    AnycubicNumberEntityDescription(
        key="secondary_dry_status_target_temperature",
        name="Sekundäre ACE Trocknung Zieltemperatur",
        translation_key="secondary_dry_status_target_temperature",
        native_min_value=0,
        native_max_value=70,
        native_step=1,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        printer_entity_type=PrinterEntityType.ACE_SECONDARY,
    ),
    AnycubicNumberEntityDescription(
        key="secondary_drying_temperature_input",
        name="Sekundäre ACE Manuelle Trocknung Temperatur",
        translation_key="secondary_drying_temperature_input",
        native_min_value=40,
        native_max_value=70,
        native_step=1,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        printer_entity_type=PrinterEntityType.ACE_SECONDARY,
    ),
    AnycubicNumberEntityDescription(
        key="secondary_drying_time_input",
        name="Sekundäre ACE Manuelle Trocknung Dauer",
        translation_key="secondary_drying_time_input",
        native_min_value=1,
        native_max_value=24,
        native_step=1,
        native_unit_of_measurement=UnitOfTime.HOURS,
        printer_entity_type=PrinterEntityType.ACE_SECONDARY,
    ),
])

FDM_NUMBER_TYPES: list[AnycubicNumberEntityDescription] = list([
    AnycubicNumberEntityDescription(
        key="target_hotbed_temp",
        name="Heizbett Zieltemperatur",
        translation_key="target_hotbed_temp",
        native_min_value=0,
        native_max_value=110,
        native_step=1,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicNumberEntityDescription(
        key="target_nozzle_temp",
        name="Hotend Zieltemperatur",
        translation_key="target_nozzle_temp",
        native_min_value=0,
        native_max_value=300,
        native_step=1,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        printer_entity_type=PrinterEntityType.FDM,
    ),
    AnycubicNumberEntityDescription(
        key="fan_speed_pct",
        name="Lüftergeschwindigkeit",
        translation_key="fan_speed_pct",
        native_min_value=0,
        native_max_value=100,
        native_step=1,
        native_unit_of_measurement=PERCENTAGE,
        printer_entity_type=PrinterEntityType.FDM,
    ),
])


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up the Anycubic Cloud number entry."""

    coordinator: AnycubicCloudDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id][
        COORDINATOR
    ]

    coordinator.add_entities_for_seen_printers(
        async_add_entities=async_add_entities,
        entity_constructor=AnycubicNumber,
        platform=Platform.NUMBER,
        available_descriptors=list(
            FDM_NUMBER_TYPES
            + PRIMARY_MULTI_COLOR_BOX_NUMBER_TYPES
            + SECONDARY_MULTI_COLOR_BOX_NUMBER_TYPES
        ),
    )


class AnycubicNumber(AnycubicCloudEntity, NumberEntity):
    """Representation of a Anycubic Cloud number control."""

    entity_description: AnycubicNumberEntityDescription
    
    _attr_has_entity_name = True

    def __init__(
        self,
        hass: HomeAssistant,
        coordinator: AnycubicCloudDataUpdateCoordinator,
        printer_id: int,
        entity_description: AnycubicNumberEntityDescription,
    ) -> None:
        """Initiate Anycubic Number."""
        super().__init__(hass, coordinator, printer_id, entity_description)
        self._attr_name = entity_description.name
        
        # Standardwerte für die manuellen Eingabefelder lokal vorbesetzen
        if "drying_temperature_input" in entity_description.key:
            self._attr_native_value = 50.0
        elif "drying_time_input" in entity_description.key:
            self._attr_native_value = 6.0

    @property
    def available(self) -> bool:
        """Return if entity is available."""
        # Die manuellen Eingaberegler sind immer verfügbar, da sie UI-Helfer sind
        if "input" in self.entity_description.key:
            return True
        return printer_state_for_key(
            self.coordinator,
            self._printer_id,
            self.entity_description.key
        ) is not None

    @property
    def native_value(self) -> float | None:
        """Return the current value from cloud data or local state."""
        if "input" in self.entity_description.key:
            return self._attr_native_value

        state = printer_state_for_key(self.coordinator, self._printer_id, self.entity_description.key)
        if state is None:
            return None
        return float(state)

    async def async_set_native_value(self, value: float) -> None:
        """Send the new target value to the Anycubic API or save locally."""
        target_value = int(value)
        key = self.entity_description.key

        # Wenn es sich um ein reines Eingabefeld handelt, speichern wir den Wert lokal ab
        if "input" in key:
            self._attr_native_value = float(target_value)
            self.async_write_ha_state()
            return

        if key in ("target_hotbed_temp", "target_nozzle_temp", "fan_speed_pct"):
            if key == "target_hotbed_temp":
                await self.coordinator.api.set_bed_temp(target_value)
            elif key == "target_nozzle_temp":
                await self.coordinator.api.set_nozzle_temp(target_value)
            elif key == "fan_speed_pct":
                await self.coordinator.api.set_fan_speed(target_value)
        else:
            # Dynamischer Fallback für ACE Befehle an den Coordinator übergeben
            await self.coordinator.set_number_value(self._printer_id, key, target_value)

        await self.coordinator.async_request_refresh()