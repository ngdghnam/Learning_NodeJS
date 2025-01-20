var mongoose = require('mongoose')

//schema dung de khai bao cac field trong object cua chung ta
//con được dùng để làm sạch hay validate data

var userSchema = new mongoose.Schema({
    email: String, 
    password: String, 
    name: String,
    avatar: String,
    phone: String 
});

//truyen vao ten model va ten cua schema, biến thứ 3 là để lưu vào trong cái collection nào
var User = mongoose.model('User', userSchema, 'users');

module.exports = User; 