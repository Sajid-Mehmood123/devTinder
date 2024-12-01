const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: true,
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
