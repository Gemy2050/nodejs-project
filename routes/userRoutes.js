//* ================================================
//* ============== Users Endpoints ==============
//* ================================================

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create New User
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).send("Please provide all fields");
    }

    console.log("Enter The Controller");

    const newUser = new User({
      email,
      password,
      name,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Something went wrong", error.message);
  }
});

// Get Specific User By ID
router.get("/users/:userId", async (req, res) => {
  try {
    if (!req.params.userId) {
      res.status(400).send("Please provide user id");
    }
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.send("something went wrong", error.message);
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please provide all fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send("User not found");
  }

  if (user.password !== password) {
    res.status(400).send("Wrong password");
    return;
  }
  res.json(user);
});

// Export the router
module.exports = router;
