import { CanvasActuator } from "./CanvasActuator.js";
import { Maze } from "./Maze.js";

class Sketck {
  constructor() {
    this.court = { pos: { x: 0, y: 0 }, dim: { w: 400, h: 400 } };
    this.canvas = new CanvasActuator(this.court, "#333");
    this.maze = new Maze(this.court, 20);
    this.setup();
  }
  setup() {
    this.canvas.on("draw", this.draw.bind(this));
  }
  draw(ctx) {
    this.maze.draw(ctx);
  }
}

new Sketck();
