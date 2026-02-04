const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.connectWallet = async (req, res) => {
  const { walletAddress, role } = req.body;

  if (!walletAddress || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  let user = await User.findOne({ walletAddress });

  if (!user) {
    user = await User.create({ walletAddress, role });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
};
