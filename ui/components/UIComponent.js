export class UIComponent {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.isVisible = true;
  }
  isInside(x, y) {
    x >= this.posision.x &&
      x <= this.position.x + this.width &&
      y >= this.position.y &&
      y <= this.position.y + this.height;
  }
}
