

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

