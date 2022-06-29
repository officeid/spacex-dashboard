const express = require('express');

const planetRouters = require('./planets/planets.router');
const launchesRouters = require('./launches/launches.router');

const api = express();

api.use('/planets', planetRouters);
api.use('/launches', launchesRouters);

module.exports = api;