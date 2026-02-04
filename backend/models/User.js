const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["STUDENT", "INSTITUTE", "ADMIN"],
    required: true
  },
  rollNumber: String,
  course: String,
  department: String,
  instituteId: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
