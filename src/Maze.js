import { Cell } from "./Cell.js";

export class Maze {
  constructor(court, size) {
    this.court = court;
    this.size = size;
    this.cols = Math.floor(this.court.dim.w / this.size);
    this.rows = Math.floor(this.court.dim.h / this.size);
    this.grid = [];
    this.stack = [];
    this.farestCellIndex = 0;
    this.init();
  }
  init() {
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Cell(i, j, this.size);
      }
    }
    this.current = this.grid[0][0];
    this.farestCell = this.grid[0][0];
  }
  removeWalls(a, b) {
    let x = a.i - b.i;
    let y = a.j - b.j;
    if (x === 1) {
      a.walls.l = 0;
      b.walls.r = 0;
    } else if (x === -1) {
      a.walls.r = 0;
      b.walls.l = 0;
    } else if (y === 1) {
      a.walls.t = 0;
      b.walls.b = 0;
    } else if (y === -1) {
      a.walls.b = 0;
      b.walls.t = 0;
    }
  }
  draw(ctx) {
    this.current.highlight(ctx);
    this.farestCell.highlight(ctx);
    // STEP 1
    this.current.visited = true;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].draw(ctx, this.size);
      }
    }
    const next = this.current.checkNeighbors(this.grid);
    if (next) {
      // STEP 2
      this.stack.push(this.current);
      if (this.stack.length > this.farestCellIndex) {
        this.farestCell = this.current;
        this.farestCellIndex = this.stack.length;
      }
      // STEP 3
      this.removeWalls(this.current, next);
      // STEP 4
      this.current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      this.current = cell;
    }
  }
}
