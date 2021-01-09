const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const session = require("express-session");
require('dotenv').config();

// Routes
const { getAuthLogin, getAuthSignout } = require("./routes/loginRoute")
const { getAcceptReport, getIgnoreReport, getValidPost, getRejectPost, getRedirectPage } = require("./routes/validatorRouts")
const { getHomePage, getDashboardPage, getProfilePage, getMembersPage, getTopicPage, getValidatorPostPage } = require("./routes/pageRoute")
const { getProfileUpdated, getMemberRoleUpdate, getPostAdded, getReportPost, getPostEdited, getPostDelete } = require("./routes/boxROutes")

const app = express();
const port = process.env.PORT

// Ecperess Session Cookies
app.use(session({
    secret:`secret`,
    resave: true,
    saveUninitialized: true,
}))

// DB Credentials
const db = mysql.createConnection({
    host: 'localhost',
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB}`,
    port: `${process.env.DB_PORT}`
})

// DB Connection
db.connect((err) => {
    if(err) throw err;
    console.log(`Database is running as * ${process.env.DB} * on PORT: ${process.env.DB_PORT}\n`)
})

global.db = db;

app.set("port",port);
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))

// PAGES
app.get("/",getHomePage )
app.get("/dashboard" , getDashboardPage);
app.get("/profile" , getProfilePage);
app.get("/members" , getMembersPage);
app.get("/validatorpost", getValidatorPostPage)
app.post("/redirect" , getRedirectPage);
app.post("/topic" , getTopicPage);

// POST
app.post("/signin",getAuthLogin);
app.post("/signup",getAuthLogin);
app.post("/signout",getAuthSignout);

app.post("/addpost",getPostAdded);
app.post("/editpost",getPostEdited);
app.post("/deletepost",getPostDelete);
app.post("/updateprofile",getProfileUpdated);
app.post("/updateRoleMember",getMemberRoleUpdate);
app.post("/reportpost",getReportPost)

app.post("/acceptReport",getAcceptReport)
app.post("/ignoreReport",getIgnoreReport)
app.post("/validPost",getValidPost)
app.post("/rejectPost",getRejectPost)

app.listen(port, () =>{
    console.log(`\nServer is running at * http://localhost:4030/ * on PORT:${process.env.PORT}`)
})