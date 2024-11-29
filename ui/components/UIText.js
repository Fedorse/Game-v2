import { UIComponent } from './UIComponent.js';

export class UIText extends UIComponent {
  constructor(game, x, y, options = {}) {
    super(game, x, y);
    this.text = options.text || '';
    this.font = options.font || '16px Arial';
    this.color = options.color || 'black';
    this.align = options.align || 'left';
    this.baseline = options.baseline || 'top';
    this.maxWidth = options.maxWidth;
    this.lineHeight = options.lineHeight || 20;
    this.multiline = options.multiline || false;
  }

  setText(text) {
    this.text = text;
  }

  render(context) {
    if (!this.visible) return;

    context.save();
    context.font = this.font;
    context.fillStyle = this.color;
    context.textAlign = this.align;
    context.textBaseline = this.baseline;

    if (this.multiline && this.maxWidth) {
      this.wrapText(context);
    } else {
      context.fillText(
        this.text,
        this.position.x,
        this.position.y,
        this.maxWidth
      );
    }

    context.restore();
  }

  wrapText(context) {
    const words = this.text.split(' ');
    let line = '';
    let y = this.position.y;

    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = context.measureText(testLine);

      if (metrics.width > this.maxWidth && line !== '') {
        context.fillText(line, this.position.x, y);
        line = word + ' ';
        y += this.lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, this.position.x, y);
  }
}
