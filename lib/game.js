var Bike = require("./Bike.js")

// game.js
const canvas1 = document.getElementById('bike');
//const canvas2 = document.getElementById('particle');
const ctx1 = canvas1.getContext('2d');
//const ctx2 = canvas2.getContext('2d');

var pauseButton = document.getElementById("pause");
var newGameButton = document.getElementById("new-game");
var paused = false;
var isGameOver = false;
var gameStart = false;

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
    pauseGame();
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

  // TODO: Allow users to change the size of their player.
  // let playerSize = parseInt(document.getElementById('playerSize').value, 10);
  let playerSize = 6;
  let p1StartX = canvas1.width * .86 - playerSize / 2;
  let p2StartX = canvas1.width * .16 - playerSize / 2;
  let p1StartY = canvas1.height * .86 - playerSize / 2;
  let p2StartY = canvas1.height * .16 - playerSize / 2;
  let p1Color = "rgba(24,202,230,1)";
  let p2Color = "rgba(246,106,53,1)";

  player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize, p1Color);
  player2 = new Bike(p2StartX, p2StartY, playerSize, playerSize, p2Color);
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
          ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
          player1.draw(ctx1, player2.history, canvas1);
          player2.draw(ctx1, player1.history, canvas1);
          player1.particles()
          player2.particles()
        }
      }
    }
  }
  requestAnimationFrame(gameLoop);
});
