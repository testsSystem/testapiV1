const express = require("express");
const router = express.Router();
var usersController = require("../controller");

// get all students

router.post("/", usersController.createTest); //isInstructor
router.post("/questions", usersController.createQuestions); //isInstructor
router.post("/options", usersController.createOptions); //isInstructor

router.put("/updateT/:id", usersController.updateTest); //isInstructor
router.put("/updateQ/:id", usersController.updateQuestion); //isInstructor
router.put("/updateO/:id", usersController.updateOption); //isInstructor

router.get("/getStudentTest/:id", usersController.getStudnetTest); //to students
router.get("/getInstructorTest/:id", usersController.getInstructorTest); //to instructor

router.post("/session", usersController.createSession); //to instructor

router.get("/sessionStudent", usersController.sessionStudent); // user_id should match with user who logged in as student //isStudent
router.get("/sessionInstructor", usersController.sessionInstructor); //the test_id should be linked with the tests table witch has a user_id for instructor
// router.get("/sessionInstructor/:id", usersController.getInstructorSessionByid); //the test_id should be linked with the tests table witch has a user_id for instructor

router.put("/startSession/:id", usersController.startSession); //
router.put("/endSession/:id", usersController.endSession); //
router.get("/sessionByUserId/:id", usersController.getSessionByUserId); //

router.get("/result", usersController.getResult); //

module.exports = router;
