import { Entity } from "../core/Entity.js";
import {Sprite} from '../Sprite.js'
import { Animation } from '../Animation.js';
import { run, idle } from '../animations/hunterAnim.js';
import { WeaponManager } from '../weapon/WeaponManager.js';
import { Bow } from "../weapon/Bow.js";
import { StateMachine } from "../core/StateMachine.js";
import { IdleState, WalkState } from "./CharacterStates.js";

export class Hunter extends Entity {
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
        const idleAnim = new Animation(idle, 200,'IdleHunter')
        const walkAnim = new Animation(run, 200,'RunHunter')
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
        this.weaponManager.addWeapon(Bow)
    }

    update(deltaTime){
        super.update(deltaTime)
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
        super.render(context)
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
}