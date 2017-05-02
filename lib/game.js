var Bike = require("./Bike.js")
// game.js
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const playerSize = 5;
var p1StartX = canvas.width * .85 - playerSize / 2
var p2StartX = canvas.width * .15 - playerSize / 2
var p1StartY = canvas.height / 2 - playerSize / 2
var p2StartY = canvas.height / 2 - playerSize / 2

var player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize)

window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
  case 38:
    player1.direction = "up"
    break;
  case 40:
    player1.direction = "down"
    break;
  case 37:
    player1.direction = "left"
    break;
  case 39:
    player1.direction = "right"
    break;
  }
});

requestAnimationFrame(function gameLoop() {

  player1.draw(context);
  requestAnimationFrame(gameLoop);
});
