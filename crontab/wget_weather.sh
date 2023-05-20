#!/bin/bash

API_URL="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001"
API_KEY="CWB-93A2B4B0-9246-47CE-A47E-9C49FC706C69"
LOCATION="高雄市"
#API_KEY須從"https://opendata.cwb.gov.tw/userLogin"求得
response=$(curl -s "$API_URL?Authorization=$API_KEY&locationName=$LOCATION")

if [[ $(echo "$response" | jq -r '.success') == "true" ]]; then
    weather_state=$(echo "$response" | jq -r '.records.location[0].weatherElement[0].time[0].parameter.parameterValue')

    if [ "${#weather_state}" -ge 2 ]; then
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/$weather_state.svg"
        wget -q -O "/weather.svg" "$file_url"  
    else
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/0$weather_state.svg"
        wget -q -O "/weather.svg" "$file_url"
    fi
else
    echo "Can't get data!"
fi
