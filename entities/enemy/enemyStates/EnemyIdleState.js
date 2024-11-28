import { State } from '../../../states/State.js';
export class EnemyIdleState extends State {
  enter() {
    if (this.entity.sprite) {
      this.entity.sprite.setAnimation('walk');
    }
  }

  update(deltaTime) {
    this.entity.stateMachine.setState('chase');
  }
}
