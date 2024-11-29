import { Screen } from './Screen.js';
import { UICard } from '../components/UICard.js';
import { SwordWeapon } from '../../weapons/SwordWeapon.js';

export class AugmentScreen extends Screen {
  static LAYOUT = {
    CARD: {
      WIDTH: 250,
      HEIGHT: 290,
      SPACING: 30,
    },
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
  }

  show() {
    this.visible = true;
    this.game.isPaused = true;
    this.createCards();
  }

  hide() {
    this.visible = false;
    this.game.isPaused = false;
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
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const startY = (this.game.canvas.height - layout.HEIGHT) / 2;

    this.cards = selectedAugments.map((augment, index) => {
      return new UICard(
        this.game,
        startX + index * (layout.WIDTH + layout.SPACING),
        startY,
        layout.WIDTH,
        layout.HEIGHT,
        augment,
        () => this.selectAugment(augment)
      );
    });
  }

  selectAugment(augment) {
    augment.apply(this.game.player);
    this.hide();
  }

  render(context) {
    if (!this.visible) return;

    // Затемнение фона
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
