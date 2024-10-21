import { Sprite } from "./Sprite"
import { ExperienceOrb } from "./ExperienceOrb"
import { DamageText } from "./DamageText"

export class Enemy { 
    constructor(game, position){
        this.game = game, 
        this.width = 64,
        this.height = 64,
        this.position = position
        this.sprite = new Sprite({
            walk: {
                imageName: 'enemyWalk',
                frames: 4, 
                frameWidth: this.width, 
                frameHeight: this.height, 
                frameY: 0, 
                frameInterval: 100
            }, 
        }, this.game.resourceManager, 'walk')  
        
        //static stats 
        this.speed = 50
        this.health = 10
        this.damage = 10

        // attack cooldown enemy
        this.attackCooldown = 5;  
        this.attackTimer = 0;

        //death enemy
        this.toRemove = false

        this.flipX = false
        this.damageTexts = []
        
    }

    update(deltaTime){
        // damage text animation
        this.damageTexts.forEach((text,index)=>{
            text.update(deltaTime);
            if (text.isFinished()) {
                this.damageTexts.splice(index, 1);
            }
            if (this.toRemove) return;
        })

        // movement enemy for player
        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)

        if(distance > 10){
            this.sprite.setAnimation('walk')
            this.sprite.update(deltaTime)

            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime

            // flip direction enemy
            this.flipX = dx < 0

        }

        // attack enemy for player
        this.attackTimer = Math.max(0, this.attackTimer - deltaTime)
        if(this.isCollidingWithPlayer() && this.attackTimer <= 0){
            this.attackEnemy()
            this.attackTimer = this.attackCooldown

        }
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
            this.width,
            this.height
        );
        context.restore()

    }

    
    takeDamage(damage){
        // add dmg text
        this.damageTexts.push(new DamageText({ x: this.position.x + this.width / 2, y: this.position.y }, damage));

        this.health -= damage
        if(this.health <= 0){
            this.toRemove = true

            //spawn experience orb
            this.game.experienceOrbs.push(new ExperienceOrb(this.game, this.position)
            )
        }
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

    attackEnemy(){
        this.game.player.takeDamage(this.damage)
    }


}

