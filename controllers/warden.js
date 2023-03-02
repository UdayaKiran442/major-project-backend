const Warden = require("../models/warden");

const {
  serverError,
  successResponse,
  errorResponse,
} = require("../config/apiResponses");
const hashPassword = require("../config/hashed_password");
const comparePassword = require("../config/compare_password");
const { generateWardenToken } = require("../config/wardenJWTToken");

exports.createWarden = async (req, res) => {
  try {
    const { name, email, password, hostelName } = req.body;
    const hashedPassword = await hashPassword(password);
    const newWarden = new Warden({
      name,
      email,
      password: hashedPassword,
      hostelName,
    });
    await newWarden.save();
    return successResponse(req, res, "Warden created succesfully", newWarden);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const warden = await Warden.findOne({ email });
    if (!warden) {
      return errorResponse(req, res, 404, "Invalid email");
    }
    const isMatched = await comparePassword(password, warden.password);
    if (!isMatched) {
      return errorResponse(req, res, 404, "Invalid email");
    }
    const token = generateWardenToken(
      warden._id,
      warden.name,
      warden.email,
      warden.role,
      warden.hostelName
    );
    return successResponse(req, res, "Login Succesfull", token);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.profile = async (req, res) => {
  try {
    const warden = await Warden.findById(req.warden._id);
    return successResponse(req, res, null, warden);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.getGatePassRequests = async (req, res) => {
  try {
    const warden = await Warden.find().populate({
      path: "requests",
      populate: {
        path: "student",
      },
    });
    return successResponse(req, res, null, warden);
  } catch (error) {
    return serverError(req, res, error);
  }
};
