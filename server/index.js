import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

import pool from "./database/db.js";
import getProductsRouter from "./routes/getProducts.routes.js";
import addRouter from "./routes/add.routes.js";
import getRouter from "./routes/get.routes.js";
import authRouter from "./routes/auth.router.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const pgMiddleware = (req, res, next) => {
  req.db = pool;
  next();
};
app.use(pgMiddleware);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/get/products/", getProductsRouter);

app.use("/add/", addRouter);

app.use("/get/", getRouter);

app.use("/", authRouter);

//serializing and deserializing
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//Listening on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server running on port 3000`);
});
