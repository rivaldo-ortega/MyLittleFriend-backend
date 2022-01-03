const express = require('express');
const http = require('http');

const app = express();
const port = process.env.PORT || 4000;

const routes = require('./routes/index.js');

app.use('/', routes);

const server = http.createServer(app);

server.listen(port, () => console.log('Listening on port ' + port));
