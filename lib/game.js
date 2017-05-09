var Bike = require("./Bike.js")
const $ = require("./jquery.min.js");


const canvas1 = document.getElementById('bike');
const canvas2 = document.getElementById('particle');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

/*=======================================
>>>>>>>>  Audio  <<<<<<<<
========================================*/
var soundEfx1;
var soundEfx2;
var soundEfx3;
var soundEfx4;


soundEfx1 = document.getElementById("soundEfx1");
soundEfx2 = document.getElementById("soundEfx2");
soundEfx3 = document.getElementById("soundEfx3");
soundEfx4 = document.getElementById("soundEfx4");

/*=======================================
>>>>>>>>    <<<<<<<<
========================================*/

const playerSize = 6;
const p1StartX = canvas1.width * .16 - playerSize / 2;
const p1StartY = canvas1.height * .16 - playerSize / 2;
const p2StartX = canvas1.width * .86 - playerSize / 2;
const p2StartY = canvas1.height * .86 - playerSize / 2;

var $pauseButton = $('#pause');
var $newGameButton = $('#new-game');
var $gameOverlay = $('.popup');
var isGamePaused = false;
var isGameOver = false;
var gameStart = false;

var player1;
var player2;

var fps = 25;
var startingTime = new Date();

$pauseButton.on('click', pauseGame);
$newGameButton.on('click', initializeGame);

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 38 && player2.direction != "down") {
    player2.direction = "up";
  } else if (e.keyCode === 40 && player2.direction != "up") {
    player2.direction = "down";
  } else if (e.keyCode === 37 && player2.direction != "right") {
    player2.direction = "left";
  } else if (e.keyCode === 39 && player2.direction != "left") {
    player2.direction = "right";
  } else if (e.keyCode === 87 && player1.direction != "down") {
    player1.direction = "up";
  } else if (e.keyCode === 83 && player1.direction != "up") {
    player1.direction = "down";
  } else if (e.keyCode === 65 && player1.direction != "right") {
    player1.direction = "left";
  } else if (e.keyCode === 68 && player1.direction != "left") {
    player1.direction = "right";
  } else if (e.keyCode == 32) {
    pauseGame();
  } else if (e.keyCode == 78) {
    newGame();
  }
});

(function() {
  initializeGame();
})();

function checkGameOver() {
  if (!player1.isAlive || !player2.isAlive) {
    soundEfx4.play()
    isGameOver = true;
    let winner = player1.isAlive ? player1 : player2;
    gameOver();
    updateScore(winner);

  }
}

function updateScore(winner) {
  winner.score += 1;
  let score = ('0' + winner.score).slice(-2);
  $(`#${winner.name}score`).text(score);
}

function pauseGame() {
  isGamePaused = !isGamePaused;
  if (isGamePaused) {
    $gameOverlay.text('PAUSED');
    $gameOverlay.show(500);
  } else {
    $gameOverlay.hide(500);
  }
}

function initializeGame() {
  soundEfx1.play()
  $gameOverlay.hide();
  isGameOver = false;
  isGamePaused = false;
  gameStart = true;

  // TODO: Allow users to change the size of their player.
  // let playerSize = parseInt(document.getElementById('playerSize').value, 10);

  let p2Color = "rgba(24,202,230,1)";
  let p1Color = "rgba(246,106,53,1)";

  player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize, p1Color, ctx1, 'player1');
  player2 = new Bike(p2StartX, p2StartY, playerSize, playerSize, p2Color, ctx1, 'player2');
}

function newGame() {
  $gameOverlay.hide();
  isGameOver = false;
  isGamePaused = false;
  gameStart = true;
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  player1.reset(p1StartX, p1StartY, ctx1, false);
  player2.reset(p2StartX, p2StartY, ctx1, false);
}

function gameOver() {
  $gameOverlay.text('GAME OVER');
  $gameOverlay.show(500);
  //TODO: fancy up the UI and indicate that the game is over
}

requestAnimationFrame(function gameLoop() {




  if (gameStart) {
    let currentTime = new Date();

    if (!isGamePaused && !isGameOver) {
      if (currentTime - startingTime > 1000 / fps) {
        startingTime = currentTime;
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        player1.draw(ctx1, player2.history, canvas1);
        player2.draw(ctx1, player1.history, canvas1);
        //player1.particles()
        //player2.particles()
        checkGameOver();
      }
    }
  }
  requestAnimationFrame(gameLoop);
});
