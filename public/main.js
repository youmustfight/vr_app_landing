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
document.querySelector('#nextSceneButton').addEventListener('click', function(){
  initiateNextScene();
});
document.querySelector('#previousSceneButton').addEventListener('click', function(){
  initiatePreviousScene();
});
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
  }, 8000)
}
sceneSlideShowingLoop();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm92ZXJsYXktYnV0dG9uLmpzIiwib3ZlcmxheS5qcyIsInNjZW5lLWNoYW5nZS1idXR0b25zLmpzIiwic2NlbmUtc3dpdGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG92ZXJsYXlCdXR0b25pc0hvdmVyZWQgPSBmYWxzZTtcblxudmFyIGdlbmVyYXRlV2F2ZSA9IGZ1bmN0aW9uKGNvdW50KXtcbiAgICB2YXIgbmV3Q291bnQgPSBjb3VudCArIDE7XG4gICAgaWYgKG92ZXJsYXlCdXR0b25pc0hvdmVyZWQpIHtcbiAgICAgIGlmIChuZXdDb3VudCA8IDYpe1xuICAgICAgICBpZiAobmV3Q291bnQlMil7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ292ZXJMYXlCdXR0b25pc0luRm9jdXMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheVRvZ2dsZVdhdmVzJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIGdlbmVyYXRlV2F2ZShuZXdDb3VudCk7ICBcbiAgICAgICAgfSwgNjAwKSAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICBvdmVybGF5VG9nZ2xlKHRydWUpO1xuICAgICAgfVxuICAgIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5lbWl0KCdvdmVyTGF5QnV0dG9uaXNJbkZvY3VzJyk7XG4gIG92ZXJsYXlCdXR0b25pc0hvdmVyZWQgPSB0cnVlO1xuICBnZW5lcmF0ZVdhdmUoMCk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXlUb2dnbGVCdXR0b24nKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICBvdmVybGF5QnV0dG9uaXNIb3ZlcmVkID0gZmFsc2U7XG59KTsiLCIvLyBTZXQgU2VjdGlvbiBIZWlnaHRcbiQoJy5vdmVybGF5LWNvbnRlbnQnKS5oZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcblxuLy8gTWVudSBWYXJpYWJsZXNcbnZhciBvdmVybGF5U2hvd2luZyA9IGZhbHNlO1xudmFyIGRvd25TY3JvbGwgPSAwO1xudmFyIHVwU2Nyb2xsID0gMDtcblxuLy8gTWVudSBPcGVuaW5nL0Nsb3NpbmcgRnVuY3Rpb25cbnZhciBvdmVybGF5U2hvdyA9IGZ1bmN0aW9uKCl7XG4gIG92ZXJsYXlTaG93aW5nID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coJ1JldmVhbGluZyBTZWN0aW9uJyk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5zaG93KCk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5mYWRlVG8oXCIxNTBcIiwgMSwgZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZygnQW5pbWF0aW9uIENvbXBsZXRlJyk7XG4gIH0pO1xufVxuXG52YXIgb3ZlcmxheUhpZGUgPSBmdW5jdGlvbigpe1xuICBvdmVybGF5U2hvd2luZyA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnSGlkaW5nIFNlY3Rpb24nKTtcbiAgJCgnLm92ZXJsYXktY29udGVudCcpLmZhZGVUbyhcIjE1MFwiLCAwLCBmdW5jdGlvbigpe1xuICAgICQoJy5vdmVybGF5LWNvbnRlbnQnKS5oaWRlKCk7XG4gICAgY29uc29sZS5sb2coJ0FuaW1hdGlvbiBDb21wbGV0ZScpO1xuICB9KTtcbn1cblxudmFyIG92ZXJsYXlUb2dnbGUgID0gZnVuY3Rpb24obmV3U3RhdGUpe1xuICBpZiAoIW92ZXJsYXlTaG93aW5nICYmIG5ld1N0YXRlKSB7XG4gICAgb3ZlcmxheVNob3coKTtcbiAgfSBcbiAgaWYgKG92ZXJsYXlTaG93aW5nICYmICFuZXdTdGF0ZSkge1xuICAgIG92ZXJsYXlIaWRlKCk7XG4gIH1cbn0iLCJ2YXIgbmV4dFNjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG52YXIgcHJldmlvdXNTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IGZhbHNlO1xuXG52YXIgZ2VuZXJhdGVXYXZlMiA9IGZ1bmN0aW9uKGNvdW50LCBuYW1lLCBmdW5jKXtcbiAgICB2YXIgbmV3Q291bnQgPSBjb3VudCArIDE7XG4gICAgaWYgKGV2YWwobmFtZSArIFwiQnV0dG9uSXNIb3ZlcmVkXCIpKSB7XG4gICAgICBpZiAobmV3Q291bnQgPCA2KXtcbiAgICAgICAgaWYgKG5ld0NvdW50JTIpe1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgbmFtZSArJ1dhdmVzJykuZW1pdChuYW1lICsgJ0J1dHRvbmlzSW5Gb2N1cycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgbmFtZSArICdXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBnZW5lcmF0ZVdhdmUyKG5ld0NvdW50LCBuYW1lLCBmdW5jKTsgIFxuICAgICAgICB9LCAzMDApICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG5hbWUgKyAnV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgICAgICAgd2luZG93W25hbWUgKyBcIkJ1dHRvbklzSG92ZXJlZFwiXSA9IGZhbHNlO1xuICAgICAgICBmdW5jKCk7XG4gICAgICB9XG4gICAgfVxufVxuXG4vLyBIb3ZlcnMgdG8gSW5kaWNhdGUgRnVuY3Rpb25hbGl0eSB0byBVc2Vyc1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgbmV4dFNjZW5lQnV0dG9uSXNIb3ZlcmVkID0gdHJ1ZTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy1ob3Zlci5wbmdcIilcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgfSk7XG4gIGdlbmVyYXRlV2F2ZTIoMCwgXCJuZXh0U2NlbmVcIiwgaW5pdGlhdGVOZXh0U2NlbmUpO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy5wbmdcIilcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgfSlcbn0pO1xuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gdHJ1ZTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJmYWxzZVwiKTtcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLFwicHVibGljL2ltYWdlcy9hcnJvdy1ob3Zlci5wbmdcIilcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwidHJ1ZVwiKTtcbiAgfSk7XG4gIGdlbmVyYXRlV2F2ZTIoMCwgXCJwcmV2aW91c1NjZW5lXCIsIGluaXRpYXRlUHJldmlvdXNTY2VuZSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwiZmFsc2VcIik7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcInB1YmxpYy9pbWFnZXMvYXJyb3cucG5nXCIpXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcInRydWVcIik7XG4gIH0pXG59KTtcblxuXG5cbi8vIENsaWNrcyBmb3IgU2NlbmUgQ2hhbmdlXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICBpbml0aWF0ZU5leHRTY2VuZSgpO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldmlvdXNTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgaW5pdGlhdGVQcmV2aW91c1NjZW5lKCk7XG59KTsiLCIvLyBTY2VuZSBMaXN0IC0gQ29ycmVzcG9uZHMgdG8gY2xhc3MgbmFtZXMgb24gYS1lbnRpdGllcyBmb3IgZWFzeSBtYXNzIGVtaXR0aW5nXG52YXIgc2NlbmVMaXN0ID0gW1wiY3ViZXNcIixcInRpbERlYXRoXCJdXG5cbi8vIFZhcmlhYmxlc1xudmFyIGN1cnJlbnRTY2VuZSA9IDA7XG5cbi8vIFNjZW5lIEVtaXR0aW5nIEZ1bmN0aW9uXG52YXIgZW1pdEFjcm9zc0VudGl0aWVzID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVudGl0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zY2VuZS1cIiArIGFyZ3VtZW50c1swXSk7XG4gIGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGVudGl0aWVzW2ldLmVtaXQoYXJndW1lbnRzW2VdKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gU2NlbmUgQ2hhbmdpbmcgQnV0dG9uIEZ1bmN0aW9uc1xudmFyIGluaXRpYXRlTmV4dFNjZW5lID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBvdGVudGlhbFNjZW5lTnVtID0gY3VycmVudFNjZW5lICsgMTtcbiAgaWYgKHNjZW5lTGlzdFtwb3RlbnRpYWxTY2VuZU51bV0gPT0gdW5kZWZpbmVkKXtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lID0gMDtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gTmV4dCBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lICs9IDE7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIE5leHQgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH1cbn1cbnZhciBpbml0aWF0ZVByZXZpb3VzU2NlbmUgPSBmdW5jdGlvbigpe1xuICB2YXIgcG90ZW50aWFsU2NlbmVOdW0gPSBjdXJyZW50U2NlbmUgLSAxO1xuICBpZiAoc2NlbmVMaXN0W3BvdGVudGlhbFNjZW5lTnVtXSA9PSB1bmRlZmluZWQpe1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgPSAoc2NlbmVMaXN0Lmxlbmd0aC0xKTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gUHJldmlvdXMgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH0gZWxzZSB7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSAtPSAxO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBQcmV2aW91cyBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfVxufVxuXG4vLyBBLVNjZW5lIFNldHVwXG52YXIgc2NlbmVBZGp1c3RtZW50cyA9IGZ1bmN0aW9uKHNjZW5lTmFtZSl7XG4gIHZhciBlbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYS1mcmFtZS1zY2VuZS1jb250YWluZXInKTtcbiAgaWYgKHNjZW5lTmFtZSA9PSBcImN1YmVzXCIpIHtcbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKFwiZm9nXCIsIFwidHlwZTogbGluZWFyOyBjb2xvcjogIzI0MEI1NzsgZmFyOiAyMTsgbmVhcjogOFwiKVxuICB9XG4gIGlmIChzY2VuZU5hbWUgPT0gXCJ0aWxEZWF0aFwiKSB7XG4gICAgZW50aXR5LnNldEF0dHJpYnV0ZShcImZvZ1wiLCBcInR5cGU6IGxpbmVhcjsgY29sb3I6ICMyNDBCNTc7IGZhcjogNjAwMTsgbmVhcjogNjAwMDtcIik7XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBTY2VuZVxuc2NlbmVBZGp1c3RtZW50cyhcImN1YmVzXCIpXG5cbi8vIFNldCBpbiBtb3Rpb24gYXV0b21hdGljIHRyYW5zaXRpb25zXG52YXIgc2NlbmVTbGlkZVNob3dpbmdMb29wID0gZnVuY3Rpb24oKXtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGluaXRpYXRlTmV4dFNjZW5lKCk7XG4gICAgc2NlbmVTbGlkZVNob3dpbmdMb29wKCk7XG4gIH0sIDgwMDApXG59XG5zY2VuZVNsaWRlU2hvd2luZ0xvb3AoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
