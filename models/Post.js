const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  barista: {
    type: String,
    required: true,
    default: ' '
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type:String,
    required: true,
  },
  coffee: {
    type:String,
    required: true,
  },
  temp: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
