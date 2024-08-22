import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

const saltRounds = 10;

router.post("/login", async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const email = req.body.email;
  const result = await res.locals.db.query(
    "SELECT * FROM users WHERE email = $1 ",
    [email]
  );
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

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const result = await res.locals.db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (result.rows.length > 0) {
    res.send({
      auth: "USERNAME EXISTS",
    });
  } else {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) console.log("ERROR hashing", err);
      const result = await res.locals.db.query(
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

export default router;
