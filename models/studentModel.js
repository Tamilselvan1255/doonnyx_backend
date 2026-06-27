const mongoose = require("mongoose");

const studentInfo = new mongoose.Schema({
  adm_number: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  dob: { type: String },
  gender: { type: String },
  standard: { type: String },
  section: { type: String },
  parent_name: { type: String },
  parent_mobile: { type: String },
  email: { type: String },
  address: { type: String },
  admission_date: { type: String },
  status: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const studentModel = mongoose.model("student", studentInfo);
module.exports = studentModel;
