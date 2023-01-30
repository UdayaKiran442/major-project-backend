const router = require("express").Router();
const uploader = require("../../config/multer");

const { registerUser } = require("../../controllers/user");

router.post("/new-user", uploader.single("avatar"), registerUser);

module.exports = router;
