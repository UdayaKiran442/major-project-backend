const router = require("express").Router();

const { createWarden, login, profile } = require("../../controllers/warden");

const { isWardenAuthenticated } = require("../../middlewares/wardenAuth");

router.post("/new-warden", createWarden);
router.post("/warden-login", login);
router.post("/warden-profile", isWardenAuthenticated, profile);

module.exports = router;
