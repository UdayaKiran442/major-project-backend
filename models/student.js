const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "cgdc"],
    default: "user",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CGDCPosts",
    },
  ],
});

const Student = mongoose.model("User", studentSchema);
module.exports = Student;
