const User = require("../models/student");
const EmailToken = require("../models/emailToken");

const hashPassword = require("../config/hashed_password");
const { serverError, successResponse } = require("../config/apiResponses");
const { addImage } = require("../config/uploading_cloudinary");
const { generateOTP } = require("../config/OTP");
const { sendEmail } = require("../config/mailGun");
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
