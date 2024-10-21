// ProjectileWeapon.js
import { Weapon } from './Weapon.js';
import { Projectile } from './Projectile.js';

export class ProjectileWeapon extends Weapon {
  constructor(game, owner) {
    super(game, owner);
    this.name = 'standard projectile ';
    this.attackCooldown = 0.3; // Начальное время отката
    this.projectileSpeed = 300; // Скорость снаряда
    this.projectileCount = 1; // Количество снарядов
    this.damage = 5
  }

  attack() {
    if (this.attackTimer <= 0) {
      this.attackTimer = this.attackCooldown;

      const angle = Math.atan2(this.owner.lastDirection.y, this.owner.lastDirection.x);
      const angleStep = (Math.PI / 12); // Шаг угла между снарядами
      const startAngle = angle - angleStep * (this.projectileCount - 1) / 2;

      for (let i = 0; i < this.projectileCount; i++) {
        const currentAngle = startAngle + angleStep * i;

        const direction = {
          x: Math.cos(currentAngle),
          y: Math.sin(currentAngle),
        };

        const projectile = new Projectile(
          this.game,
          {
            x: this.owner.position.x + this.owner.width / 2,
            y: this.owner.position.y + this.owner.height / 2,
          },
          direction,
          this.projectileSpeed,
          this.damage
        );
        this.game.projectiles.push(projectile);
      }
    }
  }

  upgrade() {
    // Улучшаем характеристики оружия при повышении уровня
    switch (this.level) {
      case 2:
        this.projectileCount = 5;
        this.damage = 10
        break;
      case 3:
        this.projectileCount = 1000;
        break;
      case 4:
        this.attackCooldown *= 0.2; // Уменьшаем время отката
        break;
      case 5:
        this.projectileSpeed += 500;
        break;
      case 6:
        this.projectileCount = 100;
        break;
      default:
        break;
    }
  }
}
