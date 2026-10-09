"""DataUpdateCoordinator for the Anycubic Cloud integration."""
from __future__ import annotations

import asyncio
import time
import traceback
from collections.abc import Callable, Coroutine
from datetime import timedelta
from typing import TYPE_CHECKING, Any

from aiohttp import CookieJar
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import (
    CoreState,
    HomeAssistant,
    callback,
)
from homeassistant.exceptions import (
    ConfigEntryAuthFailed,
    ConfigEntryError,
    HomeAssistantError,
)
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_create_clientsession
from homeassistant.helpers.device_registry import (
    DeviceEntryType,
    DeviceInfo,
    async_get as async_get_device_registry,
)
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .anycubic_cloud_api.anycubic_api import AnycubicMQTTAPI as AnycubicAPI
from .anycubic_cloud_api.exceptions.exceptions import AnycubicAPIError, AnycubicAPIParsingError
from .const import (
    API_SETUP_RETRIES,
    API_SETUP_RETRY_INTERVAL_SECONDS,
    CONF_DEBUG_API_CALLS,
    CONF_DEBUG_DEPRECATED,
    CONF_DEBUG_MQTT_MSG,
    CONF_MQTT_CONNECT_MODE,
    CONF_MQTT_VERIFY_TLS,
    CONF_PRINTER_ID_LIST,
    CONF_USER_AUTH_MODE,
    CONF_USER_DEVICE_ID,
    CONF_USER_TOKEN,
    DEFAULT_SCAN_INTERVAL,
    DEGRADED_CONNECTION_ISSUE_THRESHOLD,
    DOMAIN,
    ENTITY_ID_DRYING_START_PRESET_,
    FAILED_UPDATE_DELAY,
    LOGGER,
    MAX_DRYING_PRESETS,
    MAX_FAILED_UPDATES,
    MQTT_ACTION_RESPONSE_ALIVE_SECONDS,
    MQTT_IDLE_DISCONNECT_SECONDS,
    MQTT_REFRESH_INTERVAL,
    MQTT_SCAN_INTERVAL,
    PRINT_JOB_STARTED_UPDATE_DELAY,
    STORAGE_KEY,
    STORAGE_VERSION,
    UPDATE_RETRY_BACKOFF_BASE_SECONDS,
    PrinterEntityType,
)
from .helpers import (
    DEFAULT_MQTT_CONNECT_MODE,
    AnycubicMQTTConnectMode,
    build_printer_device_info,
    check_descriptor_state_ace_not_supported,
    check_descriptor_state_ace_primary_unavailable,
    check_descriptor_state_ace_secondary_unavailable,
    check_descriptor_state_box_light_not_supported,
    check_descriptor_state_drying_unavailable,
    check_descriptor_state_light_not_supported,
    check_descriptor_status_not_fdm,
    check_descriptor_status_not_lcd,
    features_enabled_summary,
    get_drying_preset_from_entry_options,
    get_update_retry_count_from_entry_options,
    printer_attributes_for_key,
    printer_state_connected_ace_units,
    printer_state_supports_ace,
    state_string_active,
    state_string_loaded,
    unknown_type_function_ids_summary,
)

if TYPE_CHECKING:
    from .anycubic_cloud_api.data_models.printer import AnycubicPrinter
    from .entity import AnycubicCloudEntity, AnycubicCloudEntityDescription


class AnycubicCloudDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """AnycubicCloud Data Update Coordinator."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
    ) -> None:
        """Initialize AnycubicCloud."""
        self.entry: ConfigEntry = entry
        self._anycubic_api: AnycubicAPI | None = None
        self._anycubic_printers: dict[int, AnycubicPrinter] = dict()
        self._cloud_file_list: list[dict[str, Any]] | None = None
        self._last_state_update: int | None = None
        self._update_cooldown_until: int = 0
        self._failed_updates: int = 0
        self._consecutive_cooldown_periods: int = 0
        self._callback_tasks: set[asyncio.Task[None]] = set()
        self._mqtt_task: asyncio.Future[None] | None = None
        self._mqtt_manually_connected = False
        self._mqtt_idle_since: int | None = None
        self._mqtt_last_action: int | None = None
        self._auth_save_lock = asyncio.Lock()
        self._mqtt_connect_check_lock = asyncio.Lock()
        self._mqtt_refresh_lock = asyncio.Lock()
        self._mqtt_file_list_check_lock = asyncio.Lock()
        self._mqtt_last_refresh: int | None = None
        self._printer_device_map: dict[str, int] | None = None
        mqtt_connect_mode = self.entry.options.get(CONF_MQTT_CONNECT_MODE)
        self._mqtt_connection_mode = (
            DEFAULT_MQTT_CONNECT_MODE
            if mqtt_connect_mode is None
            else AnycubicMQTTConnectMode(int(mqtt_connect_mode))
        )
        self._unregistered_descriptors: dict[int, dict[str, list[AnycubicCloudEntityDescription]]] = dict()
        # Speichert die Werte der manuellen Trocknungs-Eingabefelder
        # (drying_temperature_input / drying_time_input) zentral, damit der
        # "Custom Drying starten"-Button (button.py) sie unabhängig von der
        # jeweiligen Number-Entity-Instanz auslesen kann.
        self._manual_drying_inputs: dict[tuple[int, str], float] = {}
        super().__init__(
            hass,
            LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=timedelta(seconds=MQTT_SCAN_INTERVAL),
            always_update=False,
        )

    @property
    def anycubic_api(self) -> AnycubicAPI:
        if not self._anycubic_api:
            raise ConfigEntryError("Anycubic API instance is missing.")
        return self._anycubic_api

    def get_manual_drying_input(
        self, printer_id: int, key: str, default: float
    ) -> float:
        """Lese den zuletzt vom Nutzer gesetzten Wert eines manuellen
        Trocknungs-Eingabefelds (Temperatur/Dauer)."""
        return self._manual_drying_inputs.get((printer_id, key), default)

    def set_manual_drying_input(
        self, printer_id: int, key: str, value: float
    ) -> None:
        """Speichere den vom Nutzer gesetzten Wert eines manuellen
        Trocknungs-Eingabefelds zentral, damit der Custom-Drying-Button
        ihn unabhängig von der Number-Entity-Instanz auslesen kann."""
        self._manual_drying_inputs[(printer_id, key)] = value

    def _any_printers_are_printing(self) -> bool:
        return any([
            printer.is_busy for printer_id, printer in self._anycubic_printers.items()
        ])

    def _any_printers_are_drying(self) -> bool:
        return any([
            (
                printer.primary_drying_status_is_drying or
                printer.secondary_drying_status_is_drying
            ) for printer_id, printer in self._anycubic_printers.items()
        ])

    def _any_printers_are_online(self) -> bool:
        return any([
            (
                printer.printer_online or printer.is_busy
            ) for printer_id, printer in self._anycubic_printers.items()
        ])

    def _no_printers_are_printing(self) -> bool:
        return all([
            not printer.is_busy and
            (not printer.latest_project_print_in_progress)
            for printer_id, printer in self._anycubic_printers.items()
        ])

    def _check_mqtt_connection_last_action_waiting(self) -> bool:
        if (
            self._mqtt_last_action is not None and
            int(time.time()) < self._mqtt_last_action + MQTT_ACTION_RESPONSE_ALIVE_SECONDS
        ):
            return True

        return False

    def _check_mqtt_connection_modes_active(self) -> bool:
        if self._check_mqtt_connection_last_action_waiting():
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Printing_Only and
            self._any_printers_are_printing()
        ):
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Printing_Drying and
            (self._any_printers_are_printing() or self._any_printers_are_drying())
        ):
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Device_Online and
            self._any_printers_are_online()
        ):
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Always
        ):
            return True

        else:
            return False

    def _check_mqtt_connection_modes_inactive(self) -> bool:
        if self._check_mqtt_connection_last_action_waiting():
            return False

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Printing_Only and
            self._no_printers_are_printing()
        ):
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Printing_Drying and
            (self._no_printers_are_printing() and not self._any_printers_are_drying())
        ):
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Device_Online and
            not self._any_printers_are_online()
        ):
            return True

        elif (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Always
        ):
            return False

        else:
            return False

    def _build_printer_dict(self, printer: AnycubicPrinter) -> dict[str, Any]:
        primary_ace_spool_info = printer.primary_multi_color_box_spool_info_object
        secondary_ace_spool_info = printer.secondary_multi_color_box_spool_info_object

        file_list_local = printer.local_file_list_object
        file_list_udisk = printer.udisk_file_list_object
        file_list_cloud = self._cloud_file_list

        states = {
            "id": printer.id,
            "name": printer.name,
            "printer_online": printer.printer_online,
            "is_busy": printer.is_busy,
            "is_available": printer.is_available,
            "printer_light_is_on": printer.light_is_on(),
            "printer_box_light_is_on": printer.light_is_on(light_type=2),
            "current_status": printer.current_status,
            "curr_nozzle_temp": printer.curr_nozzle_temp,
            "curr_hotbed_temp": printer.curr_hotbed_temp,
            "machine_mac": printer.machine_mac,
            "machine_name": printer.machine_name,
            "fw_version": printer.fw_version.firmware_version if printer.fw_version else None,
            "file_list_local": state_string_loaded(file_list_local),
            "file_list_udisk": state_string_loaded(file_list_udisk),
            "file_list_cloud": state_string_loaded(file_list_cloud),
            "supports_function_multi_color_box": printer.supports_function_multi_color_box,
            "connected_ace_units": printer.connected_ace_units,
            "connected_ace_ids": [box.box_id for box in printer.multi_color_box or []],
            "multi_color_box_fw_version": printer.primary_multi_color_box_fw_firmware_version,
            "ace_spools": state_string_active(primary_ace_spool_info),
            "multi_color_box_runout_refill": printer.primary_multi_color_box_auto_feed,
            "ace_current_temperature": printer.primary_multi_color_box_current_temperature,
            "secondary_multi_color_box_fw_version": printer.secondary_multi_color_box_fw_firmware_version,
            "secondary_ace_spools": state_string_active(secondary_ace_spool_info),
            "secondary_multi_color_box_runout_refill": printer.secondary_multi_color_box_auto_feed,
            "secondary_ace_current_temperature": printer.secondary_multi_color_box_current_temperature,
            "dry_status_is_drying": printer.primary_drying_status_is_drying,
            "dry_status_target_temperature": printer.primary_drying_status_target_temperature,
            "dry_status_total_duration": printer.primary_drying_status_total_duration,
            "dry_status_remaining_time": printer.primary_drying_status_remaining_time,
            "secondary_dry_status_is_drying": printer.secondary_drying_status_is_drying,
            "secondary_dry_status_raw_status_code": printer.secondary_drying_status_raw_status_code,
            "secondary_dry_status_target_temperature": printer.secondary_drying_status_target_temperature,
            "secondary_dry_status_total_duration": printer.secondary_drying_status_total_duration,
            "secondary_dry_status_remaining_time": printer.secondary_drying_status_remaining_time,
            "job_name": printer.latest_project_name,
            "job_progress": printer.latest_project_progress_percentage,
            "job_time_elapsed": printer.latest_project_print_time_elapsed_minutes,
            "job_time_remaining": printer.latest_project_print_time_remaining_minutes,
            "job_in_progress": printer.latest_project_print_in_progress,
            "job_complete": printer.latest_project_print_complete,
            "job_failed": printer.latest_project_print_failed,
            "job_is_paused": printer.latest_project_print_is_paused,
            "job_image_url": printer.latest_project_image_url,
            "job_state": printer.latest_project_print_status,
            "job_eta": printer.latest_project_print_approximate_completion_time,
            "job_current_layer": printer.latest_project_print_current_layer,
            "job_total_layers": printer.latest_project_print_total_layers,
            "target_nozzle_temp": printer.latest_project_target_nozzle_temp,
            "target_hotbed_temp": printer.latest_project_target_hotbed_temp,
            "curr_chamber_temp": printer.latest_project_curr_chamber_temp,
            "target_chamber_temp": printer.latest_project_target_chamber_temp,
            "job_speed_mode": printer.latest_project_print_speed_mode_string,
            "print_speed_pct": printer.latest_project_print_speed_pct,
            "job_z_thick": printer.latest_project_z_thick,
            "fan_speed_pct": printer.latest_project_fan_speed_pct,
            "job_model_height": printer.latest_project_print_model_height,
            "job_anti_alias_count": printer.latest_project_print_anti_alias_count,
            "job_on_time": printer.latest_project_print_on_time,
            "job_off_time": printer.latest_project_print_off_time,
            "job_bottom_time": printer.latest_project_print_bottom_time,
            "job_bottom_layers": printer.latest_project_print_bottom_layers,
            "job_z_up_height": printer.latest_project_print_z_up_height,
            "job_z_up_speed": printer.latest_project_print_z_up_speed,
            "job_z_down_speed": printer.latest_project_print_z_down_speed,
            "manual_mqtt_connection_enabled": self._mqtt_manually_connected,
            "mqtt_connection_active": self.anycubic_api.mqtt_is_connected,
            "features": features_enabled_summary(printer.features),
            "unknown_type_function_ids": unknown_type_function_ids_summary(
                printer.unknown_type_function_ids
            ),
        }

        attributes = {
            "ace_spools": {
                "spool_info": primary_ace_spool_info
            },
            "secondary_ace_spools": {
                "spool_info": secondary_ace_spool_info
            },
            "file_list_local": {
                "file_info": file_list_local,
            },
            "file_list_udisk": {
                "file_info": file_list_udisk,
            },
            "file_list_cloud": {
                "file_info": file_list_cloud,
            },
            "target_nozzle_temp": {
                "limit_min": printer.latest_project_temp_min_nozzle,
                "limit_max": printer.latest_project_temp_max_nozzle,
            },
            "target_hotbed_temp": {
                "limit_min": printer.latest_project_temp_min_hotbed,
                "limit_max": printer.latest_project_temp_max_hotbed,
            },
            "job_speed_mode": {
                "available_modes": printer.latest_project_available_print_speed_modes_data_object,
                "print_speed_mode_code": printer.latest_project_print_speed_mode,
            },
            "current_status": {
                "model": printer.model,
                "machine_type": printer.machine_type,
                "supported_functions": printer.supported_function_strings,
                "material_type": printer.material_type,
                "device_status_code": printer.device_status,
                "is_printing_code": printer.is_printing,
                "print_status_code": printer.latest_project_raw_print_status,
                "peripherals": printer.connected_peripherals,
                "total_material_used": printer.material_used,
                "total_print_time_hrs": printer.total_print_time_hrs,
                "total_print_time_dhm": printer.total_print_time_dhm_str,
                "job_download_progress": printer.latest_project_download_progress_percentage,
            },
            "dry_status_is_drying": {
                "dry_status_code": printer.primary_drying_status_raw_status_code,
            },
            "secondary_dry_status_is_drying": {
                "secondary_dry_status_code": printer.secondary_drying_status_raw_status_code,
            },
            "job_name": {
                "created_timestamp": printer.latest_project_created_timestamp,
                "finished_timestamp": printer.latest_project_finished_timestamp,
                "print_total_time": printer.latest_project_print_total_time,
                "print_total_time_minutes": printer.latest_project_print_total_time_minutes,
                "print_total_time_dhm": printer.latest_project_print_total_time_dhm_str,
                "print_supplies_usage": printer.latest_project_print_supplies_usage,
                "print_status_message": printer.latest_project_print_status_message,
            },
            "fw_version": {
                "latest_version": printer.fw_version.available_version if printer.fw_version else None,
                "in_progress": printer.fw_version.total_progress if printer.fw_version else None,
            },
            "multi_color_box_fw_version": {
                "latest_version": printer.primary_multi_color_box_fw_available_version,
                "in_progress": printer.primary_multi_color_box_fw_total_progress,
            },
            "secondary_multi_color_box_fw_version": {
                "latest_version": printer.secondary_multi_color_box_fw_available_version,
                "in_progress": printer.secondary_multi_color_box_fw_total_progress,
            },
            "mqtt_connection_active": {
                "supports_mqtt_login": self.anycubic_api.anycubic_auth.supports_mqtt_login,
            },
            "features": {
                "features": printer.features,
            },
            "unknown_type_function_ids": {
                "unknown_type_function_ids": printer.unknown_type_function_ids,
            },
        }

        for x in range(MAX_DRYING_PRESETS):
            preset_duration, preset_temperature = get_drying_preset_from_entry_options(
                self.entry.options,
                x + 1,
            )
            attributes[f"{ENTITY_ID_DRYING_START_PRESET_}{x + 1}"] = {
                "duration": preset_duration,
                "temperature": preset_temperature,
            }
            attributes[f"secondary_{ENTITY_ID_DRYING_START_PRESET_}{x + 1}"] = {
                "duration": preset_duration,
                "temperature": preset_temperature,
            }

        return {
            'states': states,
            'attributes': attributes,
        }

    def _build_coordinator_data(self) -> dict[str, Any]:
        data_dict: dict[str, Any] = dict()

        data_dict['user_info'] = {
            "id": self.anycubic_api.anycubic_auth.api_user_id
        }

        data_dict['printers'] = dict()

        for printer_id, printer in self._anycubic_printers.items():
            data_dict['printers'][printer_id] = self._build_printer_dict(printer)

        return data_dict

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch data from AnycubicCloud."""

        if (
            not self.last_update_success
            or not self._last_state_update
            or int(time.time()) > self._last_state_update + DEFAULT_SCAN_INTERVAL
        ):
            if not await self.get_anycubic_updates():
                raise UpdateFailed("Cloud updates are temporarily paused after repeated failures")

        data_dict = self._build_coordinator_data()

        await self._register_printer_devices(data_dict)

        return data_dict

    async def _async_force_data_refresh(self) -> None:
        if self._shutdown_requested:
            return
        self.data = self._build_coordinator_data()
        await self._register_printer_devices(self.data)
        self.async_update_listeners()

    @callback
    def add_entities_for_seen_printers[_AnycubicCloudEntityT: AnycubicCloudEntity](
        self,
        async_add_entities: AddEntitiesCallback,
        entity_constructor: type[_AnycubicCloudEntityT],
        platform: Platform,
        available_descriptors: list[AnycubicCloudEntityDescription],
    ) -> None:
        """Add Anycubic Cloud entities.

        Called from a platforms `async_setup_entry`.
        """

        global_entities_added: set[str] = set()
        for printer_id in self.entry.data[CONF_PRINTER_ID_LIST]:
            if printer_id not in self._unregistered_descriptors:
                self._unregistered_descriptors[printer_id] = dict()

            self._unregistered_descriptors[printer_id][platform] = available_descriptors.copy()

        @callback
        def _add_entities_for_unregistered_descriptors() -> None:
            new_entities: list[_AnycubicCloudEntityT] = []

            for printer_id in self.entry.data[CONF_PRINTER_ID_LIST]:
                if printer_id not in self._unregistered_descriptors:
                    continue
                if platform not in self._unregistered_descriptors[printer_id]:
                    continue

                status_attr: dict[str, Any] | None = printer_attributes_for_key(self, printer_id, 'current_status')
                if not status_attr:
                    raise ConfigEntryError(f"Printer {printer_id} status attributes not found.")
                material_type = status_attr['material_type']
                connected_ace_units = printer_state_connected_ace_units(self, printer_id)
                supports_ace = printer_state_supports_ace(self, printer_id)

                printer_obj = self.get_printer_for_id(printer_id)
                connected_ace_ids = ({box.box_id for box in printer_obj.multi_color_box or []}
                                     if printer_obj is not None else None)
                supports_video_light = bool(
                    printer_obj and printer_obj.supports_function_video_light
                )
                supports_box_light = bool(
                    printer_obj and printer_obj.supports_function_box_light
                )

                remaining_unregistered_descriptors = list()

                for description in self._unregistered_descriptors[printer_id][platform]:
                    if (
                        check_descriptor_status_not_lcd(
                            description,
                            material_type,
                        )
                        or
                        check_descriptor_status_not_fdm(
                            description,
                            material_type,
                        )
                        or
                        check_descriptor_state_ace_not_supported(
                            description,
                            supports_ace,
                        )
                        or
                        check_descriptor_state_light_not_supported(
                            description,
                            supports_video_light,
                        )
                        or
                        check_descriptor_state_box_light_not_supported(
                            description,
                            supports_box_light,
                        )
                    ):
                        remaining_unregistered_descriptors.append(description)
                        continue
                    elif (
                        check_descriptor_state_ace_primary_unavailable(
                            description,
                            supports_ace,
                            connected_ace_units,
                            connected_ace_ids,
                        )
                        or
                        check_descriptor_state_ace_secondary_unavailable(
                            description,
                            supports_ace,
                            connected_ace_units,
                            connected_ace_ids,
                        )
                        or
                        check_descriptor_state_drying_unavailable(
                            description,
                            supports_ace,
                            connected_ace_units,
                            self.entry.options,
                            connected_ace_ids,
                        )
                    ):
                        remaining_unregistered_descriptors.append(description)
                        continue
                    elif description.printer_entity_type is None:
                        raise ConfigEntryError(f"Descriptor {description.key} is missing printer_entity_type.")

                    if description.printer_entity_type == PrinterEntityType.GLOBAL:
                        if description.key in global_entities_added:
                            continue
                        global_entities_added.add(description.key)

                    new_entities.append(
                        entity_constructor(
                            self.hass,
                            self,
                            printer_id,
                            description
                        )
                    )

                if len(remaining_unregistered_descriptors) > 0:
                    self._unregistered_descriptors[printer_id][platform] = remaining_unregistered_descriptors
                else:
                    self._unregistered_descriptors[printer_id].pop(platform)

                if len(self._unregistered_descriptors[printer_id]) == 0:
                    self._unregistered_descriptors.pop(printer_id)

            async_add_entities(new_entities)

        _add_entities_for_unregistered_descriptors()
        self.entry.async_on_unload(
            self.async_add_listener(_add_entities_for_unregistered_descriptors)
        )

    async def _async_print_job_started(self) -> None:
        LOGGER.debug(
            f"Print job started, forcing state update in {PRINT_JOB_STARTED_UPDATE_DELAY} seconds."
        )
        await asyncio.sleep(PRINT_JOB_STARTED_UPDATE_DELAY)
        if not self._shutdown_requested:
            await self.force_state_update()

    async def _async_mqtt_callback_subscribed(self) -> None:
        await asyncio.sleep(10)
        if self._shutdown_requested:
            return
        for printer_id, printer in self._anycubic_printers.items():
            try:
                if printer.printer_online:
                    await printer.query_printer_options()
            except Exception as error:
                tb = traceback.format_exc()
                LOGGER.warning(f"Anycubic MQTT on subscribe error: {error}\n{tb}")

    async def async_shutdown(self) -> None:
        await super().async_shutdown()
        current = asyncio.current_task()
        tasks = [task for task in self._callback_tasks if task is not current and not task.done()]
        for task in tasks:
            task.cancel()
        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)

    def _create_callback_task(self, coroutine: Coroutine[Any, Any, None], name: str) -> None:
        if self._shutdown_requested:
            coroutine.close()
            return
        task = self.entry.async_create_background_task(self.hass, coroutine, name)
        if not task.done():
            self._callback_tasks.add(task)
            task.add_done_callback(self._callback_tasks.discard)

    def _schedule_mqtt_callback(
        self, callback_method: Callable[[], Coroutine[Any, Any, None]], name: str,
    ) -> None:
        def schedule() -> None:
            if not self._shutdown_requested:
                self._create_callback_task(callback_method(), name)
        self.hass.loop.call_soon_threadsafe(schedule)

    @callback
    def _mqtt_callback_data_updated(self) -> None:
        self._schedule_mqtt_callback(
            self._async_force_data_refresh,
            f"Anycubic coordinator {self.entry.entry_id} data refresh",
        )

    @callback
    def _mqtt_callback_print_job_started(
        self,
    ) -> None:
        self._schedule_mqtt_callback(
            self._async_print_job_started,
            f"Anycubic coordinator {self.entry.entry_id} print job started",
        )

    @callback
    def _mqtt_callback_subscribed(
        self,
    ) -> None:
        self._schedule_mqtt_callback(
            self._async_mqtt_callback_subscribed,
            f"Anycubic coordinator {self.entry.entry_id} MQTT subscribed",
        )

    def _anycubic_mqtt_connection_should_start(self) -> bool:

        if (
            self._mqtt_connection_mode == AnycubicMQTTConnectMode.Never_Connect
            or not self.anycubic_api.anycubic_auth.supports_mqtt_login
        ):
            return False

        return (
            not self.anycubic_api.mqtt_is_started and
            not self.hass.is_stopping and
            self.hass.state is CoreState.running and
            (
                self._check_mqtt_connection_modes_active() or
                self._mqtt_manually_connected
            )
        )

    def _anycubic_mqtt_connection_should_stop(self) -> bool:

        return (
            self.anycubic_api.mqtt_is_started and
            (
                self.hass.is_stopping or
                (
                    self._anycubic_mqtt_connection_is_idle() and
                    not self._mqtt_manually_connected
                )
            )
        )

    def _anycubic_mqtt_connection_is_idle(self) -> bool:
        if self._check_mqtt_connection_modes_inactive():
            if self._mqtt_idle_since is None:
                self._mqtt_idle_since = int(time.time())

            if int(time.time()) > self._mqtt_idle_since + MQTT_IDLE_DISCONNECT_SECONDS:
                self._mqtt_idle_since = None
                return True

        else:
            self._mqtt_idle_since = None

        return False

    async def _check_anycubic_mqtt_connection(self, refreshing: bool = False) -> None:
        if not refreshing and self._mqtt_refresh_lock.locked():
            return

        async with self._mqtt_connect_check_lock:
            if self._anycubic_mqtt_connection_should_start():

                for printer_id, printer in self._anycubic_printers.items():
                    self.anycubic_api.mqtt_add_subscribed_printer(
                        printer
                    )

                if self._mqtt_task is None or self._mqtt_task.done():
                    if self._mqtt_task is not None:
                        try:
                            self._mqtt_task.result()
                        except Exception:
                            LOGGER.exception("Previous Anycubic MQTT connection failed")
                    self.anycubic_api.prepare_mqtt_connection()
                    LOGGER.debug("Starting Anycubic MQTT Task.")
                    self._mqtt_task = self.hass.async_add_executor_job(
                        self.anycubic_api.connect_mqtt
                    )

            elif self._anycubic_mqtt_connection_should_stop():
                await self._stop_anycubic_mqtt_connection()

    async def _stop_anycubic_mqtt_connection(self) -> None:
        for printer_id, printer in self._anycubic_printers.items():
            await self.hass.async_add_executor_job(
                self.anycubic_api.mqtt_unsubscribe_printer_status,
                printer,
            )
        await self.hass.async_add_executor_job(
            self.anycubic_api.disconnect_mqtt,
        )

        await self.anycubic_api.mqtt_wait_for_disconnect()

        task = self._mqtt_task
        if task is not None:
            try:
                async with asyncio.timeout(10):
                    await asyncio.shield(task)
            except TimeoutError:
                LOGGER.warning("Anycubic MQTT worker is still stopping; postponing restart")
                return
            except Exception:
                LOGGER.exception("Anycubic MQTT worker failed while stopping")

        self._mqtt_task = None

    async def stop_anycubic_mqtt_connection_if_started(self) -> None:
        if self._anycubic_api and self._anycubic_api.mqtt_is_started:
            await self._stop_anycubic_mqtt_connection()

    async def refresh_anycubic_mqtt_connection(self) -> None:
        if self._mqtt_last_refresh and int(time.time()) < self._mqtt_last_refresh + MQTT_REFRESH_INTERVAL:
            return

        if self._mqtt_connect_check_lock.locked():
            return

        if self._anycubic_api and self._anycubic_api.mqtt_is_started:
            async with self._mqtt_refresh_lock:
                self._mqtt_last_refresh = int(time.time())
                await self._stop_anycubic_mqtt_connection()
                await asyncio.sleep(2)
                await self._check_anycubic_mqtt_connection(True)

    async def _async_check_local_file_list_changed(
        self,
        prev_file_list: list[dict[str, str | float]] | None,
        printer: AnycubicPrinter,
    ) -> None:
        if self._mqtt_file_list_check_lock.locked():
            return

        async with self._mqtt_file_list_check_lock:
            if not printer.printer_online:
                return

            await asyncio.sleep(5)
            if self._shutdown_requested:
                return
            new_file_list = printer.local_file_list_object
            if prev_file_list is None and new_file_list is None:
                LOGGER.debug("Anycubic MQTT response for local file list appears to be empty, refreshing MQTT and retrying.")
                await self.refresh_anycubic_mqtt_connection()
                await self.anycubic_api.mqtt_wait_for_connect()
                await asyncio.sleep(2)
                await printer.request_local_file_list()

    async def _setup_anycubic_api_connection(self) -> None:
        LOGGER.debug("Coordinator setting up Anycubic Cloud API connection.")
        store = Store[dict[str, Any]](self.hass, STORAGE_VERSION, f"{STORAGE_KEY}.{self.entry.entry_id}")

        if self.entry.data.get(CONF_USER_TOKEN) is None:
            raise ConfigEntryAuthFailed("Authentication Token not found.")

        try:
            cookie_jar = CookieJar(unsafe=True)
            websession = async_create_clientsession(
                self.hass,
                cookie_jar=cookie_jar,
            )
            self._anycubic_api = AnycubicAPI(
                session=websession,
                cookie_jar=cookie_jar,
                debug_logger=LOGGER,
                mqtt_verify_tls=self.entry.options.get(CONF_MQTT_VERIFY_TLS, True),
                mqtt_callback_printer_update=self._mqtt_callback_data_updated,
                mqtt_callback_printer_busy=self._mqtt_callback_print_job_started,
                mqtt_callback_subscribed=self._mqtt_callback_subscribed,
            )
            self._anycubic_api.set_authentication(
                auth_token=self.entry.data[CONF_USER_TOKEN],
                auth_mode=self.entry.data.get(CONF_USER_AUTH_MODE),
                device_id=self.entry.data.get(CONF_USER_DEVICE_ID),
            )

            cached = await store.async_load()
            if (cached and cached.get("source_token") == self.entry.data[CONF_USER_TOKEN]
                    and cached.get("source_auth_mode") == self.entry.data.get(CONF_USER_AUTH_MODE)
                    and cached.get("source_device_id") == self.entry.data.get(CONF_USER_DEVICE_ID)):
                self._anycubic_api.load_auth_config_from_dict(cached["auth"])

            debug_all: bool = bool(self.entry.options.get(CONF_DEBUG_DEPRECATED))
            debug_mqtt_msg: bool = bool(
                self.entry.options.get(CONF_DEBUG_MQTT_MSG, debug_all)
            )
            debug_api_calls: bool = bool(
                self.entry.options.get(CONF_DEBUG_API_CALLS, debug_all)
            )

            self._anycubic_api.set_mqtt_log_all_messages(debug_mqtt_msg)
            self._anycubic_api.set_log_api_call_info(debug_api_calls)

            success = await self._anycubic_api.check_api_tokens()
            if not success:
                raise ConfigEntryAuthFailed("Authentication failed. Check credentials.")

            await self._save_auth_data(store)

            first_printer_id = self.entry.data[CONF_PRINTER_ID_LIST][0]

            printer_status = await self._anycubic_api.printer_info_for_id(first_printer_id)

            if printer_status is None:
                raise ConfigEntryAuthFailed("Printer not found. Check config.")

        except ConfigEntryAuthFailed:
            raise

        except AnycubicAPIParsingError:
            raise

        except Exception as error:
            raise ConfigEntryError(
                f"Coordinator setup failed with an unexpected error (not an authentication problem): {error}"
            ) from error

    async def _setup_anycubic_printer_objects(self) -> None:
        for printer_id in self.entry.data[CONF_PRINTER_ID_LIST]:
            try:
                printer = await self.anycubic_api.printer_info_for_id(printer_id)
                if not printer:
                    raise ConfigEntryError(f"Failed to load printer object for {printer_id}")
                self._anycubic_printers[int(printer_id)] = printer
            except ConfigEntryError:
                raise
            except Exception as error:
                raise ConfigEntryError(error) from error

    async def _register_printer_devices(
        self,
        data_dict: dict[str, Any],
    ) -> None:
        self._printer_device_map = dict()
        dev_reg = async_get_device_registry(self.hass)

        # 1. Zentrales Cloud-Bridge "Bindungsglied" registrieren
        user_id = data_dict.get('user_info', {}).get('id', 'unknown_user')
        bridge_identifiers = {(DOMAIN, f"cloud_bridge_{user_id}")}
        bridge_device = dev_reg.async_get_or_create(
            config_entry_id=self.entry.entry_id,
            identifiers=bridge_identifiers,
            name="Anycubic Cloud Anbindung",
            manufacturer="Anycubic",
            model="Cloud API Bridge",
            entry_type=DeviceEntryType.SERVICE
        )

        for printer_id in self.entry.data[CONF_PRINTER_ID_LIST]:
            # Sicherstellen, dass die ID als Integer/String kompatibel geladen wird
            printer_data = data_dict['printers'].get(int(printer_id)) or data_dict['printers'].get(str(printer_id), {})
            states = printer_data.get('states', {})

            # 2. Drucker-Gerät holen, indem wir die originalen Helpers nutzen
            printer_device_info: DeviceInfo = build_printer_device_info(
                data_dict,
                printer_id,
            )
            printer_name = states.get("name", f"Anycubic Drucker {printer_id}")

            printer_device_info["via_device_id"] = bridge_device.id
            printer_device = dev_reg.async_get_or_create(
                config_entry_id=self.entry.entry_id,
                **printer_device_info,
            )
            self._printer_device_map[printer_device.id] = int(printer_id)

            if states.get("supports_function_multi_color_box"):
                box_ids = states.get("connected_ace_ids")
                if box_ids is None:
                    box_ids = range(int(states.get("connected_ace_units") or 0))
                for box_id in box_ids:
                    if box_id not in (0, 1):
                        continue
                    suffix = "primary" if box_id == 0 else "secondary"
                    firmware_key = "multi_color_box_fw_version" if box_id == 0 else "secondary_multi_color_box_fw_version"
                    ace_device = dev_reg.async_get_or_create(
                        config_entry_id=self.entry.entry_id,
                        identifiers={(DOMAIN, f"ace_{suffix}_{int(printer_id)}")},
                        name=f"{printer_name} ACE Pro {box_id + 1}",
                        manufacturer="Anycubic",
                        model="ACE Pro Multi-Color Box",
                        sw_version=states.get(firmware_key),
                        via_device_id=printer_device.id,
                    )
                    self._printer_device_map[ace_device.id] = int(printer_id)

    def _auth_storage_data(self) -> dict[str, Any]:
        return {
            "source_token": self.entry.data[CONF_USER_TOKEN],
            "source_auth_mode": self.entry.data.get(CONF_USER_AUTH_MODE),
            "source_device_id": self.entry.data.get(CONF_USER_DEVICE_ID),
            "auth": self.anycubic_api.get_auth_config_dict(),
        }

    async def _save_auth_data(self, store: Store[dict[str, Any]]) -> None:
        lock = getattr(self, "_auth_save_lock", None)
        if lock is None:
            lock = self._auth_save_lock = asyncio.Lock()
        async with lock:
            data = self._auth_storage_data()
            await store.async_save(data)
            self.anycubic_api.mark_auth_config_saved(data["auth"])

    async def _check_or_save_tokens(self) -> None:
        success = await self.anycubic_api.check_api_tokens()

        if not success:
            raise ConfigEntryAuthFailed("Authentication failed. Check credentials.")

        if self.anycubic_api.tokens_changed:
            store = Store[dict[str, Any]](self.hass, STORAGE_VERSION, f"{STORAGE_KEY}.{self.entry.entry_id}")
            await self._save_auth_data(store)

    async def _connect_mqtt_for_action_response(self) -> None:
        self._mqtt_last_action = int(time.time())
        await self._check_anycubic_mqtt_connection()
        if not await self.anycubic_api.mqtt_wait_for_connect():
            raise HomeAssistantError(
                "Anycubic MQTT Timed out waiting for connection, try manually enabling MQTT."
            )

    async def _async_setup(self) -> None:
        setup_retries = 0
        while setup_retries < API_SETUP_RETRIES + 1:
            try:
                await self._setup_anycubic_api_connection()
                await self._setup_anycubic_printer_objects()
                return
            except AnycubicAPIParsingError as error:
                if setup_retries >= API_SETUP_RETRIES:
                    raise ConfigEntryError(error) from error
                setup_retries += 1
                LOGGER.warning(
                    f"Error during Anycubic Cloud setup, retrying in {API_SETUP_RETRY_INTERVAL_SECONDS} seconds."
                )
                await asyncio.sleep(API_SETUP_RETRY_INTERVAL_SECONDS)

    async def _sleep_before_update_retry(
        self,
        attempt: int,
        max_attempts: int,
    ) -> None:
        """Wartet vor dem nächsten Retry-Versuch innerhalb eines
        Update-Zyklus, mit exponentiell steigendem Backoff
        (UPDATE_RETRY_BACKOFF_BASE_SECONDS, dann verdoppelt je Versuch:
        z.B. 1s, 2s, 4s, ...). `attempt` ist der Versuch, der gerade
        fehlgeschlagen ist (1-basiert)."""
        backoff_seconds = UPDATE_RETRY_BACKOFF_BASE_SECONDS * (2 ** (attempt - 1))
        LOGGER.warning(
            f"Anycubic update attempt {attempt} of {max_attempts} failed, "
            f"retrying in {backoff_seconds} seconds."
        )
        await asyncio.sleep(backoff_seconds)

    def _degraded_connection_issue_id(self) -> str:
        """Eindeutige Issue-ID für den HA-Repair-Hinweis dieser Config
        Entry (mehrere Anycubic-Cloud-Accounts sollen unabhängige Hinweise
        bekommen)."""
        return f"degraded_cloud_connection_{self.entry.entry_id}"

    def _create_degraded_connection_issue(self) -> None:
        """Erzeugt (oder aktualisiert, falls bereits vorhanden) den
        HA-Repair-Hinweis. Wird aufgerufen, sobald DEGRADED_CONNECTION_ISSUE_THRESHOLD
        aufeinanderfolgende Cooldown-Perioden erreicht wurden. `is_fixable=False`,
        da es sich um einen reinen Informationshinweis handelt (kein automatischer
        Fix-Flow) - der Nutzer kann ihn in HA als "erledigt"/ignoriert markieren."""
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            self._degraded_connection_issue_id(),
            is_fixable=False,
            severity=ir.IssueSeverity.WARNING,
            translation_key="degraded_cloud_connection",
            translation_placeholders={"name": self.entry.title},
        )

    def _delete_degraded_connection_issue(self) -> None:
        """Entfernt den HA-Repair-Hinweis wieder, sobald ein Update-Zyklus
        erfolgreich war. `async_delete_issue` ist ein No-Op, falls der
        Hinweis (noch) gar nicht existiert - kein zusätzlicher Existenz-Check
        nötig."""
        ir.async_delete_issue(
            self.hass,
            DOMAIN,
            self._degraded_connection_issue_id(),
        )

    async def get_anycubic_updates(self) -> bool:
        """Fetch data from AnycubicCloud.

        Ein einzelner Update-Zyklus wird bei transienten Fehlern
        (Parsing-/API-Fehler oder unerwartete Exceptions) intern mit
        exponentiellem Backoff wiederholt, bevor er endgültig als
        fehlgeschlagen gilt und `_failed_updates` (siehe MAX_FAILED_UPDATES
        oben) hochgezählt wird. Die Anzahl der Retries ist über den
        Options-Flow konfigurierbar (CONF_UPDATE_RETRY_COUNT); 0 Retries
        entspricht dem bisherigen Verhalten (ein Versuch, sofort UpdateFailed
        bei Fehler). ConfigEntryAuthFailed wird NIE retried, da Auth-Fehler
        nicht transient sind.

        Erreicht `_failed_updates` MAX_FAILED_UPDATES, wird eine
        "Cooldown-Periode" gestartet (Updates pausieren für
        FAILED_UPDATE_DELAY Sekunden). Wiederholt sich das über
        DEGRADED_CONNECTION_ISSUE_THRESHOLD aufeinanderfolgende
        Cooldown-Perioden hinweg (d.h. auch nach der Pause klappt es
        weiterhin nicht), wird ein HA-Repair-Hinweis erzeugt. Der Hinweis
        verschwindet automatisch, sobald ein Zyklus wieder erfolgreich
        durchläuft."""

        if self._failed_updates >= MAX_FAILED_UPDATES:
            self._update_cooldown_until = int(time.time()) + FAILED_UPDATE_DELAY
            self._failed_updates = 0
            self._consecutive_cooldown_periods += 1
            if self._consecutive_cooldown_periods >= DEGRADED_CONNECTION_ISSUE_THRESHOLD:
                self._create_degraded_connection_issue()
            return False

        if int(time.time()) < self._update_cooldown_until:
            return False

        max_attempts = get_update_retry_count_from_entry_options(self.entry.options) + 1
        attempt = 1

        while True:
            try:
                await self._check_or_save_tokens()

                for printer_id, printer in self._anycubic_printers.items():
                    await printer.update_info_from_api(True)

                await self._check_anycubic_mqtt_connection()
                self._failed_updates = 0

            except ConfigEntryAuthFailed:
                raise

            except AnycubicAPIParsingError as error:
                if attempt < max_attempts:
                    await self._sleep_before_update_retry(attempt, max_attempts)
                    attempt += 1
                    continue
                self._failed_updates += 1
                raise UpdateFailed(error) from error

            except AnycubicAPIError as error:
                if attempt < max_attempts:
                    await self._sleep_before_update_retry(attempt, max_attempts)
                    attempt += 1
                    continue
                self._failed_updates += 1
                raise UpdateFailed(error) from error

            except Exception as error:
                tb = traceback.format_exc()
                LOGGER.warning(f"Anycubic update error: {error}\n{tb}")
                if attempt < max_attempts:
                    await self._sleep_before_update_retry(attempt, max_attempts)
                    attempt += 1
                    continue
                self._failed_updates += 1
                raise UpdateFailed(error) from error

            break

        if self._consecutive_cooldown_periods:
            self._consecutive_cooldown_periods = 0
            self._delete_degraded_connection_issue()

        self._last_state_update = int(time.time())

        return True

    def get_printer_for_id(
        self,
        printer_id: int | None,
    ) -> AnycubicPrinter | None:
        if printer_id is None or len(str(printer_id)) == 0:
            return None

        return self._anycubic_printers.get(int(printer_id))

    def get_printer_for_device_id(
        self,
        device_id: str | None,
    ) -> AnycubicPrinter | None:
        if self._printer_device_map is None:
            return None

        if device_id is None or len(str(device_id)) == 0:
            return None

        printer_id = self._printer_device_map.get(device_id)

        if not printer_id:
            return None

        return self._anycubic_printers.get(int(printer_id))

    async def refresh_cloud_files(self) -> None:
        self._cloud_file_list = await self.anycubic_api.get_user_cloud_files_data_object()

    async def force_state_update(self) -> None:
        self._last_state_update = None
        await self.async_refresh()
        if self.last_update_success:
            self._last_state_update = int(time.time()) - DEFAULT_SCAN_INTERVAL + 10

    async def set_number_value(
        self,
        printer_id: int,
        key: str,
        value: int,
    ) -> None:
        """Handle values from number entities that fallback to the coordinator."""
        printer = self.get_printer_for_id(printer_id)
        if not printer:
            return

        try:
            await self._connect_mqtt_for_action_response()
            if key == "target_hotbed_temp":
                await printer.change_print_setting_target_hotbed_temp(value)
            elif key == "target_nozzle_temp":
                await printer.change_print_setting_target_nozzle_temp(value)
            elif key == "fan_speed_pct":
                await printer.change_print_setting_fan_speed_pct(value)
            elif key == "dry_status_target_temperature":
                duration = printer.primary_drying_status_total_duration or 6
                await printer.multi_color_box_drying_start(duration=duration, target_temp=value, box_id=0)
            elif key == "secondary_dry_status_target_temperature":
                duration = printer.secondary_drying_status_total_duration or 6
                await printer.multi_color_box_drying_start(duration=duration, target_temp=value, box_id=1)
        except AnycubicAPIError as ex:
            raise HomeAssistantError(ex) from ex

    async def set_select_option(self, printer_id: int, key: str, value: int) -> None:
        printer = self.get_printer_for_id(printer_id)
        if printer is None or key != "print_speed_mode":
            raise HomeAssistantError("Printer or select control not found")
        try:
            await self._connect_mqtt_for_action_response()
            await printer.change_print_setting_speed_mode(value)
        except AnycubicAPIError as error:
            raise HomeAssistantError(error) from error

    async def button_press_custom_dry(
        self,
        printer_id: int,
        temperature: int,
        duration: int,
        is_secondary: bool = False,
    ) -> None:
        """Start drying with custom parameters."""
        printer = self.get_printer_for_id(printer_id)
        if not printer:
            return

        try:
            box_id = 1 if is_secondary else 0
            await self._connect_mqtt_for_action_response()
            await printer.multi_color_box_drying_start(
                duration=duration,
                target_temp=temperature,
                box_id=box_id,
            )
            await self.force_state_update()
        except AnycubicAPIError as ex:
            raise HomeAssistantError(ex) from ex

    async def button_press_event(
        self,
        printer_id: int,
        event_key: str,
    ) -> None:
        printer = self.get_printer_for_id(printer_id)

        try:

            if printer and (
                event_key.startswith(ENTITY_ID_DRYING_START_PRESET_) or
                event_key.startswith(f"secondary_{ENTITY_ID_DRYING_START_PRESET_}")
            ):
                preset_duration, preset_temperature = get_drying_preset_from_entry_options(
                    self.entry.options,
                    event_key[-1],
                )
                if preset_duration is None or preset_temperature is None:
                    return

                if event_key.startswith(f"secondary_{ENTITY_ID_DRYING_START_PRESET_}"):
                    box_id = 1
                else:
                    box_id = 0

                await self._connect_mqtt_for_action_response()
                await printer.multi_color_box_drying_start(
                    duration=preset_duration,
                    target_temp=preset_temperature,
                    box_id=box_id,
                )

            elif printer and event_key in ('refresh_mqtt_connection', 'manual_mqtt_connection_refresh'):
                await self.refresh_anycubic_mqtt_connection()

            elif printer and event_key == 'request_file_list_cloud':
                await self.refresh_cloud_files()

            elif printer and event_key == 'request_file_list_local':
                prev_file_list = printer.local_file_list_object
                await self._connect_mqtt_for_action_response()
                await printer.request_local_file_list()
                self._create_callback_task(
                    self._async_check_local_file_list_changed(prev_file_list, printer),
                    f"Anycubic coordinator {self.entry.entry_id} {printer.id} local file list check",
                )

            elif printer and event_key == 'request_file_list_udisk':
                await self._connect_mqtt_for_action_response()
                await printer.request_udisk_file_list()

            elif printer and event_key == 'dry_stop':
                await self._connect_mqtt_for_action_response()
                await printer.multi_color_box_drying_stop(box_id=0)

            elif printer and event_key == 'secondary_dry_stop':
                await self._connect_mqtt_for_action_response()
                await printer.multi_color_box_drying_stop(box_id=1)

            elif printer and event_key in ('pause_print', 'print_pause'):
                await self._connect_mqtt_for_action_response()
                await printer.pause_print()

            elif printer and event_key in ('resume_print', 'print_resume'):
                await self._connect_mqtt_for_action_response()
                await printer.resume_print()

            elif printer and event_key in ('cancel_print', 'print_stop'):
                await self._connect_mqtt_for_action_response()
                await printer.cancel_print()

            else:
                return

            await self.force_state_update()

        except AnycubicAPIError as ex:
            raise HomeAssistantError(ex) from ex

    async def fw_update_event(
        self,
        printer_id: int,
        event_key: str,
    ) -> None:
        printer = self.get_printer_for_id(printer_id)

        try:

            if printer and event_key == 'fw_version':
                await self._connect_mqtt_for_action_response()
                accepted_version = await printer.update_printer_firmware()

            elif printer and event_key == 'multi_color_box_fw_version':
                await self._connect_mqtt_for_action_response()
                accepted_version = await printer.update_printer_multi_color_box_firmware()

            elif printer and event_key == 'secondary_multi_color_box_fw_version':
                await self._connect_mqtt_for_action_response()
                accepted_version = await printer.update_printer_multi_color_box_firmware(box_id=1)

            else:
                return

            if accepted_version is None:
                raise HomeAssistantError("Anycubic did not confirm the firmware installation")
            await self.force_state_update()

        except AnycubicAPIError as ex:
            raise HomeAssistantError(ex) from ex

    async def switch_on_event(
        self,
        printer_id: int,
        event_key: str,
    ) -> None:
        printer = self.get_printer_for_id(printer_id)

        if event_key == 'manual_mqtt_connection_enabled':
            self._mqtt_manually_connected = True

        elif printer and event_key == 'multi_color_box_runout_refill':
            await self._connect_mqtt_for_action_response()
            await printer.multi_color_box_switch_on_auto_feed()

        elif printer and event_key == 'secondary_multi_color_box_runout_refill':
            await self._connect_mqtt_for_action_response()
            await printer.multi_color_box_switch_on_auto_feed(box_id=1)

        else:
            return

        await self.force_state_update()

    async def switch_off_event(
        self,
        printer_id: int,
        event_key: str,
    ) -> None:
        printer = self.get_printer_for_id(printer_id)

        if event_key == 'manual_mqtt_connection_enabled':
            self._mqtt_manually_connected = False

        elif printer and event_key == 'multi_color_box_runout_refill':
            await self._connect_mqtt_for_action_response()
            await printer.multi_color_box_switch_off_auto_feed()

        elif printer and event_key == 'secondary_multi_color_box_runout_refill':
            await self._connect_mqtt_for_action_response()
            await printer.multi_color_box_switch_off_auto_feed(box_id=1)

        else:
            return

        await self.force_state_update()

    async def set_light_status(
        self,
        printer_id: int,
        light_on: bool,
        light_type: int = 1,
    ) -> None:
        """Turn one of the printer's lights on or off.

        EXPERIMENTAL - see AnycubicPrinter.set_light_status() for the
        caveats (requires an active/latest project). The confirmation is
        parsed from the printer's MQTT light/report message (see
        AnycubicPrinter._process_mqtt_update_light), so the light entity
        reflects a real, confirmed on/off state per light_type rather than
        an assumed/optimistic one.

        light_type=1 is the confirmed head/extruder ("video") light.
        light_type=2 is an unconfirmed, best-guess value for the room/box
        light - see light.py's box light entity docstring.
        """
        printer = self.get_printer_for_id(printer_id)
        if not printer:
            return

        try:
            await self._connect_mqtt_for_action_response()
            await printer.set_light_status(light_on=light_on, light_type=light_type)
        except AnycubicAPIError as ex:
            raise HomeAssistantError(ex) from ex
