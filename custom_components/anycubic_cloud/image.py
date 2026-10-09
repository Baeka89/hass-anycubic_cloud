"""Support for Anycubic Cloud image."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import TYPE_CHECKING

from homeassistant.components.image import ImageEntity, ImageEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

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
class AnycubicImageEntityDescription(
    ImageEntityDescription, AnycubicCloudEntityDescription
):
    """Describes Anycubic Cloud image entity."""


IMAGE_TYPES: list[AnycubicImageEntityDescription] = list([
    AnycubicImageEntityDescription(
        key="job_image_url",
        translation_key="job_image_url",
        printer_entity_type=PrinterEntityType.PRINTER,
    ),
])

GLOBAL_IMAGE_TYPES: list[AnycubicImageEntityDescription] = list([
])


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the image from a config entry."""

    coordinator: AnycubicCloudDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id][
        COORDINATOR
    ]

    coordinator.add_entities_for_seen_printers(
        async_add_entities=async_add_entities,
        entity_constructor=AnycubicCloudImage,
        platform=Platform.IMAGE,
        available_descriptors=list(
            IMAGE_TYPES
            + GLOBAL_IMAGE_TYPES
        ),
    )


class AnycubicCloudImage(AnycubicCloudEntity, ImageEntity):
    """An image for Anycubic Cloud."""

    entity_description: AnycubicImageEntityDescription

    def __init__(
        self,
        hass: HomeAssistant,
        coordinator: AnycubicCloudDataUpdateCoordinator,
        printer_id: int,
        entity_description: AnycubicImageEntityDescription,
    ) -> None:
        """Initialize."""
        super().__init__(hass, coordinator, printer_id, entity_description)
        ImageEntity.__init__(self, hass)
        self._known_image_url = None
        self._check_image_url()

    def _reset_cached_image(self) -> None:
        self._cached_image = None
        self._attr_image_last_updated = dt_util.utcnow()

    def _check_image_url(self) -> None:
        image_url = printer_state_for_key(self.coordinator, self._printer_id, self.entity_description.key)
        if self._known_image_url != image_url:
            self._reset_cached_image()

            self._known_image_url = image_url

    @property
    def image_url(self) -> str | None:
        return self._known_image_url

    @property
    def image_last_updated(self) -> datetime | None:
        return self._attr_image_last_updated

    @callback
    def _handle_coordinator_update(self) -> None:
        """Publish the new image timestamp together with coordinator changes."""
        self._check_image_url()
        super()._handle_coordinator_update()

    async def async_image(self) -> bytes | None:
        """Return bytes of image."""

        self._check_image_url()

        return await ImageEntity.async_image(self)
