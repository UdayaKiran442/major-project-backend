const router = require("express").Router();
const uploader = require("../../config/multer");

const {
  registerUser,
  verifyUser,
  loginUser,
  profile,
  resetPassword,
  forgotPassword,
  changeForgotPassword,
  saveOTP,
  verifyForgotPasswordOTP,
  getGatePassRequestsAndUserById,
} = require("../../controllers/user");
const { isAuthenticated } = require("../../middlewares/auth");

router.post("/new-user", registerUser);
router.post("/send-otp", saveOTP);
router.post("/verify-user/:userId", verifyUser);
router.post("/login-user", loginUser);
router.post("/user-profile", isAuthenticated, profile);
router.post("/reset-password", isAuthenticated, resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/verify-otp", verifyForgotPasswordOTP);
router.post("/reset-forgot-password", changeForgotPassword);
router.post(
  "/get-gate-passes-id",
  isAuthenticated,
  getGatePassRequestsAndUserById
);

module.exports = router;
