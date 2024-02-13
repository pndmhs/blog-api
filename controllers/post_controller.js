const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

exports.posts_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .populate("user", "username fullName")
    .exec();
  res.json({ posts: allPosts });
});

exports.posts_post = [
  body("title", "Title must be at least 3 character")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("text", "Text must be at least 3 character")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      res.status(400).json({ errors });
    } else {
      const post = new Post({
        title: req.body.title,
        text: req.body.text,
        user: req.user._id,
      });

      await post.save();
      res.status(201).json(post);
    }
  }),
];

exports.post_single_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);

  if (!post) res.status(400).json({ message: "Post not found" });

  res.json(post);
});
