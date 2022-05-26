var models = require("../../../models");
var authService = require("../../auth-services");
// const { serverError } = require("../../response");

exports.getUsers = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const admin = await models.Users.findOne({
    where: {
      role: 1,
    },
  });
  if (admin) {
    models.Users.findAll({}).then((user) => {
      if (user) {
        (response.seccusss = true), response.message.push("get seccusss");
        response.data = found;
      }
      res.send(response);
    });
  } else {
    response.message.push("not admin");
  }
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
    role: 1,
    status: true,
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.login = async (req, res, nex) => {
  console.log("first");
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  await models.Users.findOne({
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
      // console.log(passwordMatch);
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
  //   const auth = authService.verifyUser();
  //   console.log("gffgfgfgfgf" + auth);
};

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
