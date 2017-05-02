// game.js
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const playerSize = 20;
var p1StartX = canvas.width * .85 - playerSize / 2
var p2StartX = canvas.width * .15 - playerSize / 2
var p1StartY = canvas.height / 2 - playerSize / 2
var p2StartY = canvas.height / 2 - playerSize / 2

// context.fillRect( x, y, width, height );

context.fillRect(p1StartX, p1StartY, playerSize, playerSize);
context.fillRect(p2StartX, p2StartY, playerSize, playerSize);

window.addEventListener('keydown', function(e) {
  //console.log(e.keyCode); // what key am I?
  switch (e.keyCode) {
  case 38: // up
    console.log("up");
    break;
  case 40: // down
    console.log("down");
    break;
  case 37: // left
    console.log("left");
    break;
  case 39: // right
    console.log("right");
    break;

    }
});

requestAnimationFrame(function gameLoop () {
  //console.log("this works");

  requestAnimationFrame(gameLoop);
});
