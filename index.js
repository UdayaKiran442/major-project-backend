const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./config/database");
const cloudinaryConfig = require("./config/cloudinary");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.raw({ type: 'multipart/form-data' }));
app.use(bodyParser.raw({ type: "multipart/form-data" }));

app.get("/", (req, res) => {
  res.send("Hi, code is successfully deployed");
});
app.use("/", require("./routes/index"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
