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
      TOP_MARGIN: 10,
      LINE_HEIGHT: 30,
    },
    RUN_BUTTON: {
      WIDTH: 150,
      HEIGHT: 50,
      MARGIN: 50,
    },
  };

  constructor(game) {
    super(game);
    this.selectedHero = CHARACTERS[0];
    this.init();
  }

  createComponents() {
    this.createHeroIcons();
    this.createRunButton();
    this.createHeroInfo();
  }

  createHeroIcons() {
    const layout = HeroSelectionScreen.LAYOUT.HEROES;
    const totalWidth =
      CHARACTERS.length * layout.ICON_SIZE +
      (CHARACTERS.length - 1) * layout.SPACING;
    const startX = (this.game.canvas.width - totalWidth) / 2;
    const y = this.game.canvas.height - layout.ICON_SIZE - layout.BOTTOM_MARGIN;

    CHARACTERS.forEach((hero, index) => {
      const x = startX + index * (layout.ICON_SIZE + layout.SPACING);
      const icon = new UIIcon(
        this.game,
        x,
        y,
        layout.ICON_SIZE,
        layout.ICON_SIZE,
        hero,
        this
      );
      this.addComponent(icon);
    });
  }

  createRunButton() {
    const layout = HeroSelectionScreen.LAYOUT.RUN_BUTTON;
    const button = new UIButton(
      this.game,
      this.game.canvas.width - layout.WIDTH - layout.MARGIN,
      layout.MARGIN,
      layout.WIDTH,
      layout.HEIGHT,
      {
        normal: this.game.resourceManager.getImage('btnNormal'),
        hover: this.game.resourceManager.getImage('btnHover'),
        pressed: this.game.resourceManager.getImage('btnPressed'),
      },
      'Run',
      () => this.startGame()
    );
    this.addComponent(button);
  }

  createHeroInfo() {
    const infoTexts = [
      {
        text: this.selectedHero.name,
        options: { font: 'bold 32px Arial', y: 140 },
      },
      {
        text: this.selectedHero.description,
        options: { font: '20px Arial', y: 180 },
      },
      {
        text: `Health: ${this.selectedHero.characteristics.health}`,
        options: { font: '20px Arial', y: 220 },
      },
    ];

    infoTexts.forEach(({ text, options }) => {
      const textComponent = new UIText(
        this.game,
        this.game.canvas.width / 2,
        options.y,
        {
          text,
          font: options.font,
          color: 'black',
          align: 'center',
        }
      );
      this.addComponent(textComponent);
    });
  }

  updateHeroInfo(hero) {
    this.selectedHero = hero;
    this.components = this.components.filter((c) => !(c instanceof UIText));
    this.createHeroInfo();
  }

  startGame() {
    this.destroy();
    this.game.setPlayerHero(this.selectedHero.type);
    this.game.state = 'playing';
  }

  render(context) {
    const bg = this.game.resourceManager.getImage('heroBg');
    const infoBg = this.game.resourceManager.getImage('bgStats');

    context.drawImage(
      bg,
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );
    context.drawImage(
      infoBg,
      (this.game.canvas.width - HeroSelectionScreen.LAYOUT.INFO.WIDTH) / 2,
      HeroSelectionScreen.LAYOUT.INFO.TOP_MARGIN,
      HeroSelectionScreen.LAYOUT.INFO.WIDTH,
      HeroSelectionScreen.LAYOUT.INFO.HEIGHT
    );

    super.render(context);
  }
}
