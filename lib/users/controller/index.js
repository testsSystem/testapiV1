var models = require("../../../models");
var response = require("../../response");

exports.profile = async (req, res, nex) => {
  await models.Users.findAll({
    attributes: ["first_name", "last_name", "createdAt", "email"],
    where: {
      id: req.user.id,
    },
  }).then((result) => {
    if (result) {
      return response.success(result, res);
    } else {
      return response.failedWithMessage("invalid", res);
    }
  });
};
