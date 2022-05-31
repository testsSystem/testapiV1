const { attachment } = require("express/lib/response");
var models = require("../../../models");
var authService = require("../../auth-services");
var responds = require("../../response");

exports.getInstuctors = (req, res, nex) => {
  models.Users.findAll({
    where: {
      role: 3,
    },
  }).then((found) => {
    if (found) {
      responds.successWithMessage("instrucotrs found", res);
      return res.send(responds);
    } else {
      responds.failedWithMessage("couldnt get instructors", res);
      return res.send(responds);
    }
  });
};

exports.signup = (req, res, nex) => {
  models.Users.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: authService.hashPassword(req.body.password),
    role: 3,
    status: true,
  }).then((found) => {
    if (found) {
      responds.successWithMessage("signed up seccussfully ", res);
      return res.send(responds);
    } else {
      responds.failedWithMessage("error while signing up ", res);
      return res.send(responds);
    }
  });
};

exports.login = (req, res, nex) => {
  models.Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      responds.failedWithMessage("please provide a valid email", res);
    } else {
      let passwordMatch = authService.comparePasswords(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        let token = authService.signUser(user);
        return responds.success(token, res);
      } else {
        return responds.failedWithMessage("invalid credentials", res);
      }
    }
  });
};

exports.getStudents = async (req, res, nex) => {
  const result = await models.Users.findAll({
    where: {
      role: 2,
    },
  });
  if (result) {
    responds.successWithMessage("students get seccussfully", res);

    return res.send(responds);
  } else {
    responds.failedWithMessage("couldnt get students", res);
    return res.send(responds);
  }
};

exports.getTests = async (req, res, nex) => {
  const result = await models.Tests.findAll({});
  if (result) {
    responds.successWithMessage("Tests has been get seccussfully", res);

    return res.send(responds);
  } else {
    responds.failedWithMessage("error while getting tests", res);
    res.send(responds);
  }
};
