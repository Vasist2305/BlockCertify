const router = require("express").Router();
const { 
  connectWallet, 
  register, 
  login, 
  getInstitutes 
} = require("../controllers/auth.controller");

router.post("/connect-wallet", connectWallet);
router.post("/register", register);
router.post("/login", login);
router.get("/institutes", getInstitutes);

module.exports = router;
