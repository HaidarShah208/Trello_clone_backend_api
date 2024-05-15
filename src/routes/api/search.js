const express = require("express");
const router = express.Router();
const allTasks = require("../../models/tasks");
router.get("/fetchTask", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }
    const tasks = await allTasks.find({
      title: { $regex: query, $options: "i" },
    });
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;