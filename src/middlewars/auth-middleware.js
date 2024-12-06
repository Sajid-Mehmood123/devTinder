const jwt = require("jsonwebtoken");
const User = require("../models/user-model.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token!!!!!");
    }

    // verify token
    const decodedData = jwt.verify(token, "$devTinder123!");
    const { _id } = decodedData;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user does not exist");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
};

module.exports = { userAuth };
