import { Screen } from './Screen.js';
import { UIButton } from '../components/UIButton.js';

export class MainMenuScreen extends Screen {
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
    context.drawImage(
      menuBg,
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );
    super.render(context);
  }
}
