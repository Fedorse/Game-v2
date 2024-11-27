import { UIButton } from './uiButton.js';
export class MainMenu {
  constructor(game) {
    this.game = game;
    this.bg = this.game.resourceManager.getImage('menu');
    this.buttons = this.createButtons();
  }
  createButton(y, text, onClick) {
    return new UIButton(
      this.game,
      this.game.canvas.width / 2 - 100,
      y,
      200,
      50,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      text,
      onClick
    );
  }
  createButtons() {
    const baseY = this.game.canvas.height / 2 - 75;
    const spacing = 75;

    return [
      this.createButton(baseY, 'Start game', () => {
        this.game.startGame();
      }),
      this.createButton(baseY + spacing, 'Settings', () => {
        console.log('open settings');
      }),
      this.createButton(baseY + spacing * 2, 'Exit', () => {
        console.log('exit');
      }),
    ];
  }
  render(context) {
    context.drawImage(
      this.bg,
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );
    this.buttons.forEach((button) => button.render(context));
  }
  removeEvents() {
    this.buttons.forEach((button) => button.removeMouseEvents());
  }
}
