var models = require("../../../models");
var authService = require("../../auth-services");

exports.getUsers = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.findAll({}).then((found) => {
    if (found) {
      let token = authService.isAdmin(found);
      return { token: token };
      //   (response.seccusss = true), response.message.push("get seccusss");
      //   response.data = found;
    }
    res.send(response);
  });
};

// exports.login = (req, res, nex) => {
//   var response = {
//     seccusss: false,
//     message: [],
//     data: {},
//   };
//   models.Users.findAll({}).then((found) => {
//     if (found) {
//       let token = authService.isAdmin(found);
//       return { token: token };
//       //   (response.seccusss = true), response.message.push("get seccusss");
//       //   response.data = found;
//     }
//     res.send(response);
//   });
// };

exports.getStudents = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.findAll({
    where: {
      role: 2,
    },
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.getInstructors = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.findAll({
    where: {
      role: 3,
    },
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.getAdmins = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Users.findAll({
    where: {
      role: 1,
    },
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};
// exports.postAdmin = (req, res, nex) => {
//   var response = {
//     seccusss: false,
//     message: [],
//     data: {},
//   };
//   models.Users.create({
//     first_name: req.body.firstName,
//   }).then((found) => {
//     if (found) {
//       (response.seccusss = true), response.message.push("new user created");
//       response.data = found;
//     }
//     res.send(response);
//   });
// };
