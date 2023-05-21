
From nginx

MAINTAINER yicheng

COPY ./init.sh /init.sh
COPY ./wget_weather.sh /wget_weather.sh
COPY ./cronjob /cronjob
COPY ./start.sh /start.sh

RUN chmod +x /init.sh && /init.sh && chmod +x /wget_weather.sh && chmod +x /start.sh

CMD  ["/bin/bash","/start.sh"]


