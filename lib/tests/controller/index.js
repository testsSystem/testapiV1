var models = require("../../../models");

exports.getTests = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Tests.findAll({}).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.createTest = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Tests.create({
    title: req.body.title,
    descriptoin: req.body.description,
    // start_at: req.body.start_at,
    // end_at: req.body.end_at,
    user_id: req.body.user_id,
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};
