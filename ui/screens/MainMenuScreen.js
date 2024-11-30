import { Screen } from './Screen.js';
import { UIButton } from '../components/UIButton.js';

export class MainMenuScreen extends Screen {
  constructor(game) {
    super(game);
    this.init();
  }

  createComponents() {
    const buttonConfig = {
      width: 200,
      height: 50,
      x: this.game.canvas.width / 2 - 100,
      spacing: 75,
    };
    const buttons = [
      { text: 'Start game', action: () => this.game.startGame() },
      { text: 'Settings', action: () => console.log('open settings') },
      { text: 'Exit', action: () => console.log('exit') },
    ];
    buttons.forEach((btn, index) => {
      const button = new UIButton(
        this.game,
        buttonConfig.x,
        this.game.canvas.height / 2 - 75 + buttonConfig.spacing * index,
        buttonConfig.width,
        buttonConfig.height,
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
