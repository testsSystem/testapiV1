const express = require("express");
const router = express.Router();
var optionsController = require("../controller");

// get all students
// router.get("/", usersController.getInstuctors);
router.get("/", optionsController.getOptions);
router.post("/", optionsController.postOptions);

module.exports = router;
