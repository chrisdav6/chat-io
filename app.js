const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.PORT || '3000';

//Setup Static Folders
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "node_modules")));

//Use EJS
app.set("view engine", "ejs");

//Routes
app.get("/", (req, res, next) => {
  res.render("index");
});

//Start Server
server.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
