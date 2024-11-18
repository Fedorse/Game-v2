import {Sprite} from '../../Sprite.js'
import { Animation } from '../../Animation.js';
import { playerIdleFrames, playerWalkFrames } from '../../animations/playerAnim.js';
import { WeaponManager } from '../WeaponManager.js';
import { SwordWeapon } from '../SwordWeapon.js';
import {Mace} from '../Mace.js';
import { Bow } from '../Bow.js';
import { Hammer } from '../Hammer.js';
import { Shotgun } from '../Shotgun.js';
import { AK } from '../AK.js';


export class Player {
    constructor(game){
        this.game = game
        this.width = 64
        this.height = 64
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        
        // animations
        const idleAnim = new Animation(playerIdleFrames, 200,'playerIdle')
        const walkAnim = new Animation(playerWalkFrames, 200,'playerWalk')
        this.sprite = new Sprite({
                idle: idleAnim,
                walk: walkAnim
            }, this.game.resourceManager);

        // static stats
        this.maxHealth = 1000
        this.currentHealth = this.maxHealth
        this.speed = 130
        
        // level stats
        this.level = 1
        this.experience = 0
        this.nextLevelUp = 30

        // weapon collection
        this.weaponManager = new WeaponManager(this.game, this)
        this.initWeapons()

        //state
        this.flipX = false

        this.lastDirection = {
            x: 1,
            y: 0
        }

  
            
    }

    initWeapons(){
        this.weaponManager.addWeapon(SwordWeapon)
        // this.weaponManager.addWeapon(Bow)
        this.weaponManager.addWeapon(Mace)
        this.weaponManager.addWeapon(Hammer)
        this.weaponManager.addWeapon(AK)
        this.weaponManager.addWeapon(Shotgun)


    }
    
        update(deltaTime){
            this.previousPosition = { x: this.position.x, y: this.position.y };

            const input = this.game.inputHandler // input handler

            this.velocity.x = 0
            this.velocity.y = 0

            // movement keys
            if(input.left) {
                this.velocity.x = -1
                this.flipX = true
            }
            if(input.right) {
                this.velocity.x = 1
                this.flipX = false
            }
            if(input.up) this.velocity.y = -1
            if(input.down) this.velocity.y = 1

            // last direction (for weapon)
            const moving = this.velocity.x !== 0 || this.velocity.y !== 0
            if (moving) {
                const magnitude = Math.hypot(this.velocity.x, this.velocity.y);
                this.lastDirection = {
                x: this.velocity.x / magnitude,
                y: this.velocity.y / magnitude,
                };
            }

            //animation
            if(moving){
                this.sprite.setAnimation('walk')
            } else {
                this.sprite.setAnimation('idle')
            }

            this.sprite.update(deltaTime)
            this.weaponManager.update(deltaTime)

            this.checkExperience()

            this.position.x += this.velocity.x * this.speed * deltaTime
            this.position.y += this.velocity.y * this.speed * deltaTime

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
                    this.experience += orb.value

                }
                if(this.experience >= this.nextLevelUp){
                    this.levelUp()
                }
            })
        }

        levelUp(){
            this.level ++
            this.experience = 0
            this.nextLevelUp += 100
            this.weaponManager.gainExperience(100)
            // this.game.ui.showUpgradeAugments()
        }

        takeDamage(damage){
            this.currentHealth -= damage
            if(this.currentHealth <=0){
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