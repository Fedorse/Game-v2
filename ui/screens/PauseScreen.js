import { UIButton } from '../components/UIButton.js';
import { UIText } from '../components/UIText.js';
import { Screen } from './Screen.js';
export class PauseScreen extends Screen {
  static LAYOUT = {
    BUTTON: {
      WIDTH: 200,
      HEIGHT: 50,
      SPACING: 75,
      X: (game) => game.canvas.width / 2 - 100,
      START_Y: (game) => game.canvas.height / 2 - 75,
    },
    TITLE: {
      X: (game) => game.canvas.width / 2,
      Y: 100,
    },
  };
  createComponents() {
    this.createTitle();
    this.createButtons();
  }
  createTitle() {
    const { TITLE } = PauseScreen.LAYOUT;
    const title = new UIText(this.game, TITLE.X(this.game), TITLE.Y, {
      text: 'Pause',
      font: 'bold 36px Arial',
      color: 'black',
      align: 'center',
    });
    this.addComponent(title);
  }
  createButtons() {
    const buttons = [
      {
        text: 'Resume',
        action: () => {
          this.game.togglePause();
          this.game.screenManager.hideScreen('pause');
        },
      },
      {
        text: 'Settings',
        action: () => {
          this.game.screenManager.showScreen('settings');
        },
      },
      {
        text: 'Main menu',
        action: () => {
          this.game.screenManager.hideScreen('pause');
          this.game.screenManager.showScreen('mainMenu');
          this.game.resetGame();
        },
      },
    ];
    buttons.forEach((btn, index) => {
      const { BUTTON } = PauseScreen.LAYOUT;
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
