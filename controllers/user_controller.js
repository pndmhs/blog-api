const asyncHandler = require("express-async-handler");

exports.users_get = asyncHandler(async (req, res, next) => {
  res.send("GET request for all users data");
});
