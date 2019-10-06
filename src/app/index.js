const appErrors = require('./errors');

const [injectedErrorName] = process.argv.slice(2);

const err =  new appErrors[injectedErrorName];

process.exit(err.code);
