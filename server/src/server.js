const http = require('http');
require('dotenv').config();

const app = require('./app');
const { loadPlanets } = require('./models/planets.model');
const { loadLaunches } = require('./models/launches.model');
const { connectMongo } = require('./services/mongo'); 

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function startServer(){
    await connectMongo();

    await loadLaunches();
    await loadPlanets();
    
    
    server.listen(PORT, ()=>{
        console.log(`[INFO] Listening on port ${PORT}...`);
    });
}

startServer();