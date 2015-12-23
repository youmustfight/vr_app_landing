// Set Section Height
$('.overlay-content').height($(window).height());

// Menu Variables
var overlayShowing = false;
var downScroll = 0;
var upScroll = 0;

// Menu Opening/Closing Function
var overlayShow = function(){
  overlayShowing = true;
  console.log('Revealing Section');
  $('.overlay-content').show();
  $('.overlay-content').fadeTo("150", 1, function(){
    console.log('Animation Complete');
  });
}

var overlayHide = function(){
  overlayShowing = false;
  console.log('Hiding Section');
  $('.overlay-content').fadeTo("150", 0, function(){
    $('.overlay-content').hide();
    console.log('Animation Complete');
  });
}

var overlayToggle  = function(newState){
  if (!overlayShowing && newState) {
    overlayShow();
  } 
  if (overlayShowing && !newState) {
    overlayHide();
  }
}