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
$('#hamburger').click( function() {
  // $(this).toggleClass('animate');
  // if($(this).hasClass("animate")){
    overlayToggle(true);
  // } else {
    // overlayToggle(false);
  // }
})
var overlayButtonisHovered = false;

var generateWave = function(count){
    var newCount = count + 1;
    if (overlayButtonisHovered) {
      if (newCount < 6){
        if (newCount%2){
          document.querySelector('#overlayToggleWaves').emit('overLayButtonisInFocus');
        } else {
          document.querySelector('#overlayToggleWaves').emit('lostFocus');
        }
        setTimeout(function(){
          generateWave(newCount);  
        }, 600)      
      } else {
        document.querySelector('#overlayToggleWaves').emit('lostFocus');
        overlayToggle(true);
      }
    }
}

document.querySelector('.overlayToggleButton').addEventListener('mouseenter', function(){
  document.querySelector('.overlayToggleButton').emit('overLayButtonisInFocus');
  overlayButtonisHovered = true;
  generateWave(0);
});

document.querySelector('.overlayToggleButton').addEventListener('mouseleave', function(){
  document.querySelector('.overlayToggleButton').emit('lostFocus');
  document.querySelector('#overlayToggleWaves').emit('lostFocus');
  overlayButtonisHovered = false;
});
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

var closeOverlayButtons = document.querySelectorAll(".close-overlay");

for (var i = 0; i < closeOverlayButtons.length; i++){
  closeOverlayButtons[i].addEventListener('click', function(){
    overlayToggle(false);
  })
}
var nextSceneButtonIsHovered = false;
var previousSceneButtonIsHovered = false;

var generateWave2 = function(count, name, func){
    var newCount = count + 1;
    if (eval(name + "ButtonIsHovered")) {
      if (newCount < 6){
        if (newCount%2){
          document.querySelector('#' + name +'Waves').emit(name + 'ButtonisInFocus');
        } else {
          document.querySelector('#' + name + 'Waves').emit('lostFocus');
        }
        setTimeout(function(){
          generateWave2(newCount, name, func);  
        }, 300)      
      } else {
        document.querySelector('#' + name + 'Waves').emit('lostFocus');
        window[name + "ButtonIsHovered"] = false;
        func();
      }
    }
}

// Hovers to Indicate Functionality to Users
document.querySelector('#nextSceneButton').addEventListener('mouseenter', function(){
  var button = this;
  nextSceneButtonIsHovered = true;
  // button.setAttribute("visible", "false");
  // button.setAttribute("src","public/images/arrow-hover.png")
  // setTimeout(function(){
  //   button.setAttribute("visible", "true");
  // });
  generateWave2(0, "nextScene", initiateNextScene);
});
document.querySelector('#nextSceneButton').addEventListener('mouseleave', function(){
  var button = this;
  nextSceneButtonIsHovered = false;
  // button.setAttribute("visible", "false");
  // button.setAttribute("src","public/images/arrow.png")
  // setTimeout(function(){
  //   button.setAttribute("visible", "true");
  // })
});


document.querySelector('#previousSceneButton').addEventListener('mouseenter', function(){
  var button = this;
  previousSceneButtonIsHovered = true;
  // button.setAttribute("visible", "false");
  // button.setAttribute("src","public/images/arrow-hover.png")
  // setTimeout(function(){
  //   button.setAttribute("visible", "true");
  // });
  generateWave2(0, "previousScene", initiatePreviousScene);
});
document.querySelector('#previousSceneButton').addEventListener('mouseleave', function(){
  var button = this;
  previousSceneButtonIsHovered = false;
  // button.setAttribute("visible", "false");
  // button.setAttribute("src","public/images/arrow.png")
  // setTimeout(function(){
  //   button.setAttribute("visible", "true");
  // })
});



// Clicks for Scene Change
// document.querySelector('#nextSceneButton').addEventListener('click', function(){
//   initiateNextScene();
// });
// document.querySelector('#previousSceneButton').addEventListener('click', function(){
//   initiatePreviousScene();
// });
// Scene List - Corresponds to class names on a-entities for easy mass emitting
var sceneList = ["cubes","tilDeath"]

// Variables
var currentScene = 0;

