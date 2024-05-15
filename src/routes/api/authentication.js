const express = require("express");
const router = express.Router();
const userAuth = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const userEmail = await userAuth.findOne({ email: req.body.email });

  if (userEmail) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userInfo = new userAuth({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    const user = await userInfo.save();
    res.status(201).json({ message: "User registered successfuly", user });
  } catch (error) {
    res.status(400).json({ message: "error ocured during user registered",error });
  }
});


router.post("/signin", async (req, res) => {
    const user = await userAuth.findOne({ email: req.body.email });
    console.log("user : ", user);
  
    if (!user) {
      return res.status(404).json({ message: "user not exist" });
    }
  
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    if (!passwordMatched) {
      return res.status(404).json({ message: "Authentication failed due to password not matched" });
    }
  
    var token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_PRIVATE_KEY
    );
  
    return res.status(200).json({ message: "User logged in successfully!", token });
  });


module.exports = router;