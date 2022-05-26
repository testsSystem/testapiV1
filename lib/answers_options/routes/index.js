const express = require("express");
const router = express.Router();
var optionsController = require("../controller");

// get all students
// router.get("/", usersController.getInstuctors);
router.get("/", optionsController.getAnswers); //isInstructor

router.post("/", optionsController.postOptions); //isInstructor

module.exports = router;
