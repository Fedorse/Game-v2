import { BaseWeapon } from "./BaseWeapon";
import { Projectile } from "./Projectile";

export class RangedWeapon extends BaseWeapon {
    constructor(game, owner, projectileSprite) {
        super(game, owner);
        this.attackRange = 300;
        this.attackCooldown = 0.5;
        this.currentCooldown = 0;
        this.projectileSpeed = 300;
        this.projectileSprite = projectileSprite; // sprite of the projectile
        
    }

    checkAttack(deltaTime) {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
            return;
        }

        const target = this.findTarget();
        if (target) {
            this.rotationAngle = this.calculateRotationToTarget(
                target.position.x + target.width / 2,
                target.position.y + target.height / 2
            );
            this.shoot(target);
            this.currentCooldown = this.attackCooldown;
        }else {
            this.rotationAngle = this.baseAngle;
        }
    }

    findTarget() {
        let nearestEnemy = null;
        let minDistance = this.attackRange;

        this.game.enemies.forEach(enemy => {
            const dx = enemy.position.x - this.position.x;
            const dy = enemy.position.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                nearestEnemy = enemy;
            }
        });

        return nearestEnemy;
    }

    shoot(target) {
        const dx = target.position.x - this.position.x;
        const dy = target.position.y - this.position.y;
        const angle = Math.atan2(dy, dx);

        const projectile = new Projectile(
            this.game,
            this.position.x,
            this.position.y,
            Math.cos(angle) * this.projectileSpeed,
            Math.sin(angle) * this.projectileSpeed,
            this.damage,
            this.projectileSprite
        );

        this.game.projectiles.push(projectile);
    }

    render(context) {
        context.save();
        context.translate(
            this.position.x - this.game.camera.x, 
            this.position.y - this.game.camera.y);
        context.rotate(this.rotationAngle);
        context.drawImage(this.sprite, -16, -16, 32, 32);
        context.restore();
    }
}
