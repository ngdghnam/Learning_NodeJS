// console.log(process.env)
require("dotenv").config();
// console.log(process.env.SESSION_SECRET);

const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const low = require("lowdb");
const cookieParser = require("cookie-parser");
const path = require("path");
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

const apiProductsRoute = require('./api/routes/products.route');

const userRoute = require("./routes/users.route");
const authRoute = require("./routes/auth.route");
const aboutusRoute = require("./routes/aboutus.route");
const productsRoute = require("./routes/products.route");
const cartRoute = require("./routes/cart.route");
const transferRoute = require("./routes/transfer.route");

var users = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Hoa" },
  { id: 3, name: "Tuan" },
];

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use("/api/products", apiProductsRoute);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware); //Tác động đến tất cả các đường dẫn 


const csurf = require("csurf"); 
// app.use(csurf({cookie: true}));

//Boostrap 
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1> <a href='/about-us'>About me</a>");
  res.render("index", {
    //tham so 1: path, tham so 2: object
    name: "Nguyen Dang Hoai Nam",
    major: "Software Engineering",
    school: "University of Economics and Law",
    age: 20,
  });
});

app.use(express.static("public"));

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/aboutus", authMiddleware.requireAuth, aboutusRoute);
app.use("/auth", authRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/transfer", authMiddleware.requireAuth, transferRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
