const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const moment = require("moment");

const session = require("express-session");
const bcrpy = require("bcrypt-nodejs");
require('dotenv').config();

const app = express();
const port = process.env.PORT

// Ecperess Session Cookies
app.use(session({
    secret:`secret`,
    resave: true,
    saveUninitialized: true
}))

// DB Credentials
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASS}`,
//     database: `${process.env.DB}`,
//     port: `${process.env.DB_PORT}`
// })

// DB Connection
// db.connect((err) => {
//     if(err) throw err;
//     console.log(`Database is running as * ${process.env.DB} * on PORT: ${process.env.DB_PORT}\n`)
// })

app.set("port",port);
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))

Username = process.env.usr
Password = process.env.psd

// app.get("/" , async(req,res) => {
//     Query = 'SELECT * FROM user_profile'
//     db.query(Query,(err,OUTPUT) => { if(err) {console.log(err) } 
//         res.send(JSON.stringify(OUTPUT));
//     });
// })

// TESTING

app.get("/" , (req,res) => {
        res.render("home")
})

app.post("/delete" , (req,res) => {
    console.log(req.body)
    res.send(JSON.stringify(req.body))
})

app.get("/topic" , (req,res) => {
    res.render("topic")
})

app.get("/dashboard" , (req,res) => {
    res.render("dashboard")
})

app.get("/members" , (req,res) => {
    res.render("members")
})

app.get("/validatorpost" , (req,res) => {
    res.render("validatorpost")
})

app.get("/profile" , (req,res) => {
    res.render("profile")
})


app.listen(port, () =>{
    console.log(`\nServer is running at * http://localhost:4030/ * on PORT:${process.env.PORT}`)
})