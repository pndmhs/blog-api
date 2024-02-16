const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

exports.users_post = [
  body("full_name", "Full name must be specified")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("email", "Email is not valid").trim().isEmail().escape(),
  body("username")
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage("Username must be at least 4 characters")
    .not()
    .contains(" ")
    .withMessage("Username cannot contain spaces")
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage(
      "Username can only contain alphanumeric characters and underscores"
    )
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value }).exec();
      if (existingUser) {
        throw new Error("Username has already been taken");
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Password must be at least 8 character")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric"),
  body(
    "confirm_password",
    "The confirmation password does not match the original password"
  )
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        const user = new User({
          fullName: req.body.full_name,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
        });

        if (!errors.isEmpty()) {
          res.status(400).json(errors);
          return;
        } else {
          await user.save();
          res.json({ message: "Request succeed" });
        }
      }
    });
  }),
];

exports.user_auth = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).exec();
  if (!user) {
    res.status(400).json({ error: "Incorrect username" });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.status(400).json({ error: "Incorrect password" });
  }

  const accessToken = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({ accessToken });
});
