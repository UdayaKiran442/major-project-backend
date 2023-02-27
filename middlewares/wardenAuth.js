const Warden = require("../models/warden");

const { decodedToken } = require("../config/decodedToken");
const { serverError } = require("../config/apiResponses");

exports.isWardenAuthenticated = async (req, res, next) => {
  try {
    const decoded = decodedToken(req, res);
    req.warden = await Warden.findById(decoded._id);
    next();
  } catch (error) {
    return serverError(req, res, error);
  }
};
