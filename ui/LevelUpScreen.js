import { SwordWeapon } from '../weapon/SwordWeapon.js';

export class LevelUpScreen {
  static LAYOUT = {
    CARD: {
      WIDTH: 250,
      HEIGHT: 290,
      SPACING: 30,
    },
  };

  constructor(game) {
    this.game = game;
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

    const layout = LevelUpScreen.LAYOUT.CARD;
    const totalWidth =
      selectedAugments.length * layout.WIDTH +
      (selectedAugments.length - 1) * layout.SPACING;
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const startY = (this.game.canvas.height - layout.HEIGHT) / 2;

    this.cards = selectedAugments.map((augment, index) => {
      return new AugmentCard(
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

class AugmentCard {
  constructor(game, x, y, width, height, augment, onClick) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.augment = augment;
    this.onClick = onClick;
    this.isHovered = false;

    this.addEvents();
  }

  addEvents() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.game.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.addEventListener('mousedown', this.handleMouseDown);
  }

  removeEvents() {
    this.game.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.game.canvas.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseMove(event) {
    const rect = this.game.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.isHovered = this.isInside(x, y);
  }

  handleMouseDown(event) {
    if (this.isHovered) {
      this.onClick();
    }
  }

  isInside(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  render(context) {
    // Отрисовка спрайта карты
    const cardSprite = this.game.resourceManager.getImage('card');
    if (cardSprite) {
      context.drawImage(
        cardSprite,
        this.x,
        this.y + 40,
        this.width,
        this.height
      );
    }

    // Если карта в фокусе, добавляем подсветку
    if (this.isHovered) {
      const hoverSprite = this.game.resourceManager.getImage('cardHover');
      if (hoverSprite) {
        context.drawImage(hoverSprite, this.x, this.y, this.width, this.height);
      } else {
        // Fallback - простая подсветка рамки если спрайт недоступен
        context.strokeStyle = 'gold';
        context.lineWidth = 3;
        context.strokeRect(this.x, this.y + 40, this.width, this.height);
      }
    }

    // Название
    context.fillStyle = 'black';
    context.font = 'bold 20px Arial';
    context.textAlign = 'center';
    context.fillText(this.augment.name, this.x + this.width / 2, this.y + 130);

    // Описание
    context.font = '14px Arial';
    this.wrapText(
      context,
      this.augment.description,
      this.x + this.width / 2,
      this.y + 170,
      this.width - 40,
      25
    );
  }

  // Функция для переноса текста
  wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
}
