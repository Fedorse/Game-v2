import { UIComponent } from './UIComponent.js';

export class UIIcon extends UIComponent {
  constructor(game, x, y, width, height, heroData, selectionScreen) {
    super(game, x, y, width, height);
    this.heroData = heroData;
    this.selectionScreen = selectionScreen;
    this.image = this.game.resourceManager.getImage(heroData.icon);

    this.addEvents();
  }

  onMouseDown() {
    if (this.isHovered) {
      this.selectionScreen.selectedHero = this.heroData;
      this.selectionScreen.renderHeroInfo(this.heroData);
    }
  }

  render(context) {
    if (!this.visible) return;
    context.save();
    this.renderIcon(context);
    this.renderSelectionIndicator(context);
    context.restore();
  }
  renderIcon(context) {
    if (this.image) {
      context.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      // Fallback
      context.fillStyle = 'gray';
      context.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }
  renderSelectionIndicator(context) {
    if (this.isHovered || this.selectionScreen.selectedHero === this.heroData) {
      context.strokeStyle = 'yellow';
      context.lineWidth = 5;
      context.beginPath();
      context.arc(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2,
        this.width / 2 + 5,
        0,
        Math.PI * 2
      );
      context.stroke();
    }
  }
}
