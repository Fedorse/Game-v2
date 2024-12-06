import { Screen } from './Screen.js';
import { UICard } from '../components/UICard.js';
import { SwordWeapon } from '../../weapon/SwordWeapon.js';

export class AugmentScreen extends Screen {
  static LAYOUT = {
    CARD: {
      WIDTH: 250,
      HEIGHT: 290,
      SPACING: 30,
    },
<<<<<<< Updated upstream
  };
  constructor(game) {
    super(game);
    this.visible = false;
    this.cards = [];
    this.augments = [
      {
        name: 'Health Boost',
        description: 'Increase max health by 20%',
        icon: 'healthIcon',
        apply: (player) => {
          player.stats.maxHealth *= 1.2;
          player.stats.currentHealth = player.stats.maxHealth;
        },
      },
      {
        name: 'Speed Up',
        description: 'Increase movement speed by 15%',
        icon: 'speedIcon',
        apply: (player) => {
          player.stats.speed *= 1.15;
        },
      },
      {
        name: 'Defense Up',
        description: 'Increase defense by 5',
        icon: 'defenseIcon',
        apply: (player) => {
          player.stats.defence += 5;
        },
      },
      {
        name: 'Sword Master',
        description: 'Add a sword weapon',
        icon: 'swordIcon',
        apply: (player) => {
          player.weaponManager.addWeapon(SwordWeapon);
        },
      },
    ];
=======
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
>>>>>>> Stashed changes
  }

  show() {
    this.visible = true;
    this.game.isPaused = true;
<<<<<<< Updated upstream
    this.createCards();
=======
    this.previousMusicVolume = this.game.soundController.musicVolume;
    this.game.soundController.setMusicVolume(this.previousMusicVolume * 0.2);
>>>>>>> Stashed changes
  }

  hide() {
    super.hide();
    this.game.isPaused = false;
<<<<<<< Updated upstream
    this.cards.forEach((card) => card.removeEvents());
    this.cards = [];
  }

  createCards() {
    const selectedAugments = [...this.augments]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const layout = AugmentScreen.LAYOUT.CARD;
    const totalWidth =
      selectedAugments.length * layout.WIDTH +
      (selectedAugments.length - 1) * layout.SPACING;
=======
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
>>>>>>> Stashed changes
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const startY = (this.game.canvas.height - CARD.HEIGHT) / 2;

    this.cards = selectedAugments.map((augment, index) => {
      return new UICard(
        this.game,
        startX + index * 280,
        startY,
        CARD.WIDTH,
        CARD.HEIGHT,
        augment,
        () => this.selectAugment(augment)
      );
<<<<<<< Updated upstream
=======

      this.addComponent(card);
>>>>>>> Stashed changes
    });
  }

  selectAugment(augment) {
    augment.apply(this.game.player);
    this.game.screenManager.hideScreen('augment');
  }

  render(context) {
<<<<<<< Updated upstream
    if (!this.visible) return;

    // Затемнение фона
=======
>>>>>>> Stashed changes
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // Заголовок
    context.fillStyle = 'white';
    context.font = 'bold 36px Arial';
    context.textAlign = 'center';
    context.fillText('Level Up!', this.game.canvas.width / 2, 60);
    context.font = '24px Arial';
    context.fillText('Choose your upgrade', this.game.canvas.width / 2, 100);

    // Отрисовка карт
    this.cards.forEach((card) => card.render(context));
  }
}
