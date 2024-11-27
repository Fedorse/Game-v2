import { UIButton } from './uiButton.js';
export class MainMenu {
  constructor(game) {
    this.game = game;
    this.bg = this.game.resourceManager.getImage('menu');

    this.buttons = [];

    // start game button
    const startButton = new UIButton(
      this.game,
      this.game.canvas.width / 2 - 100,
      this.game.canvas.height / 2 - 75,
      200,
      50,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      'Start game',
      () => {
        this.game.startGame();
      }
    );
    // settings button
    const settngsButton = new UIButton(
      this.game,
      this.game.canvas.width / 2 - 100,
      this.game.canvas.height / 2,
      200,
      50,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      'Settings',
      () => {
        console.log('open settings');
      }
    );
    // exit button
    const exitButton = new UIButton(
      this.game,
      this.game.canvas.width / 2 - 100,
      this.game.canvas.height / 2 + 75,
      200,
      50,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      'Exit',
      () => {
        console.log('exit');
      }
    );
    this.buttons.push(startButton, settngsButton, exitButton);
  }
  render(context) {
    context.drawImage(
      this.bg,
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );
    this.buttons.forEach((button) => {
      button.render(context);
    });
  }
  removeEvents() {
    this.buttons.forEach((button) => {
      button.removeMouseEvents();
    });
  }
}
