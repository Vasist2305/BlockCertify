const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  requestCertificate,
  getStudentDashboard,
  getMyCertificates,
  getRequestHistory,
  updateProfile,
  getProfile
} = require("../controllers/student.controller");

router.post("/request-certificate", protect(["STUDENT"]), requestCertificate);
router.get("/dashboard", protect(["STUDENT"]), getStudentDashboard);
router.get("/certificates", protect(["STUDENT"]), getMyCertificates);
router.get("/request-history", protect(["STUDENT"]), getRequestHistory);
router.put("/profile", protect(["STUDENT"]), updateProfile);
router.get("/profile", protect(["STUDENT"]), getProfile);

module.exports = router;
