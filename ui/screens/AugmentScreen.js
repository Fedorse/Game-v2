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
      SUBTITLE_Y: 100,
    },
  };
  constructor(game) {
    super(game);
    this.visible = false;
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
    if (!this.isInitialized) {
      this.init();
    }
  }

  hide() {
    this.visible = false;
    this.game.isPaused = false;
    this.game.soundController.setMusicVolume(this.previousMusicVolume);
    this.destroy(false);
  }

  getRandomAugments() {
    return [...AUGMENT_CONFIG].sort(() => Math.random() - 0.5).slice(0, 3);
  }

  createTitle() {
    const titleText = new UIText(
      this.game,
      this.game.canvas.width / 2,
      AugmentScreen.LAYOUT.TITLE.Y,
      {
        text: 'Level Up!',
        font: 'bold 36px Arial',
        align: 'center',
        color: 'white',
      }
    );
    const subTitileText = new UIText(
      this.game,
      this.game.canvas.width / 2,
      AugmentScreen.LAYOUT.TITLE.SUBTITLE_Y,
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
    const selectedAugments = this.getRandomAugments(3);
    const layout = AugmentScreen.LAYOUT.CARD;

    const totalWidth =
      selectedAugments.length * layout.WIDTH +
      (selectedAugments.length - 1) * layout.SPACING;
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const startY = (this.game.canvas.height - layout.HEIGHT) / 2;

    selectedAugments.forEach((augment, index) => {
      const card = new UICard(
        this.game,
        startX + index * (layout.WIDTH + layout.SPACING),
        startY,
        layout.WIDTH,
        layout.HEIGHT,
        augment,
        () => this.selectAugment(augment)
      );
      console.log(card);
      this.addComponent(card);
    });
  }

  selectAugment(augment) {
    console.log(augment);
    augment.apply(this.game.player);
    this.hide();
  }

  render(context) {
    if (!this.visible) return;
    // opacity bg
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    super.render(context);
  }
}
