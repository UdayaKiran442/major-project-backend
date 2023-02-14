const router = require("express").Router();

const {
  createPost,
  getAllCGDCPosts,
} = require("../../controllers/post_cgdc_controller");

const { isAuthenticated } = require("../../middlewares/auth");

router.post("/new-post", isAuthenticated, createPost);
router.post("/", getAllCGDCPosts);

module.exports = router;
