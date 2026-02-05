const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  certificateType: {
    type: String,
    required: true
  },
  course: String,
  department: String,
  year: String,
  rollNumber: String,
  studentName: String,
  ipfsHash: String,
  transactionHash: String,
  blockchainStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "FAILED"],
    default: "PENDING"
  },
  status: {
    type: String,
    enum: ["ISSUED", "REVOKED"],
    default: "ISSUED"
  },
  metadata: {
    grade: String,
    cgpa: String,
    issueDate: Date,
    expiryDate: Date,
    additionalInfo: Object
  }
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
