// states/EnemyStates.js
import { State } from "../core/State.js";
export class EnemyIdleState extends State {
    enter() {
        if(this.entity.sprite) {
            this.entity.sprite.setAnimation('walk');
        }
    }

    update(deltaTime) {
        this.entity.stateMachine.setState('chase');
    }
}

export class EnemyChaseState extends State {
    enter() {
        if(this.entity.sprite) {
            this.entity.sprite.setAnimation('walk');
        }
    }

    update(deltaTime) {
        const player = this.entity.game.player;

        const distance = this.entity.getDistanceTo(player);

        if(this.entity.isCollidingWithPlayer()) {
            this.entity.stateMachine.setState('attack');
            return;
        }

        if(distance > 10) {
            const direction = this.entity.getDirectionTo(player);
            this.entity.position.x += direction.x * this.entity.speed * deltaTime;
            this.entity.position.y += direction.y * this.entity.speed * deltaTime;
            
            this.entity.flipX = direction.x < 0;
        }
    }
}

export class EnemyAttackState extends State {
    enter() {
        if(this.entity.sprite) {
            this.entity.sprite.setAnimation('walk');

        }
    }

    update(deltaTime) {
        if(!this.entity.isCollidingWithPlayer()) {
            this.entity.stateMachine.setState('chase');
            return;
        }

        if(this.entity.attackTimer <= 0) {
            this.entity.attackPlayer(); 
            this.entity.attackTimer = this.entity.attackCooldown;
        }
    }
}