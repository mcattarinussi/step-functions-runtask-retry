const errorStates = require('./states');

const MAX_RETRIES = 3;
const RETRY_WAIT_SECONDS = 10;

const APP_CONTAINER_NAME = 'app';

const getErrorProcessor = taskError => ({
    'States.TaskFailed': taskFailedProcessor,
    'ECS.AmazonECSException': ecsExceptionProcessor,
}[taskError]) || defaultErrorProcessor;

const ecsExceptionProcessor = () => { throw new Error('Not implemented yet') };
const defaultErrorProcessor = () => errorStates.FATAL;

const taskFailedProcessor = cause => {
    console.log(cause)
    const container = cause.Containers && cause.Containers.find(
        c => c.Name === APP_CONTAINER_NAME
    );

    if (!container) {
        console.log(`container ${APP_CONTAINER_NAME} not found`);
        return errorStates.FATAL;
    }

    if ([3, 4].includes(container.ExitCode)) {
        // ItemNotFound, InvalidInput
        return errorStates.FATAL;
    } else if ([5, 6].includes(container.ExitCode)) {
        // NetworkError, DBError
        return errorStates.WAIT_BEFORE_RETRY;
    }
    // Unknown error
    return errorStates.RETRIABLE;
};

module.exports.handler = async event => {
    console.log('Received event', JSON.stringify(event));
    
    const retryCount = event.errorState ? event.errorState.retryCount : 0;

    if (retryCount >= MAX_RETRIES) {
        return {
            type: errorStates.FATAL,
            retryCount
        };
    }

    const cause = JSON.parse(event.ECSTaskError.Cause);
    const errorStateType = getErrorProcessor(event.ECSTaskError.Error)(cause);

    return {
        type: errorStateType,
        retryCount: retryCount + 1,
        waitSeconds: RETRY_WAIT_SECONDS,
    }
}
