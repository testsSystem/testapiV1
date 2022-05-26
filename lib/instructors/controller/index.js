const { attachment } = require("express/lib/response");
var models = require("../../../models");
var authService = require("../../auth-services");

exports.getInstuctors = (req, res, nex) => {
  console.log(req + "llllllllllll");
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.findAll({}).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.signup = (req, res, nex) => {
  // console.log(req + "llllllllllll");
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: authService.hashPassword(req.body.password),
    role: 3,
    status: true,
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.login = (req, res, nex) => {
  console.log("first");
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      (response.seccusss = false), response.message.push("false");
      res.send(response);
    } else {
      let passwordMatch = authService.comparePasswords(
        req.body.password,
        user.password
      );
      console.log(passwordMatch);
      if (passwordMatch) {
        let token = authService.signUser(user);
        response.token = token;
        return res.send(response);
      } else {
        response.message.push("error happened");
        return res.send(response);
      }
    }
  });
};

// exports.store = (req, res, nex) => {
//     var response = {
//       seccusss: false,
//       message: [],
//       data: {},
//     };
//     models.Users.create({
//         first_name : req.body.
//     }).then((found) => {
//       if (found) {
//         (response.seccusss = true), response.message.push("new user created");
//         response.data = found;
//       }
//       res.send(response);
//     });
//   };
