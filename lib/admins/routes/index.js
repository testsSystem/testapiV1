const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var authService = require("../../auth-services");

// get all students
router.get("/", usersController.getUsers);
router.get("/students", usersController.getStudents);
router.get("/instructors", usersController.getInstructors);
router.get("/admins", usersController.getAdmins);
// router.get("/login", usersController.login);

// router.post("/", usersController.postAdmin);

module.exports = router;
