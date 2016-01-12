// var overlayButtonisHovered = false;

// var generateWave = function(count){
//     var newCount = count + 1;
//     if (overlayButtonisHovered) {
//       if (newCount < 6){
//         if (newCount%2){
//           document.querySelector('#overlayToggleWaves').emit('overLayButtonisInFocus');
//         } else {
//           document.querySelector('#overlayToggleWaves').emit('lostFocus');
//         }
//         setTimeout(function(){
//           generateWave(newCount);  
//         }, 600)      
//       } else {
//         document.querySelector('#overlayToggleWaves').emit('lostFocus');
//         overlayToggle(true);
//       }
//     }
// }

// document.querySelector('.overlayToggleButton').addEventListener('mouseenter', function(){
//   document.querySelector('.overlayToggleButton').emit('overLayButtonisInFocus');
//   overlayButtonisHovered = true;
//   generateWave(0);
// });

// document.querySelector('.overlayToggleButton').addEventListener('mouseleave', function(){
//   document.querySelector('.overlayToggleButton').emit('lostFocus');
//   document.querySelector('#overlayToggleWaves').emit('lostFocus');
//   overlayButtonisHovered = false;
// });