const express = require('express');
const app = express();

const attendanceRoutes = require('./attendances.routes.js');
const customersRoutes = require('./customers.routes.js');
const petsRoutes = require('./pets.routes.js');
const veterinariesRoutes = require('./veterinaries.routes.js');

app.use('/attendances', attendanceRoutes);
app.use('/customers', customersRoutes);
app.use('/pets', petsRoutes);
app.use('/veterinaries', veterinariesRoutes);

module.exports = app;
