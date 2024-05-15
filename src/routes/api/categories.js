const express = require("express");
const router = express.Router();
const Categories = require("../../models/category");

router.post("/addCategory", async (req, res) => {
  
  const { name, uid } = req.body;
  const categoryInfo = new Categories({
    uid,
    name,
  });

  try {
    const category = await categoryInfo.save();
    res.status(201).json({ message: "category added successfuly", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/fetchCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Categories.findOne({ _id: id })
      .then((category) => {
        if (category) {
          res.json(category);
      res.status(201).json({message:"Category fetched successfully"});
        } else {
          res.status(404).json({ message: "Category not found" });
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


router.get("/fetchCategory", async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "uid is required" });
    }

    const taskData = await Categories.find({ uid });
    console.log("🚀 ~ router.get ~ taskData:", taskData);

    res.json(taskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateCategory/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json("id not found");
  }

  try {
    const taskData = req.body;
    const updatedCategory = await Categories.findOneAndUpdate({ _id: id }, taskData, {
      new: true,
    });
    res.json(updatedCategory);
    res.status(201).json({message:"Category updated successfully"});

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.delete("/deleteCategory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Categories.findByIdAndDelete(id);
    res.status(200).json({ message: "Category  deleted successfully now" });
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category  not found" });
    }
  } catch (error) {
    console.error("Error deleting occure during deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
