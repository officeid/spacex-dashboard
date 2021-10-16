const express = require('express');
const cors = require('cors');
const path = require('path');
const { planetRouters } = require('./routes/planets/planets.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use(planetRouters);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'..','public'));
});

module.exports = app;