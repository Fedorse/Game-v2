import {Sprite} from './Spite.js'
export class Player {
    constructor(game){
        this.game = game
        this.width = 100
        this.height = 100
        this.speed = 200
        this.position = {
            x: 100,
            y: 100
        }
        this.sprite = new Sprite('../public/img/Run.png', 70, 110, 6)
        this.attackCooldown = 0.1
        this.attackTimer = 0
        this.isAttacking = false 
        this.attackDuration = 0.1
        this.attackRange = {
            x: 0,
            y: 0,
            width: 150,
            height: 120
        }
        
    }
    
        update(deltaTime){
            //movement
            const input = this.game.inputHandler
            let velocity ={
                x: 0,
                y: 0
            }

            if(input.left) velocity.x = -1
            if(input.right) velocity.x = 1
            if(input.up) velocity.y = -1
            if(input.down) velocity.y = 1

            this.position.x += velocity.x * this.speed * deltaTime
            this.position.y += velocity.y * this.speed * deltaTime

        // Обновляем атаку
        if (this.isAttacking) {
            this.attackTimer += deltaTime;
            if (this.attackTimer > this.attackDuration) {
                this.isAttacking = false; // Заканчиваем атаку
            }
        }

        // Обновляем таймер отката атаки
        if (this.attackTimer > 0) {
            this.attackTimer -= deltaTime;
        } else if (!this.isAttacking) {
            // Если атака не идет и таймер отката завершен, запускаем атаку
            this.attack();
        }
            this.sprite.update(deltaTime)

            if(this.isAttacking){
                this.game.enemies.forEach(enemy=>{
                    if(this.isColliding(enemy)){
                        enemy.takeDamage()
                    }
                })
            }
        }

        render(context){
            context.save();
            context.translate(-this.game.camera.x, -this.game.camera.y); 
            this.sprite.draw(context, this.position.x, this.position.y, this.width, this.height)
                   // Если игрок атакует, отрисовываем зону атаки в виде прямоугольника
        if (this.isAttacking) {
            context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Полупрозрачный красный цвет

            
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
            );
        }
        
}