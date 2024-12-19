const express = require("express");
const { userAuth } = require("../middlewars/auth-middleware");
const ConnectionRequest = require("../models/connectRequest-model");
const User = require("../models/user-model");

const router = express.Router();

// connection request API
router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const alllowStatus = ["ignored", "interested"];
    if (!alllowStatus.includes(status)) {
      return res.send("Invalid Status : " + status);
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.send("user not found!");
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.send("Connection already exists");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res.status(200).json({
      message: `${req.user.firstName} ${status} ${toUser.firstName}`,
      data,
    });
  } catch (error) {
    res.send("ERROR " + error.message);
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status: " + status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found!" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.status(200).json({ message: `Connection Request ${status}`, data });
    } catch (error) {
      res.send("ERROR: " + error.message);
    }
  }
);

module.exports = router;
