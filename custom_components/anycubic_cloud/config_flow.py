"""Adds config flow for Anycubic Cloud integration."""
from __future__ import annotations

import traceback
from enum import IntEnum
from typing import Any

import homeassistant.helpers.config_validation as cv
import voluptuous as vol
from aiohttp import CookieJar
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_create_clientsession
from homeassistant.helpers.selector import BooleanSelector, ObjectSelector

from .const import (
    CONF_CARD_CONFIG,
    CONF_DEBUG_API_CALLS,
    CONF_DEBUG_DEPRECATED,
    CONF_DEBUG_MQTT_MSG,
    CONF_DRYING_PRESET_DURATION_,
    CONF_DRYING_PRESET_TEMPERATURE_,
    CONF_MQTT_CONNECT_MODE,
    CONF_PRINTER_ID_LIST,
    CONF_USER_AUTH_MODE,
    CONF_USER_DEVICE_ID,
    CONF_USER_TOKEN,
    DOMAIN,
    LOGGER,
    MAX_DRYING_PRESETS,
)


class LocalAnycubicMQTTConnectMode(IntEnum):
    """Local MQTT connection modes."""

    Printing_Only = 1
    Printing_Drying = 2
    Device_Online = 3
    Always = 4
    Never_Connect = 5


def local_remove_quotes_from_string(value: Any) -> str | None:
    """Locally remove leading/trailing quotes from string."""
    if value is None:
        return None
    cleaned = str(value).strip()
    if (cleaned.startswith('"') and cleaned.endswith('"')) or (
        cleaned.startswith("'") and cleaned.endswith("'")
    ):
        return cleaned[1:-1]
    return cleaned


class AnycubicCloudConfigFlow(ConfigFlow, domain=DOMAIN):
    """Config flow for Anycubic Cloud."""

    VERSION = 1

    def __init__(self) -> None:
        """Initialize local state for flow."""
        super().__init__()
        self.auth_mode: int | None = None
        self.user_token: str | None = None
        self.device_id: str | None = None
        self.printer_id_list: list[int] = []
        self.api_client: Any | None = None

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        if user_input is not None:
            self.auth_mode = int(user_input[CONF_USER_AUTH_MODE])
            if self.auth_mode == 1:
                return await self.async_step_auth_mode_web()
            elif self.auth_mode == 2:
                return await self.async_step_auth_mode_slicer()
            elif self.auth_mode == 3:
                return await self.async_step_auth_mode_android()

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_USER_AUTH_MODE, default="1"): vol.In(
                        {
                            "1": "Web Interface Token",
                            "2": "Anycubic Slicer Next Token (Currently Broken)",
                            "3": "Android App Credentials",
                        }
                    )
                }
            ),
            errors={},
        )

    async def _validate_token_and_get_printers(self) -> dict[str, str] | None:
        """Validate credentials against Anycubic API and retrieve printer list."""
        # Korrekter Import der echten Klasse aus anycubic_api.py analog zum Coordinator
        from .anycubic_cloud_api.anycubic_api import AnycubicMQTTAPI as AnycubicAPI

        errors = {}
        try:
            session = async_create_clientsession(
                self.hass, cookie_jar=CookieJar(unsafe=True)
            )

            # Instanzierung ohne direkte Übergabe der Token im __init__
            self.api_client = AnycubicAPI(
                session=session,
                cookie_jar=session.cookie_jar,
                debug_logger=LOGGER,
            )
            
            # Authentifizierung setzen wie im Coordinator
            self.api_client.set_authentication(
                auth_token=self.user_token,
                auth_mode=self.auth_mode,
                device_id=self.device_id,
            )

            # Token aktiv prüfen
            success = await self.api_client.check_api_tokens()
            if not success:
                errors["base"] = "invalid_token"
                return errors

            # Drucker abrufen
            printers = await self.api_client.list_my_printers(ignore_init_errors=True)
            
            if not printers:
                errors["base"] = "no_printers"
                return errors

            # Extrahiert die IDs aus den AnycubicPrinter-Objektattributen (.id)
            self.printer_id_list = []
            for p in printers:
                if p is not None and getattr(p, "id", None) is not None:
                    self.printer_id_list.append(int(p.id))

            if not self.printer_id_list:
                errors["base"] = "no_printers"
                return errors

        except Exception as err:
            LOGGER.error(f"Error validating Anycubic Token: {traceback.format_exc()}")
            if "auth" in str(err).lower() or "unauthorized" in str(err).lower():
                errors["base"] = "invalid_token"
            else:
                errors["base"] = "cannot_connect"
            return errors

        return None

    async def async_step_auth_mode_web(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step for Web Authentication."""
        errors = {}
        if user_input is not None:
            self.user_token = local_remove_quotes_from_string(
                user_input[CONF_USER_TOKEN]
            )
            if not (errors := await self._validate_token_and_get_printers() or {}):
                return await self.async_step_printer()

        return self.async_show_form(
            step_id="auth_mode_web",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_USER_TOKEN): str,
                }
            ),
            errors=errors,
        )

    async def async_step_auth_mode_slicer(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step for Slicer Authentication."""
        errors = {}
        if user_input is not None:
            self.user_token = local_remove_quotes_from_string(
                user_input[CONF_USER_TOKEN]
            )
            if not (errors := await self._validate_token_and_get_printers() or {}):
                return await self.async_step_printer()

        return self.async_show_form(
            step_id="auth_mode_slicer",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_USER_TOKEN): str,
                }
            ),
            errors=errors,
        )

    async def async_step_auth_mode_android(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step for Android App Authentication."""
        errors = {}
        if user_input is not None:
            self.user_token = local_remove_quotes_from_string(
                user_input[CONF_USER_TOKEN]
            )
            self.device_id = local_remove_quotes_from_string(
                user_input[CONF_USER_DEVICE_ID]
            )
            if not (errors := await self._validate_token_and_get_printers() or {}):
                return await self.async_step_printer()

        return self.async_show_form(
            step_id="auth_mode_android",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_USER_TOKEN): str,
                    vol.Required(CONF_USER_DEVICE_ID): str,
                }
            ),
            errors=errors,
        )

    async def async_step_printer(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step to select printers to monitor."""
        errors = {}
        if user_input is not None:
            selected_printers = user_input[CONF_PRINTER_ID_LIST]
            if not selected_printers:
                errors["base"] = "no_printers"
            else:
                user_id = "anycubic_user"
                if self.api_client and hasattr(self.api_client, "anycubic_auth"):
                    user_id = getattr(self.api_client.anycubic_auth, "api_user_id", "anycubic_user")

                await self.async_set_unique_id(f"anycubic_cloud_{user_id}")
                self._abort_if_unique_id_configured()

                return self.async_create_entry(
                    title=f"Anycubic Cloud ({user_id})",
                    data={
                        CONF_USER_AUTH_MODE: self.auth_mode if self.auth_mode else 1,
                        CONF_USER_TOKEN: self.user_token,
                        CONF_USER_DEVICE_ID: self.device_id,
                        CONF_PRINTER_ID_LIST: selected_printers,
                    },
                )

        printer_choices = {
            str(pid): f"Printer ID: {pid}" for pid in self.printer_id_list
        }

        return self.async_show_form(
            step_id="printer",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_PRINTER_ID_LIST,
                        default=[str(p) for p in self.printer_id_list],
                    ): cv.multi_select(printer_choices),
                }
            ),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: ConfigEntry,
    ) -> AnycubicCloudOptionsFlowHandler:
        """Get the options flow handler."""
        return AnycubicCloudOptionsFlowHandler()


