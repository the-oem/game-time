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
  }
}

module.exports = Bike;
