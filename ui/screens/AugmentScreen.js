import { Screen } from './Screen.js';
import { UICard } from '../components/UICard.js';
import { UIText } from '../components/UIText.js';
import { AUGMENT_CONFIG } from '../../configs/augmentConfig.js';

export class AugmentScreen extends Screen {
  static LAYOUT = {
    CARD: {
      WIDTH: 250,
      HEIGHT: 290,
      SPACING: 30,
    },
    TITLE: {
      Y: 60,
      X: (game) => game.canvas.width / 2,
      SUBTITLE_Y: 100,
    },
  };
  constructor(game) {
    super(game);
    this.previousMusicVolume = 0;
  }

  createComponents() {
    this.createTitle();
    this.createCards();
  }

  show() {
    super.show();
    this.game.isPaused = true;
    this.previousMusicVolume = this.game.soundController.musicVolume;
    this.game.soundController.setMusicVolume(this.previousMusicVolume * 0.2);
  }

  hide() {
    super.hide();
    this.game.isPaused = false;
    this.game.soundController.setMusicVolume(this.previousMusicVolume);
  }

  getRandomAugments() {
    return [...AUGMENT_CONFIG].sort(() => Math.random() - 0.5).slice(0, 3);
  }

  createTitle() {
    const { TITLE } = AugmentScreen.LAYOUT;
    const titleText = new UIText(this.game, TITLE.X(this.game), TITLE.Y, {
      text: 'Level Up!',
      font: 'bold 36px Arial',
      align: 'center',
      color: 'white',
    });
    const subTitileText = new UIText(
      this.game,
      TITLE.X(this.game),
      TITLE.SUBTITLE_Y,
      {
        text: 'Choose your upgrade',
        font: '24px Arial',
        align: 'center',
        color: 'white',
      }
    );
    this.addComponent(titleText);
    this.addComponent(subTitileText);
  }

  createCards() {
    const selectedAugments = this.getRandomAugments();
    const { CARD } = AugmentScreen.LAYOUT;

    const totalWidth = 3 * CARD.WIDTH + 2 * CARD.SPACING;
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const startY = (this.game.canvas.height - CARD.HEIGHT) / 2;

    selectedAugments.forEach((augment, index) => {
      const card = new UICard(
        this.game,
        startX + index * 280,
        startY,
        CARD.WIDTH,
        CARD.HEIGHT,
        augment,
        () => this.selectAugment(augment)
      );

      this.addComponent(card);
    });
  }

  selectAugment(augment) {
    augment.apply(this.game.player);
    this.game.screenManager.hideScreen('augment');
  }

  render(context) {
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    super.render(context);
  }
}
