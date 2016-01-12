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
sceneAdjustments("cubes")

// Set in motion automatic transitions
var sceneTimer  = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25sb2FkLWxpbmtzLmpzIiwib3ZlcmxheS5qcyIsInNjZW5lLWNoYW5nZS1idXR0b25zLmpzIiwic2NlbmUtc3dpdGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gR2V0IERvd25sb2FkIEJ1dHRvbnMgdmlhIENsYXNzXG52YXIgZG93bmxvYWRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRvd25sb2FkLWxpbmsnKTtcblxuLy8gRnVuY3Rpb24gaGFuZGxpbmcgcm90YXRpb25zIG9mIGJ1dHRvbiBiZWluZyBob3ZlcmVkXG52YXIgYW5pbWF0ZVRvTGluayA9IGZ1bmN0aW9uKGJ1dHRvbil7XG4gIGNvbnNvbGUubG9nKGJ1dHRvbilcbn1cblxuXG4vLyBGb3IgYWxsIHRoZSBEb3dubG9hZC1mb3J3YXJkaW5nIGJ1dHRvbnMuLi4uXG5mb3IgKHZhciBpID0gMDsgaSA8IGRvd25sb2FkQnV0dG9ucy5sZW5ndGg7IGkrKyl7XG5cbiAgLy8gU2V0IGRlZmF1bHQgZGF0YSB2YWx1ZXNcbiAgJChkb3dubG9hZEJ1dHRvbnNbaV0pLmF0dHIoXCJkYXRhLWxpbmstaG92ZXJlZFwiLCBmYWxzZSk7XG5cbiAgLy8gQWRkIGEgTW91c2UgRW50ZXIgQ29uZGl0aW9uLCB0cmFja2luZyBob3ZlciBhbmQgaW5pdGlhdGluZyByb3RhdGlvbnNcbiAgZG93bmxvYWRCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKCQodGhpcykuYXR0cihcImRhdGEtbGlua1wiKSk7XG4gICAgLy8gdGhpcyBpcyBob3ZlcmVkXG4gICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1saW5rLWhvdmVyZWRcIiwgdHJ1ZSk7XG4gICAgLy8gaW5pdGlhdGUgcm9hdGlvbnMgZnVuY3Rpb25cbiAgICBhbmltYXRlVG9MaW5rKHRoaXMpO1xuICB9KTtcblxuICAvLyBBbmQgYSBNb3VzZSBMZWF2ZSBDb25kaXRpb24gdG8gcmVzZXQgaG92ZXIgYW5kIHJvdGF0aW9uc1xuICBkb3dubG9hZEJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1saW5rLWhvdmVyZWRcIiwgZmFsc2UpO1xuICAgIGNvbnNvbGUubG9nKCQodGhpcykuYXR0cihcImRhdGEtbGluay1ob3ZlcmVkXCIpKTtcblxuICB9KTtcblxufSIsIi8vIFNldCBTZWN0aW9uIEhlaWdodFxuLy8gJCgnLm92ZXJsYXktY29udGVudCcpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xuXG4vLyBNZW51IFZhcmlhYmxlc1xudmFyIG92ZXJsYXlTaG93aW5nID0gZmFsc2U7XG52YXIgZG93blNjcm9sbCA9IDA7XG52YXIgdXBTY3JvbGwgPSAwO1xuXG4vLyBNZW51IE9wZW5pbmcvQ2xvc2luZyBGdW5jdGlvblxudmFyIG92ZXJsYXlTaG93ID0gZnVuY3Rpb24oKXtcbiAgb3ZlcmxheVNob3dpbmcgPSB0cnVlO1xuICBjb25zb2xlLmxvZygnUmV2ZWFsaW5nIFNlY3Rpb24nKTtcbiAgJCgnLm92ZXJsYXktY29udGVudCcpLmZhZGVUbyhcIjUwXCIsIDEsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLm92ZXJsYXktY29udGVudCcpLnNob3coKTtcbiAgfSk7XG59XG5cbnZhciBvdmVybGF5SGlkZSA9IGZ1bmN0aW9uKCl7XG4gIG92ZXJsYXlTaG93aW5nID0gZmFsc2U7XG4gIGNvbnNvbGUubG9nKCdIaWRpbmcgU2VjdGlvbicpO1xuICAkKCcub3ZlcmxheS1jb250ZW50JykuZmFkZVRvKFwiNTBcIiwgMCwgZnVuY3Rpb24oKXtcbiAgICAkKCcub3ZlcmxheS1jb250ZW50JykuaGlkZSgpO1xuICB9KTtcbn1cblxudmFyIG92ZXJsYXlUb2dnbGUgID0gZnVuY3Rpb24obmV3U3RhdGUpe1xuICBjb25zb2xlLmxvZyhcIlRvZ2dsaW5nIE92ZXJsYXlcIik7XG4gIGlmICghb3ZlcmxheVNob3dpbmcgJiYgbmV3U3RhdGUpIHtcbiAgICBvdmVybGF5U2hvdygpO1xuICAgICQoJy5kb3dubG9hZC10aGUtYXBwJykuZmFkZVRvKFwiNTBcIiwgMCk7XG4gIH0gXG4gIGlmIChvdmVybGF5U2hvd2luZyAmJiAhbmV3U3RhdGUpIHtcbiAgICBvdmVybGF5SGlkZSgpO1xuICAgICQoJy5kb3dubG9hZC10aGUtYXBwJykuZmFkZVRvKFwiNTBcIiwgMSk7XG4gIH1cbn1cblxudmFyIGNsb3NlT3ZlcmxheUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZ2dsZS1vdmVybGF5XCIpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IGNsb3NlT3ZlcmxheUJ1dHRvbnMubGVuZ3RoOyBpKyspe1xuICBjbG9zZU92ZXJsYXlCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZihvdmVybGF5U2hvd2luZyA9PSBmYWxzZSl7XG4gICAgICBvdmVybGF5VG9nZ2xlKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdmVybGF5VG9nZ2xlKGZhbHNlKTtcbiAgICB9XG4gICAgJChcIi5oZWFkZXItaGFtYnVyZ2VyXCIpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pXG59IiwidmFyIG5leHRTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IGZhbHNlO1xudmFyIHByZXZpb3VzU2NlbmVCdXR0b25Jc0hvdmVyZWQgPSBmYWxzZTtcblxudmFyIGdlbmVyYXRlV2F2ZTIgPSBmdW5jdGlvbihjb3VudCwgbmFtZSwgZnVuYyl7XG4gICAgdmFyIG5ld0NvdW50ID0gY291bnQgKyAxO1xuICAgIGlmIChldmFsKG5hbWUgKyBcIkJ1dHRvbklzSG92ZXJlZFwiKSkge1xuICAgICAgaWYgKG5ld0NvdW50IDwgNil7XG4gICAgICAgIGlmIChuZXdDb3VudCUyKXtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG5hbWUgKydXYXZlcycpLmVtaXQobmFtZSArICdCdXR0b25pc0luRm9jdXMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIG5hbWUgKyAnV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgZ2VuZXJhdGVXYXZlMihuZXdDb3VudCwgbmFtZSwgZnVuYyk7ICBcbiAgICAgICAgfSwgMzAwKSAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBuYW1lICsgJ1dhdmVzJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gICAgICAgIHdpbmRvd1tuYW1lICsgXCJCdXR0b25Jc0hvdmVyZWRcIl0gPSBmYWxzZTtcbiAgICAgICAgZnVuYygpO1xuICAgICAgfVxuICAgIH1cbn1cblxuLy8gSG92ZXJzIHRvIEluZGljYXRlIEZ1bmN0aW9uYWxpdHkgdG8gVXNlcnNcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0U2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gIG5leHRTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IHRydWU7XG4gIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwiZmFsc2VcIik7XG4gIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcInB1YmxpYy9pbWFnZXMvYXJyb3ctaG92ZXIucG5nXCIpXG4gIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgLy8gICBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcInRydWVcIik7XG4gIC8vIH0pO1xuICBnZW5lcmF0ZVdhdmUyKDAsIFwibmV4dFNjZW5lXCIsIGluaXRpYXRlTmV4dFNjZW5lKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgbmV4dFNjZW5lQnV0dG9uSXNIb3ZlcmVkID0gZmFsc2U7XG4gIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwiZmFsc2VcIik7XG4gIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcInB1YmxpYy9pbWFnZXMvYXJyb3cucG5nXCIpXG4gIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgLy8gICBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcInRydWVcIik7XG4gIC8vIH0pXG59KTtcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldmlvdXNTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgcHJldmlvdXNTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IHRydWU7XG4gIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIFwiZmFsc2VcIik7XG4gIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcInB1YmxpYy9pbWFnZXMvYXJyb3ctaG92ZXIucG5nXCIpXG4gIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgLy8gICBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcInRydWVcIik7XG4gIC8vIH0pO1xuICBnZW5lcmF0ZVdhdmUyKDAsIFwicHJldmlvdXNTY2VuZVwiLCBpbml0aWF0ZVByZXZpb3VzU2NlbmUpO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldmlvdXNTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICB2YXIgYnV0dG9uID0gdGhpcztcbiAgcHJldmlvdXNTY2VuZUJ1dHRvbklzSG92ZXJlZCA9IGZhbHNlO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBcImZhbHNlXCIpO1xuICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwic3JjXCIsXCJwdWJsaWMvaW1hZ2VzL2Fycm93LnBuZ1wiKVxuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIC8vICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInZpc2libGVcIiwgXCJ0cnVlXCIpO1xuICAvLyB9KVxufSk7XG5cblxuXG4vLyBDbGlja3MgZm9yIFNjZW5lIENoYW5nZVxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbi8vICAgaW5pdGlhdGVOZXh0U2NlbmUoKTtcbi8vIH0pO1xuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZpb3VzU2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4vLyAgIGluaXRpYXRlUHJldmlvdXNTY2VuZSgpO1xuLy8gfSk7IiwiLy8gU2NlbmUgTGlzdCAtIENvcnJlc3BvbmRzIHRvIGNsYXNzIG5hbWVzIG9uIGEtZW50aXRpZXMgZm9yIGVhc3kgbWFzcyBlbWl0dGluZ1xudmFyIHNjZW5lTGlzdCA9IFtcImN1YmVzXCIsXCJ0aWxEZWF0aFwiXVxuXG4vLyBWYXJpYWJsZXNcbnZhciBjdXJyZW50U2NlbmUgPSAwO1xuXG4vLyBTY2VuZSBFbWl0dGluZyBGdW5jdGlvblxudmFyIGVtaXRBY3Jvc3NFbnRpdGllcyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlbnRpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2NlbmUtXCIgKyBhcmd1bWVudHNbMF0pO1xuICBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKyl7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKyl7XG4gICAgICBlbnRpdGllc1tpXS5lbWl0KGFyZ3VtZW50c1tlXSk7XG4gICAgfVxuICB9XG59XG5cbi8vIFNjZW5lIENoYW5naW5nIEJ1dHRvbiBGdW5jdGlvbnNcbnZhciBpbml0aWF0ZU5leHRTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBwb3RlbnRpYWxTY2VuZU51bSA9IGN1cnJlbnRTY2VuZSArIDE7XG4gIGlmIChzY2VuZUxpc3RbcG90ZW50aWFsU2NlbmVOdW1dID09IHVuZGVmaW5lZCl7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSA9IDA7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIE5leHQgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH0gZWxzZSB7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSArPSAxO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBOZXh0IFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9XG4gIHNjZW5lVGltZXIgPSAwO1xufVxudmFyIGluaXRpYXRlUHJldmlvdXNTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBwb3RlbnRpYWxTY2VuZU51bSA9IGN1cnJlbnRTY2VuZSAtIDE7XG4gIGlmIChzY2VuZUxpc3RbcG90ZW50aWFsU2NlbmVOdW1dID09IHVuZGVmaW5lZCl7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSA9IChzY2VuZUxpc3QubGVuZ3RoLTEpO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBQcmV2aW91cyBTY2VuZTonLCBzY2VuZUxpc3RbY3VycmVudFNjZW5lXSlcbiAgICBzY2VuZUFkanVzdG1lbnRzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKTtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sICdsb2FkU2NlbmUnLCAncmV2ZWFsU2NlbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lIC09IDE7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIFByZXZpb3VzIFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9XG4gIHNjZW5lVGltZXIgPSAwO1xufVxuXG4vLyBBLVNjZW5lIFNldHVwXG52YXIgc2NlbmVBZGp1c3RtZW50cyA9IGZ1bmN0aW9uKHNjZW5lTmFtZSl7XG4gIHZhciBlbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYS1mcmFtZS1zY2VuZS1jb250YWluZXInKTtcbiAgdmFyIGhlYWRlciA9ICQoJy5oZWFkZXInKTtcbiAgaWYgKHNjZW5lTmFtZSA9PSBcImN1YmVzXCIpIHtcbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKFwiZm9nXCIsIFwidHlwZTogbGluZWFyOyBjb2xvcjogIzI0MEI1NzsgZmFyOiAyMTsgbmVhcjogOFwiKVxuICAgIGhlYWRlci5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwicmdiYSgxMDYsIDIzLCAyNTUsIDAuMTUpXCIpO1xuICB9XG4gIGlmIChzY2VuZU5hbWUgPT0gXCJ0aWxEZWF0aFwiKSB7XG4gICAgZW50aXR5LnNldEF0dHJpYnV0ZShcImZvZ1wiLCBcInR5cGU6IGxpbmVhcjsgY29sb3I6ICMyNDBCNTc7IGZhcjogNjAwMTsgbmVhcjogNjAwMDtcIik7XG4gICAgaGVhZGVyLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJyZ2JhKDQ2LCAyMTYsIDk2LCAwLjE1KVwiKTtcbiAgfVxufVxuXG4vLyBJbml0aWFsaXplIFNjZW5lXG5zY2VuZUFkanVzdG1lbnRzKFwiY3ViZXNcIilcblxuLy8gU2V0IGluIG1vdGlvbiBhdXRvbWF0aWMgdHJhbnNpdGlvbnNcbnZhciBzY2VuZVRpbWVyICA9IDA7XG52YXIgc2NlbmVTbGlkZVNob3dpbmdMb29wID0gZnVuY3Rpb24oKSB7XG4gIGlmIChzY2VuZVRpbWVyID09IDExKXtcbiAgICBzY2VuZVRpbWVyID0gMDtcbiAgICBpbml0aWF0ZU5leHRTY2VuZSgpO1xuICB9XG59XG5zZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICBzY2VuZVRpbWVyKys7XG4gIC8vIGNvbnNvbGUubG9nKCdUaW1lcjogJywgc2NlbmVUaW1lcik7XG4gIHNjZW5lU2xpZGVTaG93aW5nTG9vcCgpO1xufSwgMTAwMCkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
