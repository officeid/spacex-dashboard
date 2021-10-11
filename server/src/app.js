const express = require('express');
const { planetRouters } = require('./routes/planets/planets.routes');

const app = express();

app.use(express.json());
app.use(planetRouters);

module.exports = {
    app
};