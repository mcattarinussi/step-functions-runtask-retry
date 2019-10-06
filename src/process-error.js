module.exports.handler = async event => {
    console.log('Received event', JSON.stringify(event));
    return {
        type: event.injectedErrorType
    }
}