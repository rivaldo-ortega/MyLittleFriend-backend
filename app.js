const express = require('express');
const http = require('http');
require('dotenv').config();

const { port, nodEnv } = require('./config/index');
const { connectToDb } = require('./config/database');

const app = express();
const PORT = port || 4000;

connectToDb();

const routes = require('./routes/index.js');

app.use('/', routes);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running in ${nodEnv} mode on port ${PORT}`));
