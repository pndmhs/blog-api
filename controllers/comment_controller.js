const asyncHandler = require("express-async-handler");

exports.comments_get = asyncHandler(async (req, res, next) => {
  res.send("GET request for all comments from post id: " + req.params.post_id);
});

exports.comments_post = asyncHandler(async (req, res, next) => {
  res.send("POST request to comments");
});
