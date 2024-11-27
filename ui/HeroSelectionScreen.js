import { UIButton } from './uiButton';
import { HeroIcon } from './HeroIcon';
import { HEROES } from '../configs/Heroes';

export class HeroSelectionScreen {
  constructor(game) {
    this.game = game;
    this.bg = this.game.resourceManager.getImage('heroBg');
    this.heroes = HEROES;
    this.selectedHero = this.heroes[0];

    this.heroIcons = [];
    this.createHeroIcons();

    this.runButton = new UIButton(
      this.game,
      this.game.canvas.width / 2 - 75,
      this.game.canvas.height - 100,
      150,
      50,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      'Run',
      () => {
        if (this.selectedHero) {
          this.selectHero(this.selectedHero.type);
        }
      }
    );
    this.runButton.isEnabled = false;
  }

  createHeroIcons() {
    const iconSize = 100;
    const spacing = 50;
    const totalWidth =
      this.heroes.length * iconSize + (this.heroes.length - 1) * spacing;
    let startX = (this.game.canvas.width - totalWidth) / 2;

    this.heroes.forEach((hero, index) => {
      const x = startX + index * (iconSize + spacing);
      const y = this.game.canvas.height / 2 - iconSize / 2;

      const icon = new HeroIcon(
        this.game,
        x,
        y,
        iconSize,
        iconSize,
        hero,
        this
      );

      this.heroIcons.push(icon);
    });
  }

  selectHero(heroType) {
    this.removeEvents();

    this.game.setPlayerHero(heroType);

    this.game.state = 'playing';
  }

  removeEvents() {
    this.heroIcons.forEach((icon) => {
      icon.removeEvents();
    });
    this.runButton.removeMouseEvents();
  }

  render(context) {
    if (this.bg) {
      context.drawImage(
        this.bg,
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height
      );
    } else {
      // Если фон отсутствует, заливаем цветом
      context.fillStyle = 'black';
      context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }

    this.heroIcons.forEach((icon) => {
      icon.render(context);
    });

    // Отрисовка описания выбранного героя
    if (this.selectedHero) {
      this.renderHeroInfo(context, this.selectedHero);
      // Активируем кнопку "Run"
      this.runButton.isEnabled = true;
    } else {
      // Кнопка "Run" не активна
      this.runButton.isEnabled = false;
    }

    // Отрисовка кнопки "Run"
    this.runButton.render(context);
  }

  renderHeroInfo(context, hero) {
    const infoX = 50;
    const infoY = 50;
    const lineHeight = 25;

    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.textAlign = 'left';

    context.fillText(`Name: ${hero.name}`, infoX, infoY);
    context.fillText(
      `Description: ${hero.description}`,
      infoX,
      infoY + lineHeight
    );

    const characteristics = hero.characteristics;
    context.fillText(
      `Health: ${characteristics.health}`,
      infoX,
      infoY + 2 * lineHeight
    );
    context.fillText(
      `Attack: ${characteristics.attack}`,
      infoX,
      infoY + 3 * lineHeight
    );
    context.fillText(
      `Defense: ${characteristics.defense}`,
      infoX,
      infoY + 4 * lineHeight
    );
  }
}
