const asyncHandler = require("express-async-handler");

exports.users_get = asyncHandler(async (req, res, next) => {
  res.send("GET request for all users data");
});

exports.users_post = asyncHandler(async (req, res, next) => {
  res.send("POST request to users");
});
