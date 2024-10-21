import { Projectile } from './Projectile.js'
import {Sprite} from './Sprite.js'
import { Weapon } from './Weapon.js'
import { ProjectileWeapon } from './ProjectileWeapon.js';

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
        // this.attackCooldown = 0.3
        this.attackTimer = 0
        // this.isAttacking = false 
        // this.attackDuration = 0.9
        // this.collisionBox = {
        //     x: 0,
        //     y: 0,
        //     width: 100,
        //     height: 100
        // }
        this.flipX = false
        this.experience = 0
        this.nextLevelUp = 30
        this.level = 1
        this.maxHealth = 100
        this.currentHealth = this.maxHealth
        this.lastDirection = {
            x: 1,
            y: 0
        }
        this.weapon = new ProjectileWeapon(game, this);
        
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
                // Нормализуем направление движения и сохраняем его
            if (moving) {
                const magnitude = Math.hypot(velocity.x, velocity.y);
                this.lastDirection = {
                x: velocity.x / magnitude,
                y: velocity.y / magnitude,
                };
            }

           

            this.position.x += velocity.x * this.speed * deltaTime
            this.position.y += velocity.y * this.speed * deltaTime

            if(moving){
                this.sprite.setAnimation('walk')
            } else {
                this.sprite.setAnimation('idle')
            }

            this.sprite.update(deltaTime)
            this.weapon.update(deltaTime);  
            this.checkExperience()

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
            
            this.drawHealthBar(context);
            

            context.strokeStyle = 'blue';
            context.strokeRect(
                this.position.x ,
                this.position.y ,
                this.width,
                this.height
            );


            context.restore();
            context.fillStyle = 'white';
            context.font = '20px Arial';
            context.fillText(`level: ${this.level}`, 10, 30);
            context.fillText(`Exp: ${this.experience}/${this.nextLevelUp}`, 10, 50);
            context.fillText(`weapon: ${this.weapon.name}`, 10, 70);
            context.fillText(`level weapon: ${this.weapon.level}`, 10, 90);
            
        }
        drawHealthBar(context) {
            // Позиционирование полоски здоровья над игроком
            const barWidth = this.width; // Ширина полоски здоровья
            const barHeight = 10; // Высота полоски здоровья
            const x = this.position.x;
            const y = this.position.y - barHeight - 5; // 5 пикселей выше игрока
          
            // Вычисляем процент здоровья
            const healthPercentage = this.currentHealth / this.maxHealth;
          
            // Рисуем фон (серую полоску)
            context.fillStyle = 'gray';
            context.fillRect(x, y, barWidth, barHeight);
          
            // Рисуем здоровье (зеленую полоску)
            context.fillStyle = 'green';
            context.fillRect(x, y, barWidth * healthPercentage, barHeight);
          
            // Опционально: Рисуем рамку вокруг полоски здоровья
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.strokeRect(x, y, barWidth, barHeight);
          }

        // attack(){
        //     // if(this.attackTimer <=0){
        //     //     this.attackTimer = this.attackCooldown;
        //         const projectile = new Projectile(
        //             this.game,
        //             {
        //                 x: this.position.x + this.width / 2,
        //                 y: this.position.y + this.height / 2
        //             },
        //             // this.lastDirection
        //         )
        //         this.game.projectiles.push(projectile);
                
        //     // }
        // }
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
        gainExperience(amount) {
            this.experience += amount;
          }
        levelUp(){
            this.level ++
            this.experience = 0
            this.nextLevelUp += 50
            this.weapon.gainExperience(100); // level weapon
        }
        takeDamage(amount){
            this.currentHealth -= amount
            if(this.currentHealth <=0){
                this.currentHealth = 0
                this.die()
            }
        }
        die(){
            this.game.gameOver = true
        }
        isColliding(obj) {
            return (
                this.position.x < obj.position.x + obj.width &&
                this.position.x + this.width > obj.position.x &&
                this.position.y < obj.position.y + obj.height &&
                this.position.y + this.height > obj.position.y
            );
        }
        
}