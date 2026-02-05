const router = require("express").Router();
const Certificate = require("../models/Certificate");
const { verifyCertificateOnChain } = require("../services/blockchain.service");
const { getFromIPFS } = require("../services/ipfs.service");

/**
 * Verify certificate by ID
 */
router.get("/certificate/:certificateId", async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Check database
    const certificate = await Certificate.findOne({ certificateId })
      .populate("studentId", "name rollNumber email")
      .populate("instituteId", "name email");

    if (!certificate) {
      return res.status(404).json({ 
        isValid: false,
        message: "Certificate not found" 
      });
    }

    // Verify on blockchain
    const blockchainData = await verifyCertificateOnChain(certificateId);

    // Get IPFS data
    let ipfsData = null;
    if (certificate.ipfsHash) {
      try {
        ipfsData = await getFromIPFS(certificate.ipfsHash);
      } catch (error) {
        console.error("IPFS retrieval error:", error.message);
      }
    }

    res.json({
      isValid: certificate.status === "ISSUED",
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        rollNumber: certificate.rollNumber,
        certificateType: certificate.certificateType,
        course: certificate.course,
        department: certificate.department,
        year: certificate.year,
        issueDate: certificate.metadata?.issueDate || certificate.createdAt,
        status: certificate.status,
        transactionHash: certificate.transactionHash,
        instituteName: certificate.instituteId?.name,
        instituteEmail: certificate.instituteId?.email,
        ipfsHash: certificate.ipfsHash
      },
      blockchainData,
      ipfsData,
      verificationTimestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Verify certificate by transaction hash
 */
router.get("/transaction/:txHash", async (req, res) => {
  try {
    const { txHash } = req.params;

    const certificate = await Certificate.findOne({ transactionHash: txHash })
      .populate("studentId", "name rollNumber email")
      .populate("instituteId", "name email");

    if (!certificate) {
      return res.status(404).json({ 
        isValid: false,
        message: "Certificate not found for this transaction" 
      });
    }

    res.json({
      isValid: certificate.status === "ISSUED",
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        rollNumber: certificate.rollNumber,
        certificateType: certificate.certificateType,
        status: certificate.status,
        transactionHash: certificate.transactionHash,
        instituteName: certificate.instituteId?.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
