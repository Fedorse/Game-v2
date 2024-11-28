export class UIComponent {
  constructor(game, x = 0, y = 0, width = 0, height = 0) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.position = { x, y };
    this.visible = true;
    this.isHovered = false;
  }
  update(deltaTime) {}
  render(context) {
    if (!this.visible) return;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  isInside(x, y) {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.width &&
      y >= this.position.y &&
      y <= this.position.y + this.height
    );
  }
}
