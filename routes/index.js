const router = require("express").Router();

router.use("/api/v1/users", require("./v1/user"));
router.use("/api/v1/posts", require("./v1/post_cgdc"));
router.use("/api/v1/warden", require("./v1/warden"));

module.exports = router;
