var assert = require('chai').assert;
var expect = require('chai').expect;
var Bike = require('../lib/Bike.js');
var GamePiece = require('../lib/GamePiece.js');


describe('Bike testing occurs here...', () => {
  const ctx = new Object({
    fillStyle: 'blue',
    fillRect: (x, y, xx, xy) => {}
  });
  const bike = new Bike(10, 10, 6, 6, "blue", 'player');
  const gamePiece1 = new GamePiece(10, 17, 6, 6, "blue");
  const gamePiece2 = new GamePiece(17, 17, 6, 6, "red");
  const canvas = {
    width: 600,
    height: 600
  };
  const opponentHistory = [{
    x: 17,
    y: 17,
    width: 6,
    height: 6,
    color: "red"
  }]

  it("should be an instance of bike...", () => {
    expect(bike).to.be.an.instanceof(Bike)
  });

  it("should have a set of default properties", () => {
    assert.deepEqual(bike.history, []);
    assert.equal(bike.direction, null);
    assert.equal(bike.isAlive, true);
    assert.equal(bike.aliveTime, null);
    assert.equal(bike.size, 6);
    assert.equal(bike.score, 0);
  });
  it("should have a name", () => {
    assert.equal(bike.name, 'player');
  });

  it("should have an x and y value", () => {
    assert.equal(bike.x, 10);
    assert.equal(bike.y, 10);
  })
  it("should have a height and width", () => {
    assert.equal(bike.width, 6);
    assert.equal(bike.height, 6);
  })
  it("should have a color", () => {
    assert.equal(bike.color, 'blue');
  })

  it('should move based on direction keys', () => {
    bike.direction = 'up';
    bike.move();
    assert.equal(bike.y, 4);
    bike.direction = 'down';
    bike.y = 10;
    bike.move();
    assert.equal(bike.y, 16);

    bike.direction = 'left';
    bike.move();
    assert.equal(bike.x, 4);

    bike.direction = 'right';
    bike.x = 10;
    bike.move();
    assert.equal(bike.y, 16);
  })
  it("should start the alive time, if it is not already set", () => {
    bike.aliveTime = 1000;
    bike.setAliveTime();
    assert.equal(bike.aliveTime, 1000);
    bike.aliveTime = null;
    bike.setAliveTime();
    assert.equal(bike.aliveTime, Date.now())
  })

  it("should update history", () => {
    assert.deepEqual(bike.history.length, 0);
    bike.updateHistory(gamePiece1);
    assert.deepEqual(bike.history.length, 1);
  })

  it("should collide with another object on the gameboard", () => {
    bike.x = 10;
    bike.y = 10;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.isAlive, true);
    bike.x = 8;
    bike.y = 14;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.isAlive, false);
    bike.isAlive = true
    bike.x = 20;
    bike.y = 20;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.isAlive, false);
  })

  it("should not collide with canvas edges", () => {
    bike.x = 601;
    bike.y = 10;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.x, 1);
    assert.equal(bike.y, 10);

    bike.x = 0;
    bike.y = 10;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.x, 594);
    assert.equal(bike.y, 10);

    bike.x = 20;
    bike.y = 600;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.x, 20);
    assert.equal(bike.y, 1);

    bike.x = 20;
    bike.y = 0;
    bike.detectCollision(bike, opponentHistory, canvas)
    assert.equal(bike.x, 20);
    assert.equal(bike.y, 594);
  })
  it('should reset properties', () => {
    bike.alive = false;
    bike.direction = 'up';
    bike.score = 10;
    bike.history.push(gamePiece1);
    bike.aliveTime = 1000;
    bike.x = 20;
    bike.y = 20;
    bike.reset(10, 10, ctx, false);
    assert.equal(bike.direction, null);
    assert.equal(bike.score, 10);
    assert.equal(bike.history.length, 0);
    assert.equal(bike.aliveTime, Date.now());
    assert.equal(bike.x, 10);
    assert.equal(bike.y, 10);

    bike.reset(10, 10, ctx, true);
    bike.score = 0;
  })
  // it('it should remove an object from history', () => {
  //   bike.history.push(gamePiece1);
  //   bike.history.push(gamePiece2);
  //   bike.drawHistory(ctx);
  //   assert.equal(bike.history.length, 2);
  //   console.log(bike.aliveTime);
  //   setTimeout(function(){bike.drawHistory(ctx)}, 11000);
  //   console.log(bike.aliveTime);
  //   assert.equal(bike.history.length, 1);
  // })

})
