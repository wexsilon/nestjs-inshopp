import pymongo
import socks
import socket
import codecs
import datetime
import os
import ssl
import sys
import time
import json
import openai
import re
import requests
import urllib.request


from instagram_private_api import (
    Client, ClientError, ClientLoginError,
    ClientCookieExpiredError, ClientLoginRequiredError,
    __version__ as client_version)


# socks.setdefaultproxy(socks.SOCKS5, '127.0.0.1', 2080)
# socket.socket = socks.socksocket

# _create_unverified_https_context = ssl._create_unverified_context
# ssl._create_default_https_context = _create_unverified_https_context


openai.api_key = "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"

mongoClient = pymongo.MongoClient("mongodb://localhost:27017/inshopp")
inshoppDB = mongoClient.get_database()
igposts = inshoppDB.get_collection('postts')
api = None

# igposts = []

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
    # data = []
    # result = None
    # while True:
    #     try:
    #         result = api.user_feed(str(tid))
    #         break
    #     except ClientError as ce:
    #         if ce.msg == 'Unauthorized: Please wait a few minutes before you try again.':
    #             print(30, 'minute wait...')
    #             time.sleep(30 * 60)
    #         else:
    #             raise ce
    # time.sleep(3)
    # data.extend(result.get('items', []))
    # next_max_id = result.get('next_max_id')
    # while next_max_id:
    #     if len(data) % 108 == 0:
    #         print('90 seconds wait...')
    #         time.sleep(90)
    #     print('len:', len(data))
    #     print('max_id:', next_max_id)
    #     while True:
    #         try:
    #             results = api.user_feed(str(tid), max_id=next_max_id)
    #             break
    #         except ClientError as ce:
    #             if ce.msg == 'Unauthorized: Please wait a few minutes before you try again.':
    #                 print(30, 'minute wait...')
    #                 time.sleep(30 * 60)
    #             else:
    #                 raise ce
    #     time.sleep(3)
    #     data.extend(results.get('items', []))
    #     next_max_id = results.get('next_max_id')
    # return data


# device_id = None
# settings_file_path = settings_file = 'sess.json'
# username = 'Projectse1402'
# password = '94Jd^F5*sH8F'
# try:
#     if not os.path.isfile(settings_file):
#         print('Unable to find file: {0!s}'.format(settings_file))
#         api = Client(
#             username, password, timeout=30,
#             on_login=lambda x: onlogin_callback(x, settings_file_path))
#     else:
#         with open(settings_file) as file_data:
#             cached_settings = json.load(file_data, object_hook=from_json)
#         print('Reusing settings: {0!s}'.format(settings_file))
#         device_id = cached_settings.get('device_id')
#         api = Client(username, password, settings=cached_settings, timeout=30)
# except (ClientCookieExpiredError, ClientLoginRequiredError) as e:
#     print('ClientCookieExpiredError/ClientLoginRequiredError: {0!s}'.format(e))
#     api = Client(username, password, timeout=30, on_login=lambda x: onlogin_callback(x, settings_file_path))

target_user = sys.argv[1]
# content = api.username_info(target_user)
target_id = '11111'#content['user']['pk']

# posts = get_feed(target_id)

with open('scripts/tt.json', 'r') as f:
    posts = json.loads(f.read())
# print(len(posts))
for post in posts:
    txt = "extract price and name of product without any comment, return the result in the following JSON format {\"price\": <INT>, \"name\": <STRING>}"
    txt += '\n\n'
    txt += post['caption']['text'].replace(',', '').replace('.', '')

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=txt,
        temperature=0,
        max_tokens=64,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    strText = response.get('choices')[0].get('text').split('\n\n')[-1]
    try:
        jsonText = json.loads(strText)
    except:
        continue
    
    imageFilename = f"{post['carousel_media'][0]['id']}.jpg"
    imageUrl = f'/public/img/posts/{imageFilename}'
    imageFilename = os.path.join(os.getcwd(), 'public', 'img', 'posts', imageFilename)
    
    if post['media_type'] == 8: # Carousel/Album type
        dimg = post['carousel_media'][0]['image_versions2']['candidates'][0]['url']
        # with open(imageFilename, 'wb') as handle:
        #     resp = requests.get(dimg, stream=True)
        #     for block in resp.iter_content(10240):
        #         if not block:
        #             break
        #         handle.write(block)
        # urllib.request.urlretrieve(dimg, imageFilename)
    if post['media_type'] == 1: # Photo type
        pass


    igposts.insert_one({
        'price': jsonText['price'],
        'caption': post['caption']['text'],
        'img': imageUrl,
        'username': target_user,
        'postid': post['code'],
        'userid': str(target_id),
        'name': jsonText['name']
    })
    # igposts.append({
    #     'price': jsonText['price'],
    #     'caption': post['caption']['text'],
    #     'img': imageUrl,
    #     'username': target_user,
    #     'userid': target_id
    # })
print('ok', end="")