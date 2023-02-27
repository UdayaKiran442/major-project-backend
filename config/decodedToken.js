const jwt = require("jsonwebtoken");

const { errorResponse } = require("./apiResponses");

exports.decodedToken = (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return errorResponse(req, res, 401, "Login to perform an action");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
