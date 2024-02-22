const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const userRouter = require("./routes/user_router");
const postRouter = require("./routes/post_router");
const commentRouter = require("./routes/comment_router");

const app = express();
const port = process.env.PORT || 3000;

const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  message: "You have exceeded the 100 requests in 24 hrs limit!",
});

app.use(limiter);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(helmet());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:post_id/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
