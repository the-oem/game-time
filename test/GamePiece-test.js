import { expect } from 'chai'
import GamePiece from '../lib/GamePiece.js'

describe('GamePiece testing occurs here...', () => {

  it("should be an instance of GamePiece", () => {
    var gamePiece = new GamePiece(10, 10, 6, 6, 'blue');
    expect(gamePiece).to.be.an.instanceof(GamePiece);
  });
})
