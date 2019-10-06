class AppError extends Error {}
AppError.prototype.code = 1;

class ItemNotFound extends AppError {}
ItemNotFound.prototype.code = 3;

class InvalidInput extends AppError {}
InvalidInput.prototype.code = 4;

class NetworkError extends AppError {}
NetworkError.prototype.code = 5;

class DBError extends AppError {}
DBError.prototype.code = 6;

module.exports = {
    AppError,
    ItemNotFound,
    InvalidInput,
    NetworkError,
    DBError
};
