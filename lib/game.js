var Bike = require("./Bike.js")

// game.js
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const playerSize = 6;

var pauseButton = document.getElementById("pause");
var newGameButton = document.getElementById("new-game");
var paused = false;
var isGameOver = false;
var gameStart = false;
var p1StartX = canvas.width * .86 - playerSize / 2;
var p2StartX = canvas.width * .16 - playerSize / 2;
var p1StartY = canvas.height * .86 - playerSize / 2;
var p2StartY = canvas.height * .16 - playerSize / 2;
var p1Color = "rgba(24,202,230,1)";
var p2Color = "rgba(246,106,53,1)";

var player1;
var player2;

var fps = 25;
var startingTime = new Date();

pauseButton.addEventListener('click', pauseGame);
newGameButton.addEventListener('click', initializeGame);

window.addEventListener('keydown', (e) => {
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
  } else if (e.keyCode == 32) {
    paused = !paused;
  } else if (e.keyCode == 78) {
    initializeGame();
  }
});

(function () {
  initializeGame();
})();

function checkGameOver() {
  if (!player1.isAlive || !player2.isAlive) {
    isGameOver = true;
    gameOver();
  }
}

function pauseGame() {
  paused = !paused;
  //TODO add HTML styling to show the game is paused
}

function initializeGame() {
  isGameOver = false;
  paused = false;
  gameStart = true;
  player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize, p1Color);
  player2 = new Bike(p2StartX, p2StartY, playerSize, playerSize, p2Color);

  //context.clearRect(0, 0, canvas.width, canvas.height);
  //player1.draw(context, player2.history, canvas);
  //player2.draw(context, player1.history, canvas);
}

function gameOver() {
  //TODO: fancy up the UI and indicate that the game is over
}

requestAnimationFrame(function gameLoop() {
  if (gameStart) {
    let currentTime = new Date();

    checkGameOver();
    if (!isGameOver) {
      if (!paused) {
        if (currentTime - startingTime > 1000 / fps) {
          startingTime = currentTime;
          context.clearRect(0, 0, canvas.width, canvas.height);
          player1.draw(context, player2.history, canvas);
          player2.draw(context, player1.history, canvas);
        }
      }
    }
  }
  requestAnimationFrame(gameLoop);
});
