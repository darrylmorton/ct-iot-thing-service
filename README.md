# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Requirements
docker v29+  
node v22+  
npm v11+  

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
