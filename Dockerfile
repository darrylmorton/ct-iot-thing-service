FROM node:16.15.0-alpine AS build

ARG LOGLEVEL
ENV NPM_CONFIG_LOGLEVEL ${LOGLEVEL}

WORKDIR /ct-iot-thing-service

COPY . .

RUN npm install -g npm@8.x.x
RUN npm ci
RUN npm run build

#######################################################################
FROM build

COPY --from=build /ct-iot-thing-service/dist /ct-iot-thing-service/dist
COPY --from=build /ct-iot-thing-service/package* /ct-iot-thing-service

RUN npm ci --production

EXPOSE 3002

CMD ["npm", "run", "start"]
