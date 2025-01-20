//Trong TH có userID, kiểm tra xem userID có tồn tại trong DB của mình hay khôn 
// Tránh TH tạo cookie giả mạo
const db = require("../db");

module.exports.requireAuth = function(req,res, next) {
    console.log(req.cookies, req.signedCookies);
    if (!req.signedCookies.userId) {
        res.redirect("/auth/login");
        return;
    }

    var user = db.get("users").find({ id: req.signedCookies.userId }).value();

    if (!user) {
        res.redirect("/auth/login");
        return;
    }

    res.locals.user = user;

    next();
};