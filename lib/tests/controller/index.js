const { resource } = require("../../../app");
var models = require("../../../models");
var response = require("../../response");

exports.createTest = async (req, res, nex) => {
  const result = await models.Tests.create({
    title: req.body.title,
    start_at: req.body.start_at,
    end_at: req.body.end_at,
    descriptoin: req.body.discription,
    user_id: req.body.user_id, // it takes from the user who logged in as instructor in frontEnd
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("failed creating test", res);
  }
};

exports.createQuestions = async (req, res, nex) => {
  const result = await models.Questions.create({
    questoin: req.body.questoin,
    test_id: req.body.test_id, // it takes from the Tests table in fromEnd
  });
  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed creating questions", res);
  }
};

exports.createOptions = async (req, res, nex) => {
  const result = await models.Answers_options.bulkCreate(req.body);

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed creating options", res);
  }
};

exports.updateTest = async (req, res, nex) => {
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

    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating test", res);
  }
};

exports.updateQuestion = async (req, res, nex) => {
  const { id } = req.params;

  const result = await models.Questions.findByPk(id);

  if (result) {
    if (req.body.questoin) {
      result.questoin = req.body.questoin;
    }
    result.save();
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating question", res);
  }
};

exports.updateOption = async (req, res, nex) => {
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
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating option", res);
  }
};

exports.getStudnetTest = async (req, res, nex) => {
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
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting student test ", res);
  }
};

exports.getTestInfo = async (req, res, nex) => {
  const { id } = req.params;
  const result = await models.Tests.findByPk(id, {
    attributes: ["id", "title", "start_at", "end_at"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting test info ", res);
  }
};

exports.getInstructorTest = async (req, res, nex) => {
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
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting student test ", res);
  }
};

exports.createSession = async (req, res, nex) => {
  const result = await models.Session_tests.create({
    user_id: req.body.user_id,
    test_id: req.body.test_id,
    // test_key: req.body.test_key,
    // started_at: req.body.started_at,
    // ended_at: req.body.ended_at,
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting student test ", res);
  }
};

exports.sessionStudent = async (req, res, nex) => {
  const result = await models.Session_tests.findAll({
    attributes: ["test_id", "user_id"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting student test ", res);
  }
};

exports.sessionInstructor = async (req, res, nex) => {
  const result = await models.Session_tests.findAll({
    attributes: ["test_id", "user_id"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting instructor test ", res);
  }
};

// exports.getInstructorSessionByid = async (req, res, nex) => {
//   const { id } = req.params;
//   const result = await models.Session_tests.findByPk(id);

//   if (result) {
//     if (req.body.user_id) {
//       result.user_id == req.body.user_id;
//     }
//     if (req.body.test_id) {
//       result.test_id == req.body.test_id;
//     }
//     return response.success(result, res);
//   } else {
//     response.failedWithMessage("failed getting instructor test ", res);
//   }
// };

exports.startSession = async (req, res, nex) => {
  const { id } = req.params;

  const result = await models.Session_tests.findByPk(id);

  if (result) {
    if (req.body.started_at) {
      result.started_at = Date.now();
    }

    result.save();

    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating start session", res);
  }
};

exports.endSession = async (req, res, nex) => {
  const { id } = req.params;

  const result = await models.Session_tests.findByPk(id);

  if (result) {
    if (req.body.ended_at) {
      result.ended_at = req.body.ended_at;
    }

    result.save();

    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating end session", res);
  }
};

exports.getResult = async (req, res, nex) => {
  const result = await models.Session_tests.findAll({
    attributes: ["result", "test_id"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    response.failedWithMessage("failed getting result", res);
  }
};

exports.getCorrectAnswer = async (req, res, nex) => {
  const result = await models.Questions.findAll({
    attributes: ["test_id", "id"],
    include: [
      {
        model: models.Answers_options,
        where: {
          correct_answer: true,
        },
        attributes: ["id", "correct_answer"],
      },
    ],
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("wrong action", res);
  }
};

exports.countQuestions = async (req, res, nex) => {
  const { id } = req.params;
  const result = await models.Questions.findAll({
    where: {
      test_id: id,
    },
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("wrong action", res);
  }
};

exports.getTestsByInstructor = async (req, res, nex) => {
  console.log(req.user.id, "jjjjjjjjjjjjjjjjjjjjjj");
  const result = await models.Tests.findAll({
    where: {
      user_id: req.user.id,
    },
    attributes: ["id", "title"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("failed getting result", res);
  }
};
