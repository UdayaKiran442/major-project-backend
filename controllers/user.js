const User = require("../models/student");
const EmailToken = require("../models/emailToken");

const hashPassword = require("../config/hashed_password");
const {
  serverError,
  successResponse,
  errorResponse,
} = require("../config/apiResponses");
const { addImage } = require("../config/uploading_cloudinary");
const { generateOTP } = require("../config/OTP");
const { sendEmail } = require("../config/mailGun");
const comparePassword = require("../config/compare_password");
const generateToken = require("../config/jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return errorResponse(req, res, 400, "User already exists");
    }
    const user_phone = await User.findOne({ phone });
    if (user_phone) {
      return errorResponse(req, res, 400, "Phone number already exists");
    }
    const encryptedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      phone: parseInt(phone),
      password: encryptedPassword,
    });
    if (req.file) {
      const { public_id, secure_url } = await addImage(req.file.path);
      newUser.avatar.public_id = public_id;
      newUser.avatar.url = secure_url;
    }
    await newUser.save();
    const OTP = generateOTP();
    const newToken = new EmailToken({
      userId: newUser._id,
      token: OTP,
    });
    await newToken.save();

    const messageData = {
      from: `Excited User ${process.env.FROM_EMAIL}`,
      to: newUser.email,
      subject: "Hello",
      text: OTP,
    };
    const result = await sendEmail(messageData);
    return successResponse(
      req,
      res,
      "OTP sent to corresponding email address",
      result
    );
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { userId, OTP } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(req, res, 404, "Invalid OTP");
    }

    const token = await EmailToken.findOne({
      userId,
      token: OTP,
    });
    if (!token) {
      return errorResponse(req, res, 404, "Invalid OTP");
    }
    user.isVerified = true;
    await token.remove();
    await user.save();
    return successResponse(req, res, "User verified", null);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(req, res, 404, "Invalid email/password");
    }
    const isSame = comparePassword(password, user.password);
    if (!isSame) {
      return errorResponse(req, res, 404, "Invalid email/password");
    }
    const token = generateToken(user._id);
    return successResponse(req, res, null, token);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return errorResponse(req, res, 404, "User not found");
    }
    return successResponse(req, res, null, user);
  } catch (error) {
    return serverError(req, res, error);
  }
};
