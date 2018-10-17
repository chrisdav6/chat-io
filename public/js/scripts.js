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
      }
    });
  });

});