import { StateMachine } from "../core/StateMachine.js";
import { Sprite } from "../Sprite.js";
import { Animation } from "../Animation.js";
import { DamageText } from "../ui/DamageText.js";
import {ENEMY_CONFIGS} from '../configs/enemyConfigs.js'
import { Entity } from "../core/Entity.js";
import { EnemyAttackState, EnemyChaseState, EnemyIdleState } from "./EnemyStates.js";
import {ExperienceOrb} from '../ExperienceOrb.js'

export class Enemy extends Entity {
    constructor(game, position, type){
        super(game)
        this.position = position

        const config = ENEMY_CONFIGS[type]

        this.width = 64
        this.height = 64

        this.health = 100
        this.currentHealth = this.health
        this.speed = 100
        this.damage = 10

        this.attackRange = 100
        this.attackCooldown = 1
        this.attackTimer = 0
        this.detectionRange = 60
        this.attackTime = 0

        this.isHit = false
        

        this.initStateMachine()
        this.initSprite(config.animation)

        this.damageTexts = []
    }

    initStateMachine() {
        this.stateMachine = new StateMachine();
        this.stateMachine.addState('idle', new EnemyIdleState(this));
        this.stateMachine.addState('chase', new EnemyChaseState(this));
        this.stateMachine.addState('attack', new EnemyAttackState(this));
        this.stateMachine.setState('idle'); // Начинаем с idle
    }
    initSprite(animConfig){
        const walkAnim = new Animation(
            animConfig.frames,
            animConfig.frameInterval,
            animConfig.spriteName
        )
        this.sprite = new Sprite({walk: walkAnim}, this.game.resourceManager);
    }

    update(deltaTime){
        super.update(deltaTime)
        this.isHit = false
        this.attackTimer = Math.max(0, this.attackTimer - deltaTime)
        this.applySeparationForce()
        // this.updateDamageTexts(deltaTime)
        
    }
    render(context) {
        super.render(context)
        this.damageTexts.forEach(text => text.render(context));   

    }
    attackPlayer() {
        this.game.player.takeDamage(this.damage);
    }

    takeDamage(damage){
        this.currentHealth -= damage
        // this.damageTexts.push(new DamageText({ x: this.position.x + this.width / 2, y: this.position.y }, damage));
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

    // updateDamageTexts(deltaTime){
    //     this.damageTexts.forEach((text, index)=> {
    //         text.update(deltaTime)
    //         if(text.isFinished()){
    //             this.damageTexts.splice(index, 1)
    //         }
    //     })
    // }
    applySeparationForce(){
        let forceX = 0
        let forceY = 0

        this.game.enemies.forEach(otherEnemy => {
            if(this === otherEnemy) return

            const dx = this.position.x - otherEnemy.position.x
            const dy = this.position.y - otherEnemy.position.y
            const distance = Math.hypot(dx, dy)

            const safeDistance = this.width * 0.5
            if(distance < safeDistance && distance > 0){
                const overlap = safeDistance - distance
                const normalized = {x: dx / distance, y: dy / distance}

                forceX += normalized.x * overlap
                forceY += normalized.y * overlap
            }
        })
        this.position.x += forceX * 0.1
        this.position.y += forceY * 0.1
    }

}