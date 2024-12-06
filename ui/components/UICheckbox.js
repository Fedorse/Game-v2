import { UIComponent } from './UIComponent.js';

export class UICheckbox extends UIComponent {
  constructor(
    game,
    x,
    y,
    width,
    height,
    images,
    isChecked = false,
    onChange = null
  ) {
    super(game, x, y, width, height);
    this.images = images;
    this.isChecked = isChecked;
    this.onChange = onChange;

    this.handleClick = this.handleClick.bind(this);
    this.addEvents();
  }
  addEvents() {
    super.addEvents();
    this.game.canvas.addEventListener('click', this.handleClick);
  }
  removeEvents() {
    super.removeEvents();
    this.game.canvas.removeEventListener('click', this.handleClick);
  }
  handleClick(event) {
    if (!this.isEnabled || !this.visible) return;
    const rect = this.game.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.isInside(x, y)) {
      this.toggle();
    }
  }
  toggle() {
    this.isChecked = !this.isChecked;
    if (this.onChange) {
      this.onChange(this.isChecked);
    }
  }
  render(context) {
    if (!this.visible) return;

    const image = this.isChecked ? this.images.checked : this.images.unchecked;
    context.drawImage(
      image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
