const GamePiece = require("./GamePiece.js");

class Bike extends GamePiece {
  constructor(x, y, width, height, color, ctx2) {
    super(x, y, width, height, color)
    this.history = [];
    this.direction;
    this.isAlive = true;
    this.aliveTime;
    this.size = 6;
    this.particleSize = 4;
  }
}

Bike.prototype.move = function() {
  switch (this.direction) {
    case "up":
      this.y -= this.size;
      break;
    case "down":
      this.y += this.size;
      break;
    case "left":
      this.x -= this.size;
      break;
    case "right":
      this.x += this.size;
      break;
  }
};

Bike.prototype.detectCollision = function(gamePiece, otherArray, canvas1) {
  let totalHistory = this.history.concat(otherArray);

  if (this.direction) {
    totalHistory.forEach(function(obstacle) {
      if (gamePiece.x < (obstacle.x + obstacle.width) && (gamePiece.x + gamePiece.width) > obstacle.x && gamePiece.y < (obstacle.y + obstacle.height) && (gamePiece.height + gamePiece.y) > obstacle.y) {
        this.isAlive = false;
        //     console.log(`Collision Detected:
        //       ${gamePiece.x} < ${obstacle.x + obstacle.width} &&
        //       ${gamePiece.x + gamePiece.width} > ${obstacle.x} &&
        //       ${gamePiece.y} < ${obstacle.y + obstacle.height} &&
        //       ${gamePiece.height + gamePiece.y} > ${obstacle.y}`);
      }
    }.bind(this));

    if (this.x >= canvas1.width - this.size) {
      this.x = 1;
    } else if (this.x <= 0) {
      this.x = canvas1.width - this.size;
    } else if (this.y >= canvas1.height - this.size) {
      this.y = 1;
    } else if (this.y <= 0) {
      this.y = canvas1.height - this.size;
    }
  }
}

Bike.prototype.updateHistory = function(gamePiece) {
  this.history.push(gamePiece);
}

Bike.prototype.draw = function(ctx1, otherArray, canvas1) { // loops
  let newGamePiece = new GamePiece(this.x, this.y, this.width, this.height);

  ctx1.fillStyle = this.color;
  ctx1.fillRect(newGamePiece.x, newGamePiece.y, newGamePiece.width, newGamePiece.height);
  if (this.direction) {
    this.aliveTime = this.aliveTime || Date.now();
    this.move();
    this.detectCollision(newGamePiece, otherArray, canvas1);
    this.updateHistory(newGamePiece);
    this.drawHistory(ctx1)
  }
};

Bike.prototype.drawHistory = function(ctx1) {
  let gameTime = Math.abs(this.aliveTime - Date.now());

  if (gameTime > 10000) {
    this.history.splice(0, 1);
  }
  this.history.forEach(function(tail) {
    ctx1.fillRect(tail.x, tail.y, tail.width, tail.height);
  })
};

Bike.prototype.particles = function() {

  // this.ctx1.fillRect(posX, posY, this.size, this.size);
  // this.ctx1.fillStyle = "#ffffff";
  // this.ctx1.fill();

};

/*=======================================
>>>>>>>>  particle  <<<<<<<<
========================================*/
/*
var circles = [];

function Create() {

  //Place the circles at the center

  //this.x = W / 2;
  //this.y = H / 2;
  console.log(this.x);

  //Random radius between 2 and 6
  this.radius = 2 + Math.random() * 3;

  //Random velocities
  this.vx = -5 + Math.random() * 10;
  this.vy = -5 + Math.random() * 10;

  //Random colors
  this.r = Math.round(Math.random()) * 255;
  this.g = Math.round(Math.random()) * 255;
  this.b = Math.round(Math.random()) * 255;
}

for (var i = 0; i < 500; i++) {
  circles.push(new Create());
}

function draw() {

  //Fill canvas with black color
  ctx2.globalCompositeOperation = "source-over";
  ctx2.fillStyle = "rgba(0,0,0,0.15)";
  ctx2.fillRect(0, 0, this.width, this.height);

  //Fill the canvas with circles
  for (var j = 0; j < circles.length; j++) {
    var c = circles[j];

    //Create the circles
    ctx2.beginPath();
    ctx2.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
    ctx2.fillStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 0.5)";
    ctx2.fill();

    c.x += c.vx;
    c.y += c.vy;
    c.radius -= .02;

    if (c.radius < 0)
      circles[j] = new Create();
    }
  }

function animate() {
  //requestAnimFrame(animate);
  draw();
}

animate();

*/

module.exports = Bike;
