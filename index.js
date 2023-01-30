const express = require("express");
const dotenv = require("dotenv").config();

const db = require("./config/database");

const app = express();

app.use("/", require("./routes/index"));

const port = process.env.PORT;
app.listen(() => {
  console.log(`Listening on port ${port}`);
});
