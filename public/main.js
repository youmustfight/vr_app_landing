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
}, 550);
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
    header.css("background-color", "rgba(106, 23, 255, 0.85)");
  }
  if (sceneName == "tilDeath") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 6001; near: 6000;");
    header.css("background-color", "rgba(46, 216, 96, 0.85)");
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
var tutorialOverlay = $('.tutorial-overlay');
setTimeout(function(){
  tutorialOverlay.fadeTo(600,"0",function(){
    setTimeout(function(){
      tutorialOverlay.hide();
    },50)
    console.log('ready to go!');
  })
}, 3700);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWxvYWRpbmcuanMiLCJvdmVybGF5LmpzIiwic2NlbmUtY2hhbmdlLWJ1dHRvbnMuanMiLCJzY2VuZS1zd2l0Y2guanMiLCJ0dXRvcmlhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXNzZXRzICA9ICQoJ2EtYXNzZXRzJyk7XG5cbi8vIEFsbG93IGZvciBwcmlvcml0eSBvZiB0dXRvcmlhbCBncmFwaGljIGFuZCBicmFuZCBsb2dvIGJ5IGRlbGF5aW5nIGFzc2V0c1xuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy1sb2dvXCIgc3JjPVwicHVibGljL2ltYWdlcy9sb2dvLnBuZ1wiPicpO1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy10YWdsaW5lXCIgc3JjPVwicHVibGljL2ltYWdlcy90YWdsaW5lLnBuZ1wiPicpO1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy10YWdsaW5lMlwiIHNyYz1cInB1YmxpYy9pbWFnZXMvdGFnbGluZTIucG5nXCI+Jyk7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLWNhcmRib2FyZFwiIHNyYz1cInB1YmxpYy9pbWFnZXMvY2FyZGJvYXJkLnBuZ1wiPicpO1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy1vY3VsdXNcIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL29jdWx1cy5wbmdcIj4nKTtcbiAgYXNzZXRzLnByZXBlbmQoJzxpbWcgaWQ9XCJhc3NldHMtZ29vZ2xlLXBsYXlcIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL2dvb2dsZS1wbGF5LnBuZ1wiPicpO1xuICBhc3NldHMucHJlcGVuZCgnPGltZyBpZD1cImFzc2V0cy1hcnJvdy1ob3ZlclwiIHNyYz1cInB1YmxpYy9pbWFnZXMvYXJyb3ctaG92ZXIucG5nXCI+Jyk7XG4gIGFzc2V0cy5wcmVwZW5kKCc8aW1nIGlkPVwiYXNzZXRzLXRpbGRlYXRoLXRpdGxlXCIgc3JjPVwicHVibGljL2ltYWdlcy90aWxkZWF0aC10aXRsZS5wbmdcIj4nKTtcbiAgYXNzZXRzLnByZXBlbmQoJzxpbWcgaWQ9XCJhc3NldHMtdGlsZGVhdGgtbG9nb1wiIHNyYz1cInB1YmxpYy9pbWFnZXMvdGlsZGVhdGgtbG9nby5wbmdcIj4nKTtcbn0pO1xuXG4vLyBTcHJlYWQgb3V0IGJpZyBpbWFnZSBsb2FkcyB0byBzbW9vdGggaW5pdGlhbCBsb2FkXG5cbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgYXNzZXRzLnByZXBlbmQoJzxpbWcgaWQ9XCJ0aWxEZWF0aC1zcGhlcmVcIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL3RpbGRlYXRoLXNwaGVyZS5qcGdcIj4nKTtcbiAgLy8gVXBkYXRlIFNjZW5lIFNreWJveCBFbnRpdHlcbiAgJCgnI3RpbERlYXRoLXNwaGVyZScpLm9uKCdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAkKCdhLWVudGl0eS5zY2VuZS10aWxEZWF0aCcpLmF0dHIoXCJtYXRlcmlhbFwiLFwic3JjOiAjdGlsRGVhdGgtc3BoZXJlXCIpO1xuICB9KTtcbn0sIDU1MCk7IiwiLy8gTWVudSBWYXJpYWJsZXNcbnZhciBvdmVybGF5U2hvd2luZyA9IGZhbHNlO1xudmFyIGRvd25TY3JvbGwgPSAwO1xudmFyIHVwU2Nyb2xsID0gMDtcblxuLy8gTWVudSBPcGVuaW5nL0Nsb3NpbmcgRnVuY3Rpb25cbnZhciBvdmVybGF5U2hvdyA9IGZ1bmN0aW9uKCl7XG4gIG92ZXJsYXlTaG93aW5nID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coJ1JldmVhbGluZyBTZWN0aW9uJyk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5jc3MoXCJvcGFjaXR5XCIsXCIxXCIpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgJCgnLm92ZXJsYXktY29udGVudCcpLnNob3coKTtcbiAgfSwgMjUwKTtcbn1cblxudmFyIG92ZXJsYXlIaWRlID0gZnVuY3Rpb24oKXtcbiAgb3ZlcmxheVNob3dpbmcgPSBmYWxzZTtcbiAgY29uc29sZS5sb2coJ0hpZGluZyBTZWN0aW9uJyk7XG4gICQoJy5vdmVybGF5LWNvbnRlbnQnKS5jc3MoXCJvcGFjaXR5XCIsXCIwXCIpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgJCgnLm92ZXJsYXktY29udGVudCcpLmhpZGUoKTtcbiAgfSwgMjUwKTtcbn1cblxudmFyIG92ZXJsYXlUb2dnbGUgID0gZnVuY3Rpb24obmV3U3RhdGUpe1xuICBjb25zb2xlLmxvZyhcIlRvZ2dsaW5nIE92ZXJsYXlcIik7XG4gIGlmICghb3ZlcmxheVNob3dpbmcgJiYgbmV3U3RhdGUpIHtcbiAgICBvdmVybGF5U2hvdygpO1xuICAgICQoJy5kb3dubG9hZC10aGUtYXBwJykuZmFkZVRvKFwiNTBcIiwgMCk7XG4gIH0gXG4gIGlmIChvdmVybGF5U2hvd2luZyAmJiAhbmV3U3RhdGUpIHtcbiAgICBvdmVybGF5SGlkZSgpO1xuICAgICQoJy5kb3dubG9hZC10aGUtYXBwJykuZmFkZVRvKFwiNTBcIiwgMSk7XG4gIH1cbn1cblxudmFyIGNsb3NlT3ZlcmxheUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZ2dsZS1vdmVybGF5XCIpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IGNsb3NlT3ZlcmxheUJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICBjbG9zZU92ZXJsYXlCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZihvdmVybGF5U2hvd2luZyA9PSBmYWxzZSl7XG4gICAgICBvdmVybGF5VG9nZ2xlKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdmVybGF5VG9nZ2xlKGZhbHNlKTtcbiAgICB9XG4gICAgJChcIi5oZWFkZXItaGFtYnVyZ2VyXCIpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pXG59IiwidmFyIG5leHRTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IGZhbHNlO1xudmFyIHByZXZpb3VzU2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcblxudmFyIGdlbmVyYXRlV2F2ZTIgPSBmdW5jdGlvbihjb3VudCwgbmFtZSwgZnVuYyl7XG4gICAgdmFyIG5ld0NvdW50ID0gY291bnQgKyAxO1xuICAgIGlmIChldmFsKG5hbWUgKyBcIkJ1dHRvbklzSG92ZXJlZFwiKSkge1xuICAgICAgaWYgKG5ld0NvdW50IDwgNil7XG4gICAgICAgIGlmIChuZXdDb3VudCUyKXtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG5hbWUgKydXYXZlcycpLmVtaXQobmFtZSArICdCdXR0b25pc0luRm9jdXMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG5hbWUgKyAnV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgZ2VuZXJhdGVXYXZlMihuZXdDb3VudCwgbmFtZSwgZnVuYyk7ICBcbiAgICAgICAgfSwgMzAwKSAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBuYW1lICsgJ1dhdmVzJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gICAgICAgIHdpbmRvd1tuYW1lICsgXCJCdXR0b25Jc0hvdmVyZWRcIl0gPSBmYWxzZTtcbiAgICAgICAgZnVuYygpO1xuICAgICAgfVxuICAgIH1cbn1cblxuLy8gSG92ZXJzIHRvIEluZGljYXRlIEZ1bmN0aW9uYWxpdHkgdG8gVXNlcnNcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0U2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gIG5leHRTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IHRydWU7XG4gIGdlbmVyYXRlV2F2ZTIoMCwgXCJuZXh0U2NlbmVcIiwgaW5pdGlhdGVOZXh0U2NlbmUpO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dFNjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBuZXh0U2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbn0pO1xuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c1NjZW5lQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIHZhciBidXR0b24gPSB0aGlzO1xuICBwcmV2aW91c1NjZW5lQnV0dG9uSXNIb3ZlcmVkID0gdHJ1ZTtcbiAgZ2VuZXJhdGVXYXZlMigwLCBcInByZXZpb3VzU2NlbmVcIiwgaW5pdGlhdGVQcmV2aW91c1NjZW5lKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZpb3VzU2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gIHByZXZpb3VzU2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcbn0pOyIsIi8vIFNjZW5lIExpc3QgLSBDb3JyZXNwb25kcyB0byBjbGFzcyBuYW1lcyBvbiBhLWVudGl0aWVzIGZvciBlYXN5IG1hc3MgZW1pdHRpbmdcbnZhciBzY2VuZUxpc3QgPSBbXCJjdWJlc1wiLFwidGlsRGVhdGhcIl1cblxuLy8gVmFyaWFibGVzXG52YXIgY3VycmVudFNjZW5lID0gMDtcblxuLy8gU2NlbmUgRW1pdHRpbmcgRnVuY3Rpb25cbnZhciBlbWl0QWNyb3NzRW50aXRpZXMgPSBmdW5jdGlvbigpe1xuICB2YXIgZW50aXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNjZW5lLVwiICsgYXJndW1lbnRzWzBdKTtcbiAgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspe1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyBpKyspe1xuICAgICAgZW50aXRpZXNbaV0uZW1pdChhcmd1bWVudHNbZV0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTY2VuZSBDaGFuZ2luZyBCdXR0b24gRnVuY3Rpb25zXG52YXIgaW5pdGlhdGVOZXh0U2NlbmUgPSBmdW5jdGlvbigpe1xuICB2YXIgcG90ZW50aWFsU2NlbmVOdW0gPSBjdXJyZW50U2NlbmUgKyAxO1xuICBpZiAoc2NlbmVMaXN0W3BvdGVudGlhbFNjZW5lTnVtXSA9PSB1bmRlZmluZWQpe1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgPSAwO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBOZXh0IFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9IGVsc2Uge1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgKz0gMTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gTmV4dCBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfVxuICBzY2VuZVRpbWVyID0gMDtcbn1cbnZhciBpbml0aWF0ZVByZXZpb3VzU2NlbmUgPSBmdW5jdGlvbigpe1xuICB2YXIgcG90ZW50aWFsU2NlbmVOdW0gPSBjdXJyZW50U2NlbmUgLSAxO1xuICBpZiAoc2NlbmVMaXN0W3BvdGVudGlhbFNjZW5lTnVtXSA9PSB1bmRlZmluZWQpe1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgPSAoc2NlbmVMaXN0Lmxlbmd0aC0xKTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gUHJldmlvdXMgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH0gZWxzZSB7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSAtPSAxO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBQcmV2aW91cyBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfVxuICBzY2VuZVRpbWVyID0gMDtcbn1cblxuLy8gQS1TY2VuZSBTZXR1cFxudmFyIHNjZW5lQWRqdXN0bWVudHMgPSBmdW5jdGlvbihzY2VuZU5hbWUpe1xuICB2YXIgZW50aXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2EtZnJhbWUtc2NlbmUtY29udGFpbmVyJyk7XG4gIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gIGlmIChzY2VuZU5hbWUgPT0gXCJjdWJlc1wiKSB7XG4gICAgZW50aXR5LnNldEF0dHJpYnV0ZShcImZvZ1wiLCBcInR5cGU6IGxpbmVhcjsgY29sb3I6ICMyNDBCNTc7IGZhcjogMjE7IG5lYXI6IDhcIilcbiAgICBoZWFkZXIuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInJnYmEoMTA2LCAyMywgMjU1LCAwLjg1KVwiKTtcbiAgfVxuICBpZiAoc2NlbmVOYW1lID09IFwidGlsRGVhdGhcIikge1xuICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoXCJmb2dcIiwgXCJ0eXBlOiBsaW5lYXI7IGNvbG9yOiAjMjQwQjU3OyBmYXI6IDYwMDE7IG5lYXI6IDYwMDA7XCIpO1xuICAgIGhlYWRlci5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwicmdiYSg0NiwgMjE2LCA5NiwgMC44NSlcIik7XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBTY2VuZVxuc2NlbmVBZGp1c3RtZW50cyhcImN1YmVzXCIpO1xuXG4vLyBTZXQgaW4gbW90aW9uIGF1dG9tYXRpYyB0cmFuc2l0aW9uc1xudmFyIHNjZW5lVGltZXIgID0gLTM7XG52YXIgc2NlbmVTbGlkZVNob3dpbmdMb29wID0gZnVuY3Rpb24oKSB7XG4gIGlmIChzY2VuZVRpbWVyID09IDExKXtcbiAgICBzY2VuZVRpbWVyID0gMDtcbiAgICBpbml0aWF0ZU5leHRTY2VuZSgpO1xuICB9XG59XG5zZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICBzY2VuZVRpbWVyKys7XG4gIC8vIGNvbnNvbGUubG9nKCdUaW1lcjogJywgc2NlbmVUaW1lcik7XG4gIHNjZW5lU2xpZGVTaG93aW5nTG9vcCgpO1xufSwgMTAwMCkiLCJ2YXIgdHV0b3JpYWxPdmVybGF5ID0gJCgnLnR1dG9yaWFsLW92ZXJsYXknKTtcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgdHV0b3JpYWxPdmVybGF5LmZhZGVUbyg2MDAsXCIwXCIsZnVuY3Rpb24oKXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB0dXRvcmlhbE92ZXJsYXkuaGlkZSgpO1xuICAgIH0sNTApXG4gICAgY29uc29sZS5sb2coJ3JlYWR5IHRvIGdvIScpO1xuICB9KVxufSwgMzcwMCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
