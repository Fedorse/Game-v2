import {Sprite} from './Sprite.js'
import { Weapon } from './Weapon.js'
export class Player {
    constructor(game){
        this.game = game
        this.width = 100
        this.height = 100
        this.speed = 150
        this.position = {
            x: 100,
            y: 100
        }
        this.sprite = new Sprite({
            idle: {
                imageName: 'playerIdle',
                frames: 4, 
                frameWidth: 64, 
                frameHeight: 64, 
                frameY: 0, 
                frameInterval: 200
            },
            walk: {
                imageName: 'playerWalk',
                frames: 4, 
                frameWidth: 64, 
                frameHeight: 64, 
                frameY: 0, 
                frameInterval: 200
            }, 
        }, this.game.resourceManager)
        this.weapon = new Weapon(this, '../public/img/weapons/sword.png')
        this.attackCooldown = 0.3
        this.attackTimer = 0
        this.isAttacking = false 
        this.attackDuration = 0.3
        this.attackRange = {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }
        this.flipX = false
        
    }
    
        update(deltaTime){
            //movement
            const input = this.game.inputHandler
            let velocity ={
                x: 0,
                y: 0
            }

            if(input.left) {
                velocity.x = -1
                this.flipX = true
            }
            if(input.right) {
                velocity.x = 1
                this.flipX = false
            }
            if(input.up) velocity.y = -1
            if(input.down) velocity.y = 1
            
            const moving = velocity.x !== 0 || velocity.y !== 0

            this.position.x += velocity.x * this.speed * deltaTime
            this.position.y += velocity.y * this.speed * deltaTime

        // Обновляем атаку
        
        if (this.isAttacking) {
            this.attackTimer += deltaTime;
            if (this.attackTimer > this.attackDuration) {
                this.isAttacking = false; // Заканчиваем атаку
            }
        } else if (moving){
            this.sprite.setAnimation('walk')
        } else {
            this.sprite.setAnimation('walk')
        }




        // Обновляем таймер отката атаки
        if (this.attackTimer > 0) {
            this.attackTimer -= deltaTime;
        } else if (!this.isAttacking) {
            // Если атака не идет и таймер отката завершен, запускаем атаку
            this.attack();
        }

            if(this.isAttacking){
                this.game.enemies.forEach(enemy=>{
                    if(this.isColliding(enemy)){
                        enemy.takeDamage()
                    }
                })
            }

            this.sprite.update(deltaTime)
            // this.weapon.update(deltaTime)

        }


        render(context){
            context.save();
            context.translate(-this.game.camera.x, -this.game.camera.y); 
            this.sprite.draw(
                context, 
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height,
                this.flipX
            )

        if (this.isAttacking) {
            context.fillStyle = 'rgba(255, 0, 0, 0.5)'; 

            
            // Определение позиции зоны атаки (спереди игрока)
            this.attackRange.x = this.game.player.position.x 
            this.attackRange.y = this.game.player.position.y


            // Отрисовка зоны атаки
            context.fillRect(
                this.attackRange.x ,
                this.attackRange.y ,
                this.attackRange.width,
                this.attackRange.height
            );
            // this.weapon.render(context)
        }
            context.restore();
        }

        attack(){
            if(this.attackTimer <=0){
                this.isAttacking = true;
                this.attackTimer = this.attackCooldown;
            }
        }
        isColliding(enemy) {
            return (
                this.attackRange.x < enemy.position.x + enemy.width &&
                this.attackRange.x + this.attackRange.width > enemy.position.x &&
                this.attackRange.y < enemy.position.y + enemy.height &&
                this.attackRange.height + this.attackRange.y > enemy.position.y
                // this.weapon.position.x < enemy.position.x + enemy.width &&
                // this.weapon.position.x + this.weapon.width > enemy.position.x &&
                // this.weapon.position.y < enemy.position.y + enemy.height &&
                // this.weapon.position.y + this.weapon.height > enemy.position.y
            );
        }
        
}