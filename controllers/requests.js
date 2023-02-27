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

exports.acceptRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);
    const warden = await Warden.findById(req.warden._id);
    if (!warden) {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    request.isAccepted = true;
    await request.save();
    return successResponse(req, res, "Request accepted", request);
  } catch (error) {
    return serverError(req, res, error);
  }
};
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);
    const warden = await Warden.findById(req.warden._id);
    if (!warden) {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    request.isRejected = true;
    request.isAccepted = false;
    await request.save();
    return successResponse(req, res, "Request rejected", request);
  } catch (error) {
    return serverError(req, res, error);
  }
};
exports.rejectAcceptedRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);
    const warden = await Warden.findById(req.warden._id);
    if (!warden) {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    if (!request.isAccepted) {
      return errorResponse(req, res, 400, "Request is in pending mode");
    }
    request.isAccepted = false;
    request.isRejected = true;
    await request.save();
    return successResponse(req, res, "Request rejected", request);
  } catch (error) {
    return serverError(req, res, error);
  }
};

exports.acceptRejetedRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);
    const warden = await Warden.findById(req.warden._id);
    if (!warden) {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    if (!request.isRejected) {
      return errorResponse(req, res, 400, "Request is not rejected");
    }
    request.isAccepted = true;
    request.isRejected = false;
    await request.save();
    return successResponse(req, res, "Request accepted", request);
  } catch (error) {
    return serverError(req, res, error);
  }
};
exports.setRequestInPendingMode = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);
    const warden = await Warden.findById(req.warden._id);
    if (!warden) {
      return errorResponse(req, res, 401, "Unauthorized");
    }
    if (!request.isRejected && !request.isAccepted) {
      return errorResponse(req, res, 400, "Request is already in pending mode");
    }
    request.isAccepted = false;
    request.isRejected = false;
    await request.save();
    return successResponse(req, res, "Request set to pending mode", request);
  } catch (error) {
    return serverError(req, res, error);
  }
};
