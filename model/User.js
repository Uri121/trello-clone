const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"]
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
