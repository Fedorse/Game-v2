import { Weapon } from "./Weapon";
export class MeleWeapon extends Weapon {
    constructor(game, owner){
        super(game, owner)
        this.name = 'mele Weapon'
        this.width = 32
        this.height = 32
        // level weapon stats
        this.attackCooldown = 1;
        this.damage = 12
        this.attackRange = {
            width: 32,
            height: 64
        }
        this.isAttacking = false,
        this.attackDuration = 0.9,
        this.attackElapsedTime = 0,
        this.rotation = 0
        this.img = this.game.resourceManager.getImage('mele')


    }

    attack(){
        if(this.attackTimer <= 0) {
            this.attackTimer = this.attackCooldown
        }

        this.isAttacking = true
        this.attackElapsedTime = 0

        const attackBox = {
            x: this.owner.position.x + (this.owner.flipX ? -this.attackRange.width : this.owner.width),
            y: this.owner.position.y ,
            width: this.attackRange.width,
            height: this.attackRange.height
        }
        this.attackBox = attackBox

        this.game.enemies.forEach((enemy) => {
            if(this.isColliding(attackBox, enemy)){
                enemy.takeDamage(this.damage)
            }
        });

    }

    update(deltaTime){
        super.update(deltaTime)
        if(this.isAttacking){
            this.attackElapsedTime += deltaTime
            const progress = this.attackElapsedTime / this.attackDuration

            this.rotation = Math.PI * progress

            if(this.attackElapsedTime >= this.attackDuration){
                this.isAttacking = false
                this.rotation = 0
                this.attackBox = null
            }
        }
    }

    isColliding(rect1, rect2){
        return(
            rect1.x < rect2.position.x + rect2.width &&
            rect1.x + rect1.width > rect2.position.x && 
            rect1.y < rect2.position.y + rect2.height &&
            rect1.height + rect1.y > rect2.position.y
        )
    }

    render(context) {
        const offsetX = this.owner.flipX ? -this.width / 2 : this.width / 2
        const x = this.owner.position.x + offsetX - this.game.camera.x
        const y = this.owner.position.y + this.owner.height / 2 - this.game.camera.y
        
        context.save()
        context.translate(x, y)
        if(this.owner.flipX){
            context.scale(-1, 1)
        }
        context.rotate(this.rotation)
        context.drawImage(
            this.img,
            -this.width / 2,
            -this.height,
            this.width,
            this.height
        )
        context.restore();

        if(this.attackBox){
            context.strokeStyle = 'red'
            context.strokeRect(
                this.attackBox.x - this.game.camera.x,
                this.attackBox.y - this.game.camera.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
    }
    
}