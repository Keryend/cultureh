const mongoose = require('mongoose')
const colors = require('colors')

const connectDB =mongoose.createConnection('mongodb://127.0.0.1:27017/cultureh').on('open',() => {
    console.log('Connected to MongoDb Database'.bgMagenta.white);
}).on('error',() => {
    console.log('MongoDb connection error'.bgRed.white);
});

module.exports = connectDB;