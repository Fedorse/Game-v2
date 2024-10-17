import { Sprite } from "./Sprite"
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
            run: {
                imgSrc: '../public/img/enemy/Run.png',
                frames: 8, 
                frameWidth: 150, 
                frameHeight: 150, 
                frameY: 0, 
                frameInterval: 200
            },
            death: {
                imgSrc: '../public/img/enemy/Death.png',
                frames: 4, 
                frameWidth: 150, 
                frameHeight: 150, 
                frameY: 0, 
                frameInterval: 200
            },
            
        })        
        this.health = 100
        this.toRemove = false
        this.isDead = false
        this.flipX = false

    }

    update(deltaTime){
        if(this.isDead){
            this.sprite.setAnimation('death')
            this.sprite.update(deltaTime)
            return
        }

        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)

        if(distance > 0){
            this.sprite.setAnimation('run')
            this.sprite.update(deltaTime)

            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime

            this.flipX = dx < 0

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
        context.restore()
    }

    takeDamage(){
        this.health --
        if(this.health <= 0){
            this.toRemove = true
            this.isDead = true
        }
    }

}

