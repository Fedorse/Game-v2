import { BaseWeapon } from "./BaseWeapon";

export class MeleeWeapon extends BaseWeapon {
    constructor(game, owner) {
        super(game, owner);
        this.attackRange = 100;
        this.attackCooldown = 1;
        this.currentCooldown = 0;

        // Параметры движения и состояния оружия
        this.isAttacking = false;
        this.state = 'idle'; // 'idle', 'attacking', 'returning'
        this.attackEffectDuration = 0.2;
        this.effectTimer = 0;

        this.targetEnemy = null;
        this.attackSpeed = 500; // скорость движения к врагу
        this.startPosition = { x: 0, y: 0 };
        this.endPosition = { x: 0, y: 0 };
    }

    update(deltaTime) {
        switch (this.state) {
            case 'idle':
                this.updateIdle(deltaTime);
                break;
            case 'attacking':
                this.updateAttacking(deltaTime);
                break;
            case 'returning':
                this.updateReturning(deltaTime);
                break;
        }
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
        }
    }

    updateIdle(deltaTime) {
        this.position.x = this.owner.position.x + this.owner.width / 2 + this.offsetX;
        this.position.y = this.owner.position.y + this.owner.height / 2 + this.offsetY;

        const target = this.findTarget();
        if (target && this.currentCooldown <= 0) {
            this.rotationAngle = this.calculateRotationToTarget(
                target.position.x + target.width / 2,
                target.position.y + target.height / 2
            );
            this.startAttack(target);
        } else {
            this.rotationAngle = this.baseAngle;
        }
    }

    updateAttacking(deltaTime) {
        const distance = this.calculateDistance(this.position, this.endPosition);
        if (distance < 5) {
            this.onHit();
            this.startReturn();
        } else {
            this.moveTowards(this.endPosition, deltaTime);
        }
    }

    updateReturning(deltaTime) {
        const distance = this.calculateDistance(this.position, this.startPosition);
        if (distance < 5) {
            this.state = 'idle';
            this.currentCooldown = this.attackCooldown;
        } else {
            this.moveTowards(this.startPosition, deltaTime);
        }
    }

    startAttack(target) {
        this.state = 'attacking';
        this.effectTimer = this.attackEffectDuration;
        this.targetEnemy = target;
        this.startPosition = { ...this.position };
        this.endPosition = {
            x: target.position.x + target.width / 2,
            y: target.position.y + target.height / 2
        };
    }

    startReturn() {
        this.state = 'returning';
        this.endPosition = { ...this.startPosition }
        this.effectTimer = this.attackEffectDuration;
    }

    onHit() {
        if (this.targetEnemy) {
            this.targetEnemy.takeDamage(this.damage);
            this.targetEnemy = null;
        }
    }

    moveTowards(targetPosition, deltaTime) {
        const dx = targetPosition.x - this.position.x;
        const dy = targetPosition.y - this.position.y;
        const angle = Math.atan2(dy, dx);
        this.position.x += Math.cos(angle) * this.attackSpeed * deltaTime;
        this.position.y += Math.sin(angle) * this.attackSpeed * deltaTime;
    }

    findTarget() {
        let nearestEnemy = null;
        let minDistance = this.attackRange;

        this.game.enemies.forEach(enemy => {
            const distance = this.calculateDistance(this.position, enemy.position);
            if (distance < minDistance) {
                minDistance = distance;
                nearestEnemy = enemy;
            }
        });

        return nearestEnemy;
    }

    calculateDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    render(context) {
        context.save();
        
        context.translate(this.position.x - this.game.camera.x, this.position.y - this.game.camera.y);
        context.rotate(this.rotationAngle);
        context.drawImage(this.sprite, -16, -16, 32, 32);
        context.restore();
    }
}
