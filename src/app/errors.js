class UncaughtException extends Error { }
UncaughtException.prototype.code = 1;

class InvalidInput extends Error { }
InvalidInput.prototype.code = 3;

class NetworkError extends Error { }
NetworkError.prototype.code = 4;

module.exports = {
    UncaughtException,
    InvalidInput,
    NetworkError,
};
