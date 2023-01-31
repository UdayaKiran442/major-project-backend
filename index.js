const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const db = require("./config/database");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
