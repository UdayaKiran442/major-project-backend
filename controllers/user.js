const User = require("../models/student");
const EmailToken = require("../models/emailToken");

const { serverError, successResponse } = require("../config/apiResponses");
const { addImage } = require("../config/uploading_cloudinary");
const hashPassword = require("../config/hashed_password");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
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
    return successResponse(
      req,
      res,
      "OTP sent to corresponding email address",
      null
    );
  } catch (error) {
    return serverError(req, res, error);
  }
};
