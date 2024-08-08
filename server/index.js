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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

async function getProducts(arr) {
  var array = [];
  for (let i = 0; i < arr.length; i++) {
    const result = await db.query("SELECT * FROM products WHERE id = $1", [
      parseInt(arr[i]),
    ]);
    var data = result.rows[0];
    array.push(data);
  }
  return array;
}

const { Pool } = pg;
const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
db.connect((err) => {
  if (err) console.log(err);
  console.log("Connected");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/get/products", async (req, res) => {
  const result = await db.query("SELECT * FROM products");
  res.json({
    products: result,
  });
});

app.get("/get/products/:type", async (req, res) => {
  const type = req.params.type;
  const result = await db.query(
    "SELECT * FROM products WHERE product_type = $1 LIMIT 6",
    [type]
  );
  res.send(await result.rows);
});

app.get("/get/products/:id", async (req, res) => {
  const result = await db.query("SELECT * FROM products WHERE id = $1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
});

app.get("/get/wishlist/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  var wishlist = await db.query("SELECT * FROM wishlist WHERE cust_id = $1", [
    id,
  ]);
  let wishlistItems = wishlist.rows[0].products.split(":");
  var wishlistData = await getProducts(wishlistItems);
  res.json(wishlistData);
});

app.get("/get/cart/:id", async (req, res) => {
  const result = await db.query("SELECT * FROM cart WHERE cust_id = $1", [
    parseInt(req.params.id),
  ]);
  const cartItems = result.rows[0].cart.split(":");
  const prodArray = await getProducts(cartItems);
  res.send(prodArray);
});

app.get("/get/user/:id", async (req, res) => {
  var id = parseInt(req.params.id);
  const result = await db.query(
    "SELECT email, username FROM users WHERE id = $1",
    [id]
  );
  const address = await db.query(
    "SELECT address_name,address FROM address WHERE cust_id = $1",
    [id]
  );
  res.json({
    userData: result.rows[0],
    address: address.rows,
  });
});

app.post("/add/address/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  await db.query(
    "INSERT INTO address (address_name,address,cust_id) VALUES ($1,$2,$3)",
    [req.body.AddressName, req.body.Address, req.params.id]
  );
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const email = req.body.email;
  const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
    email,
  ]);
  if (result.rows.length === 0) {
    res.json({
      auth: "USER NOT FOUND",
    });
  } else {
    const user = result.rows[0];
    console.log(user);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log("ERROR COMPARING");
      }
      if (result) {
        res.json({
          auth: "AUTHENTICATED",
          id: user.id,
          admin: user.adminstrator,
        });
      } else {
        res.json({
          auth: "WRONG PASSWORD",
        });
      }
    });
  }
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length > 0) {
    res.send({
      auth: "USERNAME EXISTS",
    });
  } else {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) console.log("ERROR hashing", err);
      const result = await db.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
        [username, hash, email]
      );
      const user = result.rows[0];
      res.json({
        auth: "AUTHENTICATED",
        id: result.rows[0].id,
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
