import { State } from '../../../states/State.js';
export class EnemyChaseState extends State {
  enter() {
    if (this.entity.sprite) {
      this.entity.sprite.setAnimation('walk');
    }
  }

  update(deltaTime) {
    const player = this.entity.game.player;

    const distance = this.entity.getDistanceTo(player);

    if (this.entity.isCollidingWithPlayer()) {
      this.entity.stateMachine.setState('attack');
      return;
    }

    if (distance > 10) {
      const direction = this.entity.getDirectionTo(player);
      this.entity.position.x += direction.x * this.entity.speed * deltaTime;
      this.entity.position.y += direction.y * this.entity.speed * deltaTime;

      this.entity.flipX = direction.x < 0;
    }
  }
}
