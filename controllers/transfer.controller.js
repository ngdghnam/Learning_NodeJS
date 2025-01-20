const db = require('../db')
const shortid = require('shortid');

module.exports.create = (req, res, next) => {
    res.render('transfer/create', {
        csrfToken: req.csrfToken(),
        //tạo 1 method mới cho req và trả về 1 string
    });
}

module.exports.postCreate = (req, res, next) => {

    var data = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    }

    // req.body.id =  shortid.generate();
    // req.body.amount = parseInt(req.body.amount);
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create'); 
}