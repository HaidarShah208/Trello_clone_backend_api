const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },

  { collection: "allUser", versionKey: false }
);

const userAuth = mongoose.model("allUser", userSchema);

module.exports = userAuth;
