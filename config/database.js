const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo_db/major-project-backend");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));
module.exports = db;
