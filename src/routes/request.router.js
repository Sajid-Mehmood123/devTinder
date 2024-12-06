const express = require("express");
const { userAuth } = require("../middlewars/auth-middleware");

const router = express.Router();

// connection request API
router.post("/sendConnectionReques", userAuth, (req, res) => {
  const user = req.user;
  // some logic

  console.log("Connection request send");

  res.send(`${user.firstName} send you connection request`);
});

module.exports = router;
