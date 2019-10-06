# AWS step functions runTask retry

A demo project that shows how to implement complex retry logic using the ECS runTask api in a step function.

## Test ECS task exit code

The state machine expects as an input the name of one of the app errors defined [here](./src/app/errors.js). The error name will be passed to the app task and will cause the container to exit with the correspondent exit code.

Open the step function page in the AWS console and click on `Start Execution`. In the input section add something like this:

```json
{
    "commands": [
      "NetworkError"
    ]
}
```

All the possible errors are defined [here](./src/app/errors.js).

## Development

### Deploy

    serverless deploy --subnetId <PUBLIC-SUBNET-ID>

### Publish docker image to ECR

Prerequisites: AWS credentials and `AWS_ACCOUNT_ID` exported as environment variables.

    npm run docker:publish

### Build and run locally

    npm run docker:build && npm run docker:run
