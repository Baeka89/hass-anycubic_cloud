"""Offline regression tests using real HA 2026.9 modules; never contact printers."""
from __future__ import annotations

import asyncio
import importlib
import json
import ssl
import sys
import threading
import time
import types
import unittest
from pathlib import Path
from unittest.mock import (
    AsyncMock,
    Mock,
    patch,
)

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
BASE = 'custom_components.anycubic_cloud'
def mod(name):
    return importlib.import_module(f'{BASE}.{name}')
Printer = mod('anycubic_cloud_api.data_models.printer').AnycubicPrinter
Project = mod('anycubic_cloud_api.data_models.project').AnycubicProject
Payload = mod('anycubic_cloud_api.data_models.consumable').AnycubicConsumableData
API = mod('anycubic_cloud_api.api.functions').AnycubicAPIFunctions
MQTT = mod('anycubic_cloud_api.api.mqtt').AnycubicMQTTAPI
Upload = mod('anycubic_cloud_api.models.cloud_upload').AnycubicCloudUpload
Errors = mod('anycubic_cloud_api.exceptions.exceptions')
Coordinator = mod('coordinator').AnycubicCloudDataUpdateCoordinator
ROOT = Path(__file__).resolve().parents[1] / 'custom_components/anycubic_cloud'

class Regressions(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.api = API(session=None, cookie_jar=None)
        self.printer = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        self.co = object.__new__(Coordinator)
        self.co._anycubic_printers = {7: self.printer}
        self.co._connect_mqtt_for_action_response = AsyncMock()
        self.co.force_state_update = AsyncMock()
        self.co.last_update_success = True

    async def test_features_accept_mqtt_mapping(self):
        self.printer._process_mqtt_update_info('report', 'done', Payload({'data': {'features': {'auto_leveling_support': 1}}}))
        self.assertEqual(self.printer.features, {'auto_leveling_support': True})

    async def test_secondary_ace_stop_and_stop_all(self):
        self.api._send_anycubic_order = AsyncMock(return_value='accepted')
        p = self.printer
        p._multi_color_box = [types.SimpleNamespace(box_id=i) for i in (0, 1)]
        for box_id, expected in ((1, [1]), (0, [0]), (-1, [0, 1])):
            await self.api.multi_color_box_drying_stop(p, box_id=box_id)
            order = self.api._send_anycubic_order.call_args.kwargs['order_request'].order_request_data
            self.assertEqual([box['id'] for box in order['data']['multi_color_box']], expected)

    async def test_rgb_zero_and_range(self):
        self.api._send_order_multi_color_box_set_slot = AsyncMock(return_value='accepted')
        for color in ((255, 0, 0), (0, 0, 0), (0, 255, 0)):
            await self.api.multi_color_box_set_slot(self.printer, 0, slot_color_red=color[0], slot_color_green=color[1], slot_color_blue=color[2])
        with self.assertRaises(Errors.AnycubicAPIError):
            await self.api.multi_color_box_set_slot(self.printer, 0, slot_color_red=256, slot_color_green=0, slot_color_blue=0)

    async def test_failed_print_does_not_return_success(self):
        self.api.fetch_project_gcode_info_fdm = AsyncMock(return_value=types.SimpleNamespace(id=42, slice_material_info_list=[]))
        self.api._send_order_start_print = AsyncMock(side_effect=Errors.AnycubicFileNotFoundError('offline'))
        with patch('asyncio.sleep', new=AsyncMock()):
            with self.assertRaises(Errors.AnycubicFileNotFoundError):
                await self.api.print_with_cloud_gcode_id(self.printer, 9)
        self.assertEqual(self.api._send_order_start_print.await_count, 3)

    async def test_upload_failure_releases_lock(self):
        api = types.SimpleNamespace(
            _lock_storage_space=AsyncMock(return_value={'id': 3, 'preSignUrl': 'https://offline.invalid'}),
            _fetch_aws_put_resp=AsyncMock(side_effect=OSError('offline')),
            _unlock_storage_space=AsyncMock(), _log_to_debug=Mock(),
        )
        upload = Upload(api, file_name='test.gcode', file_bytes=b'G0 X0', is_temp_file=True)
        with self.assertRaises(Errors.AnycubicAPIError):
            await upload.async_process_upload()
        api._unlock_storage_space.assert_awaited_once_with(3, is_delete_cos=True)

    async def test_upload_cancellation_releases_lock(self):
        api = types.SimpleNamespace(
            _lock_storage_space=AsyncMock(return_value={'id': 3, 'preSignUrl': 'https://offline.invalid'}),
            _fetch_aws_put_resp=AsyncMock(side_effect=asyncio.CancelledError),
            _unlock_storage_space=AsyncMock(), _log_to_debug=Mock(),
        )
        upload = Upload(api, file_name='test.gcode', file_bytes=b'G0 X0', is_temp_file=True)
        with self.assertRaises(asyncio.CancelledError):
            await upload.async_process_upload()
        api._unlock_storage_space.assert_awaited_once_with(3, is_delete_cos=True)

    async def test_failed_connect_resets_client(self):
        client = Mock()
        client.connect.side_effect = OSError('offline')
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt._anycubic_auth = types.SimpleNamespace(get_mqtt_client_id=lambda: 'offline')
        mqtt._set_mqtt_username_password = Mock()
        mqtt.prepare_mqtt_connection()
        with patch.object(mod('anycubic_cloud_api.api.mqtt').mqtt_client, 'Client', return_value=client):
            with self.assertRaises(OSError): mqtt.connect_mqtt()
        self.assertFalse(mqtt.mqtt_is_started)
        self.assertTrue(await mqtt.mqtt_wait_for_disconnect())

    async def test_worker_event_signal_is_thread_safe(self):
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt.prepare_mqtt_connection()
        mqtt._mqtt_client = Mock()
        mqtt._mqtt_transport_connected = True
        mqtt._mqtt_pending_subscriptions = {1}
        waiter = asyncio.create_task(mqtt._mqtt_connected.wait())
        await asyncio.sleep(0)
        errors = []
        def worker():
            try: mqtt._mqtt_on_subscribe(mqtt._mqtt_client, None, 1, (0,))
            except Exception as error: errors.append(error)
        thread = threading.Thread(target=worker); thread.start(); thread.join()
        await asyncio.wait_for(waiter, 1)
        self.assertEqual(errors, [])

    async def test_tls_verifies_server(self):
        context = MQTT(session=None, cookie_jar=None)._mqtt_build_ssl_context()
        self.assertEqual(context.verify_mode, ssl.CERT_REQUIRED)
        self.assertTrue(context.check_hostname)
        self.assertGreaterEqual(context.minimum_version, ssl.TLSVersion.TLSv1_2)

    async def test_registered_control_buttons_dispatch(self):
        p = types.SimpleNamespace(pause_print=AsyncMock(), resume_print=AsyncMock(), cancel_print=AsyncMock())
        self.co._anycubic_printers[7] = p
        for key, method in [('print_pause','pause_print'), ('print_resume','resume_print'), ('print_stop','cancel_print')]:
            await self.co.button_press_event(7, key)
            getattr(p, method).assert_awaited_once()
        self.co.refresh_anycubic_mqtt_connection = AsyncMock()
        await self.co.button_press_event(7, 'manual_mqtt_connection_refresh')
        self.co.refresh_anycubic_mqtt_connection.assert_awaited_once()

    async def test_number_controls_use_printer_methods(self):
        p = types.SimpleNamespace(change_print_setting_target_hotbed_temp=AsyncMock(), change_print_setting_target_nozzle_temp=AsyncMock(), change_print_setting_fan_speed_pct=AsyncMock())
        self.co._anycubic_printers[7] = p
        for key, method in [('target_hotbed_temp', 'change_print_setting_target_hotbed_temp'), ('target_nozzle_temp', 'change_print_setting_target_nozzle_temp'), ('fan_speed_pct', 'change_print_setting_fan_speed_pct')]:
            await self.co.set_number_value(7, key, 60)
            getattr(p, method).assert_awaited_once_with(60)

    async def test_select_uses_advertised_modes(self):
        p = types.SimpleNamespace(change_print_setting_speed_mode=AsyncMock())
        self.co._anycubic_printers[7] = p
        self.co.data = {'printers': {7: {'attributes': {'job_speed_mode': {'available_modes': [{'mode':42, 'description':'Quiet'}, {'mode':99, 'description':'Fast'}], 'print_speed_mode_code':42}}}}}
        select = object.__new__(mod('select').AnycubicSelect)
        select.coordinator = self.co; select._printer_id = 7
        select.entity_description = mod('select').FDM_SELECT_DESCRIPTIONS[0]
        self.co.async_request_refresh = AsyncMock()
        self.assertEqual(select.options, ['Quiet','Fast'])
        self.assertEqual(select.current_option, 'Quiet')
        await select.async_select_option('Fast')
        p.change_print_setting_speed_mode.assert_awaited_once_with(99)
        with self.assertRaises(ValueError): await select.async_select_option('invented')

    async def test_configuration_keeps_falsy_values(self):
        conf = {'use_24hr':False, 'alwaysShow':False, 'showSettingsButton':False, 'monitoredStats':[], 'scaleFactor':1}
        self.assertEqual(mod('helpers').extract_panel_card_config(conf), conf)

    async def test_project_zero_setting_updates(self):
        project = Project(api_parent=None, id=1, taskid=1, gcode_id=1, estimate=100, progress=1, status=1, create_time=int(time.time()), gcode_name='offline', fan_speed_pct=20)
        project._settings = {'supplies_usage':0}
        project._set_print_setting('supplies_usage',10)
        self.assertEqual(project._settings['supplies_usage'],10)
        self.printer._latest_project = project
        self.printer._process_mqtt_update_fan('auto','done',Payload({'data':{'fan_speed_pct':80}}))
        self.assertEqual(self.printer.latest_project_fan_speed_pct,80)

    async def test_empty_file_lists_stay_loaded(self):
        self.printer._local_file_list=[]; self.printer._udisk_file_list=[]
        self.assertEqual(self.printer.local_file_list_object,[])
        self.assertEqual(self.printer.udisk_file_list_object,[])

    async def test_cloud_file_pagination(self):
        files = [types.SimpleNamespace(id=i,data_object={'id':i}) for i in range(23)]
        self.api.get_user_cloud_files = AsyncMock(side_effect=[files[:10], files[10:20], files[20:]])
        self.assertEqual(await self.api.get_user_cloud_files_data_object(),[{'id':i} for i in range(23)])
        self.assertEqual(self.api.get_user_cloud_files.await_count,3)

    async def test_pagination_stops_if_server_repeats_page(self):
        files=[types.SimpleNamespace(id=i,data_object={'id':i}) for i in range(10)]
        self.api.get_user_cloud_files=AsyncMock(return_value=files)
        self.assertEqual(len(await self.api.get_user_cloud_files_data_object()),10)
        self.assertEqual(self.api.get_user_cloud_files.await_count,2)

    async def test_failed_coordinator_does_not_return_stale_success(self):
        self.co.last_update_success=False; self.co._last_state_update=int(time.time())
        self.co.get_anycubic_updates=AsyncMock(return_value=False)
        from homeassistant.helpers.update_coordinator import UpdateFailed
        with self.assertRaises(UpdateFailed): await self.co._async_update_data()

    async def test_services_are_registered_and_described(self):
        import yaml
        descriptions=yaml.safe_load((ROOT/'services.yaml').read_text())
        services=mod('services').SERVICES
        self.assertEqual(set(descriptions),{name for name,_ in services})
        self.assertEqual(descriptions['print_and_upload_save_in_cloud']['fields']['uploaded_gcode_file']['selector'],{'file':{'accept':'.gcode'}})
        self.assertIn('print_existing_cloud_file',descriptions)

    async def test_service_handler_has_no_shared_request_state(self):
        service=mod('services').AnycubicCloudServiceCall(types.SimpleNamespace())
        self.assertFalse(hasattr(service,'_device_id'))
        service._get_coordinator=lambda _: types.SimpleNamespace(get_printer_for_device_id=lambda _:self.printer, get_printer_for_id=lambda _:self.printer)
        for data in ({'device_id':'A'},{'printer_id':7}):
            self.assertIs(service._get_printer(types.SimpleNamespace(data=data)),self.printer)
        self.assertFalse(hasattr(service,'_device_id'))

    async def test_unknown_firmware_is_none(self):
        update=object.__new__(mod('update').AnycubicUpdateEntity)
        update.coordinator=self.co;update._printer_id=7
        update.entity_description=types.SimpleNamespace(key='fw_version')
        self.co.data={'printers':{7:{'states':{'fw_version':None},'attributes':{'fw_version':{'latest_version':None}}}}}
        self.assertIsNone(update.installed_version)
        self.assertIsNone(update.latest_version)

    async def test_device_mapping_updates_when_second_ace_arrives(self):
        module = mod('coordinator')
        const = mod('const')
        self.co.hass = types.SimpleNamespace()
        self.co.entry = types.SimpleNamespace(entry_id='entry', data={const.CONF_PRINTER_ID_LIST:[7]})
        def device(**kwargs):
            identifiers = kwargs['identifiers']
            name = next(iter(identifiers))[1]
            device_id = ('bridge' if name.startswith('cloud_bridge') else
                         'ace2' if name.startswith('ace_secondary') else
                         'ace1' if name.startswith('ace_primary') else 'printer')
            return types.SimpleNamespace(id=device_id)
        registry = types.SimpleNamespace(async_get_or_create=Mock(side_effect=device))
        states = {'id':7,'name':'Printer','machine_name':'Kobra S1',
                  'machine_mac':'00:11:22:33:44:55','fw_version':'1.0',
                  'supports_function_multi_color_box':True,'connected_ace_units':1}
        data = {'user_info':{'id':17},'printers':{7:{'states':states}}}
        with patch.object(module,'async_get_device_registry',return_value=registry):
            await self.co._register_printer_devices(data)
            self.assertNotIn('ace2',self.co._printer_device_map)
            states['connected_ace_units']=2
            await self.co._register_printer_devices(data)
        self.assertEqual(self.co._printer_device_map,{'printer':7,'ace1':7,'ace2':7})
        self.assertIs(self.co.get_printer_for_device_id('ace2'),self.printer)
        printer_call=registry.async_get_or_create.call_args_list[1].kwargs
        self.assertEqual(printer_call['serial_number'],'7')
        self.assertEqual(printer_call['connections'],{('mac','00:11:22:33:44:55')})
        self.assertEqual(printer_call['via_device_id'],'bridge')
        self.assertEqual(registry.async_get_or_create.call_args.kwargs['via_device_id'],'printer')

    async def test_token_storage_is_scoped_and_reused_only_for_same_credentials(self):
        module=mod('coordinator'); const=mod('const')
        self.co.hass=types.SimpleNamespace()
        self.co.entry=types.SimpleNamespace(entry_id='account-A',options={},data={
            const.CONF_USER_TOKEN:'source-token',const.CONF_USER_AUTH_MODE:2,
            const.CONF_USER_DEVICE_ID:'device',const.CONF_PRINTER_ID_LIST:[7],
        })
        api=types.SimpleNamespace(set_authentication=Mock(),load_auth_config_from_dict=Mock(),
             check_api_tokens=AsyncMock(return_value=True),printer_info_for_id=AsyncMock(return_value=self.printer),
             get_auth_config_dict=Mock(return_value={'auth_token':'refreshed'}),mark_auth_config_saved=Mock(),
             set_mqtt_log_all_messages=Mock(),set_log_api_call_info=Mock())
        cache={'source_token':'source-token','source_auth_mode':2,'source_device_id':'device','auth':{'auth_token':'cached'}}
        store=types.SimpleNamespace(async_load=AsyncMock(return_value=cache),async_save=AsyncMock())
        keys=[]
        class FakeStore:
            @classmethod
            def __class_getitem__(cls, _): return cls
            def __new__(cls, *args):
                keys.append(args[-1])
                return store
        with patch.object(module,'Store',FakeStore), patch.object(module,'AnycubicAPI',return_value=api), patch.object(module,'async_create_clientsession',return_value=object()):
            await self.co._setup_anycubic_api_connection()
            self.assertEqual(keys[-1],f'{const.STORAGE_KEY}.account-A')
            api.load_auth_config_from_dict.assert_called_once_with({'auth_token':'cached'})
            api.load_auth_config_from_dict.reset_mock()
            self.co.entry.data[const.CONF_USER_TOKEN]='new-reauth-token'
            await self.co._setup_anycubic_api_connection()
            api.load_auth_config_from_dict.assert_not_called()
        self.assertEqual(store.async_save.call_args.args[0]['source_token'],'new-reauth-token')

    async def test_panel_lifetime_across_accounts(self):
        panel=mod('panel')
        const=mod('const')
        def entry(enabled,conf=None):return types.SimpleNamespace(entry=types.SimpleNamespace(options={const.CONF_ENABLE_PANEL:enabled,const.CONF_CARD_CONFIG:conf}))
        hass=types.SimpleNamespace(data={const.DOMAIN:{'a':{const.COORDINATOR:entry(True)},'b':{const.COORDINATOR:entry(False)}}})
        with patch.object(panel,'async_register_panel',new=AsyncMock()) as register, patch.object(panel,'async_unregister_panel',new=AsyncMock()) as unregister:
            await panel.async_sync_panel(hass)
            register.assert_awaited_once()
            hass.data['frontend_panels']={const.DOMAIN:object()}
            await panel.async_sync_panel(hass)
            self.assertEqual(register.await_count,1)
            hass.data[const.DOMAIN].pop('a')
            await panel.async_sync_panel(hass)
            self.assertGreaterEqual(unregister.await_count,2)

if __name__=='__main__':unittest.main(verbosity=2)
