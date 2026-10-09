from __future__ import annotations

from collections import UserDict
from typing import Any

from aiofiles import open as aio_file_open

from ..exceptions.error_strings import ErrorsGcodeParsing
from ..exceptions.exceptions import AnycubicGcodeParsingError
from ..helpers.helpers import (
    GCODE_STRING_FIRST_ATTR_LINE,
    REX_GCODE_DATA_KEY_VALUE,
    gcode_key_value_pair_to_dict,
)


class AnycubicGcodeFile(UserDict[str, Any]):
    __slots__ = (
        "_material_list",
    )

    def __init__(
        self,
        *args: Any,
        **kwargs: Any,
    ) -> None:
        super().__init__(*args, **kwargs)
        self._material_list: list[dict[str, Any]] | None = None

        try:
            self.material_list
        except AnycubicGcodeParsingError:
            pass

    @classmethod
    async def async_read_from_file(
        cls,
        full_file_path: str | None = None,
        file_bytes: bytes | None = None,
    ) -> AnycubicGcodeFile:
        data_found = False
        file_lines = list()
        slicer_data = dict()

        if full_file_path is not None:
            try:
                async with aio_file_open(full_file_path, mode='r') as f:
                    file_lines = await f.readlines()
            except Exception as error:
                raise AnycubicGcodeParsingError(ErrorsGcodeParsing.read_fail.format(error))
        elif file_bytes is not None:
            try:
                file_lines = file_bytes.decode('utf-8').split('\n')
            except Exception as error:
                raise AnycubicGcodeParsingError(ErrorsGcodeParsing.byte_decode_fail.format(error))
        else:
            raise AnycubicGcodeParsingError(ErrorsGcodeParsing.invalid_path_and_bytes)

        for line in file_lines:
            if not data_found and line.startswith(GCODE_STRING_FIRST_ATTR_LINE):
                data_found = True
            if not data_found:
                continue
            try:
                slicer_data.update(gcode_key_value_pair_to_dict(REX_GCODE_DATA_KEY_VALUE, line))
            except Exception as error:
                raise AnycubicGcodeParsingError(ErrorsGcodeParsing.parse_meta_fail.format(error))

        return cls(slicer_data)

    @property
    def material_list(self) -> list[dict[str, Any]]:
        if self._material_list is not None:
            return self._material_list

        def filament_values(key: str) -> list[Any]:
            value = self.data.get(key)
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                return [value]
            return value if isinstance(value, list) else []

        filament_used_g = filament_values('filament_used_g')
        filament_used_mm = filament_values('filament_used_mm')
        filament_used_cm3 = filament_values('filament_used_cm3')
        ams_data = self.data.get('paint_info')
        if not isinstance(ams_data, list) or not ams_data:
            raise AnycubicGcodeParsingError(ErrorsGcodeParsing.empty_paint_info)
        if not filament_used_g:
            raise AnycubicGcodeParsingError(ErrorsGcodeParsing.empty_used_filament)
        materials = []
        for paint_info in ams_data:
            if not isinstance(paint_info, dict):
                raise AnycubicGcodeParsingError(ErrorsGcodeParsing.invalid_used_filament)
            index = paint_info.get('paint_index')
            if type(index) is not int or not 0 <= index < len(filament_used_g):
                raise AnycubicGcodeParsingError(ErrorsGcodeParsing.invalid_used_filament)
            weight = filament_used_g[index]
            if isinstance(weight, bool) or not isinstance(weight, (int, float)):
                raise AnycubicGcodeParsingError(ErrorsGcodeParsing.invalid_used_filament)
            materials.append({
                **paint_info,
                'filament_used': weight,
                'filament_used_mm': filament_used_mm[index] if index < len(filament_used_mm) else None,
                'filament_used_cm3': filament_used_cm3[index] if index < len(filament_used_cm3) else None,
            })
        self._material_list = materials
        self.data['material_list'] = materials
        return materials
