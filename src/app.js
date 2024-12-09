const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/db.js");

const ErrorHandling = require("./errors/error-handling.js");
const authRouter = require("./routes/auth-router.js");
const profileRouter = require("./routes/profile-router.js");
const requestRouter = require("./routes/request.router.js");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// get single user
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      throw new Error("user not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Something went wrong : " + error.message);
  }
});

// feed api | all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new Error("user not found");
    }
    res.status(200).send({ total: users.length, users });
  } catch (error) {
    res.status(400).send("Something went wrong", error.message);
  }
});

// delete user
app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("user not found");
    }
    res.status(200).send("user deleted");
  } catch (error) {
    res.status(400).send("Something went wrong", error.message);
  }
});

// update user
app.patch("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const ALLOW_UPDATES = ["gender", "age", "skills", "about", "photoUrl"];

    const isUpadateAllow = Object.keys(req.body).every((k) =>
      ALLOW_UPDATES.includes(k)
    );
    if (!isUpadateAllow) {
      throw new ErrorHandling(400, "update not allowed");
    }
    if (req.body.skills.length > 10) {
      throw new ErrorHandling(400, "skills must be lower than 10");
    }
    if (req.body.about.length > 200) {
      throw new ErrorHandling(400, "about must be lower than 200 length");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new Error("user not found");
    }
    await user.save();
    res.status(200).send("user updated");
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("Database connection error");
  });
