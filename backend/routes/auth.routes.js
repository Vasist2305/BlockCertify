const router = require("express").Router();
const { connectWallet } = require("../controllers/auth.controller");

router.post("/connect-wallet", connectWallet);

module.exports = router;
