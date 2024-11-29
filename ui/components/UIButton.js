import { UIComponent } from './UIComponent.js';
import { UIText } from './UIText.js';

export class UIButton extends UIComponent {
  constructor(game, x, y, width, height, images, text, onClick) {
    super(game, x, y, width, height);
    this.images = images;
    this.text = text;
    this.isPressed = false;
    this.onClick = onClick;
    this.textComponent = new UIText(game, x + width / 2, y + height / 2, {
      text: this.text,
      font: '20px Arial',
      color: 'black',
      align: 'center',
      baseline: 'middle',
    });

    this.addEvents();
  }

  onMouseDown() {
    this.isPressed = true;
  }

  onMouseUp() {
    if (this.isPressed) {
      this.onClick?.();
    }
    this.isPressed = false;
  }

  render(context) {
    if (!this.visible) return;

    const image = this.getButtonImage();
    context.drawImage(
      image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.textComponent.render(context);
  }

  getButtonImage() {
    if (!this.isEnabled) {
      return this.images.disabled || this.images.normal;
    }
    if (this.isPressed) {
      return this.images.pressed;
    }
    if (this.isHovered) {
      return this.images.hover;
    }
    return this.images.normal;
  }
}
