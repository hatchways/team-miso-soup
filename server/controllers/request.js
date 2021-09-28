const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request
// @desc Gets list of all requests
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Gets all requests for specified user id
  const requests = Request.find({ user_id: userId });

  if (!requests) {
    res.status(404);
    throw new Error("No requests found");
  }

  res.status(200).json({ requests: requests });
});

// @route POST /request
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { userId, sitterId, start, end } = req.body;

  if (!userId || !sitterId || !start || !end) {
    res.status(404);
    throw new Error("Missing required info to make request");
  }
  // creates new request
  const request = await Request.create({
    user_id: userId,
    sitter_id: sitterId,
    start,
    end,
  });

  if (request) {
    res.status(201).json({ success: request });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route UPDATE /request/:id
// @desc Update a specified request
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {});
