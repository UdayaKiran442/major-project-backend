const router = require("express").Router();

const {
  createPost,
  getAllCGDCPosts,
  updateCGDCPost,
  getCGDCPostById,
  deleteCGDCPost,
} = require("../../controllers/post_cgdc_controller");

const { isAuthenticated } = require("../../middlewares/auth");

router.post("/new-post", isAuthenticated, createPost);
router.post("/", getAllCGDCPosts);
router.post("/update/:postId", isAuthenticated, updateCGDCPost);
router.post("/:id", isAuthenticated, getCGDCPostById);
router.post("/delete/:id", isAuthenticated, deleteCGDCPost);

module.exports = router;
