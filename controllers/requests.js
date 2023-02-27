const Requests = require("../models/requests");
const Warden = require("../models/warden");
const Student = require("../models/student");

const {
  serverError,
  successResponse,
  errorResponse,
} = require("../config/apiResponses");

exports.raiseRequest = async (req, res) => {
  try {
    const { roomNumber, datetimeout, datetimein, reason } = req.body;
    const user = await Student.findById(req.user._id);
    const warden = await Warden.findOne({ hostelName: user.hostelName });
    if (user.role !== "user") {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    const newRequest = new Requests({
      student: user._id,
      warden: warden._id,
      hostelName: user.hostelName,
      roomNumber,
      datetimein,
      datetimeout,
      reason,
    });
    user.gatePassRequests.push(newRequest._id);
    warden.requests.push(newRequest._id);
    await newRequest.save();
    await user.save();
    await warden.save();
    return successResponse(req, res, "Request raised succesfully", newRequest);
  } catch (error) {
    return serverError(req, res, error);
  }
};
