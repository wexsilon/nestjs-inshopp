import json
from instagram_private_api import (
	Client, ClientError, ClientLoginError,
	ClientCookieExpiredError, ClientLoginRequiredError,
	__version__ as client_version)
import socks
import socket
import codecs
import datetime
import os.path
import ssl
import sys
import time

_create_unverified_https_context = ssl._create_unverified_context
ssl._create_default_https_context = _create_unverified_https_context

def to_json(python_object):
	if isinstance(python_object, bytes):
		return {'__class__': 'bytes',
				'__value__': codecs.encode(python_object, 'base64').decode()}
	raise TypeError(repr(python_object) + ' is not JSON serializable')


def from_json(json_object):
	if '__class__' in json_object and json_object['__class__'] == 'bytes':
		return codecs.decode(json_object['__value__'].encode(), 'base64')
	return json_object


def onlogin_callback(api, new_settings_file):
	cache_settings = api.settings
	with open(new_settings_file, 'w') as outfile:
		json.dump(cache_settings, outfile, default=to_json)
		print('SAVED: {0!s}'.format(new_settings_file))

def get_feed(tid):
	return api.user_feed(str(tid)).get('items', [])
	data = []
	result = None
	while True:
		try:
			result = api.user_feed(str(tid))
			break
		except ClientError as ce:
			if ce.msg == 'Unauthorized: Please wait a few minutes before you try again.':
				print(30, 'minute wait...')
				time.sleep(30 * 60)
			else:
				raise ce
	time.sleep(3)
	data.extend(result.get('items', []))
	next_max_id = result.get('next_max_id')
	while next_max_id:
		if len(data) % 108 == 0:
			print('90 seconds wait...')
			time.sleep(90)
		print('len:', len(data))
		print('max_id:', next_max_id)
		while True:
			try:
				results = api.user_feed(str(tid), max_id=next_max_id)
				break
			except ClientError as ce:
				if ce.msg == 'Unauthorized: Please wait a few minutes before you try again.':
					print(30, 'minute wait...')
					time.sleep(30 * 60)
				else:
					raise ce

		time.sleep(3)
		data.extend(results.get('items', []))
		next_max_id = results.get('next_max_id')
	return data


device_id = None
settings_file_path = settings_file = 'sess.json'
username = 'Projectse1402'
password = '94Jd^F5*sH8F'
try:
	if not os.path.isfile(settings_file):
		print('Unable to find file: {0!s}'.format(settings_file))
		api = Client(
			username, password, timeout=30,
			on_login=lambda x: onlogin_callback(x, settings_file_path))
	else:
		with open(settings_file) as file_data:
			cached_settings = json.load(file_data, object_hook=from_json)
		print('Reusing settings: {0!s}'.format(settings_file))
		device_id = cached_settings.get('device_id')
		api = Client(username, password, settings=cached_settings, timeout=30)
except (ClientCookieExpiredError, ClientLoginRequiredError) as e:
	print('ClientCookieExpiredError/ClientLoginRequiredError: {0!s}'.format(e))
	api = Client(username, password, timeout=30, on_login=lambda x: onlogin_callback(x, settings_file_path))


content = api.username_info('tak_tshirt')
target_id = content['user']['pk']
posts = get_feed(target_id)

with open('tt.json', 'w') as f:
	f.write(json.dumps(posts))