// Scene Emitting Function
var emitAcrossEntities = function(){
  var entities = document.querySelectorAll(".scene-" + arguments[0]);
  for (var e = 1; e < arguments.length; e++){
    for (var i = 0; i < entities.length; i++){
      entities[i].emit(arguments[e]);
    }
  }
}

// Scene Changing Button Functions
var initiateNextScene = function(){
  var potentialSceneNum = currentScene + 1;
  if (sceneList[potentialSceneNum] == undefined){
    emitAcrossEntities(sceneList[currentScene],'hideScene','removeScene');
    currentScene = 0;
    console.log('Going to Next Scene:', sceneList[currentScene])
    sceneAdjustments(sceneList[currentScene]);
    emitAcrossEntities(sceneList[currentScene], 'loadScene', 'revealScene');
  } else {
    emitAcrossEntities(sceneList[currentScene],'hideScene','removeScene');
    currentScene += 1;
    console.log('Going to Next Scene:', sceneList[currentScene])
    sceneAdjustments(sceneList[currentScene]);
    emitAcrossEntities(sceneList[currentScene], 'loadScene', 'revealScene');
  }
}
var initiatePreviousScene = function(){
  var potentialSceneNum = currentScene - 1;
  if (sceneList[potentialSceneNum] == undefined){
    emitAcrossEntities(sceneList[currentScene],'hideScene','removeScene');
    currentScene = (sceneList.length-1);
    console.log('Going to Previous Scene:', sceneList[currentScene])
    sceneAdjustments(sceneList[currentScene]);
    emitAcrossEntities(sceneList[currentScene], 'loadScene', 'revealScene');
  } else {
    emitAcrossEntities(sceneList[currentScene],'hideScene','removeScene');
    currentScene -= 1;
    console.log('Going to Previous Scene:', sceneList[currentScene])
    sceneAdjustments(sceneList[currentScene]);
    emitAcrossEntities(sceneList[currentScene], 'loadScene', 'revealScene');
  }
}

// A-Scene Setup
var sceneAdjustments = function(sceneName){
  var entity = document.querySelector('#a-frame-scene-container');
  if (sceneName == "cubes") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 21; near: 8")
  }
  if (sceneName == "tilDeath") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 6001; near: 6000;");
  }
}

// Initialize Scene
sceneAdjustments("cubes")

