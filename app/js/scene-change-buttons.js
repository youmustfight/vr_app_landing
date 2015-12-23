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