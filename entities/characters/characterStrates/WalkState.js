import { State } from '../../../states/State';

export class WalkState extends State {
  enter() {
    this.entity.sprite.setAnimation('walk');
  }

  update(deltaTime) {
    const input = this.entity.game.inputHandler;
    const character = this.entity;

    character.sprite.update(deltaTime);

    character.velocity.x = 0;
    character.velocity.y = 0;

    // movement keys
    if (input.left) {
      character.velocity.x = -1;
      character.flipX = true;
    }
    if (input.right) {
      character.velocity.x = 1;
      character.flipX = false;
    }
    if (input.up) character.velocity.y = -1;
    if (input.down) character.velocity.y = 1;

    // normalize velocity
    if (character.velocity.x !== 0 && character.velocity.y !== 0) {
      const magnitude = Math.sqrt(2);
      character.velocity.x /= magnitude;
      character.velocity.y /= magnitude;
    }

    //update position
    character.position.x +=
      character.velocity.x * character.stats.speed * deltaTime;
    character.position.y +=
      character.velocity.y * character.stats.speed * deltaTime;

    if (!input.left && !input.right && !input.up && !input.down) {
      character.stateMachine.setState('idle');
    }
  }
}
