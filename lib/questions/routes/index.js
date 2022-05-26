const express = require("express");
const router = express.Router();
var questionsController = require("../controller");

// get all students
// router.get("/", usersController.getInstuctors);
router.get("/", questionsController.getQuestions);
router.post("/", questionsController.postQuestion);

module.exports = router;
