const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

//Register User
router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  User.findOne({ email })
    .then(userExists => {
      if (userExists) {
        return res.status(400).json({ message: "User Already exists" });
      }

      return User.create({ username, email, password, role }).then(user => {
        const token = generateToken(user._id);
        return res.status(201).json({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token,
        });
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    });
});

//Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return user.matchPassword(password).then(isMatch => {
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token,
        });
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    });
});

//Me
router.get("/me", protect, (req, res) => {
  return res.status(200).json(req.user);
});

//Generate JWT token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = router;
