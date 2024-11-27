import { SwordWeapon } from '../weapon/SwordWeapon';
export class UiManager {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.upgradeAugmentsVisible = false;
    this.augmentOptions = [];
  }

  update() {}

  setPlayer(player) {
  this.player = player;
  }

  render(context) {
    // debug info ui
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`level: ${this.player.stats.level}`, 10, 40);
    this.renderTimer(context);
    // health bar player ui
    if (this.game.player.currentHealth !== this.game.player.maxHealth) {
      this.drawHealthBar(context);
    }

    this.drawHealthBar(context);
    // experience bar player ui
    this.renderExperienceBar(context);
    // pause ui
    this.rednderPause(context);
  }

  rednderPause(context) {
    if (this.game.isPaused) {
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
      context.fillStyle = 'white';
      context.font = '40px Arial';
      context.fillText(
        'Paused',
        this.game.canvas.width / 2 - 50,
        this.game.canvas.height / 2
      );
    }
  }

  renderTimer(context) {
    const timer = this.game.elapsedTime;
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    const timeString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(timeString, 30, this.game.canvas.height - 30);
  }

  renderExperienceBar(context) {
    const currentExperience = this.player.stats.experience;
    const nextLevelExp = this.player.stats.nextLevelUp;
    const barWidth = this.game.canvas.width - 20;
    const barHeight = 10;

    const x = 5;
    const y = 2;

    const experiencePercentage = currentExperience / nextLevelExp;

    context.fillStyle = 'gray';
    context.fillRect(x, y, barWidth, barHeight);

    context.fillStyle = 'blue';
    context.fillRect(x, y, barWidth * experiencePercentage, barHeight);

    context.strokeStyle = 'black';
    context.lineWidth = 0.5;
    context.strokeRect(x, y, barWidth, barHeight); // border of exp bar
  }
  drawHealthBar(context) {
    const barWidth = this.player.width;
    const barHeight = 10;
    const x = this.player.position.x - this.game.camera.x;
    const y = this.player.position.y - barHeight - 5 - this.game.camera.y; // 5 px above player

    const healthPercentage =
      this.player.stats.currentHealth / this.player.stats.maxHealth; // calculate health percentage

    context.fillStyle = 'gray';
    context.fillRect(x, y, barWidth, barHeight);

    context.fillStyle = 'green';
    context.fillRect(x, y, barWidth * healthPercentage, barHeight);

    context.strokeStyle = 'black';
    context.lineWidth = 0.5;
    context.strokeRect(x, y, barWidth, barHeight); // border of health bar
  }
}
