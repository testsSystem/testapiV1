var models = require("../../../models");

exports.getOptions = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Answers_options.findAll({}).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.postOptions = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  models.Answers_options.create({
    answer: req.body.answer,
    correctAnswer: req.body.correctAnswer,
    question_id: req.body.question_id,
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
