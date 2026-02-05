const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  getPendingRequests,
  approveRequest,
  rejectRequest,
  issueCertificate,
  getIssuedCertificates,
  revokeCertificate,
  getInstituteDashboard,
  bulkIssueCertificates
} = require("../controllers/institute.controller");

router.get("/pending-requests", protect(["INSTITUTE"]), getPendingRequests);
router.post("/approve-request", protect(["INSTITUTE"]), approveRequest);
router.post("/reject-request", protect(["INSTITUTE"]), rejectRequest);
router.post("/issue-certificate", protect(["INSTITUTE"]), issueCertificate);
router.get("/issued-certificates", protect(["INSTITUTE"]), getIssuedCertificates);
router.post("/revoke-certificate", protect(["INSTITUTE"]), revokeCertificate);
router.get("/dashboard", protect(["INSTITUTE"]), getInstituteDashboard);
router.post("/bulk-issue", protect(["INSTITUTE"]), bulkIssueCertificates);

module.exports = router;
