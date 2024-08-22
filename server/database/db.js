import pg from "pg";
import env from "dotenv";

env.config();

export default function connectPG() {
  const config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: 12696,
    database: "e-comms",
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.CA,
    },
  };

  const db = new pg.Client(config);
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
  });

  return db;
}
