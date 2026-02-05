const { ethers } = require("ethers");
require("dotenv").config();

// Contract ABI (simplified - add full ABI after deployment)
const CONTRACT_ABI = [
  "function issueCertificate(string certificateId, string ipfsHash, address studentWallet) public",
  "function revokeCertificate(string certificateId) public",
  "function getCertificate(string certificateId) public view returns (string ipfsHash, address studentWallet, bool revoked, uint256 issuedAt)",
  "function addIssuer(address issuer) public",
  "event CertificateIssued(string certificateId, string ipfsHash, address studentWallet)",
  "event CertificateRevoked(string certificateId)"
];

let provider;
let contract;
let signer;

/**
 * Initialize blockchain connection
 */
const initBlockchain = () => {
  if (!process.env.BLOCKCHAIN_RPC_URL || !process.env.CONTRACT_ADDRESS) {
    console.warn("Blockchain configuration missing. Running in mock mode.");
    return null;
  }

  try {
    provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    return contract;
  } catch (error) {
    console.error("Blockchain initialization error:", error.message);
    return null;
  }
};

/**
 * Issue certificate on blockchain
 */
exports.issueCertificateOnChain = async (certificateId, ipfsHash, studentWallet) => {
  try {
    const contractInstance = contract || initBlockchain();
    
    if (!contractInstance) {
      // Mock mode for development
      return {
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000),
        status: "confirmed"
      };
    }

    const tx = await contractInstance.issueCertificate(
      certificateId,
      ipfsHash,
      studentWallet
    );

    const receipt = await tx.wait();

    return {
      hash: receipt.hash,
      blockNumber: receipt.blockNumber,
      status: receipt.status === 1 ? "confirmed" : "failed"
    };
  } catch (error) {
    console.error("Blockchain issue error:", error.message);
    throw new Error("Failed to issue certificate on blockchain");
  }
};

/**
 * Revoke certificate on blockchain
 */
exports.revokeCertificateOnChain = async (certificateId) => {
  try {
    const contractInstance = contract || initBlockchain();
    
    if (!contractInstance) {
      // Mock mode
      return {
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        status: "confirmed"
      };
    }

    const tx = await contractInstance.revokeCertificate(certificateId);
    const receipt = await tx.wait();

    return {
      hash: receipt.hash,
      status: receipt.status === 1 ? "confirmed" : "failed"
    };
  } catch (error) {
    console.error("Blockchain revoke error:", error.message);
    throw new Error("Failed to revoke certificate on blockchain");
  }
};

/**
 * Verify certificate on blockchain
 */
exports.verifyCertificateOnChain = async (certificateId) => {
  try {
    const contractInstance = contract || initBlockchain();
    
    if (!contractInstance) {
      // Mock mode
      return null;
    }

    const result = await contractInstance.getCertificate(certificateId);

    return {
      ipfsHash: result[0],
      studentWallet: result[1],
      revoked: result[2],
      issuedAt: Number(result[3])
    };
  } catch (error) {
    console.error("Blockchain verify error:", error.message);
    return null;
  }
};

/**
 * Add institute as issuer
 */
exports.addIssuer = async (issuerAddress) => {
  try {
    const contractInstance = contract || initBlockchain();
    
    if (!contractInstance) {
      return { success: true };
    }

    const tx = await contractInstance.addIssuer(issuerAddress);
    await tx.wait();

    return { success: true };
  } catch (error) {
    console.error("Add issuer error:", error.message);
    throw new Error("Failed to add issuer");
  }
};

// Initialize on module load
initBlockchain();
