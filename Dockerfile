FROM node:22.11.0-alpine

WORKDIR /ct-iot-thing-service

COPY . .

RUN npm install -g npm@10.x.x
RUN npm ci

EXPOSE 3000

CMD npm run prod:start
