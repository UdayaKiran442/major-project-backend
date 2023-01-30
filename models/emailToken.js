const mongoose = require("mongoose");

const emailTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

const Token = mongoose.model("Token", emailTokenSchema);
module.exports = Token;
