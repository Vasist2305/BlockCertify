const CertificateRequest = require("../models/CertificateRequest");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const { uploadToIPFS } = require("../services/ipfs.service");
const { issueCertificateOnChain, revokeCertificateOnChain } = require("../services/blockchain.service");

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await CertificateRequest.find({
      instituteId: req.user.id,
      status: "PENDING"
    }).populate("studentId", "name rollNumber email walletAddress");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificateRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "APPROVED";
    await request.save();

    res.json({ message: "Request approved", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const { requestId, reason } = req.body;

    const request = await CertificateRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "REJECTED";
    request.rejectionReason = reason;
    await request.save();

    res.json({ message: "Request rejected", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.issueCertificate = async (req, res) => {
  try {
    const {
      studentId,
      certificateType,
      course,
      department,
      year,
      rollNumber,
      studentName,
      grade,
      cgpa,
      issueDate,
      requestId
    } = req.body;

    // Generate unique certificate ID
    const certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Get student wallet address
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Prepare certificate data for IPFS
    const certificateData = {
      certificateId,
      studentId,
      studentName: studentName || student.name,
      rollNumber: rollNumber || student.rollNumber,
      certificateType,
      course,
      department,
      year,
      grade,
      cgpa,
      issueDate: issueDate || new Date().toISOString(),
      instituteId: req.user.id,
      timestamp: Date.now()
    };

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(certificateData);

    // Issue on blockchain
    const txResult = await issueCertificateOnChain(
      certificateId,
      ipfsHash,
      student.walletAddress || ethers.ZeroAddress
    );

    // Save to database
    const certificate = await Certificate.create({
      certificateId,
      studentId,
      instituteId: req.user.id,
      certificateType,
      course,
      department,
      year,
      rollNumber: rollNumber || student.rollNumber,
      studentName: studentName || student.name,
      ipfsHash,
      transactionHash: txResult.hash,
      blockchainStatus: "CONFIRMED",
      status: "ISSUED",
      metadata: {
        grade,
        cgpa,
        issueDate: issueDate || new Date()
      }
    });

    // Update request status if exists
    if (requestId) {
      await CertificateRequest.findByIdAndUpdate(requestId, {
        status: "ISSUED"
      });
    }

    res.status(201).json({
      message: "Certificate issued successfully",
      certificate,
      transactionHash: txResult.hash
    });
  } catch (error) {
    console.error("Issue certificate error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getIssuedCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      instituteId: req.user.id
    })
      .populate("studentId", "name rollNumber email")
      .sort({ createdAt: -1 });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.revokeCertificate = async (req, res) => {
  try {
    const { certificateId, reason } = req.body;

    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Revoke on blockchain
    const txResult = await revokeCertificateOnChain(certificateId);

    // Update database
    certificate.status = "REVOKED";
    certificate.metadata.revocationReason = reason;
    certificate.metadata.revokedAt = new Date();
    await certificate.save();

    res.json({
      message: "Certificate revoked successfully",
      transactionHash: txResult.hash
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInstituteDashboard = async (req, res) => {
  try {
    const totalIssued = await Certificate.countDocuments({
      instituteId: req.user.id,
      status: "ISSUED"
    });

    const pending = await CertificateRequest.countDocuments({
      instituteId: req.user.id,
      status: "PENDING"
    });

    const revoked = await Certificate.countDocuments({
      instituteId: req.user.id,
      status: "REVOKED"
    });

    const thisMonth = await Certificate.countDocuments({
      instituteId: req.user.id,
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    res.json({
      totalIssued,
      pending,
      revoked,
      thisMonth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bulkIssueCertificates = async (req, res) => {
  try {
    const { certificates } = req.body;

    if (!Array.isArray(certificates) || certificates.length === 0) {
      return res.status(400).json({ message: "Invalid certificates data" });
    }

    const results = [];
    const errors = [];

    for (const certData of certificates) {
      try {
        const certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const student = await User.findOne({ rollNumber: certData.rollNumber });
        if (!student) {
          errors.push({ rollNumber: certData.rollNumber, error: "Student not found" });
          continue;
        }

        const certificateData = {
          certificateId,
          ...certData,
          instituteId: req.user.id,
          timestamp: Date.now()
        };

        const ipfsHash = await uploadToIPFS(certificateData);
        const txResult = await issueCertificateOnChain(
          certificateId,
          ipfsHash,
          student.walletAddress || "0x0000000000000000000000000000000000000000"
        );

        const certificate = await Certificate.create({
          certificateId,
          studentId: student._id,
          instituteId: req.user.id,
          ...certData,
          ipfsHash,
          transactionHash: txResult.hash,
          blockchainStatus: "CONFIRMED",
          status: "ISSUED"
        });

        results.push(certificate);
      } catch (error) {
        errors.push({ rollNumber: certData.rollNumber, error: error.message });
      }
    }

    res.json({
      message: "Bulk issuance completed",
      successful: results.length,
      failed: errors.length,
      results,
      errors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
