const express = require("express");
const router = express.Router();
const tasks = require("../../models/tasks");

router.post("/addTasks", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const user = await tasks.findOne({
      uid: req.body.uid,
    });

    // if (!user) {
    //   return res.status(400).json({ message: "User Not exists" });
    // }
    const { title, description, category, priority, dueDate } = req.body;

    if ( !title || !description || !category || !priority) {
      return res.status(400).json({ error: "Missing something" });
    }
    const taskInfo = new tasks({
      uid: req.body.uid,
      title,
      description,
      category,
      priority,
      dueDate,
    });
    const result = await taskInfo.save();
    res.status(201).json({ "task data added successfully": result });
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.status(400).json({ error: "something went wrong during added task!" });
  }
});

router.get("/fetchTasks", async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }
  try {
    const allTasks = await tasks.find({uid});
    res.status(201).json({ "tasks data fetched successfully": allTasks });
    res.status(200).json(allTasks);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/fetchTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    tasks
      .findOne({ _id: id })
      .then((task) => {
        if (task) {
          res.json(task);
          res.status(201).json({ message: "task fetched successfully" });
        } else {
          res.status(404).json({ message: "Task not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/updateTask/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json("id not found");
  }

  try {
    const taskData = req.body;
    const updatedTask = await tasks.findOneAndUpdate({ _id: id }, taskData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.delete("/deleteTask/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTasks = await tasks.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully now" });

    if (!deleteTasks) {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error occure during deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
