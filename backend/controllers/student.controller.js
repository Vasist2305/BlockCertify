const CertificateRequest = require("../models/CertificateRequest");
const Certificate = require("../models/Certificate");
const User = require("../models/User");

exports.requestCertificate = async (req, res) => {
  try {
    const { certificateType, course, department, year, instituteId } = req.body;

    if (!instituteId) {
      return res.status(400).json({ message: "Institute ID is required" });
    }

    const request = await CertificateRequest.create({
      studentId: req.user.id,
      instituteId,
      certificateType,
      course,
      department,
      year
    });

    res.status(201).json({
      message: "Certificate request submitted successfully",
      request
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentDashboard = async (req, res) => {
  try {
    const totalRequests = await CertificateRequest.countDocuments({ studentId: req.user.id });
    const issued = await Certificate.countDocuments({ 
      studentId: req.user.id, 
      status: "ISSUED" 
    });
    const pending = await CertificateRequest.countDocuments({ 
      studentId: req.user.id, 
      status: "PENDING" 
    });
    const rejected = await CertificateRequest.countDocuments({ 
      studentId: req.user.id, 
      status: "REJECTED" 
    });

    res.json({ 
      totalRequests, 
      issued, 
      pending,
      rejected 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      studentId: req.user.id,
      status: "ISSUED"
    })
      .populate("instituteId", "name email")
      .sort({ createdAt: -1 });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequestHistory = async (req, res) => {
  try {
    const history = await CertificateRequest.find({ studentId: req.user.id })
      .populate("instituteId", "name email")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, rollNumber, course, department, walletAddress } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (rollNumber) user.rollNumber = rollNumber;
    if (course) user.course = course;
    if (department) user.department = department;
    if (walletAddress) user.walletAddress = walletAddress;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
