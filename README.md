# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Setup
```
npm install
npm run lint

docker-compose up

npm run dev:migrate
```

## Run

### Test
```
docker-compose up -d

npm run test
```

### With seed data
```
docker-compose up -d

npm run test:seed
npm run dev:start
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
