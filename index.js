const express = require("express");
const app = express();
const port = 3000;

var users = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Hoa" },
  { id: 3, name: "Tuan" },
];

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1> <a href='/about-us'>About me</a>");
  res.render("index", {
    //tham so 1: path, tham so 2: object
    name: "Nguyen Dang Hoai Nam",
  });
});

app.get("/about-us", (req, res) => {
  res.render("users/index", {
    users: users,
  });
});

app.get("/about-us/search", (req, res) => {
  var q = req.query.q;
  var matchedUsers = users.filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  //console.log(req.matchedUsers);

  res.render("users/index", {
    users: matchedUsers,
    query: q,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
