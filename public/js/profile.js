

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

// event timeline stuff event boxes

function createTimelineElement(event) {
  let $parentDiv  = $('<div>');
    $parentDiv.addClass("cd-timeline-block");
  let $childDiv = $('<div>');
    $childDiv.addClass("cd-timeline-img cd-picture");
  let $iconImage = $('<img>');
    $iconImage.attr('src', event.imageurl);
  let $timelineContent = $('<div>');
    $timelineContent.addClass('cd-timeline-content');
  let $titleSection = $('<h2>');
    $titleSection.text(event.title);
  let $paragraph = $('<p>');
    $paragraph.text(event.stroy);
  let $date = $('<span>');
    $date.addClass('cd-date');
    $date.text(event.date);

   $parentDiv.append($childDiv);
   $childDiv.append($iconImage);
   $parentDiv.append($timelineContent);
   $timelineContent.append($titleSection, $paragraph, $date);

    return $parentDiv; 
}
