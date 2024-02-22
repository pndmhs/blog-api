const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

exports.comments_get = asyncHandler(async (req, res, next) => {
  const allComments = await Comment.find({ post: req.params.post_id });

  res.json(allComments);
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
      const text = req.body.text;
      const username = req.body.username.length > 0 ? req.body.username : null;
      const post = req.params.post_id;

      const comment = new Comment({
        text,
        username,
        post,
      });

      await comment.save();
      res.json(comment);
    }
  }),
];

exports.comments_single_delete = [
  body("comment_id", "Comment ID is not valid").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.body.comment_id);

    if (!comment) {
      res.sendStatus(400);
    } else {
      await Comment.findByIdAndDelete(req.body.comment_id);
      res.sendStatus(204);
    }
  }),
];
