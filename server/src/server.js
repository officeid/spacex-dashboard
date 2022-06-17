const http = require('http');

const app = require('./app');
const { loadPlanets } = require('./models/planets.model');
const { connectMongo } = require('./services/mongo'); 

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function startServer(){
    await connectMongo();

    await loadPlanets();
    
    server.listen(PORT, ()=>{
        console.log(`[INFO] Listening on port ${PORT}...`);
    });
}

startServer();