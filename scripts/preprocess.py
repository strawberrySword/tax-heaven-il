import json
import requests

BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
KEY = "THIS_IS_A_SCRIPT_IM_NOT_BOTHERING_WITH_ENV"

with open('public_announcement.json', "r") as f:
    d = json.load(f)
    for city in d: 
        location = requests.get(f'{BASE_URL}?address={city["Settlement Name"]}&key={KEY}')
        if location.json()["status"] == "OK":
            city['location'] = location.json()["results"][0]["geometry"]["location"]
        else:
            city['location'] = None
            print(f"Error: {location.json()['status']} for {city['Settlement Name']}")
            continue
        
with open('public_announcement.json', "w") as f:
    print(d[0])
    json.dump(d, f, indent=4)