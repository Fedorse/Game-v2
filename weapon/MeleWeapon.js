import { BaseWeapon } from "./BaseWeapon";

export class MeleeWeapon extends BaseWeapon {
    constructor(game, owner) {
        super(game, owner);

        // parametrs attack
        this.attackRange = 80;
        this.attackCooldown = 0.8;
        this.damage = 10

        this.isAttacking = false
        this.attackDuration = 0.3
        this.attackTimer = 0
        this.swingAngle = Math.PI / 2 
    }
    handleAttack(deltaTime){
        if(this.isAttacking){
            this.attackTimer += deltaTime;
            const progress = this.attackTimer / this.attackDuration;
            this.angle = this.baseAngle + this.swingAngle * Math.sin(progress * Math.PI);
    
            if(this.attackTimer >= this.attackDuration){
                this.isAttacking = false;
                this.currentCooldown = this.attackCooldown;
                this.attackTimer = 0;
            }
            this.checkEnemyHit();
        } else if (this.currentCooldown <= 0){
            const target = this.findTarget();
            if(target){
                const distance = this.calculateDistance(this.position, target.position);
                if(distance <= this.attackRange){
                    this.isAttacking = true;
                }
            }
        } else {
            this.currentCooldown -= deltaTime;
        }
    }
    

    checkEnemyHit(){
        this.game.enemies.forEach(enemy => {
            const distance = this.calculateDistance(this.position, enemy.position)
            if(distance < this.attackRange){
                if(!enemy.isHit){
                    enemy.takeDamage(this.damage)
                    enemy.isHit = true
                }
            }
        })
    }

    upgrade(){
        switch(this.level){
            case 2: 
                this.damage += 5
                break
            case 3:
                this.attackRange += 20
                break
            case 4:
                this.attackCooldown *= 0.9
                break
            case 5:
                this.damage += 8
                break
            case 6:
                this.attackRange += 30
                break
        }
    }
}