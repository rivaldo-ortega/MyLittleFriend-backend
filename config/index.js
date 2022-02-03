const development = require('./development.env');
const production = require('./production.env');

const nodEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;
const email = process.env.EMAIL_SEND;
const password = process.env.EMAIL_PASSWORD;

module.exports = { development, production, nodEnv, port, email, password };
