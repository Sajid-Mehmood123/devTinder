const mongoose = require("mongoose");
const validator = require("validator");
const ErrorHandling = require("../errors/error-handling");
const bcrypt = require("bcryptjs");

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
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s",
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
