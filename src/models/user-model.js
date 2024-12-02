const mongoose = require("mongoose");
const validator = require("validator");
const ErrorHandling = require("../errors/error-handling");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlenth: 3,
      maxlength: 50,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minlenth: 3,
      maxlength: 50,
    },
    emailId: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password is week");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid url");
        }
      },
    },
    about: {
      type: String,
      default: "This is demo bio",
    },
    skills: {
      type: [String],
    },
    age: {
      type: Number,
      min: 18,
      max: 120,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
