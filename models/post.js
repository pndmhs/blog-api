const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, require: true, minLength: 3 },
  text: { type: String, require: true, minLength: 3 },
  timestamp: { type: Date, default: Date.now() },
  user: { type: Schema.ObjectId, ref: "User" },
});

PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
