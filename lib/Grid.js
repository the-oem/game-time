class Grid {
  constructor(separation, color, strokeWidth) {
    this.separation = separation;
    this.color = color;
    this.strokeWidth = strokeWidth;
  }

  drawGrid(canvas) {
    const options = {
      separation: this.separation,
      color: this.color,
      strokeWidth: this.strokeWidth
    }
    
    this.drawGridLines(canvas, options);
    return;
  }

  drawGridLines(canvas, options) {
    const iWidth = canvas.width;
    const iHeight = canvas.height;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = options.color;
    ctx.strokeWidth = options.strokeWidth;

    ctx.beginPath();

    var iCount = null;
    var i = null;
    var x = null;
    var y = null;

    iCount = Math.floor(iWidth / options.separation);

    for (i = 1; i <= iCount; i++) {
      x = (i * options.separation);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, iHeight);
      ctx.stroke();
    }

    iCount = Math.floor(iHeight / options.separation);

    for (i = 1; i <= iCount; i++) {
      y = (i * options.separation);
      ctx.moveTo(0, y);
      ctx.lineTo(iWidth, y);
      ctx.stroke();
    }

    ctx.closePath();
    return;
  }
}

module.exports = Grid;
