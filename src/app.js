
const express = require ('express');
let bodyParser = require ('body-parser');
let db= require("../db.js");
let router = require("./routes/router");
require("dotenv").config();
const session = require('express-session'); 
const app=express();

app.set("view engine","ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// Add session middleware
app.use(session({
    secret: '12345f', // Change this to a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use("/",router);

module.exports=app;
// ...existing code...