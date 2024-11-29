import { UIComponent } from './UIComponent.js';
import { UIText } from './UIText.js';
export class UICard extends UIComponent {
  static AUGMENT_LAYOUT = {
    TITLE_Y_OFFSET: 130,
    DESC_Y_OFFSET: 170,
    IMAGE_Y_OFFSET: 40,
    DESC_PADDING: 40,
    LINE_HEIGHT: 25,
  };
  constructor(game, x, y, width, height, augment, onClick) {
    super(game, x, y, width, height);
    this.augment = augment;
    this.onClick = onClick;
    this.sprites = {
      card: this.game.resourceManager.getImage('card'),
      hover: this.game.resourceManager.getImage('cardHover'),
    };
    const { AUGMENT_LAYOUT: layout } = UICard;
    this.titleText = new UIText(
      game,
      x + width / 2,
      y + layout.TITLE_Y_OFFSET,
      {
        text: augment.name,
        font: 'bold 20px Arial',
        color: 'black',
        align: 'center',
      }
    );
    this.descriptionText = new UIText(
      game,
      x + width / 2,
      y + layout.DESC_Y_OFFSET,
      {
        text: augment.description,
        font: '14px Arial',
        color: 'black',
        align: 'center',
        multiline: true,
        maxWidth: width - layout.DESC_PADDING,
        lineHeight: layout.LINE_HEIGHT,
      }
    );
    this.addEvents();
  }

  onMouseDown() {
    this.onClick?.();
  }

  render(context) {
    if (!this.visible) return;
    context.save();
    this.renderBase(context);
    this.renderHoverEffect(context);
    this.titleText.render(context);
    this.descriptionText.render(context);
    context.restore();
  }
  renderBase(context) {
    const { AUGMENT_LAYOUT: layout } = UICard;
    if (this.sprites.card) {
      context.drawImage(
        this.sprites.card,
        this.position.x,
        this.position.y + layout.IMAGE_Y_OFFSET,
        this.width,
        this.height
      );
    }
  }
  renderHoverEffect(context) {
    if (!this.isHovered) return;

    const { AUGMENT_LAYOUT: layout } = UICard;
    if (this.sprites.hover) {
      context.drawImage(
        this.sprites.hover,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      // Fallback
      context.strokeStyle = 'gold';
      context.lineWidth = 3;
      context.strokeRect(
        this.position.x,
        this.position.y + layout.IMAGE_Y_OFFSET,
        this.width,
        this.height
      );
    }
  }
}
