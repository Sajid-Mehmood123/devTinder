const express = require("express");
const { signupValidation } = require("../utils/validate.js");
const User = require("../models/user-model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userAuth } = require("../middlewars/auth-middleware.js");

const router = express.Router();

// signup user
router.post("/signup", async (req, res) => {
  try {
    // validation
    signupValidation(req);

    const { firstName, lastName, emailId, password, gender } = req.body;

    // hashpassword
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      gender,
    });

    await user.save();
    res.status(201).send("user created successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Please provide email and password");
    }

    // checking user email in DB
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // compare user password
    const hashPassword = await user.validatePassword(password);
    if (!hashPassword) {
      throw new Error("Invalid credentials");
    }

    // jwt token
    const token = await user.getJWT();

    // adding cookie
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

    res.status(200).send("User login successfully!");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// logout
router.post("/logout", userAuth, async (req, res) => {
  const user = req.user;
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send(`${user.firstName} ${user.lastName} logout`);
});

module.exports = router;
