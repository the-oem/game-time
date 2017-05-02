var GamePiece = require("./GamePiece.js");

/*
function Bike(x, y, width, height, color) {
  GamePiece.call(this, x, y, width, height);
  this.color = color;
}
*/

class Bike extends GamePiece {
  constructor (x, y, width, height, color) {
    super(x, y, width, height)
    this.color = color;
    this.history = [];
    this.direction;
  }
}

Bike.prototype.move = function () {
  var collision = this.history.find(function(obstacle) {
    return {x: this.x, y: this.y, width: this.width, height: this.height};
  })
  //console.log(collision);
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
  this.history.push({x: this.x, y: this.y, width: this.width, height: this.height});
};

Bike.prototype.draw = function (context) {
  this.move();

  context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Bike;
