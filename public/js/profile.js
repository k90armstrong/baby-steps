$(document).ready(function() {
  // get the username to fill out the user logged in
  $.ajax({
    url: "/api/username",
    success: function(result) {
      $('#username').text(result.user.firstname + " " + result.user.lastname);
    }
  });
  getChildInfo();
  function getChildInfo() {
    var childId = localStorage.getItem('currentChildId');
    $.ajax({
      url: "/api/childs/" + childId,
      success: function(result) {
        $('#kidsName').text(result.firstname + " " + result.lastname);
        $('#babyImage').attr('src', '../' + result.image);
        $('#weight').text(result.weight);
        $('#length').text(result.height);
        $('#birtday').text(result.birthdate);
        console.log(result);
      }
    });
  }
  function getChildsEvents() {
    var childId = localStorage.getItem('currentChildId');
    $.ajax({
      url: "/api/events",
      success: function(result) {
        
        $('#username').text(result.user.firstname + " " + result.user.lastname);
      }
    });
  }
});

// This is the add event posistion sticky ========
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {
    addSticky();
};

// Get the navbar
var addEventBtn = document.getElementById("add-event-btn");

// Get the offset position of the navbar
var sticky = addEventBtn.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function addSticky() {
  if (window.pageYOffset >= sticky) {
    addEventBtn.classList.add("sticky")
  } else {
    addEventBtn.classList.remove("sticky");
  }
}

// end of posistion sticky==========================

