const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const path = require('path');

const planetRouters = require('./routers/planets/planets.router');
const launchesRouters = require('./routers/launches/launches.router');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

app.use('/planets',planetRouters);
app.use('/launches',launchesRouters);

app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname,'..','public'));
});

module.exports = app;