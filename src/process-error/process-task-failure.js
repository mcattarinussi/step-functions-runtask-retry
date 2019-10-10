const errorStates = require('./error-states');

module.exports = (errorCause, containerName) => {
    const container = errorCause.Containers && errorCause.Containers.find(
        c => c.Name === containerName
    );

    if (!container) {
        console.log(`container ${APP_CONTAINER_NAME} not found`);
        return errorStates.FATAL;
    }

    switch (container.ExitCode) {
        case 1:
            // UncaughtException
            return errorStates.RETRIABLE;
        case 3:
            // InvalidInput
            return errorStates.FATAL;
        case 4:
            // NetworkError
            return errorStates.TEMPORARY;
        default:
            return errorStates.RETRIABLE;
    }
};
