var assets  = $('a-assets');

// Allow for priority of tutorial graphic and brand logo by delaying assets
setTimeout(function(){
  assets.prepend('<img id="assets-logo" src="public/images/logo.png">');
  assets.prepend('<img id="assets-tagline" src="public/images/tagline.png">');
  assets.prepend('<img id="assets-tagline2" src="public/images/tagline2.png">');
  assets.prepend('<img id="assets-cardboard" src="public/images/cardboard.png">');
  assets.prepend('<img id="assets-oculus" src="public/images/oculus.png">');
  assets.prepend('<img id="assets-google-play" src="public/images/google-play.png">');
  assets.prepend('<img id="assets-arrow-hover" src="public/images/arrow-hover.png">');
  assets.prepend('<img id="assets-tildeath-title" src="public/images/tildeath-title.png">');
  assets.prepend('<img id="assets-tildeath-logo" src="public/images/tildeath-logo.png">');
});

// Spread out big image loads to smooth initial load

setTimeout(function(){
  assets.prepend('<img id="tilDeath-sphere" src="public/images/tildeath-sphere.jpg">');
  // Update Scene Skybox Entity
  $('#tilDeath-sphere').on('load', function(){
    $('a-entity.scene-tilDeath').attr("material","src: #tilDeath-sphere");
  });

}, 800);
// Menu Variables
var overlayShowing = false;
var downScroll = 0;
var upScroll = 0;

// Menu Opening/Closing Function
var overlayShow = function(){
  overlayShowing = true;
  console.log('Revealing Section');
  $('.overlay-content').css("opacity","1");
  setTimeout(function(){
    $('.overlay-content').show();
  }, 250);
}

var overlayHide = function(){
  overlayShowing = false;
  console.log('Hiding Section');
  $('.overlay-content').css("opacity","0");
  setTimeout(function(){
    $('.overlay-content').hide();
  }, 250);
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
  generateWave2(0, "nextScene", initiateNextScene);
});
document.querySelector('#nextSceneButton').addEventListener('mouseleave', function(){
  var button = this;
  nextSceneButtonIsHovered = false;
});


document.querySelector('#previousSceneButton').addEventListener('mouseenter', function(){
  var button = this;
  previousSceneButtonIsHovered = true;
  generateWave2(0, "previousScene", initiatePreviousScene);
});
document.querySelector('#previousSceneButton').addEventListener('mouseleave', function(){
  var button = this;
  previousSceneButtonIsHovered = false;
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
  sceneTimer = 0;
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
  sceneTimer = 0;
}

// A-Scene Setup
var sceneAdjustments = function(sceneName){
  var entity = document.querySelector('#a-frame-scene-container');
  var header = $('.header');
  if (sceneName == "cubes") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 21; near: 8")
    header.css("background-color", "rgba(106, 23, 255, 0.15)");
  }
  if (sceneName == "tilDeath") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 6001; near: 6000;");
    header.css("background-color", "rgba(46, 216, 96, 0.15)");
  }
}

// Initialize Scene
sceneAdjustments("cubes");

