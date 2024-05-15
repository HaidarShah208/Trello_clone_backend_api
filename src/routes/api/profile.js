const express = require("express");
const router = express.Router();
const currentUser = require("../../models/user");
const jwt = require("jsonwebtoken");

router.get("/fetchUser", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
      const user = await currentUser.findOne({ email: decoded.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log("error : ", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });
  

  router.put("/updateProfile", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
      const user = await currentUser.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { userName, email } = req.body;
      if (userName) user.userName = userName;
      if (email) user.email = email;
      await user.save();
      const updatedUser = await currentUser.findOne({ email: user.email });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  module.exports = router;