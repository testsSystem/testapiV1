const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var authService = require("../../auth-services");
var { isAuthenticated } = require("../../auth-services");
var { isInstructor } = require("../../auth-services");

router.get("/", usersController.getInstuctors);

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

router.get(
  "/getStudents",
  isAuthenticated,
  isInstructor,
  usersController.getStudents
);
router.get(
  "/getTests",
  isAuthenticated,
  isInstructor,
  usersController.getTests
); //it should match with the user who logged in as an instructor

module.exports = router;
