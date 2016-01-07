// Get Download Buttons via Class
var downloadButtons = document.querySelectorAll('.download-link');

// Function handling rotations of button being hovered
var animateToLink = function(button){
  console.log(button)
}


// For all the Download-forwarding buttons....
for (var i = 0; i < downloadButtons.length; i++){

  // Set default data values
  $(downloadButtons[i]).attr("data-link-hovered", false);

  // Add a Mouse Enter Condition, tracking hover and initiating rotations
  downloadButtons[i].addEventListener('mouseenter', function(){
    console.log($(this).attr("data-link"));
    // this is hovered
    $(this).attr("data-link-hovered", true);
    // initiate roations function
    animateToLink(this);
  });

  // And a Mouse Leave Condition to reset hover and rotations
  downloadButtons[i].addEventListener('mouseleave', function(){
    $(this).attr("data-link-hovered", false);
    console.log($(this).attr("data-link-hovered"));

  });

}