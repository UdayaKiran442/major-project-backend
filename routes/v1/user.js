const router = require("express").Router();
const uploader = require("../../config/multer");
const multer = require("multer");
const upload = multer();

const {
  registerUser,
  verifyUser,
  loginUser,
  profile,
  resetPassword,
  forgotPassword,
  changeForgotPassword,
  saveOTP,
} = require("../../controllers/user");
const { isAuthenticated } = require("../../middlewares/auth");

router.post("/new-user", registerUser);
router.post("/send-otp", saveOTP);
router.post("/verify-user", verifyUser);
router.post("/login-user", loginUser);
router.post("/user-profile", isAuthenticated, profile);
router.post("/reset-password", isAuthenticated, resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-forgot-password", changeForgotPassword);

module.exports = router;
