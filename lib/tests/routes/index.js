const express = require("express");
const router = express.Router();
var usersController = require("../controller");

// get all students
// router.get("/", usersController.getTests);
router.post("/", usersController.createTest); //isInstructor
router.post("/questions", usersController.createQuestions); //isInstructor
router.post("/options", usersController.createOptions); //isInstructor

router.put("/updateT/:id", usersController.updateTest); //isInstructor
router.put("/updateQ/:id", usersController.updateQuestion); //isInstructor
router.put("/updateO/:id", usersController.updateOption); //isInstructor

router.get("/getStudentTest/:id", usersController.getStudnetTest); //to students
router.get("/getInstructorTest/:id", usersController.getInstructorTest); //to instructor

router.post("/sessions", usersController.createSession); //to instructor

// router.get("/instructors", usersController.getInstructors);
// router.get("/admins", usersController.getAdmins);
// router.post("/", usersController.postAdmin);
router.get("/students", usersController.getStudentsOptions); //isInstructor
router.get("/questions", usersController.getQuestionsTest); //isInstructor

module.exports = router;
