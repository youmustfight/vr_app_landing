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