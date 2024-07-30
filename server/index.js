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
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

async function getUser(email,username){
    const user = await db.query("SELECT * FROM users WHERE email = $1 AND username = $2",[email,username]);
    return user;
};

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

app.get("/get/products", async (req,res) => {
  const result = await db.query("SELECT * FROM products");
  res.json({
    products: result
  });
});

app.post("/login",async (req,res)=>{
    console.log(req.body);
    const password = req.body.password;
    const email = req.body.email;
    const result = await db.query("SELECT * FROM users WHERE email = $1 ", [email]);
    if((result.rows.length === 0)){
        res.json({
            auth: 'USER NOT FOUND'
        });
    }
    else{
      const user = result.rows[0];
      console.log(user);
      bcrypt.compare(password,user.password, (err,result)=>{
          if(err){
              console.log('ERROR COMPARING')
          }
          if(result){
              res.json({
                  auth:'AUTHENTICATED',
                  id: user.id,
                  admin: user.adminstrator
              });
          }
          else{
              res.json({
                  auth:'WRONG PASSWORD'
              });
          }
      })
    }
});

app.post("/register", async (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if( result.rows.length > 0){
      res.send({
          auth: 'USERNAME EXISTS'
      });
    } else{
      bcrypt.hash(password, saltRounds, async (err,hash) => {
          if(err) console.log("ERROR hashing",err);
          const result = await db.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
                      [username, hash, email]
                    );
          const user = result.rows[0];
          res.json({
              auth: 'AUTHENTICATED',
              id: result.rows[0].id
          });
      });
    }
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