var Bike = require("./Bike.js")
// game.js
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const playerSize = 5;
var p1StartX = canvas.width * .85 - playerSize / 2;
var p2StartX = canvas.width * .15 - playerSize / 2;
var p1StartY = canvas.height / 2 - playerSize / 2;
var p2StartY = canvas.height / 2 - playerSize / 2;

var player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize);
var player2 = new Bike(p2StartX, p2StartY, playerSize, playerSize);

var startingTime = new Date();

console.log(startingTime);

window.addEventListener('keydown', (e) => {
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 38:
      player1.direction = "up";
      // player1.draw(context);
      break;
    case 40:
      player1.direction = "down";
      // player1.draw(context);
      break;
    case 37:
      player1.direction = "left";
      // player1.draw(context);
      break;
    case 39:
      player1.direction = "right";
      // player1.draw(context);
      break;
    case 87: // W (up)
      player2.direction = "up";
      break;
    case 83: // S (down)
      player2.direction = "down";
      // player1.draw(context);
      break;
    case 65: // A (left)
      player2.direction = "left";
      // player1.draw(context);
      break;
    case 68: // D (right)
      player2.direction = "right";
      // player1.draw(context);
      break;
  }
});

requestAnimationFrame(function gameLoop() {
  player1.draw(context);
  player2.draw(context);

  requestAnimationFrame(gameLoop);
});
