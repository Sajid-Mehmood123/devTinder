const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewars/auth-middleware");

// profile API
router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = router;
