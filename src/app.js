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
