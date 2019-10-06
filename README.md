# AWS step functions runTask retry

A demo project that shows how to implement complex retry logic using the ECS runTask api in a step function.

## Deploy cloudformation stack

    aws cloudformation deploy --template-file template.yaml --capabilities CAPABILITY_IAM --stack-name sfn-runtask-complex-retry SubnetId=<PUBLIC-SUBNET-ID>

## Publish docker image to ECR

Prerequisites: AWS credentials and `AWS_ACCOUNT_ID` exported as environment variables.

    npm run docker:publish

### Build and run locally

    npm run docker:build && npm run docker:run
