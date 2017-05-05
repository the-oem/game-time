var GamePiece = require("./GamePiece.js");

class Bike extends GamePiece {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color)
    this.history = [];
    this.direction;
    this.isAlive = true;
  }
}

Bike.prototype.move = function () {
  switch (this.direction) {
  case "up":
    this.y -= 6
    break;
  case "down":
    this.y += 6
    break;
  case "left":
    this.x -= 6
    break;
  case "right":
    this.x += 6
    break;
  }
};

Bike.prototype.detectCollision = function (gamePiece, otherArray, canvas) {
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

    if (this.x >= canvas.width - 6) {
      this.x = 0;
    } else if (this.x <= 0) {
      this.x = canvas.width - 6;
    } else if (this.y >= canvas.height - 6) {
      this.y = 0;
    } else if (this.y <= 0) {
      this.y = canvas.height - 6;
    }
    // if (this.x <= 0 ||
    //   this.x >= canvas.width ||
    //   this.y <= 0 ||
    //   this.y >= canvas.height) {
    //   this.isAlive = false;
    // }
  }
}

Bike.prototype.updateHistory = function (gamePiece) {
  this.history.push(gamePiece);
}

Bike.prototype.draw = function (context, otherArray, canvas) { // loops
  let newGamePiece = new GamePiece(this.x, this.y, this.width, this.height);

  context.fillStyle = this.color;
  context.fillRect(newGamePiece.x,
    newGamePiece.y, newGamePiece.width, newGamePiece.height);
  if (this.direction) {
    this.move();
    this.detectCollision(newGamePiece, otherArray, canvas);
    this.updateHistory(newGamePiece);
    this.drawHistory(context)
  }
};

Bike.prototype.drawHistory = function (context) {
  this.history.forEach(function (tail) {
    context.fillRect(tail.x,
      tail.y, tail.width, tail.height);
  })
};

module.exports = Bike;
