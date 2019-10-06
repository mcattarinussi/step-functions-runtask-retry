const errorStates = require('./states');

const MAX_RETRIES = 3;
const RETRY_WAIT_SECONDS = 10;

const getErrorProcessor = taskError => ({
    'States.TaskFailed': taskFailedProcessor,
    'ECS.AmazonECSException': () => { throw new Error('Not implemented') },
}[taskError]) || defaultErrorProcessor;

const taskFailedProcessor = cause => {
    // getContainer by name
    // calculate errorState using ExitCode/Reason/LastStatus..
    return errorStates.FATAL;
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
