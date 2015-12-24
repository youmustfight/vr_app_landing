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
  button.setAttribute("visible", "false");
  button.setAttribute("src","public/images/arrow-hover.png")
  setTimeout(function(){
    button.setAttribute("visible", "true");
  });
  generateWave2(0, "nextScene", initiateNextScene);
});
document.querySelector('#nextSceneButton').addEventListener('mouseleave', function(){
  var button = this;
  nextSceneButtonIsHovered = false;
  button.setAttribute("visible", "false");
  button.setAttribute("src","public/images/arrow.png")
  setTimeout(function(){
    button.setAttribute("visible", "true");
  })
});


document.querySelector('#previousSceneButton').addEventListener('mouseenter', function(){
  var button = this;
  previousSceneButtonIsHovered = true;
  button.setAttribute("visible", "false");
  button.setAttribute("src","public/images/arrow-hover.png")
  setTimeout(function(){
    button.setAttribute("visible", "true");
  });
  generateWave2(0, "previousScene", initiatePreviousScene);
});
document.querySelector('#previousSceneButton').addEventListener('mouseleave', function(){
  var button = this;
  previousSceneButtonIsHovered = false;
  button.setAttribute("visible", "false");
  button.setAttribute("src","public/images/arrow.png")
  setTimeout(function(){
    button.setAttribute("visible", "true");
  })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5qcyIsIm92ZXJsYXktYnV0dG9uLmpzIiwib3ZlcmxheS5qcyIsInNjZW5lLWNoYW5nZS1idXR0b25zLmpzIiwic2NlbmUtc3dpdGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKCcjaGFtYnVyZ2VyJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAvLyAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhbmltYXRlJyk7XG4gIC8vIGlmKCQodGhpcykuaGFzQ2xhc3MoXCJhbmltYXRlXCIpKXtcbiAgICBvdmVybGF5VG9nZ2xlKHRydWUpO1xuICAvLyB9IGVsc2Uge1xuICAgIC8vIG92ZXJsYXlUb2dnbGUoZmFsc2UpO1xuICAvLyB9XG59KSIsInZhciBvdmVybGF5QnV0dG9uaXNIb3ZlcmVkID0gZmFsc2U7XG5cbnZhciBnZW5lcmF0ZVdhdmUgPSBmdW5jdGlvbihjb3VudCl7XG4gICAgdmFyIG5ld0NvdW50ID0gY291bnQgKyAxO1xuICAgIGlmIChvdmVybGF5QnV0dG9uaXNIb3ZlcmVkKSB7XG4gICAgICBpZiAobmV3Q291bnQgPCA2KXtcbiAgICAgICAgaWYgKG5ld0NvdW50JTIpe1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5VG9nZ2xlV2F2ZXMnKS5lbWl0KCdvdmVyTGF5QnV0dG9uaXNJbkZvY3VzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBnZW5lcmF0ZVdhdmUobmV3Q291bnQpOyAgXG4gICAgICAgIH0sIDYwMCkgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5VG9nZ2xlV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgICAgICAgb3ZlcmxheVRvZ2dsZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuZW1pdCgnb3ZlckxheUJ1dHRvbmlzSW5Gb2N1cycpO1xuICBvdmVybGF5QnV0dG9uaXNIb3ZlcmVkID0gdHJ1ZTtcbiAgZ2VuZXJhdGVXYXZlKDApO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5VG9nZ2xlV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgb3ZlcmxheUJ1dHRvbmlzSG92ZXJlZCA9IGZhbHNlO1xufSk7IiwiLy8gU2V0IFNlY3Rpb24gSGVpZ2h0XG4kKCcub3ZlcmxheS1jb250ZW50JykuaGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XG5cbi8vIE1lbnUgVmFyaWFibGVzXG52YXIgb3ZlcmxheVNob3dpbmcgPSBmYWxzZTtcbnZhciBkb3duU2Nyb2xsID0gMDtcbnZhciB1cFNjcm9sbCA9IDA7XG5cbi8vIE1lbnUgT3BlbmluZy9DbG9zaW5nIEZ1bmN0aW9uXG52YXIgb3ZlcmxheVNob3cgPSBmdW5jdGlvbigpe1xuICBvdmVybGF5U2hvd2luZyA9IHRydWU7XG4gIGNvbnNvbGUubG9nKCdSZXZlYWxpbmcgU2VjdGlvbicpO1xuICAkKCcub3ZlcmxheS1jb250ZW50Jykuc2hvdygpO1xuICAkKCcub3ZlcmxheS1jb250ZW50JykuZmFkZVRvKFwiMTUwXCIsIDEsIGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2coJ0FuaW1hdGlvbiBDb21wbGV0ZScpO1xuICB9KTtcbn1cblxudmFyIG92ZXJsYXlIaWRlID0gZnVuY3Rpb24oKXtcbiAgb3ZlcmxheVNob3dpbmcgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ0hpZGluZyBTZWN0aW9uJyk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5mYWRlVG8oXCIxNTBcIiwgMCwgZnVuY3Rpb24oKXtcbiAgICAkKCcub3ZlcmxheS1jb250ZW50JykuaGlkZSgpO1xuICAgIGNvbnNvbGUubG9nKCdBbmltYXRpb24gQ29tcGxldGUnKTtcbiAgfSk7XG59XG5cbnZhciBvdmVybGF5VG9nZ2xlICA9IGZ1bmN0aW9uKG5ld1N0YXRlKXtcbiAgaWYgKCFvdmVybGF5U2hvd2luZyAmJiBuZXdTdGF0ZSkge1xuICAgIG92ZXJsYXlTaG93KCk7XG4gIH0gXG4gIGlmIChvdmVybGF5U2hvd2luZyAmJiAhbmV3U3RhdGUpIHtcbiAgICBvdmVybGF5SGlkZSgpO1xuICB9XG59XG5cbnZhciBjbG9zZU92ZXJsYXlCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZS1vdmVybGF5XCIpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IGNsb3NlT3ZlcmxheUJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICBjbG9zZU92ZXJsYXlCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBvdmVybGF5VG9nZ2xlKGZhbHNlKTtcbiAgfSlcbn0iLCJ2YXIgbmV4dFNjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG52YXIgcHJldmlvdXNTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IGZhbHNlO1xuXG52YXIgZ2VuZXJhdGVXYXZlMiA9IGZ1bmN0aW9uKGNvdW50LCBuYW1lLCBmdW5jKXtcbiAgICB2YXIgbmV3Q291bnQgPSBjb3VudCArIDE7XG4gICAgaWYgKGV2YWwobmFtZSArIFwiQnV0dG9uSXNIb3ZlcmVkXCIpKSB7XG4gICAgICBpZiAobmV3Q291bnQgPCA2KXtcbiAgICAgICAgaWYgKG5ld0NvdW50JTIpe1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgbmFtZSArJ1dhdmVzJykuZW1pdChuYW1lICsgJ0J1dHRvbmlzSW5Gb2N1cycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgbmFtZSArICdXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBnZW5lcmF0ZVdhdmUyKG5ld0NvdW50LCBuYW1lLCBmdW5jKTsgIFxuICAgICAgICB9LCAzMDApICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG5hbWUgKyAnV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgICAgICAgd2luZG93W25hbWUgKyBcIkJ1dHRvbklzSG92ZXJlZFwiXSA9IGZhbHNlO1xuICAgICAgICBmdW5jKCk7XG4gICAgICB9XG4gICAgfVxufVxuXG4vLyBIb3ZlcnMgdG8gSW5kaWNhdGUgRnVuY3Rpb25hbGl0eSB0byBVc2Vyc1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgbmV4dFNjZW5lQnV0dG9uSXNIb3ZlcmVkID0gdHJ1ZTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy1ob3Zlci5wbmdcIilcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgfSk7XG4gIGdlbmVyYXRlV2F2ZTIoMCwgXCJuZXh0U2NlbmVcIiwgaW5pdGlhdGVOZXh0U2NlbmUpO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy5wbmdcIilcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgfSlcbn0pO1xuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gdHJ1ZTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy1ob3Zlci5wbmdcIilcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgfSk7XG4gIGdlbmVyYXRlV2F2ZTIoMCwgXCJwcmV2aW91c1NjZW5lXCIsIGluaXRpYXRlUHJldmlvdXNTY2VuZSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwiZmFsc2VcIik7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcInB1YmxpYy9pbWFnZXMvYXJyb3cucG5nXCIpXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcInRydWVcIik7XG4gIH0pXG59KTtcblxuXG5cbi8vIENsaWNrcyBmb3IgU2NlbmUgQ2hhbmdlXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuLy8gICBpbml0aWF0ZU5leHRTY2VuZSgpO1xuLy8gfSk7XG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldmlvdXNTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbi8vICAgaW5pdGlhdGVQcmV2aW91c1NjZW5lKCk7XG4vLyB9KTsiLCIvLyBTY2VuZSBMaXN0IC0gQ29ycmVzcG9uZHMgdG8gY2xhc3MgbmFtZXMgb24gYS1lbnRpdGllcyBmb3IgZWFzeSBtYXNzIGVtaXR0aW5nXG52YXIgc2NlbmVMaXN0ID0gW1wiY3ViZXNcIixcInRpbERlYXRoXCJdXG5cbi8vIFZhcmlhYmxlc1xudmFyIGN1cnJlbnRTY2VuZSA9IDA7XG5cbi8vIFNjZW5lIEVtaXR0aW5nIEZ1bmN0aW9uXG52YXIgZW1pdEFjcm9zc0VudGl0aWVzID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVudGl0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zY2VuZS1cIiArIGFyZ3VtZW50c1swXSk7XG4gIGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGVudGl0aWVzW2ldLmVtaXQoYXJndW1lbnRzW2VdKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gU2NlbmUgQ2hhbmdpbmcgQnV0dG9uIEZ1bmN0aW9uc1xudmFyIGluaXRpYXRlTmV4dFNjZW5lID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBvdGVudGlhbFNjZW5lTnVtID0gY3VycmVudFNjZW5lICsgMTtcbiAgaWYgKHNjZW5lTGlzdFtwb3RlbnRpYWxTY2VuZU51bV0gPT0gdW5kZWZpbmVkKXtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lID0gMDtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gTmV4dCBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lICs9IDE7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIE5leHQgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH1cbn1cbnZhciBpbml0aWF0ZVByZXZpb3VzU2NlbmUgPSBmdW5jdGlvbigpe1xuICB2YXIgcG90ZW50aWFsU2NlbmVOdW0gPSBjdXJyZW50U2NlbmUgLSAxO1xuICBpZiAoc2NlbmVMaXN0W3BvdGVudGlhbFNjZW5lTnVtXSA9PSB1bmRlZmluZWQpe1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgPSAoc2NlbmVMaXN0Lmxlbmd0aC0xKTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gUHJldmlvdXMgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH0gZWxzZSB7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSAtPSAxO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBQcmV2aW91cyBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfVxufVxuXG4vLyBBLVNjZW5lIFNldHVwXG52YXIgc2NlbmVBZGp1c3RtZW50cyA9IGZ1bmN0aW9uKHNjZW5lTmFtZSl7XG4gIHZhciBlbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYS1mcmFtZS1zY2VuZS1jb250YWluZXInKTtcbiAgaWYgKHNjZW5lTmFtZSA9PSBcImN1YmVzXCIpIHtcbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKFwiZm9nXCIsIFwidHlwZTogbGluZWFyOyBjb2xvcjogIzI0MEI1NzsgZmFyOiAyMTsgbmVhcjogOFwiKVxuICB9XG4gIGlmIChzY2VuZU5hbWUgPT0gXCJ0aWxEZWF0aFwiKSB7XG4gICAgZW50aXR5LnNldEF0dHJpYnV0ZShcImZvZ1wiLCBcInR5cGU6IGxpbmVhcjsgY29sb3I6ICMyNDBCNTc7IGZhcjogNjAwMTsgbmVhcjogNjAwMDtcIik7XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBTY2VuZVxuc2NlbmVBZGp1c3RtZW50cyhcImN1YmVzXCIpXG5cbi8vIFNldCBpbiBtb3Rpb24gYXV0b21hdGljIHRyYW5zaXRpb25zXG52YXIgc2NlbmVTbGlkZVNob3dpbmdMb29wID0gZnVuY3Rpb24oKXtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGluaXRpYXRlTmV4dFNjZW5lKCk7XG4gICAgc2NlbmVTbGlkZVNob3dpbmdMb29wKCk7XG4gIH0sIDEyMDAwKVxufVxuc2NlbmVTbGlkZVNob3dpbmdMb29wKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
