const validator = require("validator");

const signupValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("please provide name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please provide valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please Enter strong password");
  }
};

module.exports = { signupValidation };
