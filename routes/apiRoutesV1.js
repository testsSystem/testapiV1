const express = require("express");
const router = express.Router();

router.use("/admin", require("../lib/admins/routes"));

router.use("/users", require("../lib/users/routes"));

router.use("/instructors", require("../lib/instructors/routes"));

router.use("/students", require("../lib/students/routes"));

router.use("/tests", require("../lib/tests/routes"));

module.exports = router;
