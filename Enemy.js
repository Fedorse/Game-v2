import { Sprite } from "./Sprite"
import { ExperienceOrb } from "./ExperienceOrb"
import { DamageText } from "./DamageText"
export class Enemy { 
    constructor(game){
        this.game = game, 
        this.width = 100,
        this.height = 100,
        this.position = {
            x: Math.random() * this.game.canvas.width,
            y: Math.random() * this.game.canvas.height
        }
        this.speed = 50
        this.sprite = new Sprite({
            walk: {
                imageName: 'enemyWalk',
                frames: 4, 
                frameWidth: 64, 
                frameHeight: 64, 
                frameY: 0, 
                frameInterval: 100
            }, 
        }, this.game.resourceManager, 'walk')  
             
        this.health = 30
        this.toRemove = false
        this.isDead = false
        this.flipX = false
        this.damageTexts = []
        this.attackCooldown = 5;  
        this.attackTimer = 0;
        this.damage = 10

    }

    update(deltaTime){

        this.damageTexts.forEach((text,index)=>{
            text.update(deltaTime);
            if (text.isFinished()) {
                this.damageTexts.splice(index, 1);  // Удаляем текст, когда анимация закончилась
            }
            if (this.isDead) return;
        })
        if(this.isDead){
            // this.sprite.setAnimation('death')
            this.sprite.update(deltaTime)
            return
        }

        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)

        if(distance > 0){
            this.sprite.setAnimation('walk')
            this.sprite.update(deltaTime)

            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime

            this.flipX = dx < 0

        }
        this.attackTimer = Math.max(0, this.attackTimer - deltaTime)
        if(this.isCollidingWithPlayer() && this.attackTimer <= 0){
            this.attackPlayer()
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
        this.damageTexts.forEach(text => text.render(context));
        context.strokeStyle = 'red';
        context.strokeRect(
            this.position.x ,
            this.position.y ,
            this.width,
            this.height
        );
        context.restore()

    }

    
    takeDamage(amount){
        this.damageTexts.push(new DamageText({ x: this.position.x + this.width / 2, y: this.position.y }, amount));
        this.health -= amount

        if(this.health <= 0){
            this.toRemove = true
            this.isDead = true
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

    attackPlayer(){
        this.game.player.takeDamage(this.damage)
    }


}

