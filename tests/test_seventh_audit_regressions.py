"""Seventh audit regressions: no real URLs, credentials or printer commands."""
import asyncio
import traceback
import types
import unittest
from unittest.mock import (
    AsyncMock,
    Mock,
    patch,
)

import aiohttp
from multidict import CIMultiDict, CIMultiDictProxy
from test_fourth_audit_regressions import ResponseContext
from test_regressions import (
    API,
    Errors,
    Printer,
    Upload,
    mod,
)
from yarl import URL


def firmware(box_id=0, version='1.0', target='2.0'):
    return {'box_id': box_id, 'need_update': 1, 'firmware_version': version, 'target_version': target}


def upload_api(unlock):
    return types.SimpleNamespace(
        get_user_cloud_store=AsyncMock(return_value=types.SimpleNamespace(available_bytes=100)),
        _lock_storage_space=AsyncMock(return_value={'id': 3, 'preSignUrl': 'https://offline.invalid'}),
        _fetch_aws_put_resp=AsyncMock(return_value=''), _claim_file_upload_from_aws=AsyncMock(return_value=77),
        _unlock_storage_space=AsyncMock(side_effect=unlock), _log_to_debug=Mock())


class SeventhAudit(unittest.IsolatedAsyncioTestCase):
    async def test_firmware_ids_reject_aliases_and_preserve_valid_integer_strings(self):
        p = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        p._update_multi_color_box_fw_version_from_json([firmware(0)])
        original = p._firmware_for_ace(0)
        for value in (1.9, -0.9, True, False, 1.0, float('nan'), float('inf'), [], {}, '', '1.9', '--1'):
            with self.subTest(value=value), self.assertRaises(Errors.AnycubicDataParsingError):
                p._update_multi_color_box_fw_version_from_json([firmware(value, '9.9')])
            self.assertIs(p._firmware_for_ace(0), original)
            self.assertEqual(original.firmware_version, '1.0')
        for value in (1, '1', ' 1 ', '+1', '01'):
            p._update_multi_color_box_fw_version_from_json([firmware(value)])
            self.assertEqual(p._multi_color_box_fw_version[0].box_id, 1)
        with self.assertLogs(mod('anycubic_cloud_api.data_models.printer')._LOGGER, level='WARNING'):
            p._update_multi_color_box_fw_version_from_json([firmware(1), firmware(9)])
        self.assertEqual([f.box_id for f in p._multi_color_box_fw_version], [1])

    async def test_firmware_initialization_uses_same_validation_and_unknown_id_policy(self):
        for value in (1.9, True, False, '1.9'):
            with self.assertRaises(Errors.AnycubicDataParsingError):
                Printer(api_parent=None, machine_type=0, machine_name='offline', id=7,
                        multi_color_box_fw_version=[firmware(value)])
        with self.assertLogs(mod('anycubic_cloud_api.data_models.printer')._LOGGER, level='WARNING'):
            p = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7,
                        multi_color_box_fw_version=[firmware(9), firmware('1')])
        self.assertEqual([f.box_id for f in p._multi_color_box_fw_version], [1])

    async def test_connected_box_ids_reject_aliases_without_destroying_previous_state(self):
        from test_third_audit_regressions import ace
        p = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        p._set_multi_color_box([ace(0)])
        original = p.primary_multi_color_box
        for value in (1.9, -0.9, True, False):
            with self.assertRaises(Errors.AnycubicDataParsingError):
                p._set_multi_color_box([ace(1), ace(value)])
            self.assertIs(p.primary_multi_color_box, original)
            self.assertIsNone(p.secondary_multi_color_box)
        p._set_multi_color_box([ace('1')])
        self.assertEqual(p.secondary_multi_color_box.box_id, 1)

    async def test_failed_firmware_batches_preserve_all_old_fields_and_references(self):
        p = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        p._update_multi_color_box_fw_version_from_json([firmware(0), firmware(1)])
        primary, secondary = p._firmware_for_ace(0), p._firmware_for_ace(1)
        primary.set_is_updating(True)
        primary.set_download_progress(35)
        snapshot = {s: getattr(primary, s) for s in primary.__slots__}
        for bad in (firmware(0, '8.8'), {'box_id': 1}, {**firmware(1), 'need_update': 'invalid'}, 'invalid'):
            with self.assertRaises(Errors.AnycubicDataParsingError):
                p._update_multi_color_box_fw_version_from_json([firmware(0, '9.9', '10.0'), bad])
            self.assertIs(primary, p._firmware_for_ace(0))
            self.assertIs(secondary, p._firmware_for_ace(1))
            self.assertEqual(snapshot, {s: getattr(primary, s) for s in primary.__slots__})

    async def test_successful_firmware_commit_keeps_ota_state_and_reference_identity(self):
        p = Printer(api_parent=None, machine_type=0, machine_name='offline', id=7)
        p._update_multi_color_box_fw_version_from_json([firmware(0)])
        original = p._firmware_for_ace(0)
        original.set_is_updating(True)
        original.set_download_progress(35)
        p._update_multi_color_box_fw_version_from_json([firmware(1), firmware(0, '3.0')])
        self.assertIs(p._firmware_for_ace(0), original)
        self.assertEqual(original.firmware_version, '3.0')
        self.assertTrue(original.is_updating)
        self.assertEqual(original._download_progress, 35)

    async def test_successful_upload_unlock_finishes_despite_repeated_cancellation(self):
        entered, release = asyncio.Event(), asyncio.Event()
        locked = True
        async def unlock(*args, **kwargs):
            nonlocal locked
            entered.set()
            await release.wait()
            locked = False
        api = upload_api(unlock)
        upload = Upload(api, file_name='offline.gcode', file_bytes=b'G0 X0')
        task = asyncio.create_task(upload.async_process_upload())
        await entered.wait()
        task.cancel()
        await asyncio.sleep(0)
        self.assertFalse(task.done())
        task.cancel()
        await asyncio.sleep(0)
        self.assertFalse(task.done())
        release.set()
        with self.assertRaises(asyncio.CancelledError):
            await task
        self.assertFalse(locked)
        self.assertEqual(upload.cloud_file_id, 77)
        api._unlock_storage_space.assert_awaited_once_with(3, is_delete_cos=False)

    async def test_failed_upload_cleanup_completes_before_cancellation_propagates(self):
        entered, release = asyncio.Event(), asyncio.Event()
        finished = False
        async def unlock(*args, **kwargs):
            nonlocal finished
            entered.set()
            await release.wait()
            finished = True
        api = upload_api(unlock)
        api._fetch_aws_put_resp.side_effect = RuntimeError('offline upload failure')
        task = asyncio.create_task(Upload(api, file_name='offline.gcode', file_bytes=b'G0 X0').async_process_upload())
        await entered.wait()
        task.cancel()
        await asyncio.sleep(0)
        self.assertFalse(task.done())
        release.set()
        with self.assertRaises(asyncio.CancelledError):
            await task
        self.assertTrue(finished)
        api._unlock_storage_space.assert_awaited_once_with(3, is_delete_cos=True)

    async def test_unlock_timeout_is_bounded_and_retains_cancellation(self):
        module = mod('anycubic_cloud_api.models.cloud_upload')
        loop = asyncio.get_running_loop()
        handler = Mock()
        old_handler = loop.get_exception_handler()
        loop.set_exception_handler(handler)
        self.addCleanup(loop.set_exception_handler, old_handler)
        for cancel in (False, True):
            entered, stopped = asyncio.Event(), asyncio.Event()
            async def unlock(*args, **kwargs):
                entered.set()
                try:
                    await asyncio.Event().wait()
                finally:
                    stopped.set()
            api = upload_api(unlock)
            with patch.object(module, 'UPLOAD_UNLOCK_TIMEOUT', 0.03):
                task = asyncio.create_task(Upload(api, file_name='offline.gcode', file_bytes=b'G0 X0').async_process_upload())
                await entered.wait()
                if cancel:
                    task.cancel()
                with self.assertRaises(asyncio.CancelledError if cancel else TimeoutError):
                    await asyncio.wait_for(asyncio.shield(task), 1)
            self.assertTrue(stopped.is_set())
            self.assertTrue(task.done())
            await asyncio.sleep(0)
            handler.assert_not_called()

    async def test_upload_failure_is_not_replaced_by_unlock_failure(self):
        api = upload_api(RuntimeError('offline unlock failure'))
        api._fetch_aws_put_resp.side_effect = RuntimeError('offline upload failure')
        with self.assertRaisesRegex(Errors.AnycubicAPIError, 'offline upload failure'):
            await Upload(api, file_name='offline.gcode', file_bytes=b'G0 X0').async_process_upload()

    async def test_token_validation_retries_missing_and_invalid_data(self):
        for data in ({'msg': 'request error'}, {'data': None}, {'data': []}, {'data': {}},
                     {'data': {'token': 12}}, {'data': {'token': ''}}, {'data': {'token': '  '}}):
            api = API(session=None, cookie_jar=None)
            api.set_authentication(auth_token='offline', auth_mode=mod('anycubic_cloud_api.models.auth').AnycubicAuthMode.SLICER)
            api._fetch_api_resp = AsyncMock(side_effect=[data, {'data': {'token': 'offline-refreshed'}}])
            with patch('asyncio.sleep', new=AsyncMock()):
                await api._get_user_token_with_access_token_with_retry()
            self.assertEqual(api._fetch_api_resp.await_count, 2)
            self.assertEqual(api.anycubic_auth.auth_token, 'offline-refreshed')
        api._fetch_api_resp = AsyncMock(return_value={'data': {}})
        with patch('asyncio.sleep', new=AsyncMock()), self.assertRaises(Errors.AnycubicAuthError):
            await api._get_user_token_with_access_token_with_retry()
        self.assertEqual(api._fetch_api_resp.await_count, mod('anycubic_cloud_api.api.base').ACCESS_TOKEN_LOGIN_RETRIES)

    async def test_signed_urls_are_redacted_in_all_logs_and_exception_chains(self):
        url = 'https://FAKE-USER:FAKE-PASS@offline.invalid/upload?X-Amz-Signature=FAKE-SIGNATURE&X-Amz-Security-Token=FAKE-SESSION#FAKE-FRAGMENT'
        logger = Mock()
        api = API(session=Mock(), cookie_jar=None, debug_logger=logger)
        api.set_authentication(auth_token='offline')
        api.set_log_api_call_info(True)
        context = ResponseContext(503, {})
        info = aiohttp.RequestInfo(URL(url), 'PUT', CIMultiDictProxy(CIMultiDict({'Authorization': 'FAKE-HEADER'})))
        context.response.raise_for_status.side_effect = aiohttp.ClientResponseError(info, (), status=503, message='failure '+url)
        api._session.put.return_value = context
        try:
            await api._fetch_aws_put_resp(url, b'offline')
        except Errors.AnycubicAPIParsingError as error:
            trace = ''.join(traceback.format_exception(error))
            self.assertIsInstance(error.__cause__, aiohttp.ClientResponseError)
            self.assertEqual(error.__cause__.status, 503)
            trace += repr(error.__cause__)
        else:
            self.fail('HTTP 503 accepted')
        api._log_to_debug(url)
        api._log_to_warn(url)
        text = trace + str(logger.mock_calls)
        for secret in ('FAKE-USER', 'FAKE-PASS', 'FAKE-SIGNATURE', 'FAKE-SESSION', 'FAKE-FRAGMENT', 'FAKE-HEADER'):
            self.assertNotIn(secret, text)
        self.assertIn('offline.invalid/upload', text)
        context.response.raise_for_status.side_effect = None
        await api._fetch_aws_put_resp(url, b'offline')
        self.assertNotIn('FAKE-SIGNATURE', str(logger.mock_calls))

    async def test_non_http_error_and_upload_body_cannot_reintroduce_signed_urls(self):
        url = 'https://offline.invalid/upload?signature=FAKE-SECRET'
        api = API(session=Mock(), cookie_jar=None, debug_logger=Mock())
        api.set_authentication(auth_token='offline')
        context = ResponseContext(200, {})
        api._session.put.return_value = context
        context.response.raise_for_status.side_effect = RuntimeError('failure '+url)
        with self.assertRaises(Errors.AnycubicAPIParsingError) as caught:
            await api._fetch_aws_put_resp(url, b'offline')
        self.assertNotIn('FAKE-SECRET', ''.join(traceback.format_exception(caught.exception)))
        context.response.raise_for_status.side_effect = None
        context.response.text.return_value = 'error '+url
        with self.assertRaises(Errors.AnycubicAPIParsingError) as caught:
            await api._fetch_aws_put_resp(url, b'offline')
        self.assertNotIn('FAKE-SECRET', str(caught.exception))

    async def test_slow_warning_interval_is_updated_only_when_warning_is_emitted(self):
        base = mod('anycubic_cloud_api.api.base')
        logger = Mock()
        api = API(session=Mock(), cookie_jar=None, debug_logger=logger)
        api.set_authentication(auth_token='offline')
        api._session.get.return_value = ResponseContext(200, {'data': {}})
        duration = base.MAX_API_FETCH_TIME_WARN + 1
        with patch.object(base.time, 'time', side_effect=[0, duration, duration + 1, duration * 2 + 1]):
            for _ in range(2):
                await api._fetch_ext_resp(base.HTTP_METHODS.GET, 'https://offline.invalid')
        logger.warning.assert_called_once()
        self.assertEqual(api._last_warn_api_duration, duration)
        start = duration + base.WARN_INTERVAL_API_DURATION + 1
        with patch.object(base.time, 'time', side_effect=[start, start + duration]):
            await api._fetch_ext_resp(base.HTTP_METHODS.GET, 'https://offline.invalid')
        self.assertEqual(logger.warning.call_count, 2)
        self.assertEqual(api._last_warn_api_duration, start + duration)

        logger.reset_mock()
        api._last_warn_api_duration = None
        with patch.object(base.time, 'time', side_effect=[1000.9, 1021.9, 1600.8, 1621.8]):
            for _ in range(2):
                await api._fetch_ext_resp(base.HTTP_METHODS.GET, 'https://offline.invalid')
        logger.warning.assert_called_once()
        self.assertEqual(api._last_warn_api_duration, 1021.9)
