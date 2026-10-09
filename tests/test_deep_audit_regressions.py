"""Regression coverage for the fifth and sixth audits; no external connections."""
import asyncio
import types
import unittest
from unittest.mock import (
    AsyncMock,
    Mock,
    patch,
)

from homeassistant.const import Platform
from homeassistant.exceptions import HomeAssistantError
from test_regressions import (
    API,
    Coordinator,
    Errors,
    Printer,
    Upload,
    mod,
)
from test_third_audit_regressions import ace


class StoreFake:
    instance = None

    @classmethod
    def __class_getitem__(cls, item):
        return cls

    def __new__(cls, *args):
        return cls.instance


class DeepAudit(unittest.IsolatedAsyncioTestCase):
    def printer(self, api=None, ids=(0,)):
        printer = Printer(api_parent=api, machine_type=0, machine_name='offline', id=7)
        printer._set_type_function_ids([2006])
        printer._set_multi_color_box([ace(i) for i in ids])
        return printer

    def auth_coordinator(self):
        api = API(session=None, cookie_jar=None)
        api.set_authentication(auth_token='offline')
        api.check_api_tokens = AsyncMock(return_value=True)
        api._tokens_changed = True
        co = object.__new__(Coordinator)
        co._anycubic_api = api
        const = mod('const')
        co.hass = types.SimpleNamespace()
        co.entry = types.SimpleNamespace(entry_id='offline', data={const.CONF_USER_TOKEN: 'offline'})
        return api, co

    async def test_sparse_ace_creates_correct_devices_and_entities(self):
        const = mod('const')
        module = mod('coordinator')
        entity = mod('entity')
        for ids in ([], [0], [1], [0, 1], [1, 0]):
            with self.subTest(ids=ids):
                p = self.printer(ids=ids)
                co = object.__new__(Coordinator)
                co.hass = types.SimpleNamespace()
                co.entry = types.SimpleNamespace(data={const.CONF_PRINTER_ID_LIST: [7]}, options={}, entry_id='offline', async_on_unload=Mock())
                co._anycubic_printers = {7: p}
                co._unregistered_descriptors = {}
                co.async_add_listener = Mock(return_value=Mock())
                co.data = {'user_info': {'id': 13}, 'printers': {7: {'states': {
                    'id': 7, 'name': 'offline', 'machine_name': 'offline', 'fw_version': '1.0',
                    'supports_function_multi_color_box': True, 'connected_ace_units': len(ids), 'connected_ace_ids': ids,
                }, 'attributes': {'current_status': {'material_type': 'Filament'}}}}}
                devices = []
                def create(**kwargs):
                    devices.append(kwargs)
                    return types.SimpleNamespace(id=str(len(devices)))
                with patch.object(module, 'async_get_device_registry', return_value=types.SimpleNamespace(async_get_or_create=create)):
                    await co._register_printer_devices(co.data)
                registered = {next(iter(d['identifiers']))[1] for d in devices}
                self.assertEqual('ace_primary_7' in registered, 0 in ids)
                self.assertEqual('ace_secondary_7' in registered, 1 in ids)
                added = []
                descriptions = [entity.AnycubicCloudEntityDescription(key=str(i), printer_entity_type=kind) for i, kind in (
                    (0, const.PrinterEntityType.ACE_PRIMARY), (1, const.PrinterEntityType.ACE_SECONDARY))]
                co.add_entities_for_seen_printers(added.extend, lambda *args: args[-1].key, Platform.SENSOR, descriptions)
                self.assertEqual(set(added), {str(i) for i in ids})

    async def test_secondary_only_auto_feed_wrapper_reaches_api(self):
        api = API(session=None, cookie_jar=None)
        api._send_order_multi_color_auto_feed = AsyncMock(return_value='ack')
        p = self.printer(api, [1])
        self.assertEqual(await p.multi_color_box_switch_on_auto_feed(box_id=1), 'ack')
        api._send_order_multi_color_auto_feed.assert_awaited_once_with(p, True, 1)
        self.assertTrue(p.secondary_multi_color_box.auto_feed)

    async def test_secondary_only_mapping_checks_actual_box_ids(self):
        p = self.printer(ids=[1])
        materials = [{'filament_used': 1.0, 'material_type': 'PLA', 'paint_index': 0}]
        self.assertEqual(p.build_mapping_for_material_list([4], materials)[0].spool_index, 4)
        with self.assertRaises(Errors.AnycubicAPIError):
            p.build_mapping_for_material_list([0], materials)

    async def test_confirmed_upload_does_not_depend_on_global_quota_afterwards(self):
        api = types.SimpleNamespace(get_user_cloud_store=AsyncMock(side_effect=[types.SimpleNamespace(available_bytes=100), types.SimpleNamespace(available_bytes=110)]),
            _lock_storage_space=AsyncMock(return_value={'id': 3, 'preSignUrl': 'https://offline.invalid'}),
            _fetch_aws_put_resp=AsyncMock(return_value=''), _claim_file_upload_from_aws=AsyncMock(return_value=13),
            _unlock_storage_space=AsyncMock(), _log_to_debug=Mock())
        upload = Upload(api, file_name='offline.gcode', file_bytes=b'0123456789')
        self.assertEqual(await upload.async_process_upload(), 13)
        self.assertEqual(api.get_user_cloud_store.await_count, 1)
        api._unlock_storage_space.assert_awaited_once_with(3, is_delete_cos=False)

    async def test_token_storage_retries_after_failure(self):
        api, co = self.auth_coordinator()
        store = StoreFake.instance = types.SimpleNamespace(async_save=AsyncMock(side_effect=[OSError('offline disk error'), None]))
        with patch.object(mod('coordinator'), 'Store', StoreFake):
            with self.assertRaises(OSError):
                await co._check_or_save_tokens()
            self.assertTrue(api.tokens_changed)
            await co._check_or_save_tokens()
        self.assertEqual(store.async_save.await_count, 2)
        self.assertFalse(api.tokens_changed)

    async def test_token_storage_cancellation_keeps_changes_pending(self):
        api, co = self.auth_coordinator()
        StoreFake.instance = types.SimpleNamespace(async_save=AsyncMock(side_effect=asyncio.CancelledError))
        with patch.object(mod('coordinator'), 'Store', StoreFake):
            with self.assertRaises(asyncio.CancelledError):
                await co._check_or_save_tokens()
        self.assertTrue(api.tokens_changed)
        self.assertFalse(co._auth_save_lock.locked())

    async def test_token_changed_during_save_is_not_acknowledged_as_old_snapshot(self):
        api, co = self.auth_coordinator()
        async def save(data):
            api.anycubic_auth.set_auth_token('new-offline-token')
            api._tokens_changed = True
        store = StoreFake.instance = types.SimpleNamespace(async_save=AsyncMock(side_effect=save))
        with patch.object(mod('coordinator'), 'Store', StoreFake):
            await co._check_or_save_tokens()
            self.assertTrue(api.tokens_changed)
            store.async_save.side_effect = None
            await co._check_or_save_tokens()
        self.assertFalse(api.tokens_changed)
        self.assertEqual(store.async_save.call_args.args[0]['auth']['auth_token'], 'new-offline-token')

    async def test_concurrent_token_saves_preserve_latest_snapshot(self):
        api, co = self.auth_coordinator()
        entered, release = asyncio.Event(), asyncio.Event()
        snapshots = []
        async def save(data):
            snapshots.append(data['auth']['auth_token'])
            if len(snapshots) == 1:
                entered.set()
                await release.wait()
        StoreFake.instance = types.SimpleNamespace(async_save=AsyncMock(side_effect=save))
        with patch.object(mod('coordinator'), 'Store', StoreFake):
            first = asyncio.create_task(co._check_or_save_tokens())
            await entered.wait()
            api.anycubic_auth.set_auth_token('new-offline-token')
            api._tokens_changed = True
            second = asyncio.create_task(co._check_or_save_tokens())
            await asyncio.sleep(0)
            release.set()
            await asyncio.gather(first, second)
        self.assertEqual(snapshots, ['offline', 'new-offline-token'])
        self.assertFalse(api.tokens_changed)

    async def test_user_info_payload_errors_have_defined_api_exceptions(self):
        api = API(session=None, cookie_jar=None)
        api.set_authentication(auth_token='offline')
        for payload in ({'msg': 'request error'}, {'msg': 'request error', 'data': None}, {'data': []}, {'data': {}}, {'data': {'id': 7}}, {}):
            with self.subTest(payload=payload):
                api._fetch_ext_resp = AsyncMock(return_value=payload)
                with self.assertRaises(Errors.AnycubicAPIParsingError):
                    await api.get_user_info()
        api._fetch_ext_resp = AsyncMock(return_value={'data': None})
        with self.assertRaises(Errors.AnycubicAuthTokensExpired):
            await api.get_user_info()

    async def test_uploaded_file_is_found_by_id_even_on_later_page(self):
        api = API(session=None, cookie_jar=None)
        api.get_user_cloud_files = AsyncMock(side_effect=[
            [types.SimpleNamespace(id=i) for i in range(100)], [types.SimpleNamespace(id=101, gcode_id=1001)]])
        self.assertEqual((await api.get_cloud_file_for_id(101)).id, 101)
        self.assertEqual(api.get_user_cloud_files.call_args.kwargs['page'], 2)

    async def test_file_lookup_stops_if_server_repeats_pages(self):
        api = API(session=None, cookie_jar=None)
        api.get_user_cloud_files = AsyncMock(return_value=[types.SimpleNamespace(id=i) for i in range(100)])
        self.assertIsNone(await api.get_cloud_file_for_id(101))
        self.assertEqual(api.get_user_cloud_files.await_count, 2)

    async def test_concurrent_upload_and_print_uses_each_own_file(self):
        api = API(session=None, cookie_jar=None)
        second_uploaded = asyncio.Event()
        files = []
        async def upload(**kwargs):
            ident = 101 if kwargs['file_name'] == 'A.gcode' else 102
            files.append(types.SimpleNamespace(id=ident, gcode_id=ident + 1000))
            if ident == 102:
                second_uploaded.set()
            return ident
        async def list_files(**kwargs):
            await second_uploaded.wait()
            return list(reversed(files))
        api.upload_file_to_cloud = upload
        api.get_user_cloud_files = list_files
        api.print_with_cloud_gcode_id = AsyncMock(return_value='accepted')
        p = self.printer(api, [])
        result = await asyncio.gather(*(api.print_and_upload_save_in_cloud(p, file_name=name, file_bytes=b'G0 X0') for name in ('A.gcode', 'B.gcode')))
        self.assertEqual(result, ['accepted', 'accepted'])
        self.assertEqual({c.kwargs['gcode_id'] for c in api.print_with_cloud_gcode_id.call_args_list}, {1101, 1102})

    async def test_overlapping_auto_feed_actions_preserve_last_command(self):
        for initial, first, second in ((0, 'on', 'off'), (1, 'off', 'on'), (0, 'toggle', 'toggle'), (1, 'toggle', 'toggle')):
            with self.subTest(initial=initial, first=first, second=second):
                api = API(session=None, cookie_jar=None)
                p = self.printer(api)
                box = p.primary_multi_color_box
                box.set_auto_feed(initial)
                started, ack = asyncio.Event(), asyncio.Event()
                commands = []
                async def send(printer, enabled, box_id):
                    commands.append(enabled)
                    started.set()
                    await ack.wait()
                    return 'ack'
                api._send_order_multi_color_auto_feed = send
                def action(name):
                    method = 'multi_color_box_' + ('toggle_auto_feed' if name == 'toggle' else 'switch_' + name + '_auto_feed')
                    return getattr(api, method)(p, 0)
                task1 = asyncio.create_task(action(first))
                await started.wait()
                task2 = asyncio.create_task(action(second))
                await asyncio.sleep(0)
                self.assertFalse(task2.done())
                ack.set()
                await asyncio.gather(task1, task2)
                self.assertEqual(bool(box.auto_feed), bool(initial) if second == 'toggle' else second == 'on')
                self.assertEqual(len(commands), 2)

    async def test_auto_feed_ack_updates_replaced_box_and_explicit_commands_are_sent(self):
        api = API(session=None, cookie_jar=None)
        p = self.printer(api)
        old_box = p.primary_multi_color_box
        async def send(printer, enabled, box_id):
            printer._set_multi_color_box([ace(0)])
            return 'ack'
        api._send_order_multi_color_auto_feed = AsyncMock(side_effect=send)
        await api.multi_color_box_switch_on_auto_feed(p, 0)
        self.assertIsNot(p.primary_multi_color_box, old_box)
        self.assertTrue(p.primary_multi_color_box.auto_feed)
        await api.multi_color_box_switch_off_auto_feed(p, 0)
        await api.multi_color_box_switch_off_auto_feed(p, 0)
        self.assertFalse(p.primary_multi_color_box.auto_feed)
        self.assertEqual(api._send_order_multi_color_auto_feed.await_count, 3)

    async def test_auto_feed_lock_is_released_after_cancel_and_other_box_is_independent(self):
        api = API(session=None, cookie_jar=None)
        p = self.printer(api, [0, 1])
        entered, wait = asyncio.Event(), asyncio.Event()
        async def send(printer, enabled, box_id):
            if box_id == 0:
                entered.set()
                await wait.wait()
            return 'ack'
        api._send_order_multi_color_auto_feed = send
        blocked = asyncio.create_task(api.multi_color_box_switch_on_auto_feed(p, 0))
        await entered.wait()
        self.assertEqual(await api.multi_color_box_switch_on_auto_feed(p, 1), 'ack')
        blocked.cancel()
        with self.assertRaises(asyncio.CancelledError):
            await blocked
        wait.set()
        self.assertEqual(await api.multi_color_box_switch_on_auto_feed(p, 0), 'ack')

    async def test_firmware_install_rejection_is_reported_by_update_entity(self):
        module = mod('update')
        for status in (0, 1):
            api = API(session=None, cookie_jar=None)
            p = self.printer(api, [])
            p._fw_version = types.SimpleNamespace(update_available=True, available_version='2.0', firmware_version='1.0')
            api._update_printer_firmware = AsyncMock(return_value={'update_status': status})
            co = object.__new__(Coordinator)
            co._anycubic_printers = {7: p}
            co._connect_mqtt_for_action_response = AsyncMock()
            co.force_state_update = AsyncMock()
            update = object.__new__(module.AnycubicUpdateEntity)
            update.coordinator = co
            update._printer_id = 7
            update.entity_description = module.UPDATE_TYPES[0]
            if status == 0:
                with self.assertRaises(HomeAssistantError):
                    await update.async_install(None, False)
                co.force_state_update.assert_not_awaited()
            else:
                await update.async_install(None, False)
                co.force_state_update.assert_awaited_once()
