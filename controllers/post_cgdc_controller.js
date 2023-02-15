const POST_CGDC = require("../models/post_cgdc");
const User = require("../models/student");

const {
  serverError,
  errorResponse,
  successResponse,
} = require("../config/apiResponses");
const { addImage, destroyImage } = require("../config/uploading_cloudinary");

const ApiFeature = require("../utils/apiFeature");

exports.createPost = async (req, res) => {
  try {
    const { content, link, category, image } = req.body;
    const user = await User.findById(req.user._id);
    if (user.role !== "cgdc") {
      return errorResponse(req, res, 401, "Unauthorized access");
    }
    const newPost = new POST_CGDC({
      content,
      category,
      link,
      user: req.user._id,
    });
    if (image) {
      const { public_id, secure_url } = await addImage(image);
      newPost.image.public_id = public_id;
      newPost.image.url = secure_url;
    }
    user.posts.push(newPost._id);
    await newPost.save();
    await user.save();
    return successResponse(req, res, "Post added succesfully", newPost);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.getAllCGDCPosts = async (req, res) => {
  try {
    const apiFeatures = new ApiFeature(
      POST_CGDC.find().populate("user"),
      req.query
    ).filter();
    const cgdcPosts = await apiFeatures.query;
    return successResponse(req, res, null, cgdcPosts);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.updateCGDCPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { image } = req.body;
    const user = await User.findById(req.user._id);
    const post = await POST_CGDC.findById(postId);
    if (!post) {
      return errorResponse(req, res, 404, "Post not found");
    }
    if (user.role !== "cgdc") {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    const updatedCGDCPost = await POST_CGDC.findByIdAndUpdate(postId, req.body);
    if (image) {
      if (updatedCGDCPost.image && updatedCGDCPost.image.public_id) {
        await destroyImage(updatedCGDCPost.image.public_id);
      }
      const { public_id, secure_url } = await addImage(image);
      updatedCGDCPost.image.public_id = public_id;
      updatedCGDCPost.image.url = secure_url;
    }
    await updatedCGDCPost.save();
    return successResponse(req, res, "Post updated succesfully", null);
  } catch (error) {
    return serverError(req, res, error);
  }
};
