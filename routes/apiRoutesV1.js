const express = require("express");
const router = express.Router();
// var usersController = require("../controllers/usersController");

router.use("/users", require("../lib/admins/routes"));

router.use("/instructors", require("../lib/instructors/routes"));

router.use("/students", require("../lib/students/routes"));

router.use("/tests", require("../lib/tests/routes"));

router.use("/questions", require("../lib/questions/routes"));

router.use("/options", require("../lib/answers_options/routes"));

router.use("/session", require("../lib/session-tests/routes"));

// router.use("/students", require("../lib/students/routes"));

// router.use("/tests", require("../lib/tests/routes"));

// router.use("/questions", require("../lib/questions/routes"));

// router.use("/classrooms", require("../lib/classrooms/routes"));

// router.use("/answers_options", require("../lib/answers_options/routes"));

// router.use("/session_tests", require("../lib/session_tests/routes"));

module.exports = router;
