const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(500).send("Your are not Authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isUser = token === "xyz";
  if (!isUser) {
    res.status(500).send("Your are not Authorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
