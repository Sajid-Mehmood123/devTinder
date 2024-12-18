const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewars/auth-middleware");
const { validateEditFields } = require("../utils/validate");
const bcrypt = require("bcryptjs/dist/bcrypt");

// profile API
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName} your profile edit successfuly`);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new Error("Please provide old and new password");
    }
    const user = req.user;
    const isValidPassword = await user.validatePassword(currentPassword);
    if (!isValidPassword) {
      throw new Error("Wrong password");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    res.send("Password changed");
  } catch (error) {
    res.send("ERROR : " + error.message);
  }
});

module.exports = router;
