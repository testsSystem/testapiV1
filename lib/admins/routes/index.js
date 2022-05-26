const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var authService = require("../../auth-services");

// get all students
router.get("/", authService.verifyUser, usersController.getUsers); //isAdmin
router.get("/students", usersController.getStudents); //isAdmin && isINstructor
router.get("/instructors", usersController.getInstructors); //isAdmin
router.get("/admins", usersController.getAdmins); //idAdmin
router.post("/login", usersController.login);
router.post("/signup", usersController.signup);

// router.post("/", usersController.postAdmin);

module.exports = router;
