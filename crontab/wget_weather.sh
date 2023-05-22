#!/bin/bash

API_URL="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001"
API_KEY="CWB-93A2B4B0-9246-47CE-A47E-9C49FC706C69"
LOCATION="高雄市"
#API_KEY須從"https://opendata.cwb.gov.tw/userLogin"求得


response=$(curl -s "$API_URL?Authorization=$API_KEY&locationName=$LOCATION")

if [[ $(echo "$response" | jq -r '.success') == "true" ]]; then
    early_morning=$(echo "$response" | jq -r '.records.location[0].weatherElement[0].time[0].parameter.parameterValue')
    morning=$(echo "$response" | jq -r '.records.location[0].weatherElement[0].time[1].parameter.parameterValue')
    evening=$(echo "$response" | jq -r '.records.location[0].weatherElement[0].time[2].parameter.parameterValue')
    filepath="/usr/share/nginx/html/img"
    #early_morning
    if [ "${#early_morning}" -ge 2 ]; then
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/$early_morning.svg"
	
	wget -q -O "$filepath/weather_1.svg" "$file_url"
    else
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/0$early_morning.svg"
        wget -q -O "$filepath/weather_1.svg" "$file_url"
    fi

    #morning
    if [ "${#morning}" -ge 2 ]; then
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/$morning.svg"
        wget -q -O "$filepath/weather_2.svg" "$file_url"
    else
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/0$morning.svg"
        wget -q -O "$filepath/weather_2.svg" "$file_url"
    fi

   #evening
    if [ "${#evening}" -ge 2 ]; then
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/$evening.svg"
        wget -q -O "$filepath/weather_3.svg" "$file_url"
    else
        file_url="https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/0$evening.svg"
        wget -q -O "$filepath/weather_3.svg" "$file_url"
    fi

else
    echo "Can't get data!"
fi
