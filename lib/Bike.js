const GamePiece = require("./GamePiece.js");

class Bike extends GamePiece {
  constructor(x, y, width, height, color, name) {
    super(x, y, width, height, color)
    this.name = name;
    this.history = [];
    this.direction = null;
    this.isAlive = true;
    this.aliveTime = null;
    this.size = 6;
    this.score = 0;
  }

  move() {
    this.setAliveTime();
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
  }

  setAliveTime() {
    this.aliveTime = this.aliveTime || Date.now();
  }

setDirection(){
  this.direction = direction;
}

  updateScore() {
    this.score += 1;
    return ('0' + this.score).slice(-2);
  }

  detectCollision(gamePiece, otherArray, canvas) {
    let totalHistory = this.history.concat(otherArray);

    if (this.direction) {
      totalHistory.forEach(function (obstacle) {
        if (gamePiece.x < obstacle.x + obstacle.width && gamePiece.x + gamePiece.width > obstacle.x && gamePiece.y < obstacle.y + obstacle.height && gamePiece.height + gamePiece.y > obstacle.y && this.isAlive) {

          this.isAlive = false;
        }
      }.bind(this));

      if (this.x >= canvas.width - this.size) {
        this.x = 1;

      } else if (this.x <= 0) {
        this.x = canvas.width - this.size;

      } else if (this.y >= canvas.height - this.size) {
        this.y = 1;

      } else if (this.y <= 0) {
        this.y = canvas.height - this.size;
      }
    }
  }

  updateHistory(gamePiece) {
    this.history.push(gamePiece);
  }

  reset(x, y, ctx, initializeGameFlag) {
    this.isAlive = true;
    this.direction = null;
    this.score = !initializeGameFlag ?
      this.score :
      0;
    this.history = [];
    this.aliveTime = Date.now();
    this.x = x;
    this.y = y;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  draw(ctx, otherArray, canvas) {
    let newGamePiece = new GamePiece(this.x, this.y, this.width, this.height);

    ctx.fillStyle = this.color;
    ctx.fillRect(newGamePiece.x,
      newGamePiece.y,
      newGamePiece.width,
      newGamePiece.height);

    if (this.direction && this.isAlive) {
      this.move();
      this.detectCollision(newGamePiece, otherArray, canvas);
      this.updateHistory(newGamePiece);
      this.drawHistory(ctx)
    }
  }

  drawHistory(ctx) {
    let gameTime = Math.abs(this.aliveTime - Date.now());

    if (gameTime > 10000) {
      this.history.splice(0, 1);
    }
    this.history.forEach(function (tail) {
      ctx.fillRect(tail.x, tail.y, tail.width, tail.height);
    })
  }
}

module.exports = Bike;
