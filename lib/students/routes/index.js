const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var { isAuthenticated } = require("../../auth-services");
var { isStudent } = require("../../auth-services");

// get all students
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get(
  "/sessionByUserId",
  isAuthenticated,
  isStudent,
  usersController.getSessionByUserId
); // takes the id from the student who logged in as student

module.exports = router;
