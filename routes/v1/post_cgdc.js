const router = require("express").Router();

const {
  createPost,
  getAllCGDCPosts,
  updateCGDCPost,
} = require("../../controllers/post_cgdc_controller");

const { isAuthenticated } = require("../../middlewares/auth");

router.post("/new-post", isAuthenticated, createPost);
router.post("/", getAllCGDCPosts);
router.post("/:postId", isAuthenticated, updateCGDCPost);

module.exports = router;
