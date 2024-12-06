import { Screen } from './Screen.js';
import { UIButton } from '../components/UIButton.js';
import { UIText } from '../components/UIText.js';
import { UICheckbox } from '../components/UICheckbox.js';

export class SettingsScreen extends Screen {
  static LAYOUT = {
    BUTTON: {
      WIDTH: 200,
      HEIGHT: 50,
      SPACING: 75,
      X: (game) => game.canvas.width / 2 - 75,
      Y: (game) => game.canvas.height / 2 - 30,
    },
    TITLE: {
      X: (game) => game.canvas.width / 2,
      Y: 100,
    },
    CHECKBOX_MUSIC: {
      SIZE: 16,
      X: (game) => game.canvas.width / 2 - 150,
      Y: 200,
    },
    CHECKBOX_SFX: {
      SIZE: 16,
      X: (game) => game.canvas.width / 2 + 50,
      Y: 200,
    },
  };
  createComponents() {
    this.createTitle();
    this.createBackButton();
    this.createCheckbox();
  }
  createTitle() {
    const { TITLE } = SettingsScreen.LAYOUT;
    const title = new UIText(this.game, TITLE.X, TITLE.Y, {
      text: 'Settings',
      font: 'bold 36px Arial',
      color: 'black',
      align: 'center',
    });
    this.addComponent(title);
  }
  createBackButton() {
    const { BUTTON } = SettingsScreen.LAYOUT;
    const button = new UIButton(
      this.game,
      BUTTON.X(this.game),
      BUTTON.Y(this.game),
      BUTTON.WIDTH,
      BUTTON.HEIGHT,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      'Back',
      () => this.goBack()
    );
    this.addComponent(button);
  }

  createCheckbox() {
    const { CHECKBOX_MUSIC, CHECKBOX_SFX } = SettingsScreen.LAYOUT;
    const checkboxImages = {
      checked: this.game.resourceManager.getImage('checked'),
      unchecked: this.game.resourceManager.getImage('unchecked'),
    };
    const checkboxMusic = new UICheckbox(
      this.game,
      CHECKBOX_MUSIC.X(this.game),
      CHECKBOX_MUSIC.Y,
      CHECKBOX_MUSIC.SIZE,
      CHECKBOX_MUSIC.SIZE,
      checkboxImages,
      !this.game.soundController.isMusicMuted,
      (isChecked) => {
        this.toggleMusic(isChecked);
      }
    );
    this.addComponent(checkboxMusic);

    const musicLabel = new UIText(
      this.game,
      CHECKBOX_MUSIC.X(this.game) + CHECKBOX_MUSIC.SIZE + 10,
      CHECKBOX_MUSIC.Y,
      {
        text: 'Music',
        font: '20px Arial',
        color: 'black',
        align: 'left',
        baseline: 'top',
      }
    );
    this.addComponent(musicLabel);

    const sfcCheckbox = new UICheckbox(
      this.game,
      CHECKBOX_SFX.X(this.game),
      CHECKBOX_SFX.Y,
      CHECKBOX_SFX.SIZE,
      CHECKBOX_SFX.SIZE,
      checkboxImages,
      !this.game.soundController.isSoundMuted,
      (isChecked) => {
        this.toggleSound(isChecked);
      }
    );
    this.addComponent(sfcCheckbox);
    const sfcLabel = new UIText(
      this.game,
      CHECKBOX_SFX.X(this.game) + CHECKBOX_SFX.SIZE + 10,
      CHECKBOX_SFX.Y,
      {
        text: 'Sound Effects',
        font: '20px Arial',
        color: 'black',
        align: 'left',
        baseline: 'top',
      }
    );
    this.addComponent(sfcLabel);
  }
  toggleMusic(isChecked) {
    if (isChecked) {
      this.game.soundController.unmuteMusic();
    } else {
      this.game.soundController.muteMusic();
    }
  }
  toggleSound(isChecked) {
    if (isChecked) {
      this.game.soundController.unmuteSound();
    } else {
      this.game.soundController.muteSound();
    }
  }

  goBack() {
    super.hide();
    this.game.screenManager.hideScreen('settings');
    if (this.game.isPaused) {
      this.game.screenManager.showScreen('pause');
    } else {
      this.game.screenManager.showScreen('mainMenu');
    }
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
