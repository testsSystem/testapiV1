const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var { isAuthenticated } = require("../../auth-services");

router.get("/profile", isAuthenticated, usersController.profile); //isInstructor

module.exports = router;
