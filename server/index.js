import express from "express";
import env from "dotenv";
import connectDb from "./utils/connectDb.js";
env.config();

const app = express();

app.use(express());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDb();
  console.log(`Port number is runing ${port}`);
});
