# AWS step functions runTask retry

A demo project that shows how to implement complex retry logic when using the ECS runTask api in a step function.

### Docker image

#### Build

    docker build -t sfn-runtask-retry-app .

#### Run

    docker run sfn-runtask-retry-app

## Deploy

    sam deploy --template-file template.yaml --capabilities CAPABILITY_IAM --stack-name sfn-runtask-complex-retry
