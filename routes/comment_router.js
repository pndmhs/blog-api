const express = require("express");
const router = express.Router({ mergeParams: true });
const comment_controller = require("../controllers/comment_controller");
const verifyToken = require("../middlewares/authToken");

router.get("/", comment_controller.comments_get);

router.post("/", comment_controller.comments_post);

router.delete("/:comment_id", verifyToken, comment_controller.comment_delete);

module.exports = router;
