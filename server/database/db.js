import pg from "pg";
import env from "dotenv";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Client } = pg;

env.config();

// const uri = process.env.PG_URI;

const client = new Client();
await client.connect();
console.log("CONNECTED");

export default client;
