const express = require('express');

const {
    httpGetAllLaunches
} = require('./launches.controller');

const launchesRouters = express.Router();

launchesRouters.get('/launches', httpGetAllLaunches);

module.exports = launchesRouters;