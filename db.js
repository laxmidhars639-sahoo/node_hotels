const mongoose = require('mongoose');
require('dotenv').config();

//Define mongodb connection url
const mongoURL = process.env.MONGODB_URL;

//Set up mongo db connection
mongoose.connect(mongoURL);

//Get The default connection
//Mongoose maintain a default connection object representing the mongodb connection
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to database'); 
});

db.on('error',(err)=>{
    console.log('Mongodb Connection error:',err);
});

db.on('disconnected',()=>{
    console.log('Disconnected to database');
});

//Export the database connection
module.exports = db;