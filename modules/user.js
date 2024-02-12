const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, require: true, minLength: 3 },
  lastName: { type: String },
  email: { type: String, require: true },
  username: { type: String, require: true, minLength: 4 },
  password: { type: String, require: true, minLangth: 8 },
});

UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
