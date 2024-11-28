import { StateMachine } from '../states/StateMachine.js';
import { Sprite } from '../sprite/Sprite.js';
import { Animation } from '../sprite/Animation.js';
import { ENEMY_CONFIGS } from '../configs/enemyConfigs.js';
import { Entity } from './Entity.js';
import { EnemyAttackState } from './enemy/enemyStates/EnemyAttackState.js';
import { EnemyChaseState } from './enemy/enemyStates/EnemyChaseState.js';
import { EnemyIdleState } from './enemy/enemyStates/EnemyIdleState.js';
import { ExperienceOrb } from './ExperienceOrb.js';

export class Enemy extends Entity {
  constructor(game, position, type) {
    super(game);
    const config = ENEMY_CONFIGS[type];

    this.type = config.name;
    this.position = { ...position };
    this.width = config.width;
    this.height = config.height;

    const { health, speed, damage } = config.stats;
    this.health = health;
    this.currentHealth = this.health;
    this.speed = speed;
    this.damage = damage;

    this.attackRange = 100;
    this.attackCooldown = 1;
    this.attackTimer = 0;
    this.detectionRange = 60;
    this.attackTime = 0;

    this.isHit = false;

    this.initStateMachine();
    this.initSprite(config.animation);
  }

  initStateMachine() {
    this.stateMachine = new StateMachine();
    this.stateMachine.addState('idle', new EnemyIdleState(this));
    this.stateMachine.addState('chase', new EnemyChaseState(this));
    this.stateMachine.addState('attack', new EnemyAttackState(this));
    this.stateMachine.setState('idle');
  }
  initSprite(animConfig) {
    const walkAnim = new Animation(
      animConfig.frames,
      animConfig.frameInterval,
      animConfig.spriteName
    );
    this.sprite = new Sprite({ walk: walkAnim }, this.game.resourceManager);
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.isHit = false;
    this.attackTimer = Math.max(0, this.attackTimer - deltaTime);
    this.applySeparationForce();
  }
  render(context) {
    super.render(context);
  }
  attackPlayer() {
    this.game.player.takeDamage(this.damage);
  }

  takeDamage(damage) {
    this.currentHealth -= damage;
    this.game.addDamageText(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      damage
    );
    if (this.currentHealth <= 0) {
      this.die();
    }
  }

  die() {
    this.toRemove = true;
    this.spawnExperienceOrb();
  }

  spawnExperienceOrb() {
    this.game.experienceOrbs.push(new ExperienceOrb(this.game, this.position));
  }

  applySeparationForce() {
    let forceX = 0;
    let forceY = 0;

    this.game.enemies.forEach((otherEnemy) => {
      if (this === otherEnemy) return;

      const distance = this.getDistanceTo(otherEnemy);

      const safeDistance = this.width * 0.5;
      if (distance < safeDistance && distance > 0) {
        const overlap = safeDistance - distance;
        const direction = this.getDirectionTo(otherEnemy);

        forceX += direction.x * overlap;
        forceY += direction.y * overlap;
      }
    });
    this.position.x += forceX * 0.1;
    this.position.y += forceY * 0.1;
  }
}
