import { expect } from 'chai'
import GamePiece from '../lib/GamePiece.js'

describe('GamePiece testing occurs here...', () => {

  it("should be an instance of GamePiece", () => {
    var gamePiece = new GamePiece();

    expect(gamePiece).to.be.an.instanceof(GamePiece);
  });

  it("should have an x and y value", () => {
    var gamePiece = new GamePiece(10, 20);

    expect(gamePiece.x).to.equal(10);
    expect(gamePiece.y).to.equal(20);
  })

  it("should have a width and height", () => {
    var gamePiece = new GamePiece(10, 20, 100, 200);

    expect(gamePiece.width).to.equal(100);
    expect(gamePiece.height).to.equal(200);
  })

  it("should have a color", () => {
    var gamePiece = new GamePiece(10, 20, 100, 200, 'blue');

    expect(gamePiece.color).to.equal('blue');
  })

  it("should have a creation time of Now by default", () => {
    var gamePiece = new GamePiece(10, 20, 100, 200, 'blue');

    expect(gamePiece.creationTime).to.equal(Date.now());
  })
})
