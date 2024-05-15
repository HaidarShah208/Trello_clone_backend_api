const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type:Date },

  },

  { collection: "tasks", versionKey: false }
);

const tasks = mongoose.model("tasks", tasksSchema);

module.exports = tasks;
