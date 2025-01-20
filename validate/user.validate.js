//Nếu không có next thì trình duyệt sẽ chạy mãi mãi và timeout sau 1 khoảng thời gian 
module.exports.postCreate = (req, res, next) => {
    var errors = [];
    if (!req.body.name) {
        errors.push("Name is required.");
    }
    
    if (!req.body.phone) {
        errors.push("Phone is required.");
    }
    
    if (errors.length) {
        res.render("users/create", {
        errors: errors,
        values: req.body,
        });
        return;
    }

    res.locals.success = true;
    console.log(res.locals.success);
    //res.locals.success = true; dung de truyen bien giua cac middleware

    next();
};
