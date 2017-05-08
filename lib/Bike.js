const GamePiece = require("./GamePiece.js");

class Bike extends GamePiece {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color)
    this.history = [];
    this.direction;
    this.isAlive = true;
    this.aliveTime = Date.now();
    this.size = 6;
    this.particleSize = 4;
  }
}

Bike.prototype.move = function () {
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

Bike.prototype.detectCollision = function (gamePiece, otherArray, canvas1) {
  let totalHistory = this.history.concat(otherArray);

  if (this.direction) {
    totalHistory.forEach(function (obstacle) {
      if (gamePiece.x < (obstacle.x + obstacle.width) &&
        (gamePiece.x + gamePiece.width) > obstacle.x &&
        gamePiece.y < (obstacle.y + obstacle.height) &&
        (gamePiece.height + gamePiece.y) > obstacle.y) {
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
    } else if (this.x <= 1) {
      this.x = canvas1.width - this.size;
    } else if (this.y >= canvas1.height - this.size) {
      this.y = 1;
    } else if (this.y <= 1) {
      this.y = canvas1.height - this.size;
    }
  }
}

Bike.prototype.updateHistory = function (gamePiece) {
  this.history.push(gamePiece);
}

Bike.prototype.draw = function (ctx1, otherArray, canvas1) { // loops
  let newGamePiece = new GamePiece(this.x, this.y, this.width, this.height);

  ctx1.fillStyle = this.color;
  ctx1.fillRect(newGamePiece.x,
    newGamePiece.y, newGamePiece.width, newGamePiece.height);
  if (this.direction) {
    this.move();
    this.detectCollision(newGamePiece, otherArray, canvas1);
    this.updateHistory(newGamePiece);
    this.drawHistory(ctx1)
  }
};

Bike.prototype.drawHistory = function (ctx1) {
  let gameTime = Math.abs(this.aliveTime - Date.now());

  if (gameTime > 10000) {
    this.history.splice(0, 1);
  }
  this.history.forEach(function (tail) {
    ctx1.fillRect(tail.x,
      tail.y, tail.width, tail.height);
  })
};

Bike.prototype.particles = function () {
  console.log(this.x);
  // this.ctx1.fillRect(posX, posY, this.size, this.size);
  // this.ctx1.fillStyle = "#ffffff";
  // this.ctx1.fill();

};

module.exports = Bike;
