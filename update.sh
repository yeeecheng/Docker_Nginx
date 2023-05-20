docker-compose stop 
docker rmi crontab-nginx
docker  build -t crontab-nginx .
docker-compose up -d

