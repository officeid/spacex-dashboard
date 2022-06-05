const express = require('express');

const {
    httpGetAllPlanets
} = require('./planets.controller');

const planetRouters = express.Router();

planetRouters.get('/planets', httpGetAllPlanets);

module.exports =  planetRouters;
