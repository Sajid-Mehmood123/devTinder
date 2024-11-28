const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MOGO_UNRI);
};

module.exports = connectDB;
