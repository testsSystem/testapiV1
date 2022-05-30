const { resource } = require("../../../app");
var models = require("../../../models");

// exports.getTests = (req, res, nex) => {
//   var response = {
//     seccusss: false,
//     message: [],
//     data: {},
//   };
//   models.Tests.findAll({}).then((found) => {
//     if (found) {
//       (response.seccusss = true), response.message.push("get seccusss");
//       response.data = found;
//     }
//     res.send(response);
//   });
// };

exports.createTest = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const result = await models.Tests.create({
    title: req.body.title,
    start_at: req.body.start_at,
    end_at: req.body.end_at,
    descriptoin: req.body.discription,
    user_id: req.body.user_id, // it takes from the user who logged in as instructor in frontEnd
  });
  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  }
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
  //for instructor
  models.Tests.findAll({
    include: [
      {
        model: models.Questions,
        attributes: ["questoin"],
        include: [
          {
            model: models.Answers_options,
            attributes: ["answer", "correctAnswer"],
          },
        ],
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

exports.createQuestions = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const result = await models.Questions.create({
    questoin: req.body.questoin,
    test_id: req.body.test_id, // it takes from the Tests table in fromEnd
  });
  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  }
};

exports.createOptions = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const result = await models.Answers_options.bulkCreate(req.body);
  console.log(result, "jjjjjjjjjjjjjjjjjjj");

  if (result) {
    // console.log(result.dataValues, "jjjjjjjjjjjjjjjjjjjjjjj");
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  }
};

exports.updateTest = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;

  const result = await models.Tests.findByPk(id);

  if (result) {
    if (req.body.title) {
      result.title = req.body.title;
    }
    if (req.body.start_at) {
      result.start_at = req.body.start_at;
    }
    if (req.body.end_at) {
      result.end_at = req.body.end_at;
    }
    if (req.body.descriptoin) {
      result.descriptoin = req.body.descriptoin;
    }

    result.save();

    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.updateQuestion = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;

  const result = await models.Questions.findByPk(id);

  if (result) {
    if (req.body.questoin) {
      result.questoin = req.body.questoin;
    }
    result.save();
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.updateOption = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;

  const result = await models.Answers_options.findByPk(id);

  if (result) {
    if (req.body.answer) {
      result.answer = req.body.answer;
    }
    if (!req.body.correctAnswer || req.body.correctAnswer) {
      result.correct_answer = req.body.correctAnswer;
    }
    result.save();
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.getStudnetTest = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;
  const result = await models.Tests.findByPk(id, {
    attributes: ["id", "title"],
    include: [
      {
        model: models.Questions,
        attributes: ["questoin"],
        include: [
          {
            model: models.Answers_options,
            attributes: ["answer"],
          },
        ],
      },
    ],
  });

  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.getInstructorTest = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;
  const result = await models.Tests.findByPk(id, {
    include: [
      {
        model: models.Questions,
        attributes: ["questoin", "test_id"],
        include: [
          {
            model: models.Answers_options,
            attributes: ["answer", "correct_answer", "question_id"],
          },
        ],
      },
    ],
  });

  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.createSession = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const result = await models.Session_tests.create({
    user_id: req.body.user_id,
    test_id: req.body.test_id,
    test_key: req.body.test_key,
    started_at: req.body.started_at,
    ended_at: req.body.ended_at,
  });

  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.sessionStudent = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const result = await models.Session_tests.findAll({
    attributes: ["test_id", "user_id"],
  });

  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.sessionInstructor = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const result = await models.Session_tests.findAll({
    attributes: ["test_id", "user_id"],
  });

  if (result) {
    response.data = result;
    response.seccusss = true;
    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.startSession = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;

  const result = await models.Session_tests.findByPk(id);

  if (result) {
    if (req.body.started_at) {
      result.started_at = req.body.started_at;
      //   console.log(result, "jjjjjjjjjjjjjjjjjjjjjjj");
    }

    result.save();

    response.data = result;
    response.seccusss = true;

    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.endSession = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const { id } = req.params;

  const result = await models.Session_tests.findByPk(id);

  if (result) {
    if (req.body.ended_at) {
      result.ended_at = req.body.ended_at;
      //   console.log(result, "jjjjjjjjjjjjjjjjjjjjjjj");
    }

    result.save();

    response.data = result;
    response.seccusss = true;

    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};

exports.getResult = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };
  const result = await models.Session_tests.findAll({
    attributes: ["result", "test_id"],
  });

  if (result) {
    response.data = result;
    response.seccusss = true;

    return res.send(response);
  } else {
    response.message.push("server error");
    return res.send(response);
  }
};
