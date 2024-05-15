const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
  },

  { collection: "allCategories", versionKey: false }
);

const category = mongoose.model("allCategories", categorySchema);

module.exports = category;