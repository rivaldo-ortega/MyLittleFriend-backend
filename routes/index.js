const express = require('express');
const app = express();

const attendanceRoutes = require('./attendances.routes.js');
const customersRoutes = require('./customers.routes.js');
const petsRoutes = require('./pets.routes.js');
const veterinariesRoutes = require('./veterinaries.routes.js');
const requestServicesRoutes = require('./requestservice.routes');
const authRoutes = require('./auth.routes');

app.use('/attendances', attendanceRoutes);
app.use('/customers', customersRoutes);
app.use('/pets', petsRoutes);
app.use('/veterinaries', veterinariesRoutes);
app.use('/requestservices', requestServicesRoutes);
app.use('/auth', authRoutes);

module.exports = app;
