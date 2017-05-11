var Bike = require("./Bike.js");
var Grid = require("./Grid.js");
var SoundFX = require("./SoundFX.js");
const $ = require("./jquery.min.js");

const canvas1 = document.getElementById('bike');
const canvas2 = document.getElementById('particle');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

/*=======================================
>>>>>>>>  Audio  <<<<<<<<
========================================*/
const soundFxIntro = new SoundFX(document.getElementById("soundEfx1"));
const soundFxBike = new SoundFX(document.getElementById("soundEfx2"));
const soundFxCrash = new SoundFX(document.getElementById("soundEfx3"));

/*=======================================
>>>>>>>>  Main Game Functions  <<<<<<<<
========================================*/

const playerSize = 6;
const p1StartX = canvas1.width * .16 - playerSize / 2;
const p1StartY = canvas1.height * .16 - playerSize / 2;
const p2StartX = canvas1.width * .86 - playerSize / 2;
const p2StartY = canvas1.height * .86 - playerSize / 2;

const $pauseButton = $('#pause');
const $newGameButton = $('#new-game');
const $resetGameButton = $('#reset-game');
const $gameOverlay = $('.pause');
const uiAnimationDelay = 500;
const introText = 'PRESS N TO START'
const pausedText = 'PAUSED';
const nextRoundText = 'PRESS N FOR NEXT ROUND';
const gameOverText = 'GAME OVER';
var isGamePaused = false;
var isGameOver = false;
var gameStart = false;

var player1;
var player2;
const p1Color = "rgba(246,106,53,1)";
const p2Color = "rgba(24,202,230,1)";

var fps = 25;
var startingTime = new Date();

$pauseButton.on('click', pauseGame);
$newGameButton.on('click', newGame);
$resetGameButton.on('click', initializeGame);

let keys = {
  38: () => {
    if (player2.direction !== "down") {
      player2.direction = "up"
    }
  },
  40: () => {
    if (player2.direction !== "up") {
      player2.direction = "down";
    }
  },
  37: () => {
    if (player2.direction !== "right") {
      player2.direction = "left";
    }
  },
  39: () => {
    if (player2.direction !== "left") {
      player2.direction = "right"
    }
  },
  87: () => {
    if (player1.direction !== "down") {
      player1.direction = "up"
    }
  },
  83: () => {
    if (player1.direction !== "up") {
      player1.direction = "down"
    }
  },
  65: () => {
    if (player1.direction !== "right") {
      player1.direction = "left"
    }
  },
  68: () => {
    if (player1.direction !== "left") {
      player1.direction = "right"
    }
  },
  32: () => {
    pauseGame();
  },
  78: () => {
    newGame();
  },
  82: () => {
    initializeGame();
  }
}

window.addEventListener('keydown', (e) => {
  if (keys[e.keyCode]) {
    keys[e.keyCode]();
  }
});

(function () {
  initializeGame();
})();

function checkGameOver() {
  if (!player1.isAlive || !player2.isAlive) {
    isGameOver = true;
    let winner = player1.isAlive ?
      player1 :
      player2;

    gameOver();
    updateScore(winner);
  }
}

function updateScore(winner) {
  $(`#${winner.name}score`).text(winner.updateScore());
}

function resetScore(){
  $('#player1score').text('00');
  $('#player2score').text('00');
}

function pauseGame() {
  isGamePaused = !isGamePaused;
  if (isGamePaused) {
    $gameOverlay.text(pausedText);
    $gameOverlay.show(uiAnimationDelay);
    soundFxBike.pausePlay();
  } else {
    $gameOverlay.hide(uiAnimationDelay);
    soundFxBike.resumePlay();
  }
}

function initializeGame() {
  soundFxBike.stopSound();
  soundFxCrash.stopSound();
  soundFxIntro.playSound();
  var grid = new Grid(24, '#457585', 1);
  grid.drawGrid(canvas2);

  resetScore();
  $gameOverlay.text(introText);
  $gameOverlay.show(uiAnimationDelay);
  isGameOver = false;
  isGamePaused = false;
  gameStart = true;

  player1 = new Bike(p1StartX, p1StartY, playerSize, playerSize, p1Color, 'player1');
  player2 = new Bike(p2StartX, p2StartY, playerSize, playerSize, p2Color, 'player2');
}

function newGame() {
  $gameOverlay.hide();
  isGameOver = false;
  isGamePaused = false;
  gameStart = true;
  fps = getFPS();
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  player1.reset(p1StartX, p1StartY, ctx1, false);
  player2.reset(p2StartX, p2StartY, ctx1, false);
  player1.direction = "right"
  player2.direction = "left"
  soundFxIntro.stopSound();
  soundFxBike.playSound();
}

function gameOver() {
  $gameOverlay.text(nextRoundText);
  $gameOverlay.show(uiAnimationDelay);
  soundFxCrash.playSoundNoLoop();
  soundFxBike.stopSound();
}

function getFPS(){
  $("input[name='difficulty']").blur();
  return $("input[name='difficulty']:checked").val();
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
        checkGameOver();
      }
    }
  }
  requestAnimationFrame(gameLoop);
});
