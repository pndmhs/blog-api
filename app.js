const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const userRouter = require("./routes/user_router");
const postRouter = require("./routes/post_router");
const commentRouter = require("./routes/comment_router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:post_id/comments", commentRouter);

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
