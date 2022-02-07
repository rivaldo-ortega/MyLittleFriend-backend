require('dotenv').config();
const express = require('express');
const http = require('http');
const { port, nodEnv } = require('./config/index');
const { connectToDb } = require('./config/database');
const passport = require('passport');
const cors = require('cors');

// Middlewares
const errorHandler = require('./middlewares/handlerError.middleware')

const app = express();
const PORT = port || 4000;

connectToDb();

app.use(express.json());
app.use(cors());

//Inizialice passport
require('./utils/passport/index');
app.use(passport.initialize());

const routes = require('./routes/index.js');
app.use('/', routes);

app.use(errorHandler);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running in ${nodEnv} mode on port ${PORT}`));
