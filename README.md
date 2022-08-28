# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Setup
```
npm install
npm run migrate:latest

npm run lint
npm run build
```

## Start

### Test
```
docker-compose up

npm run test
```

### Test with seed data
```
docker-compose up

npm run seed:run
npm run dev
```

### Development
```
docker-compose up

npm run dev
```

### Production
```
npm run start
```

