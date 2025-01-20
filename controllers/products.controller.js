const Product = require("../models/product.model");

module.exports.index = (req, res, next) => {
    // var page = parseInt(req.query.page) || 1; //n
    // var perPage = 8; //x 

    // var start = (page - 1) * perPage;
    // var end = page * perPage;

    // var drop = (page - 1) * perPage;

    // res.render("products/index", {
    //     // products: db.get("products").value().slice(start, end),
    //     products: db.get("products").drop(drop).take(perPage).value(),
    // });
    // console.log(db.get("products").value());


    try {
        Product.find().then(function(products) {
            res.render('products/index', {
                products: products
            });
        });
    } catch(error) {
        next(error);
    }

    // var products = await Product.find();
    // res.render('products/index', {
    //     products: products
    // });
};