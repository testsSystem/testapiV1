const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const response = require("../response");
var models = require("../../models");

const signUser = (user) => {
  const token = jwt.sign(
    {
      // this object will be saved in the token payload
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET, // this will read from the .env file a key named JWT_SECRET and will take the value
    {
      expiresIn: "1000h",
    }
  );
  return token;
};

const verifyUser = async (token) => {
  if (!token) {
    return false;
  }
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await models.Users.findByPk(decoded.id);

  if (user) {
    return user;
  } else {
    return false;
  }
};
const isAuthenticated = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  // const token = window.localStorage.getItem("token") || null;
  const isVerfied = await verifyUser(token);
  console.log("isVerfied", isVerfied);
  if (isVerfied) {
    req.user = isVerfied;
    return next();
  }
  res.status(401);
  res.send({
    success: false,
    messages: ["Please login to access this endpoint"],
  });
  return;
};

const hashPassword = (plainTextPassword) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

const comparePasswords = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

const isAdmin = async (req, res, next) => {
  const roleDetect = req.user.role;

  if (roleDetect) {
    if (roleDetect === "admin") {
      return next();
    }
  }

  res.status(401);
  res.send({
    success: false,
    messages: ["you are not an admin"],
  });
  return;
};

const isInstructor = async (req, res, next) => {
  const roleDetect = req.user.role;

  if (roleDetect) {
    if (roleDetect === "instructor") {
      console.log(roleDetect);

      return next();
    }
  }

  res.status(401);
  res.send({
    success: false,
    messages: ["you are not an instructor"],
  });
  return;
};

const isStudent = async (req, res, next) => {
  const roleDetect = req.user.role;

  if (roleDetect) {
    if (roleDetect === "student") {
      console.log(roleDetect);
      return next();
    }
  }

  res.status(401);
  res.send({
    success: false,
    messages: ["you are not a student"],
  });
  return;
};

module.exports = {
  signUser,
  isAdmin,
  //   verifyAdmin,
  isStudent,
  isInstructor,
  hashPassword,
  isAuthenticated,
  verifyUser,
  comparePasswords,
};
