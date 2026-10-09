"""Regression coverage for explicit TLS policy and unknown firmware metadata."""
import ssl
import types
import unittest
from unittest.mock import (
    AsyncMock,
    Mock,
    PropertyMock,
    patch,
)

from test_deep_audit_regressions import StoreFake
from test_regressions import (
    MQTT,
    ROOT,
    Coordinator,
    Errors,
    Printer,
    mod,
)


class Release099(unittest.IsolatedAsyncioTestCase):
    async def test_tls_defaults_and_explicit_compatibility(self):
        logger = Mock()
        for verified in (True, False):
            api = MQTT(session=None, cookie_jar=None, mqtt_verify_tls=verified, debug_logger=logger)
            context = api._mqtt_build_ssl_context()
            self.assertEqual(context.check_hostname, verified)
            self.assertEqual(context.verify_mode, ssl.CERT_REQUIRED if verified else ssl.CERT_NONE)
            self.assertGreaterEqual(context.minimum_version, ssl.TLSVersion.TLSv1_2)
            self.assertFalse(any(c['auth'] == 'auth-null' for c in context.get_ciphers()))
        logger.warning.assert_called_once()
        self.assertTrue(MQTT(session=None, cookie_jar=None)._mqtt_build_ssl_context().check_hostname)

    async def test_mqtt_connection_failure_never_downgrades_or_retries_insecurely(self):
        module = mod('anycubic_cloud_api.api.mqtt')
        for verified in (True, False):
            api = MQTT(session=None, cookie_jar=None, mqtt_verify_tls=verified)
            api.prepare_mqtt_connection()
            api._anycubic_auth = types.SimpleNamespace(get_mqtt_client_id=lambda: 'offline')
            api._set_mqtt_username_password = Mock()
            client = Mock()
            client.connect.side_effect = ssl.SSLCertVerificationError('offline certificate failure')
            with patch.object(module.mqtt_client, 'Client', return_value=client):
                with self.assertRaises(ssl.SSLCertVerificationError):
                    api.connect_mqtt()
            client.connect.assert_called_once()
            client.tls_insecure_set.assert_called_once_with(not verified)
            context = client.tls_set_context.call_args.args[0]
            self.assertEqual(context.check_hostname, verified)
            self.assertEqual(api._mqtt_verify_tls, verified)
            self.assertFalse(api.mqtt_is_started)
            client.loop_forever.assert_not_called()

    async def test_options_default_and_saved_false_survive_all_steps(self):
        module, const = mod('config_flow'), mod('const')
        for options, expected in (({}, True), ({const.CONF_MQTT_VERIFY_TLS: False}, False)):
            flow = module.AnycubicCloudOptionsFlowHandler()
            flow.async_show_form = Mock(side_effect=lambda **kw: kw)
            flow.async_create_entry = Mock(side_effect=lambda **kw: kw)
            with patch.object(type(flow), 'config_entry', new_callable=PropertyMock,
                              return_value=types.SimpleNamespace(options=options)):
                form = await flow.async_step_mqtt_presets()
                validated = form['data_schema']({})
                self.assertIs(validated[const.CONF_MQTT_VERIFY_TLS], expected)
                validated[const.CONF_MQTT_VERIFY_TLS] = False
                await flow.async_step_mqtt_presets(validated)
                await flow.async_step_card_config({const.CONF_ENABLE_PANEL: True})
                result = await flow.async_step_debug({})
            self.assertIs(result['data'][const.CONF_MQTT_VERIFY_TLS], False)
            self.assertTrue(result['data'][const.CONF_ENABLE_PANEL])

    async def test_coordinator_passes_tls_option_to_client(self):
        module, const = mod('coordinator'), mod('const')
        for options, expected in (({}, True), ({const.CONF_MQTT_VERIFY_TLS: False}, False)):
            co = object.__new__(Coordinator)
            co.hass = types.SimpleNamespace()
            co.entry = types.SimpleNamespace(entry_id='offline', options=options,
                                            data={const.CONF_USER_TOKEN: 'offline', const.CONF_PRINTER_ID_LIST: [7]})
            api = Mock()
            api.check_api_tokens = AsyncMock(return_value=True)
            api.printer_info_for_id = AsyncMock(return_value=object())
            co._save_auth_data = AsyncMock()
            StoreFake.instance = types.SimpleNamespace(async_load=AsyncMock(return_value=None))
            with patch.object(module, 'Store', StoreFake), patch.object(module, 'AnycubicAPI', return_value=api) as constructor, patch.object(module, 'async_create_clientsession'):
                await co._setup_anycubic_api_connection()
            self.assertIs(constructor.call_args.kwargs['mqtt_verify_tls'], expected)

    async def test_unknown_ace_firmware_does_not_hide_known_box(self):
        p = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        for data in ([{'box_id': 2}, {'box_id': 1, 'firmware_version': '1.0', 'need_update': 0}],
                     [{'box_id': 1, 'firmware_version': '1.1', 'need_update': 0}, {'box_id': 99}]):
            with self.assertLogs(mod('anycubic_cloud_api.data_models.printer')._LOGGER, level='WARNING'):
                p._update_multi_color_box_fw_version_from_json(data)
            self.assertEqual([fw.box_id for fw in p._multi_color_box_fw_version], [1])
            self.assertIsNone(p._firmware_for_ace(0))
            self.assertIsNotNone(p._firmware_for_ace(1))
        with self.assertRaises(Errors.AnycubicDataParsingError):
            p._update_multi_color_box_fw_version_from_json([{'box_id': 0, 'need_update': 0, 'firmware_version': '1.0'}, {'box_id': 0, 'need_update': 0, 'firmware_version': '1.0'}])
        with self.assertRaises(Errors.AnycubicDataParsingError):
            p._update_multi_color_box_fw_version_from_json(['invalid'])

    async def test_translation_sources_and_changelog_structure(self):
        import json
        for language in ('en', 'de'):
            source = json.loads((ROOT / f'translations/input_translation_files/{language}.json').read_text())
            output = json.loads((ROOT / f'translations/{language}.json').read_text())
            key = mod('const').CONF_MQTT_VERIFY_TLS
            for group in ('data', 'data_description'):
                self.assertEqual(source['options']['step']['mqtt_presets'][group][key],
                                 output['options']['step']['mqtt_presets'][group][key])
        changelog = (ROOT.parents[1] / 'CHANGELOG.md').read_text()
        self.assertTrue(changelog.startswith('# Changelog\n'))
        for version in ('0.9.9', '0.9.8', '0.9.7', '0.9.6', '0.9.5', '0.9.4'):
            section = changelog.split(f'## [{version}]', 1)[1].split('\n## [', 1)[0]
            self.assertIn('### English', section)
            self.assertIn('### Deutsch', section)
