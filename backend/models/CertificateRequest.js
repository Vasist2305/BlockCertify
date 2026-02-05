const mongoose = require("mongoose");

const CertificateRequest = require("../models/CertificateRequest");

const certificateRequestSchema = new mongoose.Schema({
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
  certificateType: String,
  course: String,
  department: String,
  year: String,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED", "ISSUED"],
    default: "PENDING"
  },
  rejectionReason: String,
  approvedAt: Date,
  issuedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("CertificateRequest", certificateRequestSchema);
