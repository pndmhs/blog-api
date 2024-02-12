const asyncHandler = require("express-async-handler");

exports.posts_get = asyncHandler(async (req, res, next) => {
  res.send("GET request for all posts");
});

exports.posts_post = asyncHandler(async (req, res, next) => {
  res.send("POST request to posts");
});
