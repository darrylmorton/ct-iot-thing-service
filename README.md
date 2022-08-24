# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Setup
```
npm install
npx knex migrate:latest
npm run build
```

## Start

### Test
```
docker-compose up

npm run lint
npm run test
```

### Development
```
docker-compose up

npm run lint
npm run dev
```

### Production
```
npm run start
```

