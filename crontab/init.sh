#!/bin/bash 

apt-get update && apt-get install cron -y

echo "* * * * * /smart-farm/crontab/wget_weather.sh" > /etc/crontab


