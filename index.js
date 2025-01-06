const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const low = require("lowdb");

const userRoute = require("./routes/users.route");

var users = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Hoa" },
  { id: 3, name: "Tuan" },
];

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1> <a href='/about-us'>About me</a>");
  res.render("index", {
    //tham so 1: path, tham so 2: object
    name: "Nguyen Dang Hoai Nam",
    age: 20,
  });
});

app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
