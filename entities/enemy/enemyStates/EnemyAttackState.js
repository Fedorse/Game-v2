import { State } from '../../../states/State.js';
export class EnemyAttackState extends State {
  enter() {
    if (this.entity.sprite) {
      this.entity.sprite.setAnimation('walk');
    }
  }

  update(deltaTime) {
    if (!this.entity.isCollidingWithPlayer()) {
      this.entity.stateMachine.setState('chase');
      return;
    }

    if (this.entity.attackTimer <= 0) {
      this.entity.attackPlayer();
      this.entity.attackTimer = this.entity.attackCooldown;
    }
  }
}
