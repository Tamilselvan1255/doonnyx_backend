const mongoose = require("mongoose");

const userInfo = new mongoose.Schema({
  full_name: { type: String },
  email: { type: String },
  password: { type: String },
  mobile: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const userModel = mongoose.model("user", userInfo);
module.exports = userModel;

