const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var authService = require("../../auth-services");
// var {isAuthintecated} = require('../../auth-services')

// get all students
router.get("/", usersController.getInstuctors);

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

router.get("/getStudents", usersController.getStudents);
router.get("/getTests", usersController.getTests); //it should match with the user who logged in as instructor

module.exports = router;
