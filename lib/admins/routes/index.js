const express = require("express");
const router = express.Router();
var usersController = require("../controller");
var authService = require("../../auth-services");
var { isAuthenticated } = require("../../auth-services");
var { isAdmin } = require("../../auth-services");

// get all students
router.get(
  "/allStudents",
  isAuthenticated,
  isAdmin,
  usersController.gettingAllStudents
); //isAdmin

router.put(
  "/updateStatus/:id",
  isAuthenticated,
  isAdmin,
  usersController.updateStatus
); //isAdmin

router.get("/", isAuthenticated, isAdmin, usersController.getUsers); //isAdmin
router.get(
  "/instructors",
  isAuthenticated,
  isAdmin,
  usersController.getInstructors
); //isAdmin
router.get("/", isAuthenticated, isAdmin, usersController.getAdmins); //idAdmin
router.post("/login", usersController.login);
router.post("/signup", usersController.signup);
router.get(
  "/getAllTests",
  isAuthenticated,
  isAdmin,
  usersController.getAllTests
); //isAdmin
router.get("/:id", isAuthenticated, isAdmin, usersController.getUser); //isAdmin

module.exports = router;
