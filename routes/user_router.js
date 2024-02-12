const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");

router.get("/", user_controller.users_get);

router.post("/", user_controller.users_post);

module.exports = router;
