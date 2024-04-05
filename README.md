# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Requirements
docker v24+
node v20+
npm v10.2+

## Setup
```
npm install
npm run lint
```

## Run

### Test
```
docker-compose up -d

npm run test:migrate
npm run test
```

### Development
```
docker-compose up -d

npm run dev:start
```

### Staging
```
docker-compose up -d

npm run stage:start
```

### Production
```
docker-compose up -d

npm run prod:start
```
