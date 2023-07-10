# ct-iot-thing-service

## Description
A Nodejs Typescript Express microservice that serves an OpenAPI/Swagger UI API 

## Setup
```
npm install
npm run lint
npm run build

docker-compose up
npm run dev:migrate
```

## Run

### Test
```
npm run test
```

### With seed data
```
npm run test:seed
npm run dev:start
```

### Development
```
npm run dev:start
```

### Staging
```
npm run stage:start
```

### Production
```
npm run prod:start
```

## AWS ECR (Images)
```
aws ecr get-login-password --profile {PROFILE_NAME} --region eu-west-1 | docker login --username AWS --password-stdin 
{ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com

# ct-iot-thing-service:v1.0.0-dev (development version)
docker build -f ./Dockerfile-dev -t ct-iot-thing-service .
docker tag ct-iot-thing-service:v1.0.0-dev {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:v1.0.0-dev
docker push {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:v1.0.0-dev

# ct-iot-thing-service:v1.0.0 (staging - non-development version)
docker build -f ./Dockerfile-stage -t ct-iot-thing-service .
docker tag ct-iot-thing-service:v1.0.0 {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:v1.0.0
docker push {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:v1.0.0

# ct-iot-thing-service:v1.0.0, ct-iot-thing-service:latest (production version)
docker build -f ./Dockerfile-prod -t ct-iot-thing-service .
docker tag ct-iot-thing-service:v1.0.0 {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:v1.0.0
docker tag ct-iot-thing-service:latest {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:latest

docker push {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:v1.0.0
docker push {ACCOUNT_ID}.dkr.ecr.eu-west-1.amazonaws.com/ct-iot-thing-service:latest
```
