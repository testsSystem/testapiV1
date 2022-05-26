const express = require("express");
const router = express.Router();
var sessionController = require("../controller");

// get all students
// router.get("/", usersController.getTests);
router.post("/", sessionController.createSession); //from instructor isInstructor
// router.put("/startTest/:id", sessionController.startTest); //from student isStudent
// router.put("/endStart", sessionController.endTest); //from student or the system shutdown automatically, status = false and store result

// router.post("/", sessionController.createSession);
// router.get("/instructors", usersController.getInstructors);
// router.get("/admins", usersController.getAdmins);
// router.post("/", usersController.postAdmin);

module.exports = router;
