import openai
import json
import re

jsonPath = r'C:\Users\Touresina\PycharmProjects\igtool\tak_tshirt.json'
with open(jsonPath, 'r') as f:
    posts = json.loads(f.read())
API_KEY = "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"


for p in posts:
    txt = "extract price without any comment, return the result in the following JSON format {\"price\": <INT>, \"type\": <\'TOMAN\' | \'RIYAL\'>}"
    txt += '\n\n'
    txt += p['caption']['text'].replace(',', '').replace('.', '')
    openai.api_key = API_KEY
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
    print(strText.__repr__())
    jsonText = json.loads(strText)
    print(jsonText['price'])
    print('--------------------')