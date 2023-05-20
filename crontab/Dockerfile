
From nginx

MAINTAINER yicheng

COPY ./init.sh /init.sh
COPY ./wget_weather.sh /wget_weather.sh
COPY ./cronjob /cronjob

RUN bash /init.sh 

CMD  service cron start && nginx -g 'daemon off;'


