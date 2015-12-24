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