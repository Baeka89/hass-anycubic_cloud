"""Base class for anycubic_cloud entity."""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

from homeassistant.helpers.entity import Entity, EntityDescription
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, PrinterEntityType
from .helpers import build_printer_device_info, printer_entity_unique_id

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.device_registry import DeviceInfo
    from .coordinator import AnycubicCloudDataUpdateCoordinator


@dataclass(frozen=True, kw_only=True)
class AnycubicCloudEntityDescription(EntityDescription):
    """Generic Anycubic Cloud entity description."""

    printer_entity_type: PrinterEntityType | None = None


class AnycubicCloudEntity(CoordinatorEntity, Entity):
    """Base implementation for Anycubic Printer device."""

    _attr_has_entity_name = True

    def __init__(
        self,
        hass: HomeAssistant,
        coordinator: AnycubicCloudDataUpdateCoordinator,
        printer_id: int,
        entity_description: AnycubicCloudEntityDescription,
    ) -> None:
        """Initialize an Anycubic device."""
        super().__init__(coordinator)
        self._printer_id = int(printer_id)
        self.entity_description = entity_description
        self._attr_unique_id = printer_entity_unique_id(coordinator, self._printer_id, entity_description.key)

        # Dynamische Zuordnung der DeviceInfo basierend auf dem Typ der Entität
        entity_type = entity_description.printer_entity_type

        if entity_type == PrinterEntityType.GLOBAL:
            # Ordne die Entität dem übergeordneten Cloud-Bridge-Dienstglied zu
            user_id = coordinator.data.get('user_info', {}).get('id', 'unknown_user')
            self._attr_device_info = {
                "identifiers": {(DOMAIN, f"cloud_bridge_{user_id}")},
            }
        elif entity_type in (PrinterEntityType.DRY_PRESET_PRIMARY, PrinterEntityType.ACE_PRIMARY):
            # Ordne die Entität der ersten ACE Pro Box zu
            self._attr_device_info = {
                "identifiers": {(DOMAIN, f"ace_primary_{self._printer_id}")},
            }
        elif entity_type in (PrinterEntityType.DRY_PRESET_SECONDARY, PrinterEntityType.ACE_SECONDARY):
            # Ordne die Entität der zweiten ACE Pro Box zu
            self._attr_device_info = {
                "identifiers": {(DOMAIN, f"ace_secondary_{self._printer_id}")},
            }
        else:
            # Nutze exakt die originale build_printer_device_info Logik der Integration
            printer_device_info: DeviceInfo = build_printer_device_info(
                coordinator.data,
                self._printer_id,
            )
            self._attr_device_info = {
                "identifiers": printer_device_info.get("identifiers"),
            }