$(() => {
  
  let messages = [];
  let socket = io.connect("http://localhost:3000");
  let chatForm = $("#chatForm");
  let message = $("#chatInput");
  let chatWindow = $("#chatWindow");
  let userForm = $("#userForm");
  let userName = $("#userName");
  let users = $("#users");
  let error = $("#error");

  //Submit userform
  userForm.on("submit", function(e) {
    e.preventDefault();
    socket.emit("set user", userName.val(), function(data) {
      if(data) {
        $("#userFormWrap").hide();
        $("#mainWrap").show();
      }else {
        error.html("Username is taken");
      }
    });
  });

  //Display Usernames
  socket.on("users", (data) => {
    let html = "";

    for(let i = 0; i < data.length; i++) {
      html += "<li class='list-group-item'>" + data[i] + "</li>";
    }

    users.html(html);
  });

});