const express = require("express");
const router = express.Router();
const multer = require("multer");
// const db = require("../db");
// const authMiddlweware = require("../middlewares/auth.middleware");
const controller = require("../controllers/user.controller");
const validate = require("../validate/user.validate");

router.get("/", controller.index);

var upload = multer({ dest: "./public/uploads/" });

/**
 * Nếu không có next() thì sẽ không chạy middleware2
 * Mục đích của next() là chuyển hướng sang middleware tiếp theo
 * Và tách validation thành 1 file riêng 
 */

router.get("/cookie", (req, res, next) => {
  res.cookie("user-id", 12345);
  res.send("Hello");
});

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.get);

router.post("/create", 
  upload.single('avatar'), 
  validate.postCreate, 
  controller.postCreate
);

module.exports = router;
