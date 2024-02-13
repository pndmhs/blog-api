const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

exports.comments_get = asyncHandler(async (req, res, next) => {
  const allComments = await Comment.find({ post: req.params.post_id });

  res.json({ comments: allComments });
});

exports.comments_post = [
  body("text", "Comment must be at least 3 character")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      res.status(400).json({ errors });
    } else {
      const comment = new Comment({
        text: req.body.text,
        username: req.body.username,
        post: req.params.post_id,
      });

      await comment.save();
      res.json({ message: "Added new comment" });
    }
  }),
];
