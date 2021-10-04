const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request
// @desc Gets list of all requests
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  //TODO: Need to refactor for actual user id passed
  const userId = req.body.id.trim();

  // Gets all requests for specified user id
  const requests = await Request.find({ userId: userId });

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
  const { userId, sitterId, startDate, endDate } = req.body;

  // Error if any required info is missing
  if (!userId || !sitterId || !startDate || !endDate) {
    res.status(404);
    throw new Error("Missing required info to make request");
  }

  // creates new request
  const request = await Request.create({
    userId,
    sitterId,
    startDate,
    endDate,
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
exports.updateRequest = asyncHandler(async (req, res, next) => {
  //TODO: Refactor to actual data passed from client
  const id = req.params.id;
  const { status } = req.body;
  let request;

  if (status === "declined") {
    request = await Request.findByIdAndUpdate(
      id,
      { $set: { status: "declined" } },
      { new: true }
    );
  } else if (status === "accepted") {
    request = await Request.findByIdAndUpdate(
      id,
      { $set: { status: "accepted" } },
      { new: true }
    );
  }

  if (request) {
    res.status(201).json({ success: request });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
