const Product = require("../../models/product.model");

module.exports.index = (req, res) => {
    Product.find().then(function(products) {
        res.json(products);
    });
};

module.exports.create = async function(req, res) {
    var product = await Product.create(req.body);
    res.json(product);
};