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