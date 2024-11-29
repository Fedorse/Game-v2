export class UIComponent {
  constructor(game, x = 0, y = 0, width = 0, height = 0) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.position = { x, y };
    this.visible = true;
    this.isHovered = false;
    this.isEnabled = true;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  addEvents() {
    if (!this.isEnabled) return;
    this.game.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.game.canvas.addEventListener('mouseup', this.handleMouseUp);
  }

  removeEvents() {
    this.game.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.game.canvas.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(event) {
    if (!this.isEnabled) return;
    const rect = this.game.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.isHovered = this.isInside(x, y);
  }

  handleMouseDown(event) {
    if (!this.isEnabled || !this.isHovered) return;
    this.onMouseDown?.();
  }

  handleMouseUp(event) {
    if (!this.isEnabled || !this.isHovered) return;
    this.onMouseUp?.();
  }

  isInside(x, y) {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.width &&
      y >= this.position.y &&
      y <= this.position.y + this.height
    );
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  update(deltaTime) {}

  render(context) {
    if (!this.visible) return;
  }
}
