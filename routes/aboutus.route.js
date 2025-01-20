const express = require("express");
const router = express.Router();

const authMiddlweware = require("../middlewares/auth.middleware");
const controller = require("../controllers/aboutus.controller");

router.get("/", controller.index);

module.exports = router;