const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  warden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warden",
  },
  hostelName: {
    type: String,
    enum: ["Apt-A", "Apt-B", "Apt-C", "Apt-D", "newtower", "oldtower"],
    require: true,
  },
  roomNumber: {
    type: String,
    require: true,
  },
  datetimeout: {
    type: String,
  },
  datetimein: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
