const router = require("express").Router();
const uploader = require("../../config/multer");

const {
  registerUser,
  verifyUser,
  loginUser,
  profile,
  resetPassword,
} = require("../../controllers/user");
const { isAuthenticated } = require("../../middlewares/auth");

router.post("/new-user", uploader.single("avatar"), registerUser);
router.post("/verify-user", uploader.none(), verifyUser);
router.post("/login-user", uploader.none(), loginUser);
router.post("/user-profile", isAuthenticated, uploader.none(), profile);
router.post("/reset-password", isAuthenticated, uploader.none(), resetPassword);

module.exports = router;
