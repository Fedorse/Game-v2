import { Screen } from './Screen.js';
import { UIButton } from '../components/UIButton.js';

export class MainMenuScreen extends Screen {
<<<<<<< Updated upstream
  constructor(game) {
    super(game);
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
    if (!this.visible) return;
=======
  static LAYOUT = {
    BUTTON: {
      WIDTH: 200,
      HEIGHT: 50,
      SPACING: 75,
      X: (game) => game.canvas.width / 2 - 100,
      START_Y: (game) => game.canvas.height / 2 - 75,
    },
  };
  createComponents() {
    const buttons = [
      {
        text: 'Start game',
        action: () => {
          this.game.state = 'heroSelection';
          this.game.screenManager.hideScreen('mainMenu');
          this.game.screenManager.showScreen('heroSelection');
        },
      },
      {
        text: 'Settings',
        action: () => {
          this.game.state = 'settings';
          this.game.screenManager.hideScreen('mainMenu');
          this.game.screenManager.showScreen('settings');
        },
      },
      { text: 'Exit', action: () => console.log('exit') },
    ];
    buttons.forEach((btn, index) => {
      const { BUTTON } = MainMenuScreen.LAYOUT;
      const button = new UIButton(
        this.game,
        BUTTON.X(this.game),
        BUTTON.START_Y(this.game) + BUTTON.SPACING * index,
        BUTTON.WIDTH,
        BUTTON.HEIGHT,
        {
          normal: this.game.resourceManager.getImage('btnNormal'),
          hover: this.game.resourceManager.getImage('btnHover'),
          pressed: this.game.resourceManager.getImage('btnPressed'),
        },
        btn.text,
        btn.action
      );
      this.addComponent(button);
    });
  }
  render(context) {
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    const menuBg = this.game.resourceManager.getImage('menu');
>>>>>>> Stashed changes
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
