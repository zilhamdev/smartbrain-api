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
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const whitelist = [process.env.ORIGIN_URL, process.env.ORIGIN_URL_2, process.env.ORIGIN_URL_3];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
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