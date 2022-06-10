const { resource } = require("../../../app");
var models = require("../../../models");
var response = require("../../response");

exports.createTest = async (req, res, nex) => {
  const result = await models.Tests.create({
    title: req.body.testName,
    start_at: req.body.startAt,
    end_at: req.body.endAt,
    descriptoin: req.body.description,
    user_id: req.user.id, // it takes from the user who logged in as instructor in frontEnd
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
        attributes: ["id", "questoin"],
        include: [
          {
            model: models.Answers_options,
            attributes: ["id", "answer", "question_id"],
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

// exports.getTestInfo = async (req, res, nex) => {
//   const { id } = req.params;
//   const result = await models.Tests.findByPk(id, {
//     attributes: ["id", "title", "start_at", "end_at"],
//   });

//   if (result) {
//     return response.success(result, res);
//   } else {
//     response.failedWithMessage("failed getting test info ", res);
//   }
// };

exports.getInstructorTest = async (req, res, nex) => {
  const { id } = req.params;
  const result = await models.Tests.findByPk(id, {
    include: [
      {
        model: models.Questions,
        attributes: ["id", "questoin"],
        include: [
          {
            model: models.Answers_options,
            attributes: ["id", "answer", "question_id", "correct_answer"],
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
    result.started_at = Date.now();

    result.save();

    return response.success(result, res);
  } else {
    response.failedWithMessage("failed updating start session", res);
  }
};

const CheckifCorrect = {
  test_id: 3,
  session_id: 2,
  selected_answers: [
    {
      question_id: 2,
      selectedAnswer: 4,
    },
    {
      question_id: 3,
      selectedAnswer: 5,
    },
  ],
};

exports.endSession = async (req, res, nex) => {
  const { id } = req.params;

  const result = await models.Session_tests.findByPk(id);
  let getCorrect = await correctAnswers(id);

  let getQuestoinCount = await countQuestions(id);

  let updatedAnswers = getCorrect.dataValues.Questions.map(
    (data, i) => data.Answers_options[0]
  );
  let questionsCount = updatedAnswers.length;
  let correctCount = 0;
  let finalResult;

  let finalUpdate = updatedAnswers.map((ans) => {
    let answerIndex = req.body?.answerOptions.findIndex(
      (secAns) => ans.question_id === secAns.questionId
    );
    let { id, question_id } = ans;
    return {
      id,
      question_id,
      selectedAnswer: req.body?.answerOptions[answerIndex].selectedAnswer,
    };
  });

  let ResultCalculation = finalUpdate.map((res, i) => {
    console.log(res.id, "rsrsrsrsrsrsrs");
    if (res.id === res.selectedAnswer) {
      correctCount++;
    }
  });
  finalResult = (correctCount / questionsCount) * 100;

  console.log(finalResult, "yyyyyyyyyyyy");
  console.log(result, "rrrrrrrrrrrrrrr");
  console.log(req.body.ended_at, "eeeeeeeeeeeeeee");
  if (result) {
    result.ended_at = Date.now();

    result.result = finalResult;

    result.status = false;

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

const countQuestions = async (id) => {
  const result = await models.Questions.findAll({
    where: {
      test_id: id,
    },
  });
  // console.log(result.length, "uuuuuuuuuuuuuuuuuuuuuu");

  return result;
};

exports.getTestsByInstructor = async (req, res, nex) => {
  //   console.log(req.user.id, "jjjjjjjjjjjjjjjjjjjjjj");
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

exports.getAllTests = async (req, res, nex) => {
  //   console.log(req.user.id, "jjjjjjjjjjjjjjjjjjjjjj");
  const result = await models.Tests.findAll({
    attributes: ["id", "title", "descriptoin"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("failed getting result", res);
  }
};

// exports.correctAnswers = async (req, res, nex) => {
//   //   console.log(req.user.id, "jjjjjjjjjjjjjjjjjjjjjj");
//   const result = await models.Answers_options.findAll({
//     attributes: ["id", "correct_answer"],
//     where: {
//       correct_answer: true,
//     },
//   });

//   if (result) {
//     return response.success(result, res);
//   } else {
//     return response.failedWithMessage("failed getting result", res);
//   }
// };

const correctAnswers = async (testId) => {
  const result = await models.Tests.findByPk(testId, {
    attributes: ["id", "title"],
    include: [
      {
        model: models.Questions,
        attributes: ["id", "questoin"],
        include: [
          {
            model: models.Answers_options,
            attributes: ["id", "question_id"],
            where: {
              correct_answer: true,
            },
          },
        ],
      },
    ],
  });

  // if (result) {
  return result;
  // }
};

// const mapping = CheckifCorrect.map((option, index) => {
//   console.log(option, index, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
//   return mapping;
// });

exports.checking = (req, res) => {
  const result = res.json(CheckifCorrect);
  if (result) {
    response.success(result, res);
  } else {
    response.failedWithMessage("test failed", res);
  }
};
