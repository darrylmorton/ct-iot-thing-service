# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Requirements
docker v27+
node v22+
npm v10+

## Setup
```
npm install
npm run lint
```

## Run

### Test
```
npm run test:unit

docker compose up -d

npm run test:migrate
npm run test:integration
```

### Development
```
docker compose up -d

npm run dev:start
```
