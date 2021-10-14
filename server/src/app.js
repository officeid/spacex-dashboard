const express = require('express');
const cors = require('cors');
const { planetRouters } = require('./routes/planets/planets.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(planetRouters);

module.exports = app;