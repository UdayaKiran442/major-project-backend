const router = require("express").Router();

const {
  createWarden,
  login,
  profile,
  getGatePassRequests,
} = require("../../controllers/warden");

const { isWardenAuthenticated } = require("../../middlewares/wardenAuth");

router.post("/new-warden", createWarden);
router.post("/warden-login", login);
router.post("/warden-profile", isWardenAuthenticated, profile);
router.post("/warden-gate-pass", isWardenAuthenticated, getGatePassRequests);

module.exports = router;
