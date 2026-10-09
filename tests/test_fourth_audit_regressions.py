"""Fourth audit behavior checks against HA 2026.9.3, entirely offline."""
import asyncio
import threading
import types
import unittest
from unittest.mock import (
    AsyncMock,
    Mock,
    patch,
)

import aiohttp
from homeassistant.exceptions import ConfigEntryAuthFailed, ServiceValidationError
from test_regressions import (
    API,
    MQTT,
    Coordinator,
    Errors,
    Printer,
    mod,
)
from test_third_audit_regressions import ace


class ResponseContext:
    def __init__(self, status, payload):
        error = aiohttp.ClientResponseError(types.SimpleNamespace(real_url='https://offline.invalid'), (), status=status)
        self.response = types.SimpleNamespace(
            url='https://offline.invalid', json=AsyncMock(return_value=payload), text=AsyncMock(return_value=''),
            raise_for_status=Mock(side_effect=error if status >= 400 else None))

    async def __aenter__(self):
        return self.response

    async def __aexit__(self, *args):
        return False


class FourthAudit(unittest.IsolatedAsyncioTestCase):
    def api(self, status=401):
        api = API(session=Mock(), cookie_jar=None)
        api.set_authentication(auth_token='offline')
        api._session.get.return_value = ResponseContext(status, {'data': None})
        return api

    async def test_services_target_existing_ace_ids_instead_of_count(self):
        services = mod('services')
        printer = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        call = services.AnycubicCloudServiceCall(types.SimpleNamespace())
        call._get_printer = Mock(return_value=printer)
        for ids in ([1], [0], [1, 0], []):
            printer._set_multi_color_box([ace(i) for i in ids])
            for box_id in (0, 1, 2):
                service = types.SimpleNamespace(data={services.CONF_BOX_ID: box_id})
                if box_id in ids:
                    self.assertEqual(call._get_box_id(service), box_id)
                else:
                    with self.assertRaises(ServiceValidationError):
                        call._get_box_id(service)

    async def test_unloaded_config_entry_is_a_service_validation_error(self):
        services = mod('services')
        entry = types.SimpleNamespace(entry_id='offline')
        for data in ({}, {services.DOMAIN: {}}, {services.DOMAIN: {'offline': {}}}):
            hass = types.SimpleNamespace(data=data, config_entries=types.SimpleNamespace(async_get_entry=Mock(return_value=entry)))
            with self.assertRaisesRegex(ServiceValidationError, 'not loaded'):
                services.AnycubicCloudServiceCall(hass)._get_coordinator(
                    types.SimpleNamespace(data={services.ATTR_CONFIG_ENTRY: 'offline'}))
        coordinator = object()
        hass.data = {services.DOMAIN: {'offline': {services.COORDINATOR: coordinator}}}
        self.assertIs(services.AnycubicCloudServiceCall(hass)._get_coordinator(
            types.SimpleNamespace(data={services.ATTR_CONFIG_ENTRY: 'offline'})), coordinator)

    async def test_api_401_triggers_ha_reauthentication(self):
        co = object.__new__(Coordinator)
        co._anycubic_api = self.api()
        with patch('asyncio.sleep', new=AsyncMock()):
            with self.assertRaises(ConfigEntryAuthFailed):
                await co._check_or_save_tokens()
        self.assertEqual(co.anycubic_api._session.get.call_count, 2)

    async def test_api_401_refreshes_cached_tokens_when_possible(self):
        api = self.api()
        api._anycubic_auth = Mock()
        api._anycubic_auth.requires_access_token = False
        api._anycubic_auth.requires_user_agent = False
        api._anycubic_auth.get_auth_headers.return_value = {}
        api._anycubic_auth.clear_cached_access_user_token.return_value = True
        api._session.get.side_effect = [ResponseContext(401, {}), ResponseContext(401, {}), ResponseContext(200, {'data': {'id': 7, 'user_email': 'offline@example.invalid'}})]
        with patch('asyncio.sleep', new=AsyncMock()):
            self.assertTrue(await api.check_api_tokens())
        api._anycubic_auth.clear_cached_access_user_token.assert_called_once()
        self.assertTrue(api.tokens_changed)

    async def test_non_auth_and_upload_failures_do_not_trigger_token_refresh(self):
        for status in (403, 429, 503):
            with self.subTest(status=status):
                with self.assertRaises(Errors.AnycubicAPIParsingError):
                    await self.api(status).check_api_tokens()
        api = self.api()
        api._session.put.return_value = ResponseContext(401, {})
        with self.assertRaises(Errors.AnycubicAPIParsingError):
            await api._fetch_aws_put_resp('https://offline.invalid', b'offline')
        with self.assertRaises(Errors.AnycubicAPIParsingError):
            await api._fetch_api_resp(mod('anycubic_cloud_api.const.api_endpoints').API_ENDPOINT.user_info, with_token=False)

    async def test_stale_mqtt_callbacks_cannot_modify_active_client(self):
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt.prepare_mqtt_connection()
        current, stale = Mock(), Mock()
        mqtt._mqtt_client = current
        mqtt._mqtt_ready = True
        mqtt._mqtt_transport_connected = True
        mqtt._mqtt_message_router = Mock()
        mqtt._mqtt_on_connect(stale, None, {}, 0)
        mqtt._mqtt_on_disconnect(stale, None, 0)
        mqtt._mqtt_on_subscribe(stale, None, 1, (128,))
        mqtt._mqtt_on_message(stale, None, Mock())
        self.assertTrue(mqtt.mqtt_is_connected)
        self.assertIs(mqtt._mqtt_client, current)
        mqtt._mqtt_message_router.assert_not_called()
        stale.disconnect.assert_not_called()

    async def test_old_worker_cleanup_cannot_delete_replacement_client(self):
        mqtt = MQTT(session=None, cookie_jar=None)
        mqtt.prepare_mqtt_connection()
        mqtt._anycubic_auth = types.SimpleNamespace(get_mqtt_client_id=lambda: 'offline')
        mqtt._set_mqtt_username_password = Mock()
        mqtt._mqtt_build_ssl_context = Mock()
        old, current = Mock(), Mock()
        entered, release = threading.Event(), threading.Event()
        old.loop_forever.side_effect = lambda: (entered.set(), release.wait(3))
        with patch.object(mod('anycubic_cloud_api.api.mqtt').mqtt_client, 'Client', return_value=old):
            task = asyncio.get_running_loop().run_in_executor(None, mqtt.connect_mqtt)
            try:
                self.assertTrue(await asyncio.to_thread(entered.wait, 2))
                mqtt._mqtt_client = current
                mqtt._mqtt_ready = mqtt._mqtt_transport_connected = True
                release.set()
                await task
                self.assertIs(mqtt._mqtt_client, current)
                self.assertTrue(mqtt.mqtt_is_connected)
            finally:
                release.set()
                await task

    async def test_stop_waits_for_executor_worker_without_cancelling_it(self):
        co = object.__new__(Coordinator)
        co._anycubic_printers = {}
        co._anycubic_api = types.SimpleNamespace(disconnect_mqtt=Mock(), mqtt_wait_for_disconnect=AsyncMock(return_value=True))
        entered, release = threading.Event(), threading.Event()
        loop = asyncio.get_running_loop()
        co.hass = types.SimpleNamespace(async_add_executor_job=lambda fn: loop.run_in_executor(None, fn))
        def worker():
            entered.set()
            return release.wait(3)
        worker_future = co._mqtt_task = loop.run_in_executor(None, worker)
        self.assertTrue(await asyncio.to_thread(entered.wait, 2))
        stop = asyncio.create_task(co._stop_anycubic_mqtt_connection())
        try:
            await asyncio.sleep(0.05)
            self.assertFalse(stop.done())
            self.assertFalse(worker_future.cancelled())
            self.assertIs(co._mqtt_task, worker_future)
            release.set()
            await stop
            self.assertIsNone(co._mqtt_task)
        finally:
            release.set()
            await stop

    async def test_stop_timeout_retains_live_worker_for_later_cleanup(self):
        co = object.__new__(Coordinator)
        co._anycubic_printers = {}
        co._anycubic_api = types.SimpleNamespace(disconnect_mqtt=Mock(), mqtt_wait_for_disconnect=AsyncMock(return_value=True))
        co.hass = types.SimpleNamespace(async_add_executor_job=lambda fn: asyncio.get_running_loop().run_in_executor(None, fn))
        worker = co._mqtt_task = asyncio.get_running_loop().create_future()
        real_timeout = asyncio.timeout
        with patch('asyncio.timeout', side_effect=lambda seconds: real_timeout(0.01)):
            await co._stop_anycubic_mqtt_connection()
        self.assertIs(co._mqtt_task, worker)
        self.assertFalse(worker.cancelled())
        worker.set_result(None)
        await co._stop_anycubic_mqtt_connection()
        self.assertIsNone(co._mqtt_task)
