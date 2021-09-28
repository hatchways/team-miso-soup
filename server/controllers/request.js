const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request
// @desc Gets list of all requests
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const requests = Request.find();

  if (!requests) {
    res.status(404);
    throw new Error("No requests found");
  }

  res.status(200).json({ requests: requests });
});

// @route POST /request
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {});

// @route UPDATE /request/:id
// @desc Update a specified request
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {});
