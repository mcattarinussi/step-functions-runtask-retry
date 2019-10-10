const errorStates = require('./error-states');
const ecsExceptionProcessor = require('./process-ecs-exception');
const taskFailedProcessor = require('./process-task-failure');

const MAX_RETRIES = 3;
const SECONDS_BEFORE_RETRY = 60;
const APP_CONTAINER_NAME = 'app';

const getErrorProcessor = taskErrorType => ({
    'States.TaskFailed': taskFailedProcessor,
    'ECS.AmazonECSException': ecsExceptionProcessor,
}[taskErrorType]) || (() => errorStates.FATAL);

module.exports.handler = async event => {
    const retryCount = event.errorState ? event.errorState.retryCount : 0;

    if (retryCount >= MAX_RETRIES) {
        return {
            type: errorStates.FATAL,
            retryCount
        };
    }

    const cause = JSON.parse(event.taskError.Cause);
    const errorStateType = getErrorProcessor(event.taskError.Error)(cause, APP_CONTAINER_NAME);

    return {
        type: errorStateType,
        retryCount: retryCount + 1,
        waitSeconds: errorStateType === errorStates.TEMPORARY ? SECONDS_BEFORE_RETRY : 0,
    }
};
