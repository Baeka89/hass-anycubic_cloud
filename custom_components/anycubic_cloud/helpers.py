from __future__ import annotations

import re
from enum import IntEnum
from types import MappingProxyType
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.device_registry import CONNECTION_NETWORK_MAC, DeviceInfo

from .anycubic_cloud_api.const.enums import AnycubicPrinterMaterialType
from .const import (
    CONF_DRYING_PRESET_DURATION_,
    CONF_DRYING_PRESET_TEMPERATURE_,
    DOMAIN,
    MANUFACTURER,
    PrinterEntityType,
)

if TYPE_CHECKING:
    from .coordinator import AnycubicCloudDataUpdateCoordinator
    from .entity import AnycubicCloudEntityDescription


class AnycubicMQTTConnectMode(IntEnum):
    Printing_Only = 1
    Printing_Drying = 2
    Device_Online = 3
    Always = 4
    Never_Connect = 5


def build_printer_device_info(
    coordinator_data: dict[str, Any],
    printer_id: int | str,
) -> DeviceInfo:
    printers = coordinator_data.get('printers', {})
    # Sucht flexibel nach Integer ODER String-Schlüssel
    printer = printers.get(int(printer_id)) or printers.get(str(printer_id))
    
    if not printer:
        raise KeyError(f"Printer ID {printer_id} not found in coordinator data. Available: {list(printers.keys())}")

    printer_data = printer['states']
    user_data = coordinator_data['user_info']
    return DeviceInfo(
        identifiers={(DOMAIN, f"{user_data['id']}-{printer_data['id']}")},
        manufacturer=MANUFACTURER,
        model=printer_data["machine_name"],
        name=printer_data["name"],
        connections={(CONNECTION_NETWORK_MAC, printer_data["machine_mac"])},
        sw_version=printer_data["fw_version"],
        hw_version=f"Printer ID: {printer_id}",
        serial_number=f"{printer_id}",
    )


def get_drying_preset_from_entry_options(
    entry_options: MappingProxyType[str, Any],
    preset_number: int | str,
) -> tuple[int | None, int | None]:
    preset_duration = entry_options.get(f"{CONF_DRYING_PRESET_DURATION_}{preset_number}")
    preset_temperature = entry_options.get(f"{CONF_DRYING_PRESET_TEMPERATURE_}{preset_number}")

    return (
        preset_duration,
        preset_temperature,
    )


def printer_state_for_key(
    coordinator: AnycubicCloudDataUpdateCoordinator,
    printer_id: int | str,
    state_key: str,
) -> Any:
    printers = coordinator.data.get('printers', {})
    printer = printers.get(int(printer_id)) or printers.get(str(printer_id), {})
    return printer.get('states', {}).get(state_key)


def printer_attributes_for_key(
    coordinator: AnycubicCloudDataUpdateCoordinator,
    printer_id: int | str,
    attribute_key: str,
) -> dict[str, Any] | None:
    printers = coordinator.data.get('printers', {})
    printer = printers.get(int(printer_id)) or printers.get(str(printer_id))
    
    if not printer or 'attributes' not in printer:
        return None
        
    return printer['attributes'].get(attribute_key)


def printer_state_connected_ace_units(
    coordinator: AnycubicCloudDataUpdateCoordinator,
    printer_id: int | str,
) -> int:
    val = printer_state_for_key(coordinator, printer_id, 'connected_ace_units')
    return int(val) if val is not None else 0


def printer_state_supports_ace(
    coordinator: AnycubicCloudDataUpdateCoordinator,
    printer_id: int | str,
) -> bool:
    val = printer_state_for_key(coordinator, printer_id, 'supports_function_multi_color_box')
    return bool(val) if val is not None else False


def check_descriptor_status_not_lcd(
    description: AnycubicCloudEntityDescription,
    material_type: AnycubicPrinterMaterialType,
) -> bool:
    return (
        description.printer_entity_type == PrinterEntityType.LCD
        and material_type != AnycubicPrinterMaterialType.RESIN
    )


def check_descriptor_status_not_fdm(
    description: AnycubicCloudEntityDescription,
    material_type: AnycubicPrinterMaterialType,
) -> bool:
    return (
        description.printer_entity_type == PrinterEntityType.FDM
        and material_type != AnycubicPrinterMaterialType.FILAMENT
    )


def check_descriptor_state_ace_not_supported(
    description: AnycubicCloudEntityDescription,
    supports_ace: bool,
) -> bool:
    return (
        description.printer_entity_type in [
            PrinterEntityType.ACE_PRIMARY,
            PrinterEntityType.ACE_SECONDARY,
            PrinterEntityType.DRY_PRESET_PRIMARY,
            PrinterEntityType.DRY_PRESET_SECONDARY,
        ]
        and not supports_ace
    )


def check_descriptor_state_light_not_supported(
    description: AnycubicCloudEntityDescription,
    supports_light: bool,
) -> bool:
    """Gate the (experimental) light entity behind the VIDEO_LIGHT/BOX_LIGHT
    capability flags the printer reports. See printer.set_light_status()
    for the caveats around this feature."""
    return (
        description.printer_entity_type == PrinterEntityType.LIGHT
        and not supports_light
    )


