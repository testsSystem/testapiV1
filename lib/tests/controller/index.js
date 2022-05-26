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
  //   models.Tests.create({
  //     title: req.body.title,
  //     descriptoin: req.body.description,
  //     // start_at: req.body.start_at,
  //     // end_at: req.body.end_at,
  //     user_id: req.body.user_id,
  //   }).then((found) => {
  //     if (found) {
  //       (response.seccusss = true), response.message.push("get seccusss");
  //       response.data = found;
  //     }
  //     res.send(response);
  //   });
  models.Questions.create({
    questoin: req.body.question,
    test_id: req.body.test_id,
    include: [
      models.Answers_options.create({
        answer: req.body.answer1,
        answer: req.body.answer2,
        answer: req.body.answer3,
        answer: req.body.answer4,
      }),
    ],
  }).then((found) => {
    if (found) {
      res.send("heeee");
    } else {
      res.send("noooooo");
    }
  });
};

exports.getStudentsOptions = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  models.Questions.findAll({
    attributes: ["questoin", "test_id"],
    include: [{ model: models.Answers_options, attributes: ["answer"] }],
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.getQuestionsTest = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  //   title: DataTypes.STRING,
  //   start_at: DataTypes.DATE,
  //   end_at: DataTypes.DATE,
  //   descriptoin: DataTypes.STRING,
  //   user_id: DataTypes.INTEGER,

  //   models.products.findAll({
  //     include: [
  //       {model: models.comments, include: [models.comments.users] }
  //     ]
  //   })

  models.Tests.findAll({
    include: [
      {
        model: models.Questions,
        attributes: ["questoin"],
        include: [{ model: models.Answers_options, attributes: ["answer"] }],
      },
    ],
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};

exports.getQuestions = (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  models.Tests.findAll({
    attributes: ["questoin", "test_id"],
    include: [{ model: models.Answers_options, attributes: ["answer"] }],
  }).then((found) => {
    if (found) {
      (response.seccusss = true), response.message.push("get seccusss");
      response.data = found;
    }
    res.send(response);
  });
};
