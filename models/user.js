const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: { type: String, require: true, minLength: 3 },
  email: { type: String, require: true },
  username: { type: String, require: true, minLength: 4 },
  password: { type: String, require: true, minLangth: 8 },
});

module.exports = mongoose.model("User", UserSchema);
