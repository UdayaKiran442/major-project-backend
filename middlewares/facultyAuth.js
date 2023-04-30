const Faculty = require("../models/faculty");

const jwt = require("jsonwebtoken");

const { decodedToken } = require("../config/decodedToken");

exports.isFacultyAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Login to perform an action",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const faculty = await Faculty.findById(decoded.id);
    console.log("Faculty:", faculty);
    req.faculty = faculty;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
