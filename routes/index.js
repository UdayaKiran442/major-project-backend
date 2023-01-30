const router = require("express").Router();

router.use("/api/v1/users", require("./v1/user"));

module.exports = router;
