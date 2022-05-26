var models = require("../../../models");

exports.getStudents = (req, res, nex) => {
  console.log(req.object + "llllllllllll");
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
  console.log(req + "llllllllllll");
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    status: true,
    role: 2,
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
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
