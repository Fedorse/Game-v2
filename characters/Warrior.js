import { Entity } from "../core/Entity.js";
import {Sprite} from '../Sprite.js'
import { Animation } from '../Animation.js';
import { playerIdleFrames, playerWalkFrames } from '../animations/playerAnim.js';
import { WeaponManager } from '../weapon/WeaponManager.js';
import { SwordWeapon } from '../weapon/SwordWeapon.js';

import { StateMachine } from "../core/StateMachine.js";
import { IdleState, WalkState } from "./CharacterStates.js";

export class Warrior extends Entity{
    constructor(game){
        super(game)
        this.width = 64
        this.height = 64

        this.stats = {
            maxHealth: 120,
            currentHealth: this.maxHealth,
            speed: 100,
            defence: 10,
            level: 1,
            experience: 0,
            nextLevelExperience: 30
        }

        // animations 
        const idleAnim = new Animation(playerIdleFrames, 200,'playerIdle')
        const walkAnim = new Animation(playerWalkFrames, 200,'playerWalk')
        this.sprite = new Sprite({
                idle: idleAnim,
                walk: walkAnim
            }, this.game.resourceManager);
    
        // weapons
        this.weaponManager = new WeaponManager(this.game, this)
        this.initWeapons()

        // state
        this.initialStateMachine()
    }
    initialStateMachine(){
        this.stateMachine = new StateMachine()

        this.stateMachine.addState('idle', new IdleState(this))
        this.stateMachine.addState('walk', new WalkState(this))
        this.stateMachine.setState('idle')
    }

    initWeapons(){
        this.weaponManager.addWeapon(SwordWeapon)

    }

    update(deltaTime){
        this.stateMachine.update(deltaTime)

        this.weaponManager.update(deltaTime)

        this.constrainToMap()
        this.checkExperience()
    }

    constrainToMap(){
       //collision border map
        this.position.x = Math.max(0 + this.width / 2, Math.min(
        this.position.x,
        this.game.mapGenerator.mapWidthInTiles * this.game.mapGenerator.tileWidth - this.width 
            ));
            
        // Ограничение по Y
        this.position.y = Math.max(0 + this.height / 2, Math.min(
        this.position.y,
        this.game.mapGenerator.mapHeightInTiles * this.game.mapGenerator.tileHeight - this.height 
            ));     
    }
    render(context){
        this.weaponManager.render(context)

        this.sprite.draw(
            context, 
            this.position.x -this.game.camera.x, 
            this.position.y -this.game.camera.y, 
            this.width, 
            this.height,
            this.flipX
        )


    }

    checkExperience(){
        this.game.experienceOrbs.forEach((orb, index)=> {
            if(this.isColliding(orb)){
                this.game.experienceOrbs.splice(index, 1)
                this.stats.experience += orb.value

            }
            if(this.stats.experience >= this.stats.nextLevelUp){
                this.levelUp()
            }
        })
    }

    levelUp(){
        this.stats.level++;
        this.stats.experience = 0;
        this.stats.nextLevelExperience += 100;
        this.stats.defence += 10;
        this.weaponManager.gainExperience(100);
        // this.game.ui.showUpgradeAugments()
    }

    takeDamage(damage){
        this.stats.currentHealth -= damage
        if(this.stats.currentHealth <=0){
            this.die()
        }
    }
    die(){
        this.game.gameOver = true
    }

    //collision
    isColliding(obj) {
        return (
            this.position.x < obj.position.x + obj.width &&
            this.position.x + this.width > obj.position.x &&
            this.position.y < obj.position.y + obj.height &&
            this.position.y + this.height > obj.position.y
        );
    }
}