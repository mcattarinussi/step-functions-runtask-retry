const MAX_RETRIES = 3;

module.exports.handler = async event => {
    console.log('Received event', JSON.stringify(event));
    const retryCount = event.errorState ? event.errorState.retryCount : 0;

    if (retryCount >= MAX_RETRIES) {
        return {
            type: 'FATAL'
        };
    }

    return {
        type: event.injectedErrorType,
        waitSeconds: 10,
        retryCount: retryCount + 1
    }
}