class AnycubicCloudOptionsFlowHandler(OptionsFlow):
    """Handle Anycubic Cloud options."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage Anycubic Cloud options."""
        return await self.async_step_mqtt_presets()

    async def async_step_mqtt_presets(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage MQTT connection and Drying presets configurations."""
        if user_input is not None:
            return await self.async_step_card_config()

        fields = {
            vol.Optional(
                CONF_MQTT_CONNECT_MODE,
                default=str(
                    self.config_entry.options.get(
                        CONF_MQTT_CONNECT_MODE,
                        LocalAnycubicMQTTConnectMode.Printing_Drying.value,
                    )
                ),
            ): vol.In(
                {
                    str(LocalAnycubicMQTTConnectMode.Printing_Only.value): "Nur beim Drucken verbinden",
                    str(LocalAnycubicMQTTConnectMode.Printing_Drying.value): "Beim Drucken & Trocknen verbinden",
                    str(LocalAnycubicMQTTConnectMode.Device_Online.value): "Verbinden wenn Drucker Online",
                    str(LocalAnycubicMQTTConnectMode.Always.value): "Immer verbunden bleiben",
                    str(LocalAnycubicMQTTConnectMode.Never_Connect.value): "Niemals über MQTT verbinden",
                }
            )
        }

        for x in range(MAX_DRYING_PRESETS):
            default_dur = self.config_entry.options.get(
                f"{CONF_DRYING_PRESET_DURATION_}{x + 1}", 4
            )
            default_temp = self.config_entry.options.get(
                f"{CONF_DRYING_PRESET_TEMPERATURE_}{x + 1}", 50
            )
            fields[
                vol.Optional(
                    f"{CONF_DRYING_PRESET_DURATION_}{x + 1}", default=default_dur
                )
            ] = int
            fields[
                vol.Optional(
                    f"{CONF_DRYING_PRESET_TEMPERATURE_}{x + 1}", default=default_temp
                )
            ] = int

        return self.async_show_form(
            step_id="mqtt_presets",
            data_schema=vol.Schema(fields),
            errors={},
        )

    async def async_step_card_config(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage Custom Panel Layout Configurations."""
        if user_input is not None:
            return await self.async_step_debug()

        default_card_config = self.config_entry.options.get(CONF_CARD_CONFIG, None)

        return self.async_show_form(
            step_id="card_config",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        CONF_CARD_CONFIG, default=default_card_config
                    ): ObjectSelector()
                }
            ),
            errors={},
        )

    async def async_step_debug(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage Anycubic Cloud debug options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        default_debug_all = self.config_entry.options.get(CONF_DEBUG_DEPRECATED, False)
        default_debug_api = self.config_entry.options.get(
            CONF_DEBUG_API_CALLS, default_debug_all
        )
        default_debug_mqtt = self.config_entry.options.get(
            CONF_DEBUG_MQTT_MSG, default_debug_all
        )

        return self.async_show_form(
            step_id="debug",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        CONF_DEBUG_API_CALLS, default=default_debug_api
                    ): BooleanSelector(),
                    vol.Optional(
                        CONF_DEBUG_MQTT_MSG, default=default_debug_mqtt
                    ): BooleanSelector(),
                }
            ),
            errors={},
        )