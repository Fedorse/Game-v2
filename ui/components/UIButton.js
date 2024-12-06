import { UIComponent } from './UIComponent.js';
export class UIButton extends UIComponent {
  constructor(game, x, y, width, height, images, text, onClick) {
    super(game, x, y, width, height);
    this.images = images; // {normal, hover, pressed}
    this.text = text;
    this.onClick = onClick;
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

  render(context) {
    if (!this.visible) return;
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
<<<<<<< Updated upstream
=======
    if (this.isPressed) {
      return this.images.pressed || this.images.normal || null;
    }
    if (this.isHovered) {
      return this.images.hover || this.images.normal || null;
    }
    return this.images.normal || this.images.normal || null;
>>>>>>> Stashed changes
  }
}
