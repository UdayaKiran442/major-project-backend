const mongoose = require("mongoose");

const emailTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Token = mongoose.model("Token", emailTokenSchema);
module.exports = Token;
