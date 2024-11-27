import { UIButton } from './uiButton';
import { HeroIcon } from './HeroIcon';
import { HEROES } from '../configs/Heroes';

export class HeroSelectionScreen {
  // Константы для разметки
  static LAYOUT = {
    HEROES: {
      ICON_SIZE: 100,
      SPACING: 50,
      BOTTOM_MARGIN: 50,
    },
    INFO: {
      WIDTH: 600,
      HEIGHT: 400,
      TOP_MARGIN: 10,
      PADDING: 20,
      LINE_HEIGHT: 30,
    },
    RUN_BUTTON: {
      WIDTH: 150,
      HEIGHT: 50,
      RIGHT_MARGIN: 50,
      TOP_MARGIN: 50,
    },
  };

  constructor(game) {
    this.game = game;
    this.bg = this.game.resourceManager.getImage('heroBg');
    this.infoBg = this.game.resourceManager.getImage('bgStats');
    this.heroes = HEROES;
    this.selectedHero = this.heroes[0];

    this.heroIcons = [];
    this.createHeroIcons();
    this.textBlocks = [];

    this.runButton = new UIButton(
      this.game,
      this.game.canvas.width -
        HeroSelectionScreen.LAYOUT.RUN_BUTTON.WIDTH -
        HeroSelectionScreen.LAYOUT.RUN_BUTTON.RIGHT_MARGIN,
      HeroSelectionScreen.LAYOUT.RUN_BUTTON.TOP_MARGIN,
      HeroSelectionScreen.LAYOUT.RUN_BUTTON.WIDTH,
      HeroSelectionScreen.LAYOUT.RUN_BUTTON.HEIGHT,
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
    this.runButton.isEnabled = true;

    this.renderHeroInfo(this.selectedHero);
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

  createHeroIcons() {
    const layout = HeroSelectionScreen.LAYOUT.HEROES;
    const totalWidth =
      this.heroes.length * layout.ICON_SIZE +
      (this.heroes.length - 1) * layout.SPACING;
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const y = this.game.canvas.height - layout.ICON_SIZE - layout.BOTTOM_MARGIN;

    this.heroes.forEach((hero, index) => {
      const x = startX + index * (layout.ICON_SIZE + layout.SPACING);

      const icon = new HeroIcon(
        this.game,
        x,
        y,
        layout.ICON_SIZE,
        layout.ICON_SIZE,
        hero,
        this
      );

      this.heroIcons.push(icon);
    });
  }

  renderHeroInfo(hero) {
    this.textBlocks = [
      {
        text: hero.name,
        x: this.game.canvas.width / 2,
        y: 140,
        font: 'bold 32px Arial',
        align: 'center',
      },
      {
        text: hero.description,
        x: this.game.canvas.width / 2,
        y: 180,
        font: '20px Arial',
        align: 'center',
      },
      {
        text: `Health: ${hero.characteristics.health}`,
        x: this.game.canvas.width / 2,
        y: 220,
        font: '20px Arial',
        align: 'center',
      },
      {
        text: `Attack: ${hero.characteristics.attack}`,
        x: this.game.canvas.width / 2,
        y: 250,
        font: '20px Arial',
        align: 'center',
      },
      {
        text: `Defense: ${hero.characteristics.defense}`,
        x: this.game.canvas.width / 2,
        y: 280,
        font: '20px Arial',
        align: 'center',
      },
    ];
  }

  renderText(context) {
    this.textBlocks.forEach((block) => {
      context.font = block.font;
      context.textAlign = block.align;
      context.fillStyle = 'black';
      context.fillText(block.text, block.x, block.y);
    });
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
    }

    if (this.infoBg) {
      const layout = HeroSelectionScreen.LAYOUT.INFO;
      const infoX = (this.game.canvas.width - layout.WIDTH) / 2;
      const infoY = layout.TOP_MARGIN;
      context.drawImage(this.infoBg, infoX, infoY, layout.WIDTH, layout.HEIGHT);
    }

    // Рисуем текст
    this.renderText(context);

    // Рендер кнопок и иконок
    this.heroIcons.forEach((icon) => {
      icon.render(context);
    });

    this.runButton.render(context);
  }
}
