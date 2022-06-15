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
    user_id: req.user.id,
    test_id: req.body.test_id,
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

  let getCorrect = await correctAnswers(result.test_id);

  let getQuestoinCount = await countQuestions(result.test_id);

  let updatedAnswers = getCorrect.dataValues.Questions.map(
    (data, i) => data.Answers_options[0]
  );
  let questionsCount = getQuestoinCount.length;
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
    if (res.id === res.selectedAnswer) {
      correctCount++;
    }
  });
  finalResult = (correctCount / questionsCount) * 100;

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

const countQuestions = async (id) => {
  const result = await models.Questions.findAll({
    where: {
      test_id: id,
    },
  });

  console.log(result.length, id, "uuuuuuuuuuuuuuuuuuuuuu11111111111");

  return result;
};

exports.getTestsByInstructor = async (req, res, nex) => {
  //   console.log(req.user.id, "jjjjjjjjjjjjjjjjjjjjjj");
  const result = await models.Tests.findAll({
    where: {
      user_id: req.user.id,
    },
    attributes: ["id", "title", "user_id"],
  });

  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("failed getting result", res);
  }
};

exports.getAllTests = async (req, res, nex) => {
  const result = await models.Tests.findAll({
    attributes: ["id", "title", "descriptoin", "start_at", "end_at"],
    // include: [
    //   {
    //     model: models.Session_tests,
    //     // attributes: ["id", "question_id"],
    //     where: {
    //       status: true,
    //     },
    //   },
    // ],
  });

  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("failed getting result", res);
  }
};

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

  return result;
};

exports.checking = (req, res) => {
  const result = res.json(CheckifCorrect);
  if (result) {
    response.success(result, res);
  } else {
    response.failedWithMessage("test failed", res);
  }
};

exports.getTestResult = async (req, res, nex) => {
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
