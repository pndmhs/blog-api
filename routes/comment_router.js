const express = require("express");
const router = express.Router({ mergeParams: true });
const comment_controller = require("../controllers/comment_controller");

router.get("/", comment_controller.comments_get);

router.post("/", comment_controller.comments_post);

module.exports = router;
