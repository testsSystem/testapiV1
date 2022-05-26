var models = require("../../../models");

exports.getQuestions = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Questions.findAll({}).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.postQuestion = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Questions.create({
    questoin: req.body.question,
    test_id: req.body.test_id,
    order: req.body.order,
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
