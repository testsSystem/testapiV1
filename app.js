require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", require("./routes/apiRoutesV1.js"));
app.use(function (req, res, next) {
  res.status(404).send("resourse not found");
});

// app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
