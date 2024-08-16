var express = require("express");
var router = express.Router();

const mysql = require("../utils/mysql");
const sqlite = require("../utils/sqlite");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "My Title" });
});

module.exports = router;
