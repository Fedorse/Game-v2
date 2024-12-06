import { Screen } from './Screen.js';
import { UIIcon } from '../components/UIIcon.js';
import { CHARACTERS } from '../../configs/charatresConfig.js';
import { UIButton } from '../components/UIButton.js';

export class HeroSelectionScreen extends Screen {
  static LAYOUT = {
    HEROES: {
      ICON_SIZE: 100,
      SPACING: 50,
      BOTTOM_MARGIN: 50,
    },
    INFO: {
      WIDTH: 600,
      HEIGHT: 400,
<<<<<<< Updated upstream
      TOP_MARGIN: 10,
      PADDING: 20,
=======
      TOP_MARGIN: 90,
>>>>>>> Stashed changes
      LINE_HEIGHT: 30,
    },
    BUTTON: {
      WIDTH: 150,
      HEIGHT: 50,
<<<<<<< Updated upstream
      RIGHT_MARGIN: 50,
      TOP_MARGIN: 50,
=======
      MARGIN: 100,
      Y: (game) => game.canvas.height - 100,
      X: (game) => game.canvas.width - 200,
>>>>>>> Stashed changes
    },
  };
  constructor(game) {
    super(game);
<<<<<<< Updated upstream
    this.bg = this.game.resourceManager.getImage('heroBg');
    this.infoBg = this.game.resourceManager.getImage('bgStats');
    this.heroes = CHARACTERS;
    this.selectedHero = this.heroes[0];
=======
    this.selectedHero = CHARACTERS[0];
  }
>>>>>>> Stashed changes

    this.heroIcons = [];
    this.createHeroIcons();
<<<<<<< Updated upstream
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
=======
    this.createRunButton();
    this.createHeroInfo();
    this.createBackButton();
  }

  createHeroIcons() {
    const { HEROES } = HeroSelectionScreen.LAYOUT;
    const totalWidth = 4 * HEROES.ICON_SIZE + 3 * HEROES.SPACING;
>>>>>>> Stashed changes
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const y = this.game.canvas.height - HEROES.ICON_SIZE - HEROES.BOTTOM_MARGIN;

<<<<<<< Updated upstream
    this.heroes.forEach((hero, index) => {
      const x = startX + index * (layout.ICON_SIZE + layout.SPACING);

=======
    CHARACTERS.forEach((hero, index) => {
      const x = startX + index * (HEROES.ICON_SIZE + HEROES.SPACING);
>>>>>>> Stashed changes
      const icon = new UIIcon(
        this.game,
        x,
        y,
        HEROES.ICON_SIZE,
        HEROES.ICON_SIZE,
        hero,
        this
      );

      this.heroIcons.push(icon);
    });
  }
<<<<<<< Updated upstream

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
=======
  createBackButton() {
    const { BUTTON } = HeroSelectionScreen.LAYOUT;
    const button = new UIButton(
      this.game,
      50,
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
  goBack() {
    super.hide();
    this.game.screenManager.hideScreen('heroSelection');
    this.game.screenManager.showScreen('mainMenu');
  }

  createRunButton() {
    const { BUTTON } = HeroSelectionScreen.LAYOUT;
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
      'Run',
      () => this.confirmHeroSelection()
    );
    this.addComponent(button);
  }

  createHeroInfo() {
    const infoTexts = [
      {
        text: this.selectedHero.name,
        options: {
          font: 'bold 32px Arial',
          Y: 220,
          X: this.game.canvas.width / 2,
        },
      },
      {
        text: this.selectedHero.description,
        options: { font: '20px Arial', Y: 280, X: this.game.canvas.width / 2 },
      },
      {
        text: `Health: ${this.selectedHero.characteristics.health}`,
        options: { font: '20px Arial', Y: 340, X: this.game.canvas.width / 2 },
>>>>>>> Stashed changes
      },
    ];
  }

<<<<<<< Updated upstream
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
=======
    infoTexts.forEach(({ text, options }) => {
      const textComponent = new UIText(this.game, options.X, options.Y, {
        text,
        font: options.font,
        color: 'black',
        align: 'center',
      });
      this.addComponent(textComponent);
    });
  }

  updateHeroInfo(hero) {
    this.selectedHero = hero;
    this.components = this.components.filter((c) => !(c instanceof UIText));
    this.createHeroInfo();
  }

  confirmHeroSelection() {
    this.game.setPlayerHero(this.selectedHero.type);
    this.game.screenManager.hideScreen('heroSelection');
  }

  render(context) {
    const bg = this.game.resourceManager.getImage('heroBg');
    const bgDescription = this.game.resourceManager.getImage('bgStats');
    const { INFO } = HeroSelectionScreen.LAYOUT;

    context.drawImage(
      bg,
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );
    context.drawImage(
      bgDescription,
      (this.game.canvas.width - INFO.WIDTH) / 2,
      INFO.TOP_MARGIN,
      INFO.WIDTH,
      INFO.HEIGHT
    );
>>>>>>> Stashed changes

    // Рисуем текст
    this.renderText(context);

    // Рендер кнопок и иконок
    this.heroIcons.forEach((icon) => {
      icon.render(context);
    });

    this.runButton.render(context);
  }
}
