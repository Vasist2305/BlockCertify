const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.connectWallet = async (req, res) => {
  try {
    const { walletAddress, role, name, email } = req.body;

    if (!walletAddress || !role) {
      return res.status(400).json({ message: "Wallet address and role are required" });
    }

    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = await User.create({ 
        walletAddress, 
        role,
        name: name || "User",
        email: email || ""
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletAddress: user.walletAddress,
        role: user.role,
        rollNumber: user.rollNumber,
        course: user.course,
        department: user.department
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      walletAddress, 
      role, 
      rollNumber, 
      course, 
      department,
      instituteId 
    } = req.body;

    if (!name || !email || !walletAddress || !role) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { walletAddress }] });
    
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = await User.create({
      name,
      email,
      walletAddress,
      role,
      rollNumber,
      course,
      department,
      instituteId
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletAddress: user.walletAddress,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, walletAddress } = req.body;

    if (!email && !walletAddress) {
      return res.status(400).json({ message: "Email or wallet address is required" });
    }

    const user = await User.findOne({
      $or: [{ email }, { walletAddress }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletAddress: user.walletAddress,
        role: user.role,
        rollNumber: user.rollNumber,
        course: user.course,
        department: user.department
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await User.find({ role: "INSTITUTE" })
      .select("name email instituteId");

    res.json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
