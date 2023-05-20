#!/bin/bash 

apt-get update && apt-get install cron -y && apt-get install jq

mv /cronjob /etc/cron.d/cronjob

chmod 0644 /etc/cron.d/cronjob 

crontab /etc/cron.d/cronjob


