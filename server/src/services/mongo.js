const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open',()=>{
    console.log('[INFO] MongoDB connection has been established.');
});

mongoose.connection.on('error',(err)=>{
    console.log(`[ERROR] ${err}`);
});

async function connectMongo() {
    await mongoose.connect(MONGO_URL);
}

async function disconnectMongo() {
    await mongoose.disconnect();
}

module.exports = {
    connectMongo,
    disconnectMongo,
};