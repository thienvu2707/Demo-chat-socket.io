var socket = io("http://localhost:3000");

socket.on("server-send-dk-thatbai", function(){
  alert('Username already registered, Signup again!');
});

socket.on("server-send-dk-thanhcong", function(username){
  $("#currentUser").html(username);
  $("#loginForm").hide(500);
  $("#chatForm").show(1000);
});

socket.on("server-send-danhsach-user", function(data){
  $("#boxContent").html("");
  data.forEach(function(i){
    $("#boxContent").append("<div class='user'>" +i+ "</div>");
  });
});

$(document).ready(function(){
  $("#loginForm").show();
  $("#chatForm").hide();

  $("#btnRegister").click(function(){
    socket.emit("client-send-username", $("#txtUserName").val())
  });

  $("#btnLogout").click(function(){
    socket.emit("logout");
    console.log("thoat thoat");
    $("#chatForm").hide(2);
    $("#loginForm").show(1);

  });
});
