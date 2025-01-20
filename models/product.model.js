var mongoose = require('mongoose')

//schema dung de khai bao cac field trong object cua chung ta
//con được dùng để làm sạch hay validate data

var productSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String, 
    thumbnail: String 
});

//truyen vao ten model va ten cua schema, biến thứ 3 là để lưu vào trong cái collection nào
var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product; 