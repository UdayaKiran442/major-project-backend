const router = require("express").Router();

const { isAuthenticated } = require("../../middlewares/auth");

const {
  raiseRequest,
  acceptRequest,
  rejectRequest,
  rejectAcceptedRequest,
} = require("../../controllers/requests");
const { isWardenAuthenticated } = require("../../middlewares/wardenAuth");

router.post("/new-request", isAuthenticated, raiseRequest);
router.post("/accept-request/:id", isWardenAuthenticated, acceptRequest);
router.post("/reject-request/:id", isWardenAuthenticated, rejectRequest);
router.post(
  "/reject-accepted-request/:id",
  isWardenAuthenticated,
  rejectAcceptedRequest
);

module.exports = router;
