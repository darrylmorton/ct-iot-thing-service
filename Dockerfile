FROM node:16.15.0-alpine

ARG LOGLEVEL
ENV NPM_CONFIG_LOGLEVEL ${LOGLEVEL}

WORKDIR /ct-iot-thing-service

COPY . .

RUN npm install -g npm@8.x.x
RUN npm ci --prod

EXPOSE 3002

CMD ["npm", "run", "start"]
