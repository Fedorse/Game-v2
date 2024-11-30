import { Entity } from '../Entity.js';
import { Sprite } from '../../graphics/Sprite.js';
import { Animation } from '../../graphics/Animation.js';
import {
  playerIdleFrames,
  playerWalkFrames,
} from '../../utils/animations/playerAnim.js';
import { WeaponManager } from '../../managers/WeaponManager.js';
import { SwordWeapon } from '../../weapons/SwordWeapon.js';

import { StateMachine } from '../../states/StateMachine.js';
import { IdleState } from './characterStrates/IdleState.js';
import { WalkState } from './characterStrates/WalkState.js';

export class Warrior extends Entity {
  constructor(game) {
    super(game);
    this.width = 64;
    this.height = 64;

    this.stats = {
      maxHealth: 1000,
      currentHealth: 1000,
      speed: 300,
      defence: 10,
      level: 1,
      experience: 0,
      nextLevelExperience: 10,
    };

    // animations
    const idleAnim = new Animation(playerIdleFrames, 200, 'playerIdle');
    const walkAnim = new Animation(playerWalkFrames, 200, 'playerWalk');
    this.sprite = new Sprite(
      {
        idle: idleAnim,
        walk: walkAnim,
      },
      this.game.resourceManager
    );

    // weapons
    this.weaponManager = new WeaponManager(this.game, this);
    this.initWeapons();

    // state
    this.initialStateMachine();
  }
  initialStateMachine() {
    this.stateMachine = new StateMachine();

    this.stateMachine.addState('idle', new IdleState(this));
    this.stateMachine.addState('walk', new WalkState(this));
    this.stateMachine.setState('idle');
  }

  initWeapons() {
    this.weaponManager.addWeapon(SwordWeapon);
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
    this.weaponManager.update(deltaTime);

    //colisson border map
    const constrainedPosition = this.game.mapGenerator.constrainPosition(this);
    this.position.x = constrainedPosition.x;
    this.position.y = constrainedPosition.y;

    this.checkExperience();
    if (this.isHit) {
      this.hitTimer += deltaTime;
      if (this.hitTimer >= this.hitDuration) {
        this.isHit = false;
        this.hitTimer = 0;
      }
    }
  }

  render(context) {
    if (this.isHit) {
      context.save();
      context.globalCompositeOperation = 'multiply';
      context.fillStyle = 'rgba(255, 0, 0, 0.9)';
    }
    super.render(context);
    if (this.isHit) {
      context.restore();
    }
    this.weaponManager.render(context);
  }

  checkExperience() {
    this.game.experienceOrbs.forEach((orb, index) => {
      if (this.isColliding(orb)) {
        this.game.experienceOrbs.splice(index, 1);
        this.stats.experience += orb.value;
      }
      if (this.stats.experience >= this.stats.nextLevelExperience) {
        this.levelUp();
      }
    });
  }

  levelUp() {
    this.stats.level++;
    this.stats.experience = 0;
    this.stats.nextLevelExperience += 10;
    this.stats.defence += 10;
    this.weaponManager.gainExperience(100);
    this.game.augmentScreen.show();
  }

  takeDamage(damage) {
    this.stats.currentHealth -= damage;
    this.isHit = true;
    if (this.stats.currentHealth <= 0) {
      this.die();
    }
  }
  die() {
    this.game.gameOver = true;
  }
}
