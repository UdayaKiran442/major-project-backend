const mongoose = require("mongoose");

const freeTimingsSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  freeDay: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  freeTimings: [
    {
      type: String,
    },
  ],
});

const FreeTimings = mongoose.model("FreeTimings", freeTimingsSchema);
module.exports = FreeTimings;
