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

const validateEditFields = (req) => {
  const allowEditFields = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "photoUrl",
    "age",
    "gender",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { signupValidation, validateEditFields };
