import { UIComponent } from './UIComponent.js';
export class UICard extends UIComponent {
  constructor(game, x, y, width, height, augment, onClick) {
    super(game, x, y, width, height);
    this.augment = augment;
    this.onClick = onClick;

    this.addEvents();
  }

  addEvents() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.game.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.addEventListener('mousedown', this.handleMouseDown);
  }

  removeEvents() {
    this.game.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseMove(event) {
    const rect = this.game.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.isHovered = this.isInside(x, y);
  }

  handleMouseDown(event) {
    if (this.isHovered) {
      this.onClick();
    }
  }

  render(context) {
    // Отрисовка спрайта карты
    const cardSprite = this.game.resourceManager.getImage('card');
    if (cardSprite) {
      context.drawImage(
        cardSprite,
        this.position.x,
        this.position.y + 40,
        this.width,
        this.height
      );
    }

    // Если карта в фокусе, добавляем подсветку
    if (this.isHovered) {
      const hoverSprite = this.game.resourceManager.getImage('cardHover');
      if (hoverSprite) {
        context.drawImage(
          hoverSprite,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
      } else {
        // Fallback - простая подсветка рамки если спрайт недоступен
        context.strokeStyle = 'gold';
        context.lineWidth = 3;
        context.strokeRect(
          this.position.x,
          this.position.y + 40,
          this.width,
          this.height
        );
      }
    }

    // Название
    context.fillStyle = 'black';
    context.font = 'bold 20px Arial';
    context.textAlign = 'center';
    context.fillText(
      this.augment.name,
      this.position.x + this.width / 2,
      this.position.y + 130
    );

    // Описание
    context.font = '14px Arial';
    this.wrapText(
      context,
      this.augment.description,
      this.position.x + this.width / 2,
      this.position.y + 170,
      this.width - 40,
      25
    );
  }

  // Функция для переноса текста
  wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
}
