"""Behavioral regression tests for the second audit, using HA 2026.9.3 offline."""
import asyncio
import time
import types
import unittest
from unittest.mock import (
    AsyncMock,
    Mock,
    patch,
)

import voluptuous as vol
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.update_coordinator import UpdateFailed
from test_regressions import (
    API,
    MQTT,
    Coordinator,
    Errors,
    Payload,
    Printer,
    Project,
    mod,
)


class SecondAudit(unittest.IsolatedAsyncioTestCase):
    async def test_coordinator_initializes_with_real_ha(self):
        from homeassistant.core import HomeAssistant
        hass = HomeAssistant('/tmp/anycubic-offline-regressions')
        entry = types.SimpleNamespace(options={}, async_on_unload=Mock())
        co = Coordinator(hass, entry)
        self.assertIs(co.config_entry, entry)
        self.assertIs(co.hass, hass)

    def printer(self):
        return Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)

    async def test_disconnect_clears_readiness_without_losing_worker(self):
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt.prepare_mqtt_connection()
        mqtt._mqtt_client = Mock()
        mqtt._mqtt_transport_connected = True
        mqtt._mqtt_ready = True
        mqtt._mqtt_connected.set()
        mqtt._set_mqtt_username_password = Mock()
        mqtt._mqtt_on_disconnect(mqtt._mqtt_client, None, 1)
        self.assertFalse(mqtt.mqtt_is_connected)
        self.assertFalse(await mqtt.mqtt_wait_for_connect())
        await asyncio.sleep(0)
        self.assertFalse(mqtt._mqtt_connected.is_set())
        self.assertTrue(mqtt.mqtt_is_started)
        with self.assertRaises(Errors.AnycubicMQTTClientError):
            mqtt._mqtt_publish_on_topic('offline', {})

    async def test_all_subscriptions_must_be_acknowledged(self):
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt.prepare_mqtt_connection()
        client = Mock()
        results = iter([(0, 1), (0, 2), (0, 3), (0, 4)])

        def subscribe(topic):
            self.assertFalse(mqtt.mqtt_is_connected)
            return next(results)
        client.subscribe.side_effect = subscribe
        mqtt._mqtt_client = client
        mqtt._build_mqtt_user_subscription = Mock(return_value=['user/a', 'user/b'])
        mqtt._build_mqtt_printer_subscription = Mock(return_value=['printer/a', 'printer/b'])
        mqtt._mqtt_subscribed_printers = {'offline': self.printer()}
        mqtt._mqtt_callback_subscribed = Mock()
        mqtt._mqtt_on_connect(client, None, {}, 0)
        for mid in (1, 2, 3):
            mqtt._mqtt_on_subscribe(client, None, mid, (0,))
            self.assertFalse(mqtt.mqtt_is_connected)
        mqtt._mqtt_on_subscribe(client, None, 4, (1,))
        await asyncio.sleep(0)
        self.assertTrue(await mqtt.mqtt_wait_for_connect())
        mqtt._mqtt_callback_subscribed.assert_called_once()
        client.publish.return_value = types.SimpleNamespace(rc=4)
        with self.assertRaises(Errors.AnycubicMQTTClientError):
            mqtt._mqtt_publish_on_topic('offline', {})

    async def test_rejected_subscription_never_becomes_ready(self):
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt.prepare_mqtt_connection()
        mqtt._mqtt_client = Mock()
        mqtt._mqtt_transport_connected = True
        mqtt._mqtt_pending_subscriptions = {1, 2}
        mqtt._mqtt_callback_subscribed = Mock()
        mqtt._mqtt_on_subscribe(mqtt._mqtt_client, None, 1, (128,))
        mqtt._mqtt_on_subscribe(mqtt._mqtt_client, None, 2, (0,))
        await asyncio.sleep(0)
        self.assertFalse(mqtt._mqtt_connected.is_set())
        self.assertFalse(mqtt.mqtt_is_connected)
        mqtt._mqtt_client.disconnect.assert_called_once()
        mqtt._mqtt_callback_subscribed.assert_not_called()

    async def test_second_ace_firmware_growth_reorder_removal_and_ota(self):
        p = self.printer()
        fw = {'need_update': 0, 'firmware_version': '1.0', 'box_id': 0}
        p._update_multi_color_box_fw_version_from_json([fw])
        primary = p._firmware_for_ace(0)
        primary.set_is_updating(True)
        p._update_multi_color_box_fw_version_from_json([{**fw, 'box_id': 1, 'firmware_version': '2.0'}, fw])
        self.assertIs(primary, p._firmware_for_ace(0))
        self.assertTrue(primary.is_updating)
        self.assertEqual(p.primary_multi_color_box_fw_firmware_version, '1.0')
        self.assertEqual(p.secondary_multi_color_box_fw_firmware_version, '2.0')
        p._process_mqtt_update_ota_multicolorbox('reportVersion', 'done', Payload({'data': {'firmware_version': '2.1'}}), 1)
        self.assertEqual(p.secondary_multi_color_box_fw_firmware_version, '2.1')
        p._update_multi_color_box_fw_version_from_json([{**fw, 'box_id': 1, 'firmware_version': '2.1'}])
        self.assertIsNone(p.primary_multi_color_box_fw_firmware_version)
        self.assertEqual(p.secondary_multi_color_box_fw_firmware_version, '2.1')
        p._update_multi_color_box_fw_version_from_json([])
        self.assertIsNone(p.secondary_multi_color_box_fw_firmware_version)

    async def test_mqtt_failures_reach_cooldown(self):
        const = mod('const')
        co = object.__new__(Coordinator)
        co._failed_updates = 0
        co._update_cooldown_until = 0
        co._consecutive_cooldown_periods = 0
        co.entry = types.SimpleNamespace(options={const.CONF_UPDATE_RETRY_COUNT: 0})
        co._anycubic_printers = {7: types.SimpleNamespace(update_info_from_api=AsyncMock())}
        co._check_or_save_tokens = AsyncMock()
        co._check_anycubic_mqtt_connection = AsyncMock(side_effect=Errors.AnycubicAPIError('offline'))
        for i in range(const.MAX_FAILED_UPDATES):
            with self.assertRaises(UpdateFailed):
                await co.get_anycubic_updates()
            self.assertEqual(co._failed_updates, i + 1)
        self.assertFalse(await co.get_anycubic_updates())
        self.assertGreater(co._update_cooldown_until, time.time())

    async def test_failed_auto_feed_can_be_retried_and_toggle_rolls_forward_on_success(self):
        api = API(session=None, cookie_jar=None)
        box = types.SimpleNamespace(box_id=0, auto_feed=False)
        box.set_auto_feed = lambda value: setattr(box, 'auto_feed', value)
        p = self.printer()
        p._multi_color_box = [box]
        api._send_order_multi_color_auto_feed = AsyncMock(side_effect=[Errors.AnycubicAPIError('offline'), 'ack'])
        with self.assertRaises(Errors.AnycubicAPIError):
            await api.multi_color_box_switch_on_auto_feed(p, 0)
        self.assertFalse(box.auto_feed)
        self.assertEqual(await api.multi_color_box_switch_on_auto_feed(p, 0), 'ack')
        self.assertTrue(box.auto_feed)
        self.assertEqual(api._send_order_multi_color_auto_feed.await_count, 2)
        api._send_order_multi_color_auto_feed = AsyncMock(side_effect=Errors.AnycubicAPIError('offline'))
        with self.assertRaises(Errors.AnycubicAPIError):
            await api.multi_color_box_switch_off_auto_feed(p, 0)
        self.assertTrue(box.auto_feed)
        with self.assertRaises(Errors.AnycubicAPIError):
            await api.multi_color_box_toggle_auto_feed(p, 0)
        self.assertTrue(box.auto_feed)
        with self.assertRaises(Errors.AnycubicAPIError):
            await api.multi_color_box_switch_on_auto_feed(p, 1)

    async def test_service_schema_accepts_printer_or_device_and_rejects_invalid_slots(self):
        services = mod('services')
        const = mod('const')
        schema = services.build_anycubic_service_schema(with_slot_number=True, with_opt_box=True)
        for target in ({'printer_id': 7}, {'device_id': 'offline'}, {'device_id': ['offline']}):
            data = schema({'config_entry': 'offline', 'slot_number': 1, 'box_id':0,**target})
            self.assertEqual(data['slot_number'], 1)
        for values in ({'slot_number': 0}, {'slot_number': 5}, {'slot_number': 1,'box_id':2},{'slot_number':1,'device_id':[]}):
            with self.assertRaises(vol.Invalid):
                schema({'config_entry': 'offline', 'printer_id': 7, **values})
        handler = services.AnycubicCloudServiceCall(types.SimpleNamespace())
        printer = self.printer()
        printer._multi_color_box = [types.SimpleNamespace(box_id=0)]
        handler._get_printer = Mock(return_value=printer)
        with self.assertRaises(ServiceValidationError):
            handler._get_box_id(types.SimpleNamespace(data={const.CONF_BOX_ID: 1}))
        self.assertEqual(handler._get_box_id(types.SimpleNamespace(data={})), 0)

    async def test_invalid_ace_commands_never_reach_cloud(self):
        api = API(session=None, cookie_jar=None)
        api._send_anycubic_order = AsyncMock()
        printer = self.printer()
        printer._multi_color_box = [types.SimpleNamespace(box_id=i) for i in (0, 1)]
        color = mod('anycubic_cloud_api.data_models.printer_properties').AnycubicMaterialColor(255, 0, 0)
        for slot, box in ((-1, 0), (4, 0), (0, -1), (0, 2)):
            with self.assertRaises(Errors.AnycubicAPIError):
                await api._send_order_multi_color_box_set_slot(printer, slot, color, 'PLA', box)
            with self.assertRaises(Errors.AnycubicAPIError):
                await api._send_order_multi_color_box_feed_filament(printer, slot, 1, box)
        api._send_anycubic_order.assert_not_awaited()

    async def test_single_material_gcode_and_bad_indices(self):
        Gcode = mod('anycubic_cloud_api.data_models.gcode_file').AnycubicGcodeFile
        g = await Gcode.async_read_from_file(file_bytes=b'; filament used [g] = 1.2\n; filament used [mm] = 25\n; paint_info = [{"paint_index":0}]\n')
        self.assertEqual(g.material_list[0]['filament_used'], 1.2)
        self.assertEqual(g.material_list[0]['filament_used_mm'], 25)
        for index in (-1, 2, '0', True):
            g = Gcode({'filament_used_g': [1.2], 'paint_info': [{'paint_index': index}]})
            with self.assertRaises(Errors.AnycubicGcodeParsingError):
                _ = g.material_list

    async def test_missing_pause_is_not_a_pause(self):
        p = Project(api_parent=None, id=1, taskid=1, gcode_id=1, estimate=100,progress=1,status=1,create_time=int(time.time()),gcode_name='offline',print_status=1)
        self.assertTrue(p.print_in_progress)
        self.assertFalse(p.print_is_paused)
        p._pause = 1
        self.assertTrue(p.print_is_paused)

    async def test_update_percentage_is_separate_from_activity(self):
        u = object.__new__(mod('update').AnycubicUpdateEntity)
        attrs = {'in_progress': 37.5}
        u.coordinator = types.SimpleNamespace(data={'printers': {7: {'states': {}, 'attributes':{'fw_version':attrs}}}})
        u._printer_id = 7
        u.entity_description = types.SimpleNamespace(key='fw_version')
        self.assertTrue(u.in_progress)
        self.assertEqual(u.update_percentage, 37.5)
        attrs['in_progress'] = False
        self.assertIsNone(u.update_percentage)
        self.assertFalse(u.in_progress)

    async def test_entity_identity_is_stable_and_account_scoped(self):
        h = mod('helpers')
        co = types.SimpleNamespace(data={'user_info': {'id': 17}, 'printers':{7:{'states':{'machine_mac':None}}}})
        before = h.printer_entity_unique_id(co, 7, 'status')
        co.data['printers'][7]['states']['machine_mac'] = '00:11:22:33:44:55'
        self.assertEqual(before, h.printer_entity_unique_id(co, 7, 'status'))
        self.assertEqual(h.printer_entity_unique_id(co, 7, 'manual', global_entity=True), h.printer_entity_unique_id(co, 8,'manual',global_entity=True))
        co.data['user_info']['id'] = 18
        self.assertNotEqual(before, h.printer_entity_unique_id(co, 7, 'status'))

    async def test_capabilities_can_arrive_later_and_globals_only_appear_once(self):
        const = mod('const')
        co = object.__new__(Coordinator)
        co.hass = types.SimpleNamespace()
        co._unregistered_descriptors = {}
        co._anycubic_printers = {i: Printer(api_parent=None, machine_type=0, machine_name='offline', id=i) for i in (7, 8)}
        co.entry = types.SimpleNamespace(data={const.CONF_PRINTER_ID_LIST: [7, 8]}, options={}, async_on_unload=Mock())
        listeners = []
        co.async_add_listener = lambda cb: listeners.append(cb)
        co.data = {'printers': {i: {'states': {'supports_function_multi_color_box': False,'connected_ace_units':0},'attributes':{'current_status':{'material_type':'Filament'}}} for i in (7,8)}}
        added = []
        co.add_entities_for_seen_printers(added.extend, lambda *args: (args[2], args[3].key), 'update', mod('update').PRIMARY_MULTI_COLOR_BOX_UPDATE_TYPES)
        self.assertEqual(added, [])
        co._anycubic_printers[7]._multi_color_box = [types.SimpleNamespace(box_id=0)]
        co.data['printers'][7]['states'].update(supports_function_multi_color_box=True, connected_ace_units=1)
        listeners[0]()
        listeners[0]()
        self.assertEqual(added, [(7, 'multi_color_box_fw_version')])
        global_added = []
        co.add_entities_for_seen_printers(global_added.extend, lambda *args: args[3].key, 'switch', mod('switch').GLOBAL_SWITCH_TYPES)
        listeners[-1]()
        self.assertEqual(global_added, ['manual_mqtt_connection_enabled'])

    async def test_legacy_registry_migration_keeps_entity_ids_and_disables_duplicates(self):
        module = mod('__init__')
        entities = [types.SimpleNamespace(entity_id='sensor.renamed', domain='sensor', unique_id='oldmac-job_state', device_id='printer', disabled_by=None),types.SimpleNamespace(entity_id='switch.bridge_a',domain='switch',unique_id='oldmac-manual_mqtt_connection_enabled',device_id='bridge',disabled_by=None),types.SimpleNamespace(entity_id='switch.bridge_b',domain='switch',unique_id='othermac-manual_mqtt_connection_enabled',device_id='bridge',disabled_by=None)]
        entities.append(
    types.SimpleNamespace(
        entity_id="sensor.ace_secondary",
        domain="sensor",
        unique_id="oldmac-secondary_ace_spools",
        device_id="disconnected_ace",
         disabled_by=None))
        ids = {}
        updates = []
        registry = types.SimpleNamespace(async_get_entity_id=lambda d, p, u: ids.get((d, u)))

        def update(eid, **kwargs):
            updates.append((eid, kwargs))
            if 'new_unique_id' in kwargs:
                ids[(eid.split('.')[0], kwargs['new_unique_id'])] = eid
            entity = next(item for item in entities if item.entity_id == eid)
            if 'new_unique_id' in kwargs:
                entity.unique_id = kwargs['new_unique_id']
            if 'disabled_by' in kwargs:
                entity.disabled_by = kwargs['disabled_by']
        registry.async_update_entity = update
        co = types.SimpleNamespace(_printer_device_map={'printer': 7}, data={'user_info': {'id': 17}})
        device_registry = types.SimpleNamespace(async_get=lambda _: types.SimpleNamespace(
            identifiers={('anycubic_cloud', 'ace_secondary_7')}))
        with patch.object(module.er, 'async_get', return_value=registry), patch.object(module.er, 'async_entries_for_config_entry', return_value=entities),patch.object(module.dr,'async_get',return_value=device_registry):
            module._migrate_entity_ids(types.SimpleNamespace(), types.SimpleNamespace(entry_id='offline'), co)
            count = len(updates)
            module._migrate_entity_ids(types.SimpleNamespace(), types.SimpleNamespace(entry_id='offline'), co)
            self.assertEqual(len(updates), count)
        self.assertIn(('sensor.renamed', {'new_unique_id': '17:7:job_state'}), updates)
        self.assertIn(('switch.bridge_a', {'new_unique_id': '17:bridge:manual_mqtt_connection_enabled'}), updates)
        self.assertEqual(updates[-1][0], 'switch.bridge_b')
        self.assertIn('disabled_by', updates[-1][1])

        self.assertIn(('sensor.ace_secondary', {'new_unique_id': '17:7:secondary_ace_spools'}), updates)
