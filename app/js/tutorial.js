// $(document).ready(function() {
  var tutorialOverlay = $('.tutorial-overlay');
  setTimeout(function(){
    tutorialOverlay.fadeTo(400,"0",function(){
      tutorialOverlay.hide();
      console.log('ready to go!');
    })
  }, 3000);
// });