console.log("it works");

$.ajax({
  url: "/api/username",
  success: function(result) {
    console.log(result);
  }
});
