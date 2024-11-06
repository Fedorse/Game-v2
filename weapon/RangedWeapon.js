import { BaseWeapon } from "./BaseWeapon";
import { Projectile } from "./Projectile";

export class RangedWeapon extends BaseWeapon {
    constructor(game, owner, projectileSprite) {
        super(game, owner);
        this.attackRange = 300;
        this.attackCooldown = 0.5;
        this.damage = 1


        this.projectileSpeed = 300;
        this.projectileSprite = projectileSprite; // sprite of the projectile

        //recoil
        this.recoilAmount = 5; 
        this.recoilDuration = 0.1;
        this.recoilTimer = 0
        this.recoilOffsetX = 0
        this.recoilOffsetY = 0

    }




    handleAttack(deltaTime) {
        const target = this.findTarget()

        if(this.currentCooldown > 0){
            this.currentCooldown -= deltaTime
        }

        if(target && this.currentCooldown <= 0){
            
            this.shoot(target)
            this.currentCooldown = this.attackCooldown
            this.recoilTimer = this.recoilDuration
        }

        // recoil 
        if(this.recoilTimer > 0){
            this.recoilTimer -= deltaTime
            const recoilProgress = this.recoilTimer / this.recoilDuration
            const recoilOffset = this.recoilAmount * recoilProgress
            this.recoilOffsetX = Math.cos(this.rotationAngle + Math.PI) * recoilOffset
            this.recoilOffsetY = Math.sin(this.rotationAngle + Math.PI) * recoilOffset
        } else {
            this.recoilOffsetX = 0
            this.recoilOffsetY = 0
        }
    }
    updatePosition() {
        this.position.x = this.owner.position.x + this.owner.width / 2 + this.offsetX + this.recoilOffsetX ;
        this.position.y = this.owner.position.y + this.owner.height / 2 + this.offsetY + this.recoilOffsetY ;
    }
    shoot(target){
        const angle = this.rotationAngle
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
    upgrade() {
        switch (this.level) {
            case 2:
                this.damage += 1;
                break;
            case 3:
                this.attackCooldown *= 0.9;
                break;
            case 4:
                this.damage += 2;
                break;
            case 5:
                this.attackCooldown *= 0.9;
                break;
            case 6:
                this.damage += 3;
                break;
        }
    }
}
