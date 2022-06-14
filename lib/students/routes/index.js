const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var { isAuthenticated } = require("../../auth-services");
var { isStudent } = require("../../auth-services");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get(
  "/sessionByUserId",
  isAuthenticated,
  isStudent,
  usersController.getSessionByUserId
); // takes the id from the student who logged in as student
router.get(
  "/getTests",
  isAuthenticated,
  isStudent,
  usersController.getTestsByStudentsId
); //it should match with the user who logged in as a student

router.get(
  "/results/:id",
  isAuthenticated,
  isStudent,
  usersController.getStudentResult
); //it should match with the user who logged in as a student

module.exports = router;
