const router = require("express").Router();

const { isAuthenticated } = require("../../middlewares/auth");

const { raiseRequest } = require("../../controllers/requests");

router.post("/new-request", isAuthenticated, raiseRequest);

module.exports = router;
