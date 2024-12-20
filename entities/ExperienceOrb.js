import { Animation } from '../graphics/Animation.js';
import { Sprite } from '../graphics/Sprite.js';
import { expirenseOrbAnim } from '../utils/animations/expirenseOrbAnim.js';
import { Entity } from './Entity.js';

export class ExperienceOrb extends Entity {
  constructor(game, position) {
    super(game), (this.position = { ...position });
    this.width = 32;
    this.height = 32;
    this.value = 10;
    this.speed = 80;

    //animation
    this.initSprite();
  }

  initSprite() {
    const orbAnim = new Animation(expirenseOrbAnim, 200, 'experience');
    this.sprite = new Sprite(
      {
        orb: orbAnim,
      },
      this.game.resourceManager
    );
    this.sprite.setAnimation('orb');
  }

  update(deltaTime) {
    // move to player
    const distance = this.getDistanceTo(this.game.player);
    if (distance < 50) {
      const direction = this.getDirectionTo(this.game.player);
      this.position.x += direction.x * this.speed * deltaTime;
      this.position.y += direction.y * this.speed * deltaTime;
    }
    this.sprite.update(deltaTime);
  }

  render(context) {
    super.render(context);
  }
}
