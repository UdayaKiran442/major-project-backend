const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    enum: ["SOET", "SOL", "SOM"],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    require: true,
  },
  cabinNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "faculty",
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
