const express = require("express");
const router = express.Router();

router.use("/users", require("../lib/admins/routes"));

router.use("/instructors", require("../lib/instructors/routes"));

router.use("/students", require("../lib/students/routes"));

router.use("/tests", require("../lib/tests/routes"));

module.exports = router;
