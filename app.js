const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.PORT || '3000';

let users = [];

//Setup Static Folders
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//Use EJS
app.set("view engine", "ejs");

//Connect to SocketIO
io.sockets.on("connection", (socket) => {
  //Set the username
  socket.on("set user", (data, callback) => {
    if(users.indexOf(data) != -1) {
      callback(false);
    }else {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
    }
  });

  function updateUsers() {
    io.sockets.emit("users", users);
  };
});

//Routes
app.get("/", (req, res, next) => {
  res.render("index");
});

//Start Server
server.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
