import { expect } from 'chai'
import Grid from '../lib/Grid.js'

describe('Grid testing occurs here...', () => {

  it("should be an instance of Grid...", () => {
    var grid = new Grid();

    expect(grid).to.be.an.instanceof(Grid)
  });

  it("should have a line separation property", () => {
    var grid = new Grid(24);

    expect(grid.separation).to.equal(24);
  });

  it("should have a color property", () => {
    var grid = new Grid(24, '#FFFFFF');

    expect(grid.color).to.equal('#FFFFFF');
  });

  it("should have a stroke width property", () => {
    var grid = new Grid(24, '#FFFFFF', 1);

    expect(grid.strokeWidth).to.equal(1);
  })

})
