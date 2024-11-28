import { UIComponent } from '../components/UIComponent.js';

export class HealthBar extends UIComponent {
  constructor(game, player) {
    super(game);
    this.player = player;
  }

  render(context) {
    if (!this.visible) return;

    const currentHealth = this.player.stats.currentHealth;
    const maxHealth = this.player.stats.maxHealth;
    const healthPercentage = currentHealth / maxHealth;

    const barWidth = this.player.width;
    const barHeight = 10;
    const x = this.player.position.x - this.game.camera.x;
    const y = this.player.position.y - barHeight - 5 - this.game.camera.y; // 5 px above player

    // Фон полосы здоровья
    context.fillStyle = 'gray';
    context.fillRect(x, y, barWidth, barHeight);

    // Заполненная часть полосы здоровья
    context.fillStyle = 'green';
    context.fillRect(x, y, barWidth * healthPercentage, barHeight);

    // Рамка полосы здоровья
    context.strokeStyle = 'black';
    context.lineWidth = 0.5;
    context.strokeRect(x, y, barWidth, barHeight);
  }
}
