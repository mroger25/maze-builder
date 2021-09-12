export class Cell {
  constructor(i, j, s) {
    this.i = i;
    this.j = j;
    this.x = i * s;
    this.y = j * s;
    this.s = s;
    this.walls = { l: 1, r: 1, t: 1, b: 1 };
    this.visited = false;
  }

  checkNeighbors(grid) {
    const neighbors = [];
    if (grid[this.i - 1] && !grid[this.i - 1][this.j].visited)
      neighbors.push(grid[this.i - 1][this.j]); //left
    if (grid[this.i + 1] && !grid[this.i + 1][this.j].visited)
      neighbors.push(grid[this.i + 1][this.j]); //right
    if (grid[this.i][this.j - 1] && !grid[this.i][this.j - 1].visited)
      neighbors.push(grid[this.i][this.j - 1]); //top
    if (grid[this.i][this.j + 1] && !grid[this.i][this.j + 1].visited)
      neighbors.push(grid[this.i][this.j + 1]); //bottom

    const a = neighbors.length;
    if (a > 0) {
      const r = Math.floor(Math.random() * a);
      return neighbors[r];
    }
  }

  line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
  }

  highlight(ctx) {
    ctx.fillStyle = "rgba(0, 0, 255, 1)";
    ctx.fillRect(this.x, this.y, this.s, this.s);
  }

  draw(ctx) {
    if (this.visited) {
      ctx.fillStyle = "rgba(255, 0, 255, 0.4)";
      ctx.fillRect(this.x, this.y, this.s, this.s);
    }
    ctx.strokeStyle = "#DDD";
    // walls
    if (this.walls.l) this.line(ctx, this.x, this.y, this.x, this.y + this.s); //left
    if (this.walls.r)
      this.line(ctx, this.x + this.s, this.y, this.x + this.s, this.y + this.s); //right
    if (this.walls.t) this.line(ctx, this.x, this.y, this.x + this.s, this.y); //top
    if (this.walls.b)
      this.line(ctx, this.x, this.y + this.s, this.x + this.s, this.y + this.s); //bottom
  }
}
