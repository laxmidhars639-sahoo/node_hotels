//console.log('server file is running');

// function add(a,b){
//     return a+b;
// }
// var add =(a,b)=>{
//     return a+b;
// }
// var add = (a,b) => a+b
// var result = add(2,7);
// console.log(result);
// (function(){
//     console.log('hello everyone');
// })();

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi '+user.username+'!\n',()=>{
//     console.log('file is created');
// })

// const notes = require('./notes.js');
// console.log('this is my server page');
// var age = notes.a;
// console.log(age);
// var result = notes.addNum(age+18,27);
// console.log(result);

const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { default: mongoose } = require('mongoose');

app.get("/",function(req,res){
    res.send("Hello world");
});

app.use('/person',personRoutes);
app.use('/menuitems',menuRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server is running at 3000");
});