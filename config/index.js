const development = require('./development.env');
const production = require('./production.env');

const nodEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;
const secret = process.env.JWT_SECRET;
const epaycoSecret = process.env.EPAYACO_SECRET;
const epaycoKey = process.env.EPAYACO_KEY;

module.exports = { development, production, nodEnv, port, secret, epaycoSecret, epaycoKey };
