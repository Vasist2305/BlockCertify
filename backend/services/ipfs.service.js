const axios = require("axios");
require("dotenv").config();

const PINATA_API_URL = "https://api.pinata.cloud";

/**
 * Upload certificate data to IPFS via Pinata
 */
exports.uploadToIPFS = async (certificateData) => {
  try {
    const data = JSON.stringify({
      pinataContent: certificateData,
      pinataMetadata: {
        name: `Certificate-${certificateData.certificateId}`,
      },
    });

    const response = await axios.post(
      `${PINATA_API_URL}/pinning/pinJSONToIPFS`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("IPFS Upload Error:", error.response?.data || error.message);
    throw new Error("Failed to upload to IPFS");
  }
};

/**
 * Retrieve certificate data from IPFS
 */
exports.getFromIPFS = async (ipfsHash) => {
  try {
    const response = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    );
    return response.data;
  } catch (error) {
    console.error("IPFS Retrieval Error:", error.message);
    throw new Error("Failed to retrieve from IPFS");
  }
};
