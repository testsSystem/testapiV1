var models = require("../../../models");
var authService = require("../../auth-services");
var response = require("../../response");

exports.signup = (req, res, nex) => {
  models.Users.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: authService.hashPassword(req.body.password),
    status: true,
    role: 2,
  }).then((found) => {
    if (found) {
      return response.success(found, res);
    } else {
      return response.failedWithMessage("student sign up failed");
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
      response.failedWithMessage("please provid a valid email");
    } else {
      let passwordMatch = authService.comparePasswords(
        req.body.password,
        user.password
      );
      if (user.status === false) {
        return response.failedWithMessage("you are not active anymore", res);
      }
      if (passwordMatch) {
        let token = authService.signUser(user);
        return response.success(token, res);
      } else {
        return response.failedWithMessage("login failed");
      }
    }
  });
};

exports.getSessionByUserId = async (req, res, nex) => {
  const result = await models.Session_tests.findAll({
    where: {
      user_id: req.user.id,
    },
    attributes: ["result", "test_id"],
    include: [{ model: models.Tests }],
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting result", res);
  }
};

exports.getStudentResult = async (req, res, nex) => {
  let { id } = req.params;

  const result = await models.Session_tests.findAll({
    attributes: ["result", "user_id"],
    where: {
      test_id: id,
    },
    include: [
      {
        model: models.Users,
        attributes: ["first_name", "last_name"],
      },
    ],
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting result", res);
  }
};

exports.getTestsByStudentsId = async (req, res, nex) => {
  const result = await models.Session_tests.findAll({
    where: {
      user_id: req.user.id,
    },
    include: [models.Tests],
    // attributes: ["id", "title", "user_id"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("failed getting result", res);
  }
};
