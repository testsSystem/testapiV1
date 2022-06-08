const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var { isAuthenticated, isStudent } = require("../../auth-services");
var { isInstructor } = require("../../auth-services");

router.post("/", isAuthenticated, isInstructor, usersController.createTest); //isInstructor
router.post(
  "/questions",
  isAuthenticated,
  isInstructor,
  usersController.createQuestions
); //isInstructor
router.post(
  "/options",
  isAuthenticated,
  isInstructor,
  usersController.createOptions
); //isInstructor

router.put(
  "/updateT/:id",
  isAuthenticated,
  isInstructor,
  usersController.updateTest
); //isInstructor
router.put(
  "/updateQ/:id",
  isAuthenticated,
  isInstructor,
  usersController.updateQuestion
); //isInstructor
router.put(
  "/updateO/:id",
  isAuthenticated,
  isInstructor,
  usersController.updateOption
); //isInstructor

router.get(
  "/getStudentTest/:id",
  isAuthenticated,
  isStudent,
  usersController.getStudnetTest
); //to students
router.get(
  "/getInstructorTest/:id",
  isAuthenticated,
  isInstructor,
  usersController.getInstructorTest
); //to instructor
// router.get(
//   "/getTestInfo/:id",
//   isAuthenticated,
//   usersController.getTestInfo
// ); //to instructor and student
router.post(
  "/session",
  isAuthenticated,
  isInstructor,
  usersController.createSession
); //to instructor

router.get(
  "/sessionStudent",
  isAuthenticated,
  isInstructor,
  usersController.sessionStudent
); // user_id should match with user who logged in as student //isStudent
router.get(
  "/sessionInstructor",
  isAuthenticated,
  isInstructor,
  usersController.sessionInstructor
); //the test_id should be linked with the tests table witch has a user_id for instructor
// router.get("/sessionInstructor/:id", usersController.getInstructorSessionByid); //the test_id should be linked with the tests table witch has a user_id for instructor

router.put(
  "/startSession/:id",
  isAuthenticated,
  isStudent,
  usersController.startSession
); //
router.put(
  "/endSession/:id",
  isAuthenticated,
  isStudent,
  usersController.endSession
); //

router.get("/result", usersController.getResult); //
router.get("/getCorrectAnswer", usersController.getCorrectAnswer); //
router.get("/countQuestions/:id", usersController.countQuestions); //
router.get(
  "/getTestsByInstructor",
  isAuthenticated,
  isInstructor,
  usersController.getTestsByInstructor
); //

router.get("/", isAuthenticated, isStudent, usersController.getAllTests); //
// router.get("/submitResult", usersController.submitResult); //

module.exports = router;
