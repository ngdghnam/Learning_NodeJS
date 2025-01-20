const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

module.exports.search = (req, res) => {
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
};

module.exports.create = (req, res) => {
  // console.log(req.cookies);
  //Để đọc được cookie thì phải cài 1 cái middleware
  res.render("users/create");
};

module.exports.get = (req, res) => {
  var id = req.params.id;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();

  //Đây không phải cách tốt nhất nhưng mà nó nhanh
  req.body.avatar = req.file.path.split("\\").slice(1).join("/");
  // console.log(req.body.avatar);
  db.get("users").push(req.body).write();
  res.redirect("/users");
};
