var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUser = ["aaa"];

io.on("connection", function(socket){
  console.log(socket.id + " vua ket noi");

  socket.on("client-send-username", function(username){
    if(mangUser.indexOf(username) >= 0){
      //dang ky fail
      socket.emit("server-send-dk-thatbai");
    } else{

      mangUser.push(username)
      socket.Username = username;
      socket.emit("server-send-dk-thanhcong", username);
      io.sockets.emit("server-send-danhsach-user", mangUser);
    }
  });

  socket.on("logout", function(){
    mangUser.splice(
      mangUser.indexOf(socket.Username), 1);
    socket.broadcast.emit("server-send-danhsach-user", mangUser);
  });
});

app.get("/", function(req, res){
  res.render("home");
});
