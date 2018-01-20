
$(document).ready(function() {
  // get the username to fill out the user logged in
  $.ajax({
    url: "/api/username",
    success: function(result) {
      $('.userName').text(result.user.email);
    }
  });

  getChildren();
  // get all children and create the buttons
  function getChildren() {
    $.ajax({
      url: "/api/childs",
      success: function(result) {
        console.log(result);
        // clear the container
        $('.childButtonContainer').empty();
        // loop through and add all of the children buttons
      }
  });
}

  function createChildButton(name) {
    var button = $('<button>');
    button.addClass("btn btn-default big-btn");
    button.text(name);
    return button;    
  }
});

