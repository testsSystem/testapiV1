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
    },
    process.env.JWT_SECRET, // this will read from the .env file a key named JWT_SECRET and will take the value
    {
      expiresIn: "1h",
    }
  );
  return token;
};

// const isAdmin = (user) => {
//   const token = jwt.sign(
//     {
//       // this object will be saved in the token payload
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     process.env.JWT_SECRET, // this will read from the .env file a key named JWT_SECRET and will take the value
//     {
//       expiresIn: "1h",
//     }
//   );
//   return token;
// };

// const verifyAdmin = (req, res, next) => {
//   try {
//     // take out the jwt we've set in the cookie set
//     const token = req?.cookies?.jwt;
//     // return error if token is undefined
//     if (!token) return response.unauthenticated(res);
//     // verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       // return an error if there was an issue verifying the token
//       if (err) {
//         return response.unauthorized(res);
//       } else {
//         // set the user data to the req obj using the decoded token payload
//         req.user = {
//           id: decoded.id,
//           email: decoded.email,
//           role: decoded.role,
//           token: token,
//         };
//         // call the next middleware
//         return next();
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     return response.serverError(res);
//   }
// };

// const verifyUser = (token) => {
//   try {
//     // take out the jwt we've set in the cookie set
//     // const token = req?.cookies?.jwt;
//     const token = req.headers?.authorization?.split(" ")[1];
//     // return error if token is undefined
//     if (!token) return response.unauthenticated(res);
//     // verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       // return an error if there was an issue verifying the token
//       if (err) {
//         return response.unauthorized(res);
//       } else {
//         // set the user data to the req obj using the decoded token payload
//         req.user = {
//           id: decoded.id,
//           email: decoded.email,
//           token: token,
//         };
//         // call the next middleware
//         return next();
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     return response.serverError(res);
//   }
// };

verifyUser = async function (token) {
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
exports.isAuthenticated = async function (req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  isVerfied = await authService.verifyUser(token);
  console.log("isVerfied", isVerfied);
  if (isVerfied) {
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

module.exports = {
  signUser,
  //   isAdmin,
  //   verifyAdmin,
  verifyUser,
  hashPassword,
  comparePasswords,
};
