const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  hostelName: {
    type: String,
    enum: ["Apt-A", "Apt-B", "Apt-C", "Apt-D", "newtower", "oldtower"],
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
    },
  ],
  role: {
    type: String,
    default: "warden",
  },
});

const Warden = mongoose.model("Warden", wardenSchema);
module.exports = Warden;
