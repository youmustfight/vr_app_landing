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

// A-Scene Editing
var sceneAdjustments = function(sceneName){
  var entity = document.querySelector('#a-frame-scene-container');
  if (sceneName == "cubes") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 21; near: 10")
  }
  if (sceneName == "tilDeath") {
    entity.setAttribute("fog", "type: linear; color: #240B57; far: 6001; near: 6000;");
  }
}

// Events for Next/Previous
document.querySelector('#nextSceneButton').addEventListener('click', function(){
  initiateNextScene();
});
document.querySelector('#previousSceneButton').addEventListener('click', function(){
  initiatePreviousScene();
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
  $('.overlay-content').fadeTo("150", .95, function(){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm92ZXJsYXktYnV0dG9uLmpzIiwic2NlbmUtc3dpdGNoLmpzIiwic3RhcnRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBvdmVybGF5QnV0dG9uaXNIb3ZlcmVkID0gZmFsc2U7XG5cbnZhciBnZW5lcmF0ZVdhdmUgPSBmdW5jdGlvbihjb3VudCl7XG4gICAgdmFyIG5ld0NvdW50ID0gY291bnQgKyAxO1xuICAgIGlmIChvdmVybGF5QnV0dG9uaXNIb3ZlcmVkKSB7XG4gICAgICBpZiAobmV3Q291bnQgPCA2KXtcbiAgICAgICAgaWYgKG5ld0NvdW50JTIpe1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5VG9nZ2xlV2F2ZXMnKS5lbWl0KCdvdmVyTGF5QnV0dG9uaXNJbkZvY3VzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXlUb2dnbGVXYXZlcycpLmVtaXQoJ2xvc3RGb2N1cycpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBnZW5lcmF0ZVdhdmUobmV3Q291bnQpOyAgXG4gICAgICAgIH0sIDYwMCkgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5VG9nZ2xlV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgICAgICAgb3ZlcmxheVRvZ2dsZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCl7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuZW1pdCgnb3ZlckxheUJ1dHRvbmlzSW5Gb2N1cycpO1xuICBvdmVybGF5QnV0dG9uaXNIb3ZlcmVkID0gdHJ1ZTtcbiAgZ2VuZXJhdGVXYXZlKDApO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5VG9nZ2xlQnV0dG9uJykuZW1pdCgnbG9zdEZvY3VzJyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5VG9nZ2xlV2F2ZXMnKS5lbWl0KCdsb3N0Rm9jdXMnKTtcbiAgb3ZlcmxheUJ1dHRvbmlzSG92ZXJlZCA9IGZhbHNlO1xufSk7IiwiLy8gU2NlbmUgTGlzdCAtIENvcnJlc3BvbmRzIHRvIGNsYXNzIG5hbWVzIG9uIGEtZW50aXRpZXMgZm9yIGVhc3kgbWFzcyBlbWl0dGluZ1xudmFyIHNjZW5lTGlzdCA9IFtcImN1YmVzXCIsXCJ0aWxEZWF0aFwiXVxuXG4vLyBWYXJpYWJsZXNcbnZhciBjdXJyZW50U2NlbmUgPSAwO1xuXG4vLyBTY2VuZSBFbWl0dGluZyBGdW5jdGlvblxudmFyIGVtaXRBY3Jvc3NFbnRpdGllcyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlbnRpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2NlbmUtXCIgKyBhcmd1bWVudHNbMF0pO1xuICBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKyl7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKyl7XG4gICAgICBlbnRpdGllc1tpXS5lbWl0KGFyZ3VtZW50c1tlXSk7XG4gICAgfVxuICB9XG59XG5cbi8vIFNjZW5lIENoYW5naW5nIEJ1dHRvbiBGdW5jdGlvbnNcbnZhciBpbml0aWF0ZU5leHRTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBwb3RlbnRpYWxTY2VuZU51bSA9IGN1cnJlbnRTY2VuZSArIDE7XG4gIGlmIChzY2VuZUxpc3RbcG90ZW50aWFsU2NlbmVOdW1dID09IHVuZGVmaW5lZCl7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSA9IDA7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIE5leHQgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH0gZWxzZSB7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCdoaWRlU2NlbmUnLCdyZW1vdmVTY2VuZScpO1xuICAgIGN1cnJlbnRTY2VuZSArPSAxO1xuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBOZXh0IFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9XG59XG52YXIgaW5pdGlhdGVQcmV2aW91c1NjZW5lID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBvdGVudGlhbFNjZW5lTnVtID0gY3VycmVudFNjZW5lIC0gMTtcbiAgaWYgKHNjZW5lTGlzdFtwb3RlbnRpYWxTY2VuZU51bV0gPT0gdW5kZWZpbmVkKXtcbiAgICBlbWl0QWNyb3NzRW50aXRpZXMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0sJ2hpZGVTY2VuZScsJ3JlbW92ZVNjZW5lJyk7XG4gICAgY3VycmVudFNjZW5lID0gKHNjZW5lTGlzdC5sZW5ndGgtMSk7XG4gICAgY29uc29sZS5sb2coJ0dvaW5nIHRvIFByZXZpb3VzIFNjZW5lOicsIHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdKVxuICAgIHNjZW5lQWRqdXN0bWVudHMoc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pO1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwgJ2xvYWRTY2VuZScsICdyZXZlYWxTY2VuZScpO1xuICB9IGVsc2Uge1xuICAgIGVtaXRBY3Jvc3NFbnRpdGllcyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSwnaGlkZVNjZW5lJywncmVtb3ZlU2NlbmUnKTtcbiAgICBjdXJyZW50U2NlbmUgLT0gMTtcbiAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gUHJldmlvdXMgU2NlbmU6Jywgc2NlbmVMaXN0W2N1cnJlbnRTY2VuZV0pXG4gICAgc2NlbmVBZGp1c3RtZW50cyhzY2VuZUxpc3RbY3VycmVudFNjZW5lXSk7XG4gICAgZW1pdEFjcm9zc0VudGl0aWVzKHNjZW5lTGlzdFtjdXJyZW50U2NlbmVdLCAnbG9hZFNjZW5lJywgJ3JldmVhbFNjZW5lJyk7XG4gIH1cbn1cblxuLy8gQS1TY2VuZSBFZGl0aW5nXG52YXIgc2NlbmVBZGp1c3RtZW50cyA9IGZ1bmN0aW9uKHNjZW5lTmFtZSl7XG4gIHZhciBlbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYS1mcmFtZS1zY2VuZS1jb250YWluZXInKTtcbiAgaWYgKHNjZW5lTmFtZSA9PSBcImN1YmVzXCIpIHtcbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKFwiZm9nXCIsIFwidHlwZTogbGluZWFyOyBjb2xvcjogIzI0MEI1NzsgZmFyOiAyMTsgbmVhcjogMTBcIilcbiAgfVxuICBpZiAoc2NlbmVOYW1lID09IFwidGlsRGVhdGhcIikge1xuICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoXCJmb2dcIiwgXCJ0eXBlOiBsaW5lYXI7IGNvbG9yOiAjMjQwQjU3OyBmYXI6IDYwMDE7IG5lYXI6IDYwMDA7XCIpO1xuICB9XG59XG5cbi8vIEV2ZW50cyBmb3IgTmV4dC9QcmV2aW91c1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRTY2VuZUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgaW5pdGlhdGVOZXh0U2NlbmUoKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZpb3VzU2NlbmVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIGluaXRpYXRlUHJldmlvdXNTY2VuZSgpO1xufSk7IiwiLy8gU2V0IFNlY3Rpb24gSGVpZ2h0XG4kKCcub3ZlcmxheS1jb250ZW50JykuaGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XG5cbi8vIE1lbnUgVmFyaWFibGVzXG52YXIgb3ZlcmxheVNob3dpbmcgPSBmYWxzZTtcbnZhciBkb3duU2Nyb2xsID0gMDtcbnZhciB1cFNjcm9sbCA9IDA7XG5cbi8vIE1lbnUgT3BlbmluZy9DbG9zaW5nIEZ1bmN0aW9uXG52YXIgb3ZlcmxheVNob3cgPSBmdW5jdGlvbigpe1xuICBvdmVybGF5U2hvd2luZyA9IHRydWU7XG4gIGNvbnNvbGUubG9nKCdSZXZlYWxpbmcgU2VjdGlvbicpO1xuICAkKCcub3ZlcmxheS1jb250ZW50Jykuc2hvdygpO1xuICAkKCcub3ZlcmxheS1jb250ZW50JykuZmFkZVRvKFwiMTUwXCIsIC45NSwgZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZygnQW5pbWF0aW9uIENvbXBsZXRlJyk7XG4gIH0pO1xufVxuXG52YXIgb3ZlcmxheUhpZGUgPSBmdW5jdGlvbigpe1xuICBvdmVybGF5U2hvd2luZyA9IGZhbHNlO1xuICBjb25zb2xlLmxvZygnSGlkaW5nIFNlY3Rpb24nKTtcbiAgJCgnLm92ZXJsYXktY29udGVudCcpLmZhZGVUbyhcIjE1MFwiLCAwLCBmdW5jdGlvbigpe1xuICAgICQoJy5vdmVybGF5LWNvbnRlbnQnKS5oaWRlKCk7XG4gICAgY29uc29sZS5sb2coJ0FuaW1hdGlvbiBDb21wbGV0ZScpO1xuICB9KTtcbn1cblxudmFyIG92ZXJsYXlUb2dnbGUgID0gZnVuY3Rpb24obmV3U3RhdGUpe1xuICBpZiAoIW92ZXJsYXlTaG93aW5nICYmIG5ld1N0YXRlKSB7XG4gICAgb3ZlcmxheVNob3coKTtcbiAgfSBcbiAgaWYgKG92ZXJsYXlTaG93aW5nICYmICFuZXdTdGF0ZSkge1xuICAgIG92ZXJsYXlIaWRlKCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
