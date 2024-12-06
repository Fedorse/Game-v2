import { Screen } from './Screen.js';
import { UIIcon } from '../components/UIIcon.js';
import { UIButton } from '../components/UIButton.js';
import { UIText } from '../components/UIText.js';
import { CHARACTERS } from '../../configs/charatresConfig.js';

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
      TOP_MARGIN: 90,
      LINE_HEIGHT: 30,
    },
    BUTTON: {
      WIDTH: 150,
      HEIGHT: 50,
      MARGIN: 100,
      Y: (game) => game.canvas.height - 100,
      X: (game) => game.canvas.width - 200,
    },
  };

  constructor(game) {
    super(game);
    this.selectedHero = CHARACTERS[0];
  }

  createComponents() {
    this.createHeroIcons();
    this.createRunButton();
    this.createHeroInfo();
    this.createBackButton();
  }

  createHeroIcons() {
    const { HEROES } = HeroSelectionScreen.LAYOUT;
    const totalWidth = 4 * HEROES.ICON_SIZE + 3 * HEROES.SPACING;
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const y = this.game.canvas.height - HEROES.ICON_SIZE - HEROES.BOTTOM_MARGIN;

    CHARACTERS.forEach((hero, index) => {
      const x = startX + index * (HEROES.ICON_SIZE + HEROES.SPACING);
      const icon = new UIIcon(
        this.game,
        x,
        y,
        HEROES.ICON_SIZE,
        HEROES.ICON_SIZE,
        hero,
        this
      );
      this.addComponent(icon);
    });
  }
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
      },
    ];

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

    super.render(context);
  }
}
