const jwt = require("jsonwebtoken");

const User = require("../models/student");
const { errorResponse, serverError } = require("../config/apiResponses");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return errorResponse(req, res, 401, "Login to perform an action");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return serverError(req, res, "Internal server error at auth.js");
  }
};
