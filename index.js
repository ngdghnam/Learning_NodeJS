const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");

// Set some defaults
db.defaults({ users: [] }).write();

var users = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Hoa" },
  { id: 3, name: "Tuan" },
];

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1> <a href='/about-us'>About me</a>");
  res.render("index", {
    //tham so 1: path, tham so 2: object
    name: "Nguyen Dang Hoai Nam",
  });
});

app.get("/users", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
});

app.get("/users/search", (req, res) => {
  var q = req.query.q;
  var matchedUsers = db
    .get("users")
    .filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    .value();
  //console.log(req.matchedUsers);

  res.render("users/index", {
    users: matchedUsers,
    query: q,
  });
});

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.get("/users/:id", (req, res) => {
  // var id = parseInt(req.params.id);
  // route parameter
  var id = req.params.id;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
});

app.post("/users/create", (req, res) => {
  // console.log(req.body);
  // users.push(req.body);
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