// Set in motion automatic transitions
var sceneTimer  = -3;
var sceneSlideShowingLoop = function() {
  if (sceneTimer == 11){
    sceneTimer = 0;
    initiateNextScene();
  }
}
setInterval(function(){
  sceneTimer++;
  // console.log('Timer: ', sceneTimer);
  sceneSlideShowingLoop();
}, 1000)
// $(document).ready(function() {
  var tutorialOverlay = $('.tutorial-overlay');
  setTimeout(function(){
    tutorialOverlay.fadeTo(400,"0",function(){
      tutorialOverlay.hide();
      console.log('ready to go!');
    })
  }, 3000);
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWxvYWRpbmcuanMiLCJvdmVybGF5LmpzIiwic2NlbmUtY2hhbmdlLWJ1dHRvbnMuanMiLCJzY2VuZS1zd2l0Y2guanMiLCJ0dXRvcmlhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhc3NldHMgID0gJCgnYS1hc3NldHMnKTtcblxuLy8gQWxsb3cgZm9yIHByaW9yaXR5IG9mIHR1dG9yaWFsIGdyYXBoaWMgYW5kIGJyYW5kIGxvZ28gYnkgZGVsYXlpbmcgYXNzZXRzXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLWxvZ29cIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL2xvZ28ucG5nXCI+Jyk7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLXRhZ2xpbmVcIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL3RhZ2xpbmUucG5nXCI+Jyk7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLXRhZ2xpbmUyXCIgc3JjPVwicHVibGljL2ltYWdlcy90YWdsaW5lMi5wbmdcIj4nKTtcbiAgYXNzZXRzLnByZXBlbmQoJzxpbWcgaWQ9XCJhc3NldHMtY2FyZGJvYXJkXCIgc3JjPVwicHVibGljL2ltYWdlcy9jYXJkYm9hcmQucG5nXCI+Jyk7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLW9jdWx1c1wiIHNyYz1cInB1YmxpYy9pbWFnZXMvb2N1bHVzLnBuZ1wiPicpO1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy1nb29nbGUtcGxheVwiIHNyYz1cInB1YmxpYy9pbWFnZXMvZ29vZ2xlLXBsYXkucG5nXCI+Jyk7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLWFycm93LWhvdmVyXCIgc3JjPVwicHVibGljL2ltYWdlcy9hcnJvdy1ob3Zlci5wbmdcIj4nKTtcbiAgYXNzZXRzLnByZXBlbmQoJzxpbWcgaWQ9XCJhc3NldHMtdGlsZGVhdGgtdGl0bGVcIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL3RpbGRlYXRoLXRpdGxlLnBuZ1wiPicpO1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy10aWxkZWF0aC1sb2dvXCIgc3JjPVwicHVibGljL2ltYWdlcy90aWxkZWF0aC1sb2dvLnBuZ1wiPicpO1xufSk7XG5cbi8vIFNwcmVhZCBvdXQgYmlnIGltYWdlIGxvYWRzIHRvIHNtb290aCBpbml0aWFsIGxvYWRcblxuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cInRpbERlYXRoLXNwaGVyZVwiIHNyYz1cInB1YmxpYy9pbWFnZXMvdGlsZGVhdGgtc3BoZXJlLmpwZ1wiPicpO1xuICAvLyBVcGRhdGUgU2NlbmUgU2t5Ym94IEVudGl0eVxuICAkKCcjdGlsRGVhdGgtc3BoZXJlJykub24oJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgICQoJ2EtZW50aXR5LnNjZW5lLXRpbERlYXRoJykuYXR0cihcIm1hdGVyaWFsXCIsXCJzcmM6ICN0aWxEZWF0aC1zcGhlcmVcIik7XG4gIH0pO1xuXG59LCA4MDApOyIsIi8vIE1lbnUgVmFyaWFibGVzXG52YXIgb3ZlcmxheVNob3dpbmcgPSBmYWxzZTtcbnZhciBkb3duU2Nyb2xsID0gMDtcbnZhciB1cFNjcm9sbCA9IDA7XG5cbi8vIE1lbnUgT3BlbmluZy9DbG9zaW5nIEZ1bmN0aW9uXG52YXIgb3ZlcmxheVNob3cgPSBmdW5jdGlvbigpe1xuICBvdmVybGF5U2hvd2luZyA9IHRydWU7XG4gIGNvbnNvbGUubG9nKCdSZXZlYWxpbmcgU2VjdGlvbicpO1xuICAkKCcub3ZlcmxheS1jb250ZW50JykuY3NzKFwib3BhY2l0eVwiLFwiMVwiKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICQoJy5vdmVybGF5LWNvbnRlbnQnKS5zaG93KCk7XG4gIH0sIDI1MCk7XG59XG5cbnZhciBvdmVybGF5SGlkZSA9IGZ1bmN0aW9uKCl7XG4gIG92ZXJsYXlTaG93aW5nID0gZmFsc2U7XG4gIGNvbnNvbGUubG9nKCdIaWRpbmcgU2VjdGlvbicpO1xuICAkKCcub3ZlcmxheS1jb250ZW50JykuY3NzKFwib3BhY2l0eVwiLFwiMFwiKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICQoJy5vdmVybGF5LWNvbnRlbnQnKS5oaWRlKCk7XG4gIH0sIDI1MCk7XG59XG5cbnZhciBvdmVybGF5VG9nZ2xlICA9IGZ1bmN0aW9uKG5ld1N0YXRlKXtcbiAgY29uc29sZS5sb2coXCJUb2dnbGluZyBPdmVybGF5XCIpO1xuICBpZiAoIW92ZXJsYXlTaG93aW5nICYmIG5ld1N0YXRlKSB7XG4gICAgb3ZlcmxheVNob3coKTtcbiAgICAkKCcuZG93bmxvYWQtdGhlLWFwcCcpLmZhZGVUbyhcIjUwXCIsIDApO1xuICB9IFxuICBpZiAob3ZlcmxheVNob3dpbmcgJiYgIW5ld1N0YXRlKSB7XG4gICAgb3ZlcmxheUhpZGUoKTtcbiAgICAkKCcuZG93bmxvYWQtdGhlLWFwcCcpLmZhZGVUbyhcIjUwXCIsIDEpO1xuICB9XG59XG5cbnZhciBjbG9zZU92ZXJsYXlCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2dnbGUtb3ZlcmxheVwiKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9zZU92ZXJsYXlCdXR0b25zLmxlbmd0aDsgaSsrKXtcbiAgY2xvc2VPdmVybGF5QnV0dG9uc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYob3ZlcmxheVNob3dpbmcgPT0gZmFsc2Upe1xuICAgICAgb3ZlcmxheVRvZ2dsZSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheVRvZ2dsZShmYWxzZSk7XG4gICAgfVxuICAgICQoXCIuaGVhZGVyLWhhbWJ1cmdlclwiKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KVxufSIsInZhciBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbnZhciBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG5cbnZhciBnZW5lcmF0ZVdhdmUyID0gZnVuY3Rpb24oY291bnQsIG5hbWUsIGZ1bmMpe1xuICAgIHZhciBuZXdDb3VudCA9IGNvdW50ICsgMTtcbiAgICBpZiAoZXZhbChuYW1lICsgXCJCdXR0b25Jc0hvdmVyZWRcIikpIHtcbiAgICAgIGlmIChuZXdDb3VudCA8IDYpe1xuICAgICAgICBpZiAobmV3Q291bnQlMil7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBuYW1lICsnV2F2ZXMnKS5lbWl0KG5hbWUgKyAnQnV0dG9uaXNJbkZvY3VzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBuYW1lICsgJ1dhdmVzJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIGdlbmVyYXRlV2F2ZTIobmV3Q291bnQsIG5hbWUsIGZ1bmMpOyAgXG4gICAgICAgIH0sIDMwMCkgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgbmFtZSArICdXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICB3aW5kb3dbbmFtZSArIFwiQnV0dG9uSXNIb3ZlcmVkXCJdID0gZmFsc2U7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgIH1cbiAgICB9XG59XG5cbi8vIEhvdmVycyB0byBJbmRpY2F0ZSBGdW5jdGlvbmFsaXR5IHRvIFVzZXJzXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSB0cnVlO1xuICBnZW5lcmF0ZVdhdmUyKDAsIFwibmV4dFNjZW5lXCIsIGluaXRpYXRlTmV4dFNjZW5lKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgbmV4dFNjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG59KTtcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldmlvdXNTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgcHJldmlvdXNTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IHRydWU7XG4gIGdlbmVyYXRlV2F2ZTIoMCwgXCJwcmV2aW91c1NjZW5lXCIsIGluaXRpYXRlUHJldmlvdXNTY2VuZSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG59KTsiLCIvLyBTY2VuZSBMaXN0IC0gQ29ycmVzcG9uZHMgdG8gY2xhc3MgbmFtZXMgb24gYS1lbnRpdGllcyBmb3IgZWFzeSBtYXNzIGVtaXR0aW5nXG52YXIgc2NlbmVMaXN0ID0gW1wiY3ViZXNcIixcInRpbERlYXRoXCJdXG5cbi8vIFZhcmlhYmxlc1xudmFyIGN1cnJlbnRTY2VuZSA9IDA7XG5cbi8vIFNjZW5lIEVtaXR0aW5nIEZ1bmN0aW9uXG52YXIgZW1pdEFjcm9zc0VudGl0aWVzID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVudGl0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zY2VuZS1cIiArIGFyZ3VtZW50c1swXSk7XG4gIGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGVudGl0aWVzW2ldLmVtaXQoYXJndW1lbnRzW2VdKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gU2NlbmUgQ2hhbmdpbmcgQnV0dG9uIEZ1bmN0aW9uc1xudmFyIGluaXRpYXRlTmV4dFNjZW5lID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBvdGVudGlhbFNjZW5lTnVtID0gY3VycmVudFNjZW5lICsgMTtcbiAgaWYgKHNjZW5lTGlzdFtwb3RlbnRpYWxTY2VuZU51bV0gPT0gdW5kZWZpbmVkKXtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lID0gMDtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gTmV4dCBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lICs9IDE7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIE5leHQgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH1cbiAgc2NlbmVUaW1lciA9IDA7XG59XG52YXIgaW5pdGlhdGVQcmV2aW91c1NjZW5lID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBvdGVudGlhbFNjZW5lTnVtID0gY3VycmVudFNjZW5lIC0gMTtcbiAgaWYgKHNjZW5lTGlzdFtwb3RlbnRpYWxTY2VuZU51bV0gPT0gdW5kZWZpbmVkKXtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lID0gKHNjZW5lTGlzdC5sZW5ndGgtMSk7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIFByZXZpb3VzIFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9IGVsc2Uge1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgLT0gMTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gUHJldmlvdXMgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH1cbiAgc2NlbmVUaW1lciA9IDA7XG59XG5cbi8vIEEtU2NlbmUgU2V0dXBcbnZhciBzY2VuZUFkanVzdG1lbnRzID0gZnVuY3Rpb24oc2NlbmVOYW1lKXtcbiAgdmFyIGVudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhLWZyYW1lLXNjZW5lLWNvbnRhaW5lcicpO1xuICB2YXIgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuICBpZiAoc2NlbmVOYW1lID09IFwiY3ViZXNcIikge1xuICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoXCJmb2dcIiwgXCJ0eXBlOiBsaW5lYXI7IGNvbG9yOiAjMjQwQjU3OyBmYXI6IDIxOyBuZWFyOiA4XCIpXG4gICAgaGVhZGVyLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJyZ2JhKDEwNiwgMjMsIDI1NSwgMC4xNSlcIik7XG4gIH1cbiAgaWYgKHNjZW5lTmFtZSA9PSBcInRpbERlYXRoXCIpIHtcbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKFwiZm9nXCIsIFwidHlwZTogbGluZWFyOyBjb2xvcjogIzI0MEI1NzsgZmFyOiA2MDAxOyBuZWFyOiA2MDAwO1wiKTtcbiAgICBoZWFkZXIuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInJnYmEoNDYsIDIxNiwgOTYsIDAuMTUpXCIpO1xuICB9XG59XG5cbi8vIEluaXRpYWxpemUgU2NlbmVcbnNjZW5lQWRqdXN0bWVudHMoXCJjdWJlc1wiKTtcblxuLy8gU2V0IGluIG1vdGlvbiBhdXRvbWF0aWMgdHJhbnNpdGlvbnNcbnZhciBzY2VuZVRpbWVyICA9IC0zO1xudmFyIHNjZW5lU2xpZGVTaG93aW5nTG9vcCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoc2NlbmVUaW1lciA9PSAxMSl7XG4gICAgc2NlbmVUaW1lciA9IDA7XG4gICAgaW5pdGlhdGVOZXh0U2NlbmUoKTtcbiAgfVxufVxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgc2NlbmVUaW1lcisrO1xuICAvLyBjb25zb2xlLmxvZygnVGltZXI6ICcsIHNjZW5lVGltZXIpO1xuICBzY2VuZVNsaWRlU2hvd2luZ0xvb3AoKTtcbn0sIDEwMDApIiwiLy8gJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIHZhciB0dXRvcmlhbE92ZXJsYXkgPSAkKCcudHV0b3JpYWwtb3ZlcmxheScpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgdHV0b3JpYWxPdmVybGF5LmZhZGVUbyg0MDAsXCIwXCIsZnVuY3Rpb24oKXtcbiAgICAgIHR1dG9yaWFsT3ZlcmxheS5oaWRlKCk7XG4gICAgICBjb25zb2xlLmxvZygncmVhZHkgdG8gZ28hJyk7XG4gICAgfSlcbiAgfSwgMzAwMCk7XG4vLyB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
