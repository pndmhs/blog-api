const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/post_controller");
const verifyToken = require("../middlewares/authToken");

router.get("/", post_controller.posts_get);

router.post("/", verifyToken, post_controller.posts_post);

module.exports = router;
