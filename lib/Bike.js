var GamePiece = require("./GamePiece.js");

class Bike extends GamePiece {
  constructor(x, y, width, height, color) {
    super(x, y, width, height)
    this.color = color;
    this.history = [];
    this.direction;

  }
}

Bike.prototype.move = function () {
  switch (this.direction) {
  case "up":
    this.y -= 5
    break;
  case "down":
    this.y += 5
    break;
  case "left":
    this.x -= 5
    break;
  case "right":
    this.x += 5
    break;
  }
};

Bike.prototype.detectCollision = function (gamePiece) {
  this.history.forEach(function (obstacle) {
    if (gamePiece.x < obstacle.x + obstacle.width &&
      gamePiece.x + gamePiece.width > obstacle.x &&
      gamePiece.y < obstacle.y + obstacle.height &&
      gamePiece.height + gamePiece.y > obstacle.y) {
      //collision detected!
  //     console.log(`Collision Detected:
  //       ${gamePiece.x} < ${obstacle.x + obstacle.width} &&
  //       ${gamePiece.x + gamePiece.width} > ${obstacle.x} &&
  //       ${gamePiece.y} < ${obstacle.y + obstacle.height} &&
  //       ${gamePiece.height + gamePiece.y} > ${obstacle.y}`);
    }
  });
}

Bike.prototype.updateHistory = function (gamePiece) {
  this.history.push(gamePiece);
  // console.log(this.history);
}

Bike.prototype.draw = function (context) { // loops
  let newGamePiece = new GamePiece(this.x, this.y, this.width, this.height);

  this.move();
  this.detectCollision(newGamePiece);
  this.updateHistory(newGamePiece);
  context.fillRect(newGamePiece.x,
    newGamePiece.y, newGamePiece.width, newGamePiece.height);
  this.drawHistory(context)
};

Bike.prototype.drawHistory = function (context) {

  this.history.forEach(function(tail) {
    context.fillRect(tail.x,
      tail.y, tail.width, tail.height);
  })
};

module.exports = Bike;
