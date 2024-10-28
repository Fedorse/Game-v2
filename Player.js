import {Sprite} from './Sprite.js'
import { Animation } from './Animation.js';
import { ProjectileWeapon } from './weapon/ProjectileWeapon.js';
import { playerIdleFrames, playerWalkFrames } from './animations/playerAnim.js';
import { MeleWeapon } from './weapon/MeleWeapon.js';

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
        // this.weapon = new ProjectileWeapon(game, this);
        
        // animations
        const idleAnim = new Animation(playerIdleFrames, 200,'playerIdle')
        const walkAnim = new Animation(playerWalkFrames, 200,'playerWalk')
        this.sprite = new Sprite({
                idle: idleAnim,
                walk: walkAnim
            }, this.game.resourceManager);

        // static stats
        this.maxHealth = 100
        this.speed = 130
        
        // level stats
        this.level = 1
        this.experience = 0
        this.nextLevelUp = 30

        // weapon collection
        this.weapons = []
        this.initWeapons()


        this.flipX = false

        this.currentHealth = this.maxHealth

        // direction weapon
        this.lastDirection = {
            x: 1,
            y: 0
        }
        
    }

    initWeapons(){
        this.weapons.push(new ProjectileWeapon(this.game, this))
        // this.weapons.push(new MeleWeapon(this.game, this))
    }
    
        update(deltaTime){
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
            // this.weapon.update(deltaTime);  
            this.weapons.forEach(weapon => weapon.update(deltaTime))

            this.checkExperience()

            this.position.x += this.velocity.x * this.speed * deltaTime
            this.position.y += this.velocity.y * this.speed * deltaTime
        }


        render(context){
            this.sprite.draw(
                context, 
                this.position.x -this.game.camera.x, 
                this.position.y -this.game.camera.y, 
                this.width, 
                this.height,
                this.flipX
            )
            
            // collision box-debug
            context.strokeStyle = 'blue';
            context.strokeRect(
                this.position.x -this.game.camera.x,
                this.position.y -this.game.camera.y,
                this.width,
                this.height
            );
            this.weapons.forEach(weapon => weapon.render(context))
 
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
            // this.weapon.gainExperience(100); // level weapon
            this.weapons.forEach(weapon => weapon.gainExperience(100))
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