import { UIComponent } from '../components/UIComponent.js';

export class ExperienceBar extends UIComponent {
  constructor(game, player) {
    super(game);
    this.player = player;
  }

  render(context) {
    const currentExperience = this.player.stats.experience;
    const nextLevelExp = this.player.stats.nextLevelExperience;
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
}
