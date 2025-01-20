const express = require("express");
const router = express.Router();
const db = require("../db");
const controller = require("../controllers/products.controller");

router.get("/", controller.index);

module.exports = router;