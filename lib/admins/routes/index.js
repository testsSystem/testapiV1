const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var authService = require("../../auth-services");

// get all students
router.get("/allStudents", usersController.gettingAllStudents); //isAdmin && isINstructor

router.get("/", usersController.getUsers); //isAdmin
router.get("/instructors", usersController.getInstructors); //isAdmin
router.get("/admins", usersController.getAdmins); //idAdmin
router.post("/login", usersController.login);
router.post("/signup", usersController.signup);
router.get("/:id", usersController.getUser); //isAdmin

module.exports = router;
