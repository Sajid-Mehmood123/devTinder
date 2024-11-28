const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const User = require("./models/user-model.js");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "john",
    lastName: "dow",
    emailId: "john@gmail.com",
    password: "john@123",
  });

  await user.save();
  res.status(201).send("user created successfully");
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
