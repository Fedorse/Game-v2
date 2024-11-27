export class HeroIcon {
  constructor(game, x, y, width, height, heroData, selectionScreen) {
    this.game = game;
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.heroData = heroData;
    this.selectionScreen = selectionScreen;
    this.image = this.game.resourceManager.getImage(heroData.icon);
    this.isHovered = false;
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
  isInside(x, y) {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.width &&
      y >= this.position.y &&
      y <= this.position.y + this.height
    );
  }
  render(context) {
    if (this.image) {
      context.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      // Если изображения нет, заливаем цветом
      context.fillStyle = 'gray';
      context.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
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
