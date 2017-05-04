var Bike = require("./Bike.js")
// game.js
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const playerSize = 15;
var p1StartX = canvas.width * .85 - playerSize / 2;
var p2StartX = canvas.width * .15 - playerSize / 2;
var p1StartY = canvas.height / 2 - playerSize / 2;
var p2StartY = canvas.height / 2 - playerSize / 2;
var p1Color = "rgba(255, 255, 255, 1)";
var p2Color = "rgba(239, 115, 115, 1)";

var player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize);
var player2 = new Bike(p2StartX, p2StartY, playerSize, playerSize);
var fps = 10;
var startingTime = new Date();

window.addEventListener('keydown', (e) => {
  console.log(e.keyCode);
  if (e.keyCode === 38 && player1.direction != "down") {
    player1.direction = "up";
  } else if (e.keyCode === 40 && player1.direction != "up") {
    player1.direction = "down";
  } else if (e.keyCode === 37 && player1.direction != "right") {
    player1.direction = "left";
  } else if (e.keyCode === 39 && player1.direction != "left") {
    player1.direction = "right";
  } else if (e.keyCode === 87 && player2.direction != "down") {
    player2.direction = "up";
  } else if (e.keyCode === 83 && player2.direction != "up") {
    player2.direction = "down";
  } else if (e.keyCode === 65 && player2.direction != "right") {
    player2.direction = "left";
  } else if (e.keyCode === 68 && player2.direction != "left") {
    player2.direction = "right";
  }
});

requestAnimationFrame(function gameLoop() {

  let currentTime = new Date();

  if (currentTime - startingTime > 1000 / fps) {
    startingTime = currentTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    player1.draw(context, p1Color);
    player2.draw(context, p2Color);
  }

  requestAnimationFrame(gameLoop);
});
