const express = require("express");
const router = express.Router();
var usersController = require("../controller");

// get all students
// router.get("/", usersController.getTests);
router.post("/", usersController.createTest); //isInstructor
// router.get("/instructors", usersController.getInstructors);
// router.get("/admins", usersController.getAdmins);
// router.post("/", usersController.postAdmin);
router.get("/students", usersController.getStudentsOptions); //isInstructor
router.get("/questions", usersController.getQuestionsTest); //isInstructor

module.exports = router;
