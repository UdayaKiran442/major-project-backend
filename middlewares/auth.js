const jwt = require("jsonwebtoken");

const User = require("../models/student");
const { serverError } = require("../config/apiResponses");
const { decodedToken } = require("../config/decodedToken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const decoded = decodedToken();
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return serverError(req, res, "Internal server error at auth.js");
  }
};