// Set in motion automatic transitions
var sceneSlideShowingLoop = function(){
  setTimeout(function(){
    initiateNextScene();
    sceneSlideShowingLoop();
  }, 12000)
}
sceneSlideShowingLoop();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25sb2FkLWxpbmtzLmpzIiwiZm9vdGVyLmpzIiwib3ZlcmxheS1idXR0b24uanMiLCJvdmVybGF5LmpzIiwic2NlbmUtY2hhbmdlLWJ1dHRvbnMuanMiLCJzY2VuZS1zd2l0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gR2V0IERvd25sb2FkIEJ1dHRvbnMgdmlhIENsYXNzXG52YXIgZG93bmxvYWRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRvd25sb2FkLWxpbmsnKTtcblxuLy8gRnVuY3Rpb24gaGFuZGxpbmcgcm90YXRpb25zIG9mIGJ1dHRvbiBiZWluZyBob3ZlcmVkXG52YXIgYW5pbWF0ZVRvTGluayA9IGZ1bmN0aW9uKGJ1dHRvbil7XG4gIGNvbnNvbGUubG9nKGJ1dHRvbilcbn1cblxuXG4vLyBGb3IgYWxsIHRoZSBEb3dubG9hZC1mb3J3YXJkaW5nIGJ1dHRvbnMuLi4uXG5mb3IgKHZhciBpID0gMDsgaSA8IGRvd25sb2FkQnV0dG9ucy5sZW5ndGg7IGkrKyl7XG5cbiAgLy8gU2V0IGRlZmF1bHQgZGF0YSB2YWx1ZXNcbiAgJChkb3dubG9hZEJ1dHRvbnNbaV0pLmF0dHIoXCJkYXRhLWxpbmstaG92ZXJlZFwiLCBmYWxzZSk7XG5cbiAgLy8gQWRkIGEgTW91c2UgRW50ZXIgQ29uZGl0aW9uLCB0cmFja2luZyBob3ZlciBhbmQgaW5pdGlhdGluZyByb3RhdGlvbnNcbiAgZG93bmxvYWRCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKCQodGhpcykuYXR0cihcImRhdGEtbGlua1wiKSk7XG4gICAgLy8gdGhpcyBpcyBob3ZlcmVkXG4gICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1saW5rLWhvdmVyZWRcIiwgdHJ1ZSk7XG4gICAgLy8gaW5pdGlhdGUgcm9hdGlvbnMgZnVuY3Rpb25cbiAgICBhbmltYXRlVG9MaW5rKHRoaXMpO1xuICB9KTtcblxuICAvLyBBbmQgYSBNb3VzZSBMZWF2ZSBDb25kaXRpb24gdG8gcmVzZXQgaG92ZXIgYW5kIHJvdGF0aW9uc1xuICBkb3dubG9hZEJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1saW5rLWhvdmVyZWRcIiwgZmFsc2UpO1xuICAgIGNvbnNvbGUubG9nKCQodGhpcykuYXR0cihcImRhdGEtbGluay1ob3ZlcmVkXCIpKTtcblxuICB9KTtcblxufSIsIiQoJyNoYW1idXJnZXInKS5jbGljayggZnVuY3Rpb24oKSB7XG4gIC8vICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FuaW1hdGUnKTtcbiAgLy8gaWYoJCh0aGlzKS5oYXNDbGFzcyhcImFuaW1hdGVcIikpe1xuICAgIG92ZXJsYXlUb2dnbGUodHJ1ZSk7XG4gIC8vIH0gZWxzZSB7XG4gICAgLy8gb3ZlcmxheVRvZ2dsZShmYWxzZSk7XG4gIC8vIH1cbn0pIiwidmFyIG92ZXJsYXlCdXR0b25pc0hvdmVyZWQgPSBmYWxzZTtcblxudmFyIGdlbmVyYXRlV2F2ZSA9IGZ1bmN0aW9uKGNvdW50KXtcbiAgICB2YXIgbmV3Q291bnQgPSBjb3VudCArIDE7XG4gICAgaWYgKG92ZXJsYXlCdXR0b25pc0hvdmVyZWQpIHtcbiAgICAgIGlmIChuZXdDb3VudCA8IDYpe1xuICAgICAgICBpZiAobmV3Q291bnQlMil7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ292ZXJMYXlCdXR0b25pc0luRm9jdXMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheVRvZ2dsZVdhdmVzJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIGdlbmVyYXRlV2F2ZShuZXdDb3VudCk7ICBcbiAgICAgICAgfSwgNjAwKSAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICBvdmVybGF5VG9nZ2xlKHRydWUpO1xuICAgICAgfVxuICAgIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5lbWl0KCdvdmVyTGF5QnV0dG9uaXNJbkZvY3VzJyk7XG4gIG92ZXJsYXlCdXR0b25pc0hvdmVyZWQgPSB0cnVlO1xuICBnZW5lcmF0ZVdhdmUoMCk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICBvdmVybGF5QnV0dG9uaXNIb3ZlcmVkID0gZmFsc2U7XG59KTsiLCIvLyBTZXQgU2VjdGlvbiBIZWlnaHRcbiQoJy5vdmVybGF5LWNvbnRlbnQnKS5oZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcblxuLy8gTWVudSBWYXJpYWJsZXNcbnZhciBvdmVybGF5U2hvd2luZyA9IGZhbHNlO1xudmFyIGRvd25TY3JvbGwgPSAwO1xudmFyIHVwU2Nyb2xsID0gMDtcblxuLy8gTWVudSBPcGVuaW5nL0Nsb3NpbmcgRnVuY3Rpb25cbnZhciBvdmVybGF5U2hvdyA9IGZ1bmN0aW9uKCl7XG4gIG92ZXJsYXlTaG93aW5nID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coJ1JldmVhbGluZyBTZWN0aW9uJyk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5zaG93KCk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5mYWRlVG8oXCIxNTBcIiwgMSwgZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZygnQW5pbWF0aW9uIENvbXBsZXRlJyk7XG4gIH0pO1xufVxuXG52YXIgb3ZlcmxheUhpZGUgPSBmdW5jdGlvbigpe1xuICBvdmVybGF5U2hvd2luZyA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnSGlkaW5nIFNlY3Rpb24nKTtcbiAgJCgnLm92ZXJsYXktY29udGVudCcpLmZhZGVUbyhcIjE1MFwiLCAwLCBmdW5jdGlvbigpe1xuICAgICQoJy5vdmVybGF5LWNvbnRlbnQnKS5oaWRlKCk7XG4gICAgY29uc29sZS5sb2coJ0FuaW1hdGlvbiBDb21wbGV0ZScpO1xuICB9KTtcbn1cblxudmFyIG92ZXJsYXlUb2dnbGUgID0gZnVuY3Rpb24obmV3U3RhdGUpe1xuICBpZiAoIW92ZXJsYXlTaG93aW5nICYmIG5ld1N0YXRlKSB7XG4gICAgb3ZlcmxheVNob3coKTtcbiAgfSBcbiAgaWYgKG92ZXJsYXlTaG93aW5nICYmICFuZXdTdGF0ZSkge1xuICAgIG92ZXJsYXlIaWRlKCk7XG4gIH1cbn1cblxudmFyIGNsb3NlT3ZlcmxheUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNsb3NlLW92ZXJsYXlcIik7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgY2xvc2VPdmVybGF5QnV0dG9ucy5sZW5ndGg7IGkrKyl7XG4gIGNsb3NlT3ZlcmxheUJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIG92ZXJsYXlUb2dnbGUoZmFsc2UpO1xuICB9KVxufSIsInZhciBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbnZhciBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG5cbnZhciBnZW5lcmF0ZVdhdmUyID0gZnVuY3Rpb24oY291bnQsIG5hbWUsIGZ1bmMpe1xuICAgIHZhciBuZXdDb3VudCA9IGNvdW50ICsgMTtcbiAgICBpZiAoZXZhbChuYW1lICsgXCJCdXR0b25Jc0hvdmVyZWRcIikpIHtcbiAgICAgIGlmIChuZXdDb3VudCA8IDYpe1xuICAgICAgICBpZiAobmV3Q291bnQlMil7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBuYW1lICsnV2F2ZXMnKS5lbWl0KG5hbWUgKyAnQnV0dG9uaXNJbkZvY3VzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBuYW1lICsgJ1dhdmVzJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIGdlbmVyYXRlV2F2ZTIobmV3Q291bnQsIG5hbWUsIGZ1bmMpOyAgXG4gICAgICAgIH0sIDMwMCkgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgbmFtZSArICdXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICB3aW5kb3dbbmFtZSArIFwiQnV0dG9uSXNIb3ZlcmVkXCJdID0gZmFsc2U7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgIH1cbiAgICB9XG59XG5cbi8vIEhvdmVycyB0byBJbmRpY2F0ZSBGdW5jdGlvbmFsaXR5IHRvIFVzZXJzXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSB0cnVlO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcImZhbHNlXCIpO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwic3JjXCIsXCJwdWJsaWMvaW1hZ2VzL2Fycm93LWhvdmVyLnBuZ1wiKVxuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIC8vICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJ0cnVlXCIpO1xuICAvLyB9KTtcbiAgZ2VuZXJhdGVXYXZlMigwLCBcIm5leHRTY2VuZVwiLCBpbml0aWF0ZU5leHRTY2VuZSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0U2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gIG5leHRTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IGZhbHNlO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcImZhbHNlXCIpO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwic3JjXCIsXCJwdWJsaWMvaW1hZ2VzL2Fycm93LnBuZ1wiKVxuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIC8vICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJ0cnVlXCIpO1xuICAvLyB9KVxufSk7XG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZpb3VzU2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gIHByZXZpb3VzU2NlbmVCdXR0b25Jc0hvdmVyZWQgPSB0cnVlO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcImZhbHNlXCIpO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwic3JjXCIsXCJwdWJsaWMvaW1hZ2VzL2Fycm93LWhvdmVyLnBuZ1wiKVxuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIC8vICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJ0cnVlXCIpO1xuICAvLyB9KTtcbiAgZ2VuZXJhdGVXYXZlMigwLCBcInByZXZpb3VzU2NlbmVcIiwgaW5pdGlhdGVQcmV2aW91c1NjZW5lKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZpb3VzU2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gIHByZXZpb3VzU2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbiAgLy8gYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgLy8gYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy5wbmdcIilcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAvLyAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgLy8gfSlcbn0pO1xuXG5cblxuLy8gQ2xpY2tzIGZvciBTY2VuZSBDaGFuZ2Vcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0U2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4vLyAgIGluaXRpYXRlTmV4dFNjZW5lKCk7XG4vLyB9KTtcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuLy8gICBpbml0aWF0ZVByZXZpb3VzU2NlbmUoKTtcbi8vIH0pOyIsIi8vIFNjZW5lIExpc3QgLSBDb3JyZXNwb25kcyB0byBjbGFzcyBuYW1lcyBvbiBhLWVudGl0aWVzIGZvciBlYXN5IG1hc3MgZW1pdHRpbmdcbnZhciBzY2VuZUxpc3QgPSBbXCJjdWJlc1wiLFwidGlsRGVhdGhcIl1cblxuLy8gVmFyaWFibGVzXG52YXIgY3VycmVudFNjZW5lID0gMDtcblxuLy8gU2NlbmUgRW1pdHRpbmcgRnVuY3Rpb25cbnZhciBlbWl0QWNyb3NzRW50aXRpZXMgPSBmdW5jdGlvbigpe1xuICB2YXIgZW50aXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNjZW5lLVwiICsgYXJndW1lbnRzWzBdKTtcbiAgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspe1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyBpKyspe1xuICAgICAgZW50aXRpZXNbaV0uZW1pdChhcmd1bWVudHNbZV0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTY2VuZSBDaGFuZ2luZyBCdXR0b24gRnVuY3Rpb25zXG52YXIgaW5pdGlhdGVOZXh0U2NlbmUgPSBmdW5jdGlvbigpe1xuICB2YXIgcG90ZW50aWFsU2NlbmVOdW0gPSBjdXJyZW50U2NlbmUgKyAxO1xuICBpZiAoc2NlbmVMaXN0W3BvdGVudGlhbFNjZW5lTnVtXSA9PSB1bmRlZmluZWQpe1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgPSAwO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBOZXh0IFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9IGVsc2Uge1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgKz0gMTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gTmV4dCBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfVxufVxudmFyIGluaXRpYXRlUHJldmlvdXNTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBwb3RlbnRpYWxTY2VuZU51bSA9IGN1cnJlbnRTY2VuZSAtIDE7XG4gIGlmIChzY2VuZUxpc3RbcG90ZW50aWFsU2NlbmVOdW1dID09IHVuZGVmaW5lZCl7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSA9IChzY2VuZUxpc3QubGVuZ3RoLTEpO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBQcmV2aW91cyBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lIC09IDE7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIFByZXZpb3VzIFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9XG59XG5cbi8vIEEtU2NlbmUgU2V0dXBcbnZhciBzY2VuZUFkanVzdG1lbnRzID0gZnVuY3Rpb24oc2NlbmVOYW1lKXtcbiAgdmFyIGVudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhLWZyYW1lLXNjZW5lLWNvbnRhaW5lcicpO1xuICBpZiAoc2NlbmVOYW1lID09IFwiY3ViZXNcIikge1xuICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoXCJmb2dcIiwgXCJ0eXBlOiBsaW5lYXI7IGNvbG9yOiAjMjQwQjU3OyBmYXI6IDIxOyBuZWFyOiA4XCIpXG4gIH1cbiAgaWYgKHNjZW5lTmFtZSA9PSBcInRpbERlYXRoXCIpIHtcbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKFwiZm9nXCIsIFwidHlwZTogbGluZWFyOyBjb2xvcjogIzI0MEI1NzsgZmFyOiA2MDAxOyBuZWFyOiA2MDAwO1wiKTtcbiAgfVxufVxuXG4vLyBJbml0aWFsaXplIFNjZW5lXG5zY2VuZUFkanVzdG1lbnRzKFwiY3ViZXNcIilcblxuLy8gU2V0IGluIG1vdGlvbiBhdXRvbWF0aWMgdHJhbnNpdGlvbnNcbnZhciBzY2VuZVNsaWRlU2hvd2luZ0xvb3AgPSBmdW5jdGlvbigpe1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgaW5pdGlhdGVOZXh0U2NlbmUoKTtcbiAgICBzY2VuZVNsaWRlU2hvd2luZ0xvb3AoKTtcbiAgfSwgMTIwMDApXG59XG5zY2VuZVNsaWRlU2hvd2luZ0xvb3AoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
