"""Anycubic Cloud frontend panel."""
from __future__ import annotations

import os
from typing import Any

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    CUSTOM_COMPONENTS,
    DOMAIN,
    INTEGRATION_FOLDER,
    LOGGER,
    PANEL_FILENAME,
    PANEL_FOLDER,
    PANEL_ICON,
    PANEL_NAME,
    PANEL_TITLE,
)
from .helpers import extract_panel_card_config

PANEL_URL = "/anycubic-cloud-panel-static"


def process_card_config(
    conf_object: Any,
) -> dict[str, Any]:
    if isinstance(conf_object, dict):
        return extract_panel_card_config(conf_object)
    else:
        return {}


async def async_register_panel(
    hass: HomeAssistant,
    conf_object: Any,
) -> None:
    """Register the Anycubic Cloud frontend panel."""
    if DOMAIN not in hass.data.get("frontend_panels", {}):
        root_dir = os.path.join(hass.config.path(CUSTOM_COMPONENTS), INTEGRATION_FOLDER)
        panel_dir = os.path.join(root_dir, PANEL_FOLDER)
        view_url = os.path.join(panel_dir, PANEL_FILENAME)

        try:
            await hass.http.async_register_static_paths(
                [StaticPathConfig(PANEL_URL, view_url, cache_headers=False)]
            )
        except RuntimeError as e:
            if "already registered" not in str(e):
                raise e

        conf = process_card_config(conf_object)

        LOGGER.debug(f"Processed panel config: {conf}")

        await panel_custom.async_register_panel(
            hass,
            webcomponent_name=PANEL_NAME,
            frontend_url_path=DOMAIN,
            module_url=PANEL_URL,
            sidebar_title=PANEL_TITLE,
            sidebar_icon=PANEL_ICON,
            require_admin=False,
            config=conf,
        )


async def async_unregister_panel(
    hass: HomeAssistant,
) -> None:
    """Unregister the Anycubic Cloud frontend panel.

    `panel_custom` can only *register* panels - it has no unregister
    counterpart. Removing a panel from the sidebar is done through the
    generic `frontend.async_remove_panel(hass, frontend_url_path)` API
    (the same `frontend_url_path`/DOMAIN that was passed to
    `async_register_panel` above).

    Wrapped in try/except on purpose: a failure here must never abort
    `async_unload_entry` (see __init__.py) - if it does, HA reports the
    whole unload/reload as failed even though the platforms were already
    unloaded, which leaves the entry in a broken state with no entities
    and no way to recover without a full HA restart.
    """
    if DOMAIN in hass.data.get("frontend_panels", {}):
        try:
            frontend.async_remove_panel(hass, DOMAIN)
        except Exception:  # noqa: BLE001 - defensive, see docstring above
            LOGGER.exception("Failed to unregister the Anycubic Cloud panel")