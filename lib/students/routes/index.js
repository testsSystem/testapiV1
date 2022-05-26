const express = require("express");
const router = express.Router();
var usersController = require("../controller");

// get all students
router.get("/", usersController.getStudents);
router.post("/signup", usersController.signup);

module.exports = router;
