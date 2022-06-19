const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nomiscientist:123Mongo%21%40%23@cluster0.0ydgi.mongodb.net/?retryWrites=true&w=majority';

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