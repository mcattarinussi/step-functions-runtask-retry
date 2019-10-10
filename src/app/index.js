const appErrors = require('./errors');

const [injectedErrorName] = process.argv.slice(2);

const err = injectedErrorName ? new appErrors[injectedErrorName] : null;

process.exit(err ? err.code : 0);
