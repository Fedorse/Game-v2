import { UIComponent } from '../components/UIComponent.js';

export class Timer extends UIComponent {
  constructor(game, player) {
    super(game);
    this.player = player;
  }

  render(context) {
    const timer = this.game.elapsedTime;
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    const timeString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(timeString, 30, this.game.canvas.height - 30);
  }
}
