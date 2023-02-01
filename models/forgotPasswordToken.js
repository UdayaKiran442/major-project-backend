const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

const ForgotPasswordToken = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema
);
module.exports = ForgotPasswordToken;
