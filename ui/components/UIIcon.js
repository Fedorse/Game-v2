import { UIComponent } from './UIComponent.js';

export class UIIcon extends UIComponent {
  constructor(game, x, y, width, height, heroData, selectionScreen) {
    super(game, x, y, width, height);
    this.heroData = heroData;
    this.selectionScreen = selectionScreen;
    this.image = this.game.resourceManager.getImage(heroData.icon);
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
      this.selectionScreen.selectedHero = this.heroData;
      this.selectionScreen.renderHeroInfo(this.heroData);
    }
  }
  render(context) {
    if (!this.visible) return;
    if (this.image) {
      context.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
<<<<<<< Updated upstream
    } else {
      // Если изображения нет, заливаем цветом
      context.fillStyle = 'gray';
      context.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
=======
>>>>>>> Stashed changes
    }

    if (this.isHovered || this.selectionScreen.selectedHero === this.heroData) {
      context.strokeStyle = 'yellow';
      context.lineWidth = 5;
      context.beginPath();
      context.arc(
        this.position.x + this.width / 2, // Центр X
        this.position.y + this.height / 2, // Центр Y
        this.width / 2 + 5,
        0,
        Math.PI * 2
      );
      context.stroke();
    }
  }
}
