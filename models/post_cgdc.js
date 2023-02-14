const mongoose = require("mongoose");

const cgdcPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    category: {
      type: String,
      enum: ["internships", "fulltime", "hackathons", "events"],
      required: true,
    },
    link: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("CGDCPosts", cgdcPostSchema);
module.exports = Post;
