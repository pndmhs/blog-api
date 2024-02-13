const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, require: true, minLength: 3 },
  timestamp: { type: Date, default: Date.now() },
  username: { type: String, minLength: 3 },
  post: { type: Schema.ObjectId, ref: "Post" },
});

CommentSchema.virtual("url").get(function () {
  return "/comments/" + this._id;
});

module.exports = mongoose.model("Comment", CommentSchema);
