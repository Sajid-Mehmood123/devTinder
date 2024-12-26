const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewars/auth-middleware");
const { validateEditFields } = require("../utils/validate");

// profile API
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// edit profile
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

// edit password
router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !confirmPassword) {
      throw new Error("Please provide old and new password");
    } else if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Please enter strong password");
    }

    const isValidPassword = await user.validatePassword(currentPassword);
    if (!isValidPassword) {
      throw new Error("Wrong password");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("password does not matched");
    }

    // check if the current and new password is same
    const isNewPasswordSameAsOld = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isNewPasswordSameAsOld) {
      throw new Error("New password cannot same as old");
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
