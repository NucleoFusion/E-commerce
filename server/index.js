import express from "express";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt";
import React from "react";
import ReactDOM from "react-dom";
import { Strategy } from "passport-local";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
// import * as $ from 'jquery';

const app = express();
env.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
});
db.connect();

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login",(req,res)=>{
    console.log(req.body);
});

//serializing and deserializing
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
  

// app.get("/",(req,res)=>{
//     res.sendFile("index.html");
//     ReactDOM.render(<LogForm />,$('#root'));
// });

//Listening on port 3000
app.listen(process.env.PORT, () => {
    console.log(`Server running on port 3000`);
});