FROM node:14

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

COPY ./wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh

EXPOSE 8088

VOLUME [ "/app/node_modules" ]

ENTRYPOINT [ "./wait-for-it.sh" , "linux_sql:3306" , "--" ]

CMD ["npm", "run", "start"]

