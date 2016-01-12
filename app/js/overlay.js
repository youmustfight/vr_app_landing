// Set Section Height
// $('.overlay-content').height($(window).height());

// Menu Variables
var overlayShowing = false;
var downScroll = 0;
var upScroll = 0;

// Menu Opening/Closing Function
var overlayShow = function(){
  overlayShowing = true;
  console.log('Revealing Section');
  $('.overlay-content').fadeTo("50", 1, function(){
    $('.overlay-content').show();
  });
}

var overlayHide = function(){
  overlayShowing = false;
  console.log('Hiding Section');
  $('.overlay-content').fadeTo("50", 0, function(){
    $('.overlay-content').hide();
  });
}

var overlayToggle  = function(newState){
  console.log("Toggling Overlay");
  if (!overlayShowing && newState) {
    overlayShow();
    $('.download-the-app').fadeTo("50", 0);
  } 
  if (overlayShowing && !newState) {
    overlayHide();
    $('.download-the-app').fadeTo("50", 1);
  }
}

var closeOverlayButtons = document.querySelectorAll(".toggle-overlay");

for (var i = 0; i < closeOverlayButtons.length; i++){
  closeOverlayButtons[i].addEventListener('click', function(){
    if(overlayShowing == false){
      overlayToggle(true);
    } else {
      overlayToggle(false);
    }
    $(".header-hamburger").toggleClass('open');
  })
}