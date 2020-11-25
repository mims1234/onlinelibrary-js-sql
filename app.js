const express = require("express");
const bodyParser = require("body-parser");

require('dotenv').config()

var port = process.env.PORT
const app = express();

require('dotenv').config()

app.set("port",port);
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))

Username = process.env.usr
Password = process.env.psd

app.post("/home" , (req,res) => {

    user = req.body.user
    pass = req.body.pass
    if(Username===user && Password===pass){

        res.render("home",{
            username:user
        })
    }
    else {
        res.redirect("/loginerr")
    }
})

app.get("/login" , (req,res) => {
    res.render("login",{
        message:""
    })
})

app.get("/loginerr" , (req,res) => {
    res.render("login",{
        message:"ERROR Invalid Username and Password"
    })
})


app.listen(port, () =>{
    console.log(`Server is running on ${port}`)
})