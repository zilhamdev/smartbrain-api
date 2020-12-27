require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");

const knex = require('knex');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 || 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Hello"))
    .post("/signin", signin.handleSignin(db, bcrypt))
    .post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
    .get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })
    .put("/image", (req, res) => { image.handleImage(req, res, db) })
    .post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => console.log("app is runing on localhost port:", port));