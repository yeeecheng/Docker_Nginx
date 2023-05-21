#!/bin/bash

service cron start &
/wget_weather.sh &
nginx -g 'daemon off;'
