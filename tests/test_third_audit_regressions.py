"""Third audit regressions against real HA 2026.9, without cloud or printers."""
import io
import types
import unittest
from unittest.mock import (
    AsyncMock,
    Mock,
    PropertyMock,
    patch,
)

from homeassistant.core import HomeAssistant
from PIL import Image
from test_regressions import (
    API,
    Coordinator,
    Errors,
    Payload,
    Printer,
    mod,
)


def ace(box_id):
    return {'id': box_id, 'status': 0, 'model_id': 1, 'auto_feed': 0,
            'loaded_slot': -1, 'temp': 20, 'drying_status': None,
            'slots': [{'index': i, 'sku': 'offline', 'type': 'PLA',
                       'color': [255, 0, 0], 'edit_status': 0, 'status': 1}
                      for i in range(4)]}


class ThirdAudit(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.api = API(session=None, cookie_jar=None)
        self.api.set_authentication(auth_token='offline')
        self.printer = Printer(api_parent=self.api, machine_type=0,
                               machine_name='offline', id=7)

    async def test_upload_checks_http_status_even_with_empty_body(self):
        response = types.SimpleNamespace(
            url='https://offline.invalid/upload',
            text=AsyncMock(return_value=''),
            raise_for_status=Mock(side_effect=RuntimeError('HTTP 503')),
        )

        class Context:
            async def __aenter__(self):
                return response

            async def __aexit__(self, *args):
                return False

        self.api._session = Mock()
        self.api._session.put.return_value = Context()
        with self.assertRaises(Errors.AnycubicAPIParsingError):
            await self.api._fetch_aws_put_resp(response.url, b'offline')
        response.raise_for_status.assert_called_once()
        response.text.assert_not_awaited()
        response.raise_for_status = Mock()
        self.assertEqual(await self.api._fetch_aws_put_resp(response.url, b'offline'), '')

    async def test_api_rejects_non_mapping_json_before_endpoint_processing(self):
        for response in (None, [], 'error', 42):
            with self.subTest(response=response):
                self.api._fetch_ext_resp = AsyncMock(return_value=response)
                with self.assertRaises(Errors.AnycubicAPIParsingError):
                    await self.api.get_user_info()
        self.api._fetch_ext_resp = AsyncMock(return_value={'data': {'id': 7}})
        self.assertEqual(await self.api.get_user_info(raw_data=True), {'data': {'id': 7}})

    async def test_sparse_firmware_targets_secondary_and_never_primary(self):
        self.printer._set_multi_color_box([ace(0), ace(1)])
        self.printer._update_multi_color_box_fw_version_from_json([
            {'box_id': 1, 'need_update': 1, 'firmware_version': '1.0',
             'target_version': '2.0'}])
        self.api._update_muli_color_box_firmware = AsyncMock(return_value={'target_version': '2.0'})
        self.assertIsNone(await self.api.update_printer_multi_color_box_firmware(self.printer, 0))
        self.api._update_muli_color_box_firmware.assert_not_awaited()
        self.assertEqual(await self.api.update_printer_multi_color_box_firmware(self.printer, 1), '2.0')
        self.api._update_muli_color_box_firmware.assert_awaited_once_with(printer_id=7, box_id=1)
        self.api._update_muli_color_box_firmware.reset_mock()
        self.assertEqual(await self.api.update_printer_all_multi_color_box_firmware(self.printer), ['2.0'])
        self.api._update_muli_color_box_firmware.assert_awaited_once_with(printer_id=7, box_id=1)

    async def test_reordered_and_sparse_ace_updates_find_ids(self):
        self.printer._set_multi_color_box([ace(1), ace(0)])
        self.assertEqual(self.printer.primary_multi_color_box.box_id, 0)
        self.assertEqual(self.printer.secondary_multi_color_box.box_id, 1)
        for action, state, data, method, args in (
            ('setInfo', 'success', {'multi_color_box': [{'id': 1, 'slots': []}]},
             'update_slots_with_mqtt_data', ([],)),
            ('autoUpdateInfo', 'done', {'id': 1, 'loaded_slot': 2},
             'set_slot_loaded', (2,)),
            ('autoUpdateDryStatus', 'success', {'multi_color_box': [
                {'id': 1, 'temp': 30, 'drying_status': None}]},
             'set_current_temperature', (30,)),
            ('feedFilament', 'done', {'multi_color_box': [
                {'id': 1, 'loaded_slot': 2, 'feed_status': {'code': 0, 'type': 1, 'current_status': 0, 'slot_index': 2}}]},
             'set_slot_loaded', (2,)),
            ('setAutoFeed', 'done', {'multi_color_box': [{'id': 1, 'auto_feed': 1}]},
             'set_auto_feed', (1,)),
        ):
            for ids in ([1, 0], [1]):
                with self.subTest(action=action, ids=ids):
                    self.printer._set_multi_color_box([ace(i) for i in ids])
                    box = self.printer.secondary_multi_color_box
                    with patch.object(type(box), method, autospec=True) as update:
                        self.printer._process_mqtt_update_multicolorbox(action, state, Payload({'data': data}))
                        update.assert_called_once_with(box, *args)
        self.assertIsNone(self.printer.primary_multi_color_box)
        self.assertEqual(self.printer.secondary_multi_color_box.box_id, 1)
        self.printer._process_mqtt_update_multicolorbox(
            'setAutoFeed', 'done', Payload({'data': {'multi_color_box': [{'id': 0, 'auto_feed': 1}]}}))
        self.assertEqual(self.printer.secondary_multi_color_box.auto_feed, 0)

    async def test_reordered_auto_feed_and_stop_all_target_actual_ids(self):
        self.printer._set_multi_color_box([ace(1), ace(0)])
        self.api._send_order_multi_color_auto_feed = AsyncMock(return_value='ack')
        await self.api.multi_color_box_switch_on_auto_feed(self.printer, 1)
        self.assertTrue(self.printer.secondary_multi_color_box.auto_feed)
        self.assertFalse(self.printer.primary_multi_color_box.auto_feed)
        self.printer._set_multi_color_box([ace(1)])
        self.api._validate_ace_box(self.printer, 1)
        with self.assertRaises(Errors.AnycubicAPIError):
            self.api._validate_ace_box(self.printer, 0)
        self.printer._set_multi_color_box([ace(1), ace(0)])
        self.api._send_anycubic_order = AsyncMock(return_value='ack')
        await self.api.multi_color_box_drying_stop(self.printer)
        order = self.api._send_anycubic_order.call_args.kwargs['order_request'].order_request_data
        self.assertEqual([box['id'] for box in order['data']['multi_color_box']], [1, 0])

    async def test_image_coordinator_update_publishes_new_url_and_timestamp(self):
        module = mod('image')
        image = object.__new__(module.AnycubicCloudImage)
        image.coordinator = types.SimpleNamespace(data={'printers': {7: {
            'states': {'job_image_url': 'https://offline.invalid/old.png'}}}})
        image._printer_id = 7
        image.entity_description = module.IMAGE_TYPES[0]
        image._known_image_url = None
        image._cached_image = None
        image.async_write_ha_state = Mock()
        image._check_image_url()
        before = image.image_last_updated
        image._cached_image = object()
        image.coordinator.data['printers'][7]['states']['job_image_url'] = 'https://offline.invalid/new.png'
        image._handle_coordinator_update()
        self.assertEqual(image.image_url, 'https://offline.invalid/new.png')
        self.assertGreater(image.image_last_updated, before)
        self.assertIsNone(image._cached_image)
        image.async_write_ha_state.assert_called_once()
        after = image.image_last_updated
        image._handle_coordinator_update()
        self.assertEqual(image.image_last_updated, after)
        image.coordinator.data['printers'][7]['states']['job_image_url'] = None
        image._handle_coordinator_update()
        self.assertIsNone(image.image_url)

    async def test_image_retains_valid_content_type_and_rejects_invalid_type(self):
        image = object.__new__(mod('image').AnycubicCloudImage)
        image.entity_id = 'image.offline'
        for format_name, content_type in (('JPEG', 'image/jpeg'), ('PNG', 'image/png')):
            content = io.BytesIO()
            Image.new('RGB', (2, 2), (255, 0, 0)).save(content, format=format_name)
            for headers in ({'content-type': content_type}, {}):
                image._fetch_url = AsyncMock(return_value=types.SimpleNamespace(
                    content=content.getvalue(), headers=headers))
                loaded = await image._async_load_image_from_url('https://offline.invalid/image')
                self.assertEqual(loaded.content_type, content_type)
        image._fetch_url = AsyncMock(return_value=types.SimpleNamespace(
            content=b'error', headers={'content-type': 'text/html'}))
        self.assertIsNone(await image._async_load_image_from_url('https://offline.invalid/error'))

    async def test_diagnostics_accepts_null_empty_and_missing_projects(self):
        const = mod('const')
        api = types.SimpleNamespace(get_user_info=AsyncMock(return_value={'data': {}}),
                                    list_my_printers=AsyncMock(return_value={'data': []}),
                                    list_all_projects=AsyncMock(), project_info_for_id=AsyncMock())
        hass = types.SimpleNamespace(data={const.DOMAIN: {'offline': {
            const.COORDINATOR: types.SimpleNamespace(anycubic_api=api)}}})
        for response in ({'data': None}, {'data': []}, {}):
            api.list_all_projects.return_value = response
            result = await mod('diagnostics').async_get_config_entry_diagnostics(
                hass, types.SimpleNamespace(entry_id='offline'))
            self.assertEqual(result['projects_info']['data'], [])
        api.project_info_for_id.assert_not_awaited()

    async def test_mqtt_options_default_preserves_coordinator_behavior(self):
        flow_module = mod('config_flow')
        flow = flow_module.AnycubicCloudOptionsFlowHandler()
        entry = types.SimpleNamespace(options={}, async_on_unload=Mock())
        coordinator = Coordinator(HomeAssistant('/tmp/anycubic-third-regressions'), entry)
        flow.async_show_form = Mock(side_effect=lambda **kwargs: kwargs)
        with patch.object(type(flow), 'config_entry', new_callable=PropertyMock, return_value=entry):
            form = await flow.async_step_mqtt_presets()
        schema = form['data_schema']
        field = next(key for key in schema.schema if str(key) == mod('const').CONF_MQTT_CONNECT_MODE)
        self.assertEqual(int(field.default()), int(coordinator._mqtt_connection_mode))
        self.assertEqual(int(coordinator._mqtt_connection_mode), 1)
