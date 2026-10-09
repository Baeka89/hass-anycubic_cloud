"""Offline regressions for audits eight to ten; no real printer commands."""
import asyncio
import copy
import itertools
import json
import tempfile
import threading
import traceback
import types
import unittest
from pathlib import Path
from types import MappingProxyType
from unittest.mock import (
    AsyncMock,
    Mock,
    patch,
)

import aiohttp
from homeassistant.components.file_upload import FileUploadData
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from multidict import CIMultiDict, CIMultiDictProxy
from test_fourth_audit_regressions import ResponseContext
from test_regressions import (
    API,
    MQTT,
    Coordinator,
    Errors,
    Payload,
    Printer,
    mod,
)
from test_seventh_audit_regressions import firmware
from test_third_audit_regressions import ace
from yarl import URL


class EighthTenthAudit(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.api = API(session=None, cookie_jar=None)
        self.api.set_authentication(auth_token='offline')
        self.p = Printer(api_parent=self.api, machine_type=0, machine_name='offline', id=7)
        self.co = object.__new__(Coordinator)
        self.co._anycubic_printers = {7: self.p}
        self.co._connect_mqtt_for_action_response = AsyncMock()
        self.co.force_state_update = AsyncMock()

    async def test_apostrophes_in_signed_urls_cannot_leak_into_logs_or_tracebacks(self):
        helper = mod('anycubic_cloud_api.helpers.helpers').redact_urls_in_text
        urls = ["https://offline.invalid/file'part.gcode?sig=FAKE-SECRET#FAKE-FRAGMENT",
                "https://FAKE-USER:FAKE-PASS@offline.invalid/a'b?token=FAKE-SECRET"]
        api = API(session=Mock(), cookie_jar=None, debug_logger=Mock())
        api.set_authentication(auth_token='offline')
        for url in urls:
            context = ResponseContext(503, {})
            info = aiohttp.RequestInfo(URL(url), 'PUT', CIMultiDictProxy(CIMultiDict()))
            context.response.raise_for_status.side_effect = aiohttp.ClientResponseError(info, (), status=503, message=url)
            api._session.put.return_value = context
            with self.assertRaises(Errors.AnycubicAPIParsingError) as caught:
                await api._fetch_aws_put_resp(url, b'offline')
            text = helper(f"URLs: '{url}' and {url}") + ''.join(traceback.format_exception(caught.exception))
            text += str(api._debug_logger.mock_calls)
            for secret in ('FAKE-SECRET', 'FAKE-FRAGMENT', 'FAKE-USER', 'FAKE-PASS'):
                self.assertNotIn(secret, text)

    async def test_missing_invalid_or_empty_order_acknowledgements_raise_and_preserve_state(self):
        self.p._set_multi_color_box([ace(0)])
        for data in ({}, {'msgid': ''}, {'msgid': '  '}, {'msgid': False}, {'msgid': []}, [], 'invalid'):
            self.api._fetch_api_resp = AsyncMock(return_value={'data': data})
            with self.subTest(data=data), self.assertRaises(Errors.AnycubicAPIError):
                await self.co.switch_on_event(7, 'multi_color_box_runout_refill')
            self.assertFalse(self.p.primary_multi_color_box.auto_feed)
        self.co.force_state_update.assert_not_awaited()
        self.api._fetch_api_resp = AsyncMock(return_value={'data': {'msgid': 'accepted'}})
        await self.co.switch_on_event(7, 'multi_color_box_runout_refill')
        self.assertTrue(self.p.primary_multi_color_box.auto_feed)
        self.co.force_state_update.assert_awaited_once()

    async def test_rest_firmware_transaction_does_not_overwrite_concurrent_mqtt_ota(self):
        self.p._update_multi_color_box_fw_version_from_json([firmware(0)])
        original = self.p._firmware_for_ace(0)
        original.set_download_progress(10)
        copied, attempted, finished = threading.Event(), threading.Event(), threading.Event()
        errors = []

        def worker():
            try:
                if not copied.wait(2):
                    raise AssertionError('REST copy not reached')
                attempted.set()
                self.p._process_mqtt_update_ota_multicolorbox(
                    'update', 'downloading', Payload({'data': {'progress': 70}}), 0)
                finished.set()
            except BaseException as error:
                errors.append(error)

        def copy_while_worker_attempts(obj):
            snapshot = copy.copy(obj)
            copied.set()
            self.assertTrue(attempted.wait(2))
            self.assertFalse(finished.wait(0.02))
            return snapshot
        thread = threading.Thread(target=worker)
        thread.start()
        try:
            with patch.object(mod('anycubic_cloud_api.data_models.printer'), 'copy', side_effect=copy_while_worker_attempts):
                self.p._update_multi_color_box_fw_version_from_json([firmware(0, '1.1')])
        finally:
            thread.join(2)
        self.assertFalse(thread.is_alive())
        self.assertEqual(errors, [])
        self.assertTrue(finished.is_set())
        self.assertIs(self.p._firmware_for_ace(0), original)
        self.assertEqual(original.download_progress, 70)
        self.assertTrue(original.is_updating)

    async def test_drying_targets_connected_box_instead_of_requiring_primary(self):
        self.api._send_anycubic_order = AsyncMock(return_value='accepted')
        self.p._set_multi_color_box([ace(1)])
        await self.co.button_press_custom_dry(7, 45, 6, is_secondary=True)
        order = self.api._send_anycubic_order.call_args.kwargs['order_request'].order_request_data
        self.assertEqual(order['data']['multi_color_box'][0]['id'], 1)
        self.assertEqual(order['data']['multi_color_box'][0]['drying_status']['duration'], 6)
        self.p._set_multi_color_box([ace(0)])
        self.api._send_anycubic_order.reset_mock()
        from homeassistant.exceptions import HomeAssistantError
        with self.assertRaises(HomeAssistantError):
            await self.co.button_press_custom_dry(7, 45, 6, is_secondary=True)
        self.api._send_anycubic_order.assert_not_awaited()
        self.p._set_multi_color_box([])
        with self.assertRaises(HomeAssistantError):
            await self.co.button_press_custom_dry(7, 45, 6, is_secondary=True)
        self.api._send_anycubic_order.assert_not_awaited()

    async def test_invalid_print_target_preserves_actual_ha_upload_token_and_file(self):
        services = mod('services')
        const = mod('const')
        for cls in (services.PrintAndUploadSaveInCloud, services.PrintAndUploadNoCloudSave):
            with tempfile.TemporaryDirectory() as folder:
                temp = Path(folder)
                (temp / 'offline-token').mkdir()
                file = temp / 'offline-token/offline.gcode'
                file.write_bytes(b'G0 X0')
                upload_data = FileUploadData(temp, {'offline-token': 'offline.gcode'})
                hass = types.SimpleNamespace(data={'file_upload': upload_data},
                                             config_entries=types.SimpleNamespace(async_get_entry=Mock(return_value=None)))

                async def execute(fn, *args):
                    return fn(*args)
                hass.async_add_executor_job = execute
                call = types.SimpleNamespace(data={const.CONF_UPLOADED_GCODE_FILE: 'offline-token',
                                                   'config_entry': 'invalid', 'printer_id': 7})
                with self.assertRaises(ServiceValidationError):
                    await cls(hass).async_call_service(call)
                self.assertTrue(upload_data.has_file('offline-token'))
                self.assertEqual(file.read_bytes(), b'G0 X0')
                filename, contents = await cls(hass)._get_gcode_data(call)
                self.assertEqual((filename, contents), ('offline.gcode', b'G0 X0'))
                self.assertFalse(upload_data.has_file('offline-token'))

    async def test_mqtt_invalid_ace_ids_cannot_change_any_box(self):
        self.p._set_multi_color_box([ace(0), ace(1)])
        for value in (1.9, -0.9, True, False, 1.0, '1.9'):
            with self.subTest(value=value), self.assertRaises(Errors.AnycubicDataParsingError):
                self.p._process_mqtt_update_multicolorbox('setAutoFeed', 'done', Payload({
                    'data': {'multi_color_box': [{'id': value, 'auto_feed': 1}]}}))
            self.assertFalse(any(box.auto_feed for box in self.p.multi_color_box))
        self.p._process_mqtt_update_multicolorbox('setAutoFeed', 'done', Payload({
            'data': {'multi_color_box': [{'id': '1', 'auto_feed': 1}]}}))
        self.assertTrue(self.p.secondary_multi_color_box.auto_feed)
        self.assertFalse(self.p.primary_multi_color_box.auto_feed)

    async def test_bad_slot_batches_preserve_all_slots(self):
        self.p._set_multi_color_box([ace(0)])
        box = self.p.primary_multi_color_box
        original = list(box.slots)
        valid = {**ace(0)['slots'][0], 'type': 'changed'}
        for index in (-1, 4, True, 1.9, '1.9'):
            bad = {**ace(0)['slots'][1], 'index': index}
            with self.subTest(index=index), self.assertRaises(Errors.AnycubicDataParsingError):
                box.update_slots_with_mqtt_data([valid, bad])
            self.assertEqual(box.slots, original)
        with self.assertRaises(Errors.AnycubicDataParsingError):
            box.update_slots_with_mqtt_data([valid, valid])
        self.assertEqual(box.slots, original)
        box.update_slots_with_mqtt_data([valid])
        self.assertEqual(box.slots[0].material_type, 'changed')
        self.assertIs(box.slots[1], original[1])

    async def test_invalid_mqtt_json_redacts_printer_key_and_does_not_log_raw_payload(self):
        logger = Mock()
        mqtt = MQTT(session=None, cookie_jar=None, debug_logger=logger)
        topic = 'anycubic/anycubicCloud/v1/printer/app/0/FAKE-PRIVATE-KEY/response'
        for raw in (b'{FAKE-SECRET', b'\xffFAKE-SECRET'):
            mqtt._mqtt_message_router(types.SimpleNamespace(topic=topic, payload=raw))
        text = str(logger.mock_calls)
        self.assertNotIn('FAKE-PRIVATE-KEY', text)
        self.assertNotIn('FAKE-SECRET', text)
        self.assertIn('REDACTED', text)

    async def test_all_96_slot_selections_use_index_not_input_order(self):
        base = ace(0)
        for slot in base['slots']:
            slot['color'] = [slot['index'] * 50, 10, 20]
        for order in itertools.permutations(range(4)):
            self.p._set_multi_color_box([{**base, 'slots': [base['slots'][i] for i in order]}])
            for selected in range(4):
                mapping = self.p.build_mapping_for_material_list(
                    [selected], [{'filament_used': 1, 'material_type': 'PLA', 'paint_index': 0}])[0]
                self.assertEqual(mapping.spool_index, selected)
                self.assertEqual(mapping.color_data, [selected * 50, 10, 20])
            self.assertEqual([slot._index for slot in self.p.primary_multi_color_box.slots], [0, 1, 2, 3])
        self.p._set_multi_color_box([{**base, 'slots': [base['slots'][3]]}])
        mapping = self.p.build_mapping_for_material_list([3], [{'filament_used': 1, 'material_type': 'PLA', 'paint_index': 0}])[0]
        self.assertEqual(mapping.color_data, [150, 10, 20])
        with self.assertRaises(Errors.AnycubicAPIError):
            self.p.build_mapping_for_material_list([0], [{'filament_used': 1, 'material_type': 'PLA', 'paint_index': 0}])

    async def test_router_keeps_old_local_and_usb_lists_when_any_record_fails(self):
        callback = Mock()
        mqtt = MQTT(session=None, cookie_jar=None, debug_logger=Mock(), mqtt_callback_printer_update=callback)
        mqtt._mqtt_subscribed_printers['offline'] = self.p
        records = [{'filename': 'old.gcode', 'size': 50, 'is_dir': False}]
        topic = 'anycubic/anycubicCloud/v1/printer/app/0/offline/response'
        sources = [('listLocal', self.p._set_local_file_list, 'local_file_list_object'),
                   ('listUdisk', self.p._set_udisk_file_list, 'udisk_file_list_object')]
        for action, setter, prop in sources:
            for bad in (None, {}, {'filename': 'broken', 'size': 'invalid', 'is_dir': False}):
                setter(records)
                original = getattr(self.p, prop)
                payload = {'type': 'file', 'action': action, 'state': 'done', 'data': {'records': [
                    {'filename': 'new.gcode', 'size': 20, 'is_dir': False}, bad]}}
                mqtt._mqtt_message_router(types.SimpleNamespace(topic=topic, payload=json.dumps(payload).encode()))
                self.assertEqual(getattr(self.p, prop), original)
        self.assertEqual(callback.call_count, 6)

    async def test_entry_background_callbacks_are_cancelled_and_shutdown_guards_delayed_queries(self):
        hass = HomeAssistant('/tmp/anycubic-eighth-tenth-regressions')
        entry = ConfigEntry(data={}, domain='anycubic_cloud', options={}, version=1, minor_version=1,
                            discovery_keys=MappingProxyType({}), source='user', subentries_data=[], title='offline', unique_id=None)
        co = Coordinator(hass, entry)
        api = MQTT(session=None, cookie_jar=None)
        api.set_authentication(auth_token='offline')
        api._send_anycubic_order = AsyncMock(return_value='accepted')
        p = Printer(api_parent=api, machine_type=0, machine_name='offline', id=7)
        p._device_status = 1
        co._anycubic_api, co._anycubic_printers = api, {7: p}
        entered, release = asyncio.Event(), asyncio.Event()

        async def delay(seconds):
            entered.set()
            await release.wait()
        module = mod('coordinator')
        proxy = types.SimpleNamespace(sleep=delay, current_task=asyncio.current_task, gather=asyncio.gather)
        with patch.object(module, 'asyncio', proxy):
            co._mqtt_callback_subscribed()
            await entered.wait()
            self.assertEqual(len(entry._background_tasks), 1)
            tasks = list(entry._background_tasks)
            await co.async_shutdown()
            self.assertTrue(tasks[0].cancelled())
            await entry._async_process_on_unload(hass)
            self.assertTrue(co._shutdown_requested)
            release.set()
            await co._async_mqtt_callback_subscribed()
            co._mqtt_callback_subscribed()
            await asyncio.sleep(0)
            self.assertEqual(len(entry._background_tasks), 0)
        api._send_anycubic_order.assert_not_awaited()
