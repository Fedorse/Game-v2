// ProjectileWeapon.js
// import { Weapon } from './Weapon.js';
// import { Projectile } from '../ProjectileLegasy.js';

export class ProjectileWeapon extends Weapon {
  constructor(game, owner) {
    super(game, owner);
    this.name = 'standard projectile';

    // level weapon stats
    this.attackCooldown = 1; 
    this.projectileSpeed = 300; 
    this.projectileCount = 1; 
    this.damage = 5
  }
d
  attack() {
    if (this.attackTimer <= 0) {
      this.attackTimer = this.attackCooldown;

      // attack logic
      const angle = Math.atan2(this.owner.lastDirection.y , this.owner.lastDirection.x);
      const angleStep = (Math.PI / 12); 
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
          this.damage,

        );
        this.game.projectiles.push(projectile);
      }
    }
  }

  // update weapon
  upgrade() {
    switch (this.level) {
      case 2:
        this.projectileCount = 1;
        this.damage = 10
        break;
      case 3:
        this.projectileCount = 2;
        this.damage = 20
        break;
      case 4:
        this.attackCooldown *= 0.5; 
        this.projectileCount = 3
        break;
      case 5:
        this.projectileSpeed += 450;
        this.projectileCount = 4
        break;
      case 6:
        this.projectileCount = 6;
        this.damage = 40
        break;
      default:
        break;
    }
  }
}
