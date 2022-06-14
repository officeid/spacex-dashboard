const http = require('http');
const app = require('./app');
const { loadPlanets } = require('./models/planets.model');

const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nomiscientist:123Mongo%21%40%23@cluster0.0ydgi.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('[INFO] MongoDB connection has been established.');
});

mongoose.connection.on('error',(err)=>{
    console.log(`[ERROR] ${err}`);
});

async function startServer(){
    await mongoose.connect(MONGO_URL);

    await loadPlanets();
    
    server.listen(PORT, ()=>{
        console.log(`[INFO] Listening on port ${PORT}...`);
    });
}

startServer();