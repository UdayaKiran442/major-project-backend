const router = require("express").Router();
const uploader = require("../../config/multer");

const { registerUser, verifyUser } = require("../../controllers/user");

router.post("/new-user", uploader.single("avatar"), registerUser);
router.post("/verify-user", uploader.none(), verifyUser);

module.exports = router;
