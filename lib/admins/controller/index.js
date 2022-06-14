var models = require("../../../models");
var authService = require("../../auth-services");
var response = require("../../response");

exports.getUsers = async (req, res, nex) => {
  models.Users.findAll({}).then((user) => {
    if (user) {
      return response.success(user, res);
    } else {
      return response.failedWithMessage("error while getting users", res);
    }
  });
};

exports.getUser = async (req, res, nex) => {
  const { id } = req.params;
  const result = await models.Users.findByPk(id);
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("error while getting one user", res);
  }
};

exports.signup = async (req, res, nex) => {
  await models.Users.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: authService.hashPassword(req.body.password),
    role: 1,
    status: true,
  }).then((found) => {
    if (found) {
      return response.success(found, res);
    } else {
      return response.failedWithMessage("error while admin signing up", res);
    }
  });
};

exports.login = async (req, res, nex) => {
  await models.Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      return response.failedWithMessage("please provide a valid email", res);
    } else {
      let passwordMatch = authService.comparePasswords(
        req.body.password,
        user.password
      );
      if (user.status === false) {
        return response.failedWithMessage("you are not active anymore", res);
      }
      if (user.role !== "admin") {
        return response.failedWithMessage("you are not an admin", res);
      }
      if (passwordMatch) {
        let token = authService.signUser(user);

        return response.success(token, res);
      } else {
        return response.failedWithMessage("invalid papers", res);
      }
    }
  });
};

exports.gettingAllStudents = async (req, res, nex) => {
  console.log(req.user.role, "llllllllllllllllllllllll");
  await models.Users.findAll({
    where: {
      role: 2,
    },
  }).then((found) => {
    if (found) {
      return response.success(found, res);
    } else {
      return response.failedWithMessage("invalid", res);
    }
  });
};

exports.getInstructors = (req, res, nex) => {
  models.Users.findAll({
    where: {
      role: 3,
    },
  }).then((found) => {
    if (found) {
      return response.success(found, res);
    } else {
      return response.failedWithMessage("invalid", res);
    }
  });
};

exports.getAllTests = async (req, res, nex) => {
  const result = await models.Tests.findAll({
    // attributes: ["id", "title", "descriptoin"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("error", res);
  }
};

exports.getAdmins = async (req, res, nex) => {
  await models.Users.findAll({
    where: {
      role: 1,
    },
  }).then((found) => {
    if (found) {
      return response.success(found, res);
    } else {
      return response.failedWithMessage("invalid", res);
    }
  });
};

exports.updateStatus = async (req, res, nex) => {
  const { id } = req.params;

  const result = await models.Users.findByPk(id);
  console.log(req.body, "rrrrrrrrrrrrrrrrr");
  if (result) {
    if (req.body.status !== undefined) {
      result.status = req.body.status;
    }

    result.save();

    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating test", res);
  }
};
