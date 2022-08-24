# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Setup
```
npm install
NODE_ENV=development npx knex migrate:latest

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

NODE_ENV=development npx knex seed:run
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

