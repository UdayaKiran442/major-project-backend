const User = require("../models/student");
const EmailToken = require("../models/emailToken");
const ForgotPasswordToken = require("../models/forgotPasswordToken");

const hashPassword = require("../config/hashed_password");
const comparePassword = require("../config/compare_password");
const generateToken = require("../config/jsonwebtoken");
const {
  serverError,
  successResponse,
  errorResponse,
} = require("../config/apiResponses");
const { addImage } = require("../config/uploading_cloudinary");
const { generateOTP } = require("../config/OTP");
const { sendEmail } = require("../config/mailGun");
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
    const userResponse = newUser.email;
    return successResponse(
      req,
      res,
      "OTP sent to corresponding email address",
      userResponse
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

    const token = await EmailToken.findOne(userId);
    if (!token) {
      return errorResponse(req, res, 404, "Invalid user");
    }
    if (token.token !== OTP) {
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
    const isSame = await comparePassword(password, user.password);
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

exports.resetPassword = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return errorResponse(req, res, 404, "User not found");
    }
    const isSame = await comparePassword(password, user.password);
    if (!isSame) {
      return errorResponse(req, res, 401, "Incorrect password");
    }
    if (newPassword !== confirmNewPassword) {
      return errorResponse(
        req,
        res,
        401,
        "Password and confirm password must be same"
      );
    }
    const encryptedPassword = await hashPassword(newPassword);
    user.password = encryptedPassword;
    await user.save();
    return successResponse(req, res, "Password Updated", null);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(req, res, 404, "Email not found , Invalid email");
    }
    const OTP = await generateOTP();
    const newToken = new ForgotPasswordToken({
      email,
      token: OTP,
    });
    await newToken.save();
    const messageData = {
      from: `Excited User ${process.env.FROM_EMAIL}`,
      to: email,
      subject: "Hello",
      text: `Your otp to get a new password is ${OTP}`,
    };
    await sendEmail(messageData);
    return successResponse(req, res, "OTP send to your mail id", email);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.changeForgotPassword = async (req, res) => {
  try {
    const { email, OTP, newPassword } = req.body;
    const userToken = await ForgotPasswordToken.findOne({ email });
    const user = await User.findOne({ email });
    if (userToken.token !== OTP) {
      return errorResponse(req, res, 404, "Invalid token");
    }
    if (!user) {
      return errorResponse(req, res, 404, "Invalid email");
    }
    const encryptedPassword = await hashPassword(newPassword);
    user.password = encryptedPassword;
    await user.save();
    await userToken.remove();
    return successResponse(req, res, "Password changed succesfully", null);
  } catch (error) {
    return serverError(req, res, error);
  }
};
