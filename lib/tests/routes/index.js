const express = require("express");
const router = express.Router();
var usersController = require("../controller");

// get all students
router.get("/", usersController.getTests);
router.post("/", usersController.createTest);
// router.get("/instructors", usersController.getInstructors);
// router.get("/admins", usersController.getAdmins);
// router.post("/", usersController.postAdmin);

module.exports = router;
