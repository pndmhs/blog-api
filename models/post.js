const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, require: true, minLength: 3 },
  text: { type: String, require: true, minLength: 3 },
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: null },
  published: { type: Boolean, default: false },
  user: { type: Schema.ObjectId, ref: "User" },
});

PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
