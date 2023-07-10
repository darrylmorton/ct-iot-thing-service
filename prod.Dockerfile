FROM node:18.14.2-alpine

WORKDIR /ct-iot-thing-service

COPY . .

RUN npm install -g npm@8.x.x
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod:start"]
