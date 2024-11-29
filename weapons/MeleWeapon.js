import { BaseWeapon } from './BaseWeapon';

export class MeleeWeapon extends BaseWeapon {
  constructor(game, owner) {
    super(game, owner);

    // parametrs attack
    this.attackRange = 80;
    this.attackCooldown = 0.8;
    this.damage = 1;

    //state atack
    this.isReturning = false;
    this.isAttacking = false;
    this.attackSpeed = 300;
    this.attackDirection = { x: 0, y: 0 };
    this.startPosition = { x: 0, y: 0 };
  }
  update(deltaTime) {
    if (!this.isAttacking && !this.isReturning) {
      this.updatePosition();
    }
    this.rotateTowardsTarget();
    this.handleAttack(deltaTime);
  }
  handleAttack(deltaTime) {
    if (this.isAttacking) {
      // move weapon to target
      this.position.x += this.attackDirection.x * this.attackSpeed * deltaTime;
      this.position.y += this.attackDirection.y * this.attackSpeed * deltaTime;

      const distanceTraveled = this.calculateDistance(
        this.startPosition,
        this.position
      );
      if (distanceTraveled >= this.attackRange) {
        this.isReturning = false;
        this.isAttacking = false;
      }
      this.checkEnemyHit();
    } else if (this.isReturning) {
      //back weapon to player
      const directionBack = {
        x: this.startPosition.x - this.position.x,
        y: this.startPosition.y - this.position.y,
      };
      const distanceBack = Math.hypot(directionBack.x, directionBack.y);
      const normalizedBack = {
        x: directionBack.x / distanceBack,
        y: directionBack.y / distanceBack,
      };
      this.position.x += normalizedBack.x * this.attackSpeed * deltaTime;
      this.position.y += normalizedBack.y * this.attackSpeed * deltaTime;

      if (distanceBack <= 5) {
        this.isReturning = false;
        this.currentCooldown = this.attackCooldown;
        // back to start position weapon
        this.position.x = this.startPosition.x;
        this.position.y = this.startPosition.y;
      }
    } else if (this.currentCooldown <= 0) {
      const target = this.findTarget();
      if (target) {
        const distanceToTarget = this.calculateDistance(
          this.position,
          target.position
        );
        // check target distance
        if (distanceToTarget <= this.attackRange * 2) {
          this.isAttacking = true;
          this.startPosition = { x: this.position.x, y: this.position.y };

          // calculate direction to target
          const dx = target.position.x - this.position.x;
          const dy = target.position.y - this.position.y;
          const distance = Math.hypot(dx, dy);
          this.attackDirection = {
            x: dx / distance,
            y: dy / distance,
          };
          // move weapon to target
          this.angle = this.calculateRotationToTarget(
            target.position.x + target.width / 2,
            target.position.y + target.height / 2
          );
        }
      }
    } else {
      this.currentCooldown -= deltaTime;
    }
  }

  checkEnemyHit() {
    this.game.enemies.forEach((enemy) => {
      const distance = this.calculateDistance(this.position, enemy.position);
      if (distance < enemy.width / 2) {
        if (!enemy.isHit) {
          enemy.takeDamage(this.damage);
          enemy.isHit = true;
        }
      }
    });
    // Проверка разрушаемых объектов на карте
    this.game.mapGenerator.mapObjects.forEach((object) => {
      if (object.isDestructible) {
        const distance = this.calculateDistance(this.position, object.position);
        if (distance < object.width / 2) {
          object.takeDamage(this.damage);
        }
      }
    });
  }

  upgrade() {
    switch (this.level) {
      case 2:
        this.damage += 5;
        break;
      case 3:
        this.attackRange += 20;
        break;
      case 4:
        this.attackCooldown *= 0.9;
        break;
      case 5:
        this.damage += 8;
        break;
      case 6:
        this.attackRange += 30;
        break;
    }
  }
}
