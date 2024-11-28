const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sajid:6sUwXG2z4MXnbGAa@namastenode.rie0o.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
