import { StateMachine } from "../core/StateMachine.js";
import { State } from "../core/State.js";
import { Sprite } from "../Sprite.js";
import { Animation } from "../Animation.js";
import { DamageText } from "../ui/DamageText.js";
export class Enemy extends Entity {
    constructor(game){
        super(game)
        this.position = this.position
        this.width = 64
        this.height = 64

        this.health = 100
        this.maxHealth = 100
        this.speed = 100
        this.damage = 10

        this.attackRange = 100
        this.attackCooldown = 1
        this.attackTimer = 0
        this.detectionRange = 60
        this.attackTime = 0

        this.isHit = false
        this.flipX = false
        this.toRemove = false

        this.initStateMachine()
        this.initSprite()
    }

    initStateMachine(){
        this.stateMachine = new StateMachine()
    }
    initSprite(){

    }

    update(deltaTime){
        if(this.toRemove) return
        
        this.isHit = false

        this.stateMachine.update(deltaTime)

        this.sprite.update(deltaTime)

        this.attackTimer = Math.max(0, this.attackTimer - deltaTime)

        this.updateDamageTexts(deltaTime)
    }
    render(context) {
        context.save();
        context.translate(-this.game.camera.x, -this.game.camera.y);
        
        if (this.sprite) {
            this.sprite.draw(
                context,
                this.position.x,
                this.position.y,
                this.width,
                this.height,
                this.flipX
            );
        }

        this.damageTexts.forEach(text => text.render(context));

        // Debug collision box
        context.strokeStyle = 'red';
        context.strokeRect(
            this.position.x,
            this.position.y,
            this.height,
            this.width
        );
        
        context.restore();
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
    updateDamageTexts(deltaTime){
        this.damageTexts.forEach((text, index)=> {
            text.update(deltaTime)
            if(text.isFinished()){
                this.damageTexts.splice(index, 1)
            }
        })
    }

    isCollidingWithPlayer() {
        const player = this.game.player;
        return (
            this.position.x < player.position.x + player.width &&
            this.position.x + this.width > player.position.x &&
            this.position.y < player.position.y + player.height &&
            this.position.y + this.height > player.position.y
        );
    }
}