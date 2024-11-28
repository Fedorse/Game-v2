import { State } from '../../../states/State';

export class IdleState extends State {
  enter() {
    this.entity.sprite.setAnimation('idle');
  }

  update(deltaTime) {
    const input = this.entity.game.inputHandler;
    const character = this.entity;
    character.sprite.update(deltaTime);

    if (input.left || input.right || input.up || input.down) {
      this.entity.stateMachine.setState('walk');
      return;
    }

    this.entity.velocity.x = 0;
    this.entity.velocity.y = 0;
  }
}
