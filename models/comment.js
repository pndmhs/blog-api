const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, require: true, minLength: 3 },
  timestamp: { type: Date, default: Date.now() },
  username: { type: String, default: null },
  post: { type: Schema.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", CommentSchema);
