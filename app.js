require('dotenv').config();
const express = require('express');
const http = require('http');
const { port, nodEnv } = require('./config/index');
const { connectToDb } = require('./config/database');

const app = express();
const PORT = port || 4000;

connectToDb();

app.use(express.json());

const routes = require('./routes/index.js');
app.use('/', routes);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running in ${nodEnv} mode on port ${PORT}`));
