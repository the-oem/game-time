// game.js
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const playerSize = 50
const p1StartX = canvas.width * .85 - playerSize / 2
const p2StartX = canvas.width * .15 - playerSize / 2
const p1StartY = canvas.height / 2 - playerSize / 2
const p2StartY = canvas.height / 2 - playerSize / 2

// context.fillRect( x, y, width, height );
context.fillRect(p1StartX, p1StartY, playerSize, playerSize);
context.fillRect(p2StartX, p2StartY, playerSize, playerSize);