def check_descriptor_state_ace_primary_unavailable(
    description: AnycubicCloudEntityDescription,
    supports_ace: bool,
    connected_ace_units: int,
) -> bool:
    return (
        description.printer_entity_type in [
            PrinterEntityType.ACE_PRIMARY,
            PrinterEntityType.DRY_PRESET_PRIMARY,
        ]
        and supports_ace
        and connected_ace_units < 1
    )


def check_descriptor_state_ace_secondary_unavailable(
    description: AnycubicCloudEntityDescription,
    supports_ace: bool,
    connected_ace_units: int,
) -> bool:
    return (
        description.printer_entity_type in [
            PrinterEntityType.ACE_SECONDARY,
            PrinterEntityType.DRY_PRESET_SECONDARY,
        ]
        and supports_ace
        and connected_ace_units < 2
    )


def check_descriptor_state_drying_available(
    description: AnycubicCloudEntityDescription,
    supports_ace: bool,
    connected_ace_units: int,
) -> bool:
    # Wichtig: `and` bindet in Python stärker als `or`. Ohne die äußere Klammer
    # würde `supports_ace` nur den ersten (primären) Zweig gaten und der
    # sekundäre Zweig wäre unabhängig von `supports_ace` auswertbar.
    return supports_ace and (
        (
            description.printer_entity_type == PrinterEntityType.DRY_PRESET_PRIMARY
            and connected_ace_units >= 1
        )
        or (
            description.printer_entity_type == PrinterEntityType.DRY_PRESET_SECONDARY
            and connected_ace_units >= 2
        )
    )


def check_descriptor_state_drying_unavailable(
    description: AnycubicCloudEntityDescription,
    supports_ace: bool,
    connected_ace_units: int,
    entry_options: MappingProxyType[str, Any],
) -> bool:
    drying_available = check_descriptor_state_drying_available(
        description,
        supports_ace,
        connected_ace_units,
    )

    if not drying_available:
        return False

    preset_duration, preset_temperature = get_drying_preset_from_entry_options(
        entry_options,
        description.key[-1],
    )

    return (
        not preset_duration
        or not preset_temperature
        or int(preset_temperature) <= 0
        or int(preset_duration) <= 0
    )


def printer_entity_unique_id(
    coordinator: AnycubicCloudDataUpdateCoordinator,
    printer_id: int | str,
    entity_suffix: str,
) -> str:
    mac = printer_state_for_key(coordinator, printer_id, 'machine_mac')
    return f"{mac}-{entity_suffix}" if mac else f"{printer_id}-{entity_suffix}"


def state_string_active(state: Any) -> str:
    return "active" if state is not None else "inactive"


def state_string_loaded(state: Any) -> str:
    return "loaded" if state is not None else "not loaded"


REGEX_NOQUOTE_STRING = re.compile(r"^['\"]?([^'\"]+)['\"]?$")


def remove_quotes_from_string(input_string: str) -> str:
    matches = REGEX_NOQUOTE_STRING.findall(input_string)
    if len(matches) == 1:
        return str(matches[0])
    raise TypeError("Unexpected quotes in string.")


def validate_value_is_type[_T: Any](
    value: Any,
    value_type: type[_T],
    allow_lists: bool = False,
) -> _T | list[_T] | None:
    if allow_lists and isinstance(value, list):
        for v in value:
            if not isinstance(v, value_type):
                return None
        return value
    elif isinstance(value, value_type):
        return value
    return None


def get_value_from_dict_if_type[_T: Any](
    input_dict: dict[str, Any],
    key: str,
    value_type: type[_T],
    allow_lists: bool = False,
) -> _T | list[_T] | None:
    if (
        key in input_dict
        and (
            val := validate_value_is_type(
                input_dict[key],
                value_type,
                allow_lists,
            )
        )
    ):
        return val
    return None


def update_dict_and_validate(
    output_dict: dict[str, Any],
    input_dict: dict[str, Any],
    key: str,
    value_type: Any,
    allow_lists: bool = False,
) -> None:
    if val := get_value_from_dict_if_type(input_dict, key, value_type, allow_lists):
        output_dict[key] = val


def extract_panel_card_config(
    input_conf: dict[str, Any],
) -> dict[str, Any]:
    card_conf: dict[str, Any] = {}
    if len(input_conf) == 0:
        return card_conf
    update_dict_and_validate(card_conf, input_conf, 'vertical', bool)
    update_dict_and_validate(card_conf, input_conf, 'round', bool)
    update_dict_and_validate(card_conf, input_conf, 'use_24hr', bool)
    update_dict_and_validate(card_conf, input_conf, 'temperatureUnit', str)
    update_dict_and_validate(card_conf, input_conf, 'lightEntityId', str)
    update_dict_and_validate(card_conf, input_conf, 'powerEntityId', str)
    update_dict_and_validate(card_conf, input_conf, 'cameraEntityId', str)
    update_dict_and_validate(card_conf, input_conf, 'monitoredStats', str, allow_lists=True)
    update_dict_and_validate(card_conf, input_conf, 'scaleFactor', float)
    update_dict_and_validate(card_conf, input_conf, 'slotColors', str, allow_lists=True)
    update_dict_and_validate(card_conf, input_conf, 'showSettingsButton', bool)
    update_dict_and_validate(card_conf, input_conf, 'alwaysShow', bool)
    return card_conf