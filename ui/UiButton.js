export class UIButton {
  constructor(game, x, y, width, height, images, text, onClick) {
    this.game = game;
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.images = images; // {normal, hover, pressed}
    this.text = text;
    this.onClick = onClick;
    this.isHovered = false;
    this.isPressed = false;
    this.isEnabled = true;

    this.addMouseEvents();
  }

  addMouseEvents() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.game.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.game.canvas.addEventListener('mouseup', this.handleMouseUp);
  }

  removeMouseEvents() {
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
    if (!this.isEnabled) return;
    if (this.isHovered) {
      this.isPressed = true;
    }
  }

  handleMouseUp(event) {
    if (!this.isEnabled) return;
    if (this.isPressed && this.isHovered) {
      this.onClick();
    }
    this.isPressed = false;
  }

  isInside(x, y) {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.width &&
      y >= this.position.y &&
      y <= this.position.y + this.height
    );
  }

  render(context) {
    let image;
    if (!this.isEnabled) {
      image = this.images.normal;
    } else if (this.isPressed) {
      image = this.images.pressed;
    } else if (this.isHovered) {
      image = this.images.hover;
    } else {
      image = this.images.normal;
    }

    context.drawImage(
      image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.text) {
      context.fillStyle = 'black';
      context.font = '20px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const textX = this.position.x + this.width / 2;
      const textY = this.position.y + this.height / 2;
      context.fillText(this.text, textX, textY);
    }
  }
}
