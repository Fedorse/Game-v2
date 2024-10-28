import { ExperienceOrb } from "../ExperienceOrb"
import { DamageText } from "../ui/DamageText"


export class BaseEnemy { 
    constructor(game, position){
        this.game = game, 
        this.width = 64,
        this.height = 64,
        this.position = position
        
        //static stats 
        this.name = ' '
        this.speed = 0
        this.maxHealth = 0
        this.damage = 0
        this.attackCooldown = 0;  
        this.attackTimer = 0;
        this.currentHealth = this.maxHealth
 

        // states
        this.flipX = false
        this.damageTexts = []
        this.toRemove = false

        //animations
        this.animationSetup()
        this.sprite = null
    }

    animationSetup(){
        //abstract method
    }

    update(deltaTime){
        if (this.toRemove) return;

        this.updateDamageTexts(deltaTime)
        this.moveTowardPlayer(deltaTime)
        this.handleAttack(deltaTime)

    }

    render(context){
        context.save()
        context.translate(-this.game.camera.x, -this.game.camera.y)
        this.sprite.draw(
            context, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height,
            this.flipX
        )

        //render damage text
        this.damageTexts.forEach(text => text.render(context));

        // debug collision box
        context.strokeStyle = 'red';
        context.strokeRect(
            this.position.x ,
            this.position.y ,
            this.height,
            this.width
        );
        context.restore()

    }

    
    takeDamage(damage){
        this.currentHealth -= damage
        this.damageTexts.push(new DamageText({ x: this.position.x + this.width / 2, y: this.position.y }, damage));
        if(this.currentHealth <= 0){
            this.die()
        }
    }

    die(){
        this.toRemove = true
        this.spawnExperienceOrb()
    }
    spawnExperienceOrb(){
        this.game.experienceOrbs.push(new ExperienceOrb(this.game, this.position)
        )
    }

    isCollidingWithPlayer(){
        const player = this.game.player
        return (
            this.position.x < player.position.x + player.width &&
            this.position.x + this.width > player.position.x &&
            this.position.y < player.position.y + player.height &&
            this.position.y + this.height > player.position.y
        )
    }

    attackPlayer(){
        this.game.player.takeDamage(this.damage)
    }

    updateDamageTexts(deltaTime){
        this.damageTexts.forEach((text, index)=> {
            text.update(deltaTime)
            if(text.isFinished()){
                this.damageTexts.splice(index, 1)
            }
        })
    }

    moveTowardPlayer(deltaTime){
        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)

        if(distance > 10){
            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime
            this.flipX = dx < 0
        }
        this.sprite.setAnimation('walk')
        this.sprite.update(deltaTime)
    }

    handleAttack(deltaTime){
    this.attackTimer = Math.max(0, this.attackTimer - deltaTime)
        if(this.isCollidingWithPlayer() && this.attackTimer <= 0){
            this.attackPlayer()
            this.attackTimer = this.attackCooldown

        }
    }
}
