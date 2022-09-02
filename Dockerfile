FROM node:16.15.0-alpine

WORKDIR /ct-iot-thing-service

COPY . .

RUN npm install -g npm@8.x.x
RUN npm ci --production
RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start"]
