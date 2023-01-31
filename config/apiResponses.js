exports.successResponse = (req, res, message, results) => {
  return res.status(200).json({
    message,
    results,
    success: true,
  });
};

exports.errorResponse = (req, res, statusCode, error) => {
  return res.status(statusCode).json({
    error,
    success: false,
  });
};

exports.serverError = (req, res, error) => {
  return res.status(500).json({
    error: error.message,
    success: false,
  });
};
