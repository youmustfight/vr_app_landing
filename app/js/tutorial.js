var tutorialOverlay = $('.tutorial-overlay');
setTimeout(function(){
  tutorialOverlay.fadeTo(600,"0",function(){
    setTimeout(function(){
      tutorialOverlay.hide();
    },50)
    console.log('ready to go!');
  })
}, 3700);