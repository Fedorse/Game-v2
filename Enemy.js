import { Sprite } from "./Spite"
export class Enemy { 
    constructor(game){
        this.game = game, 
        this.width = 10,
        this.height = 10,
        this.position = {
            x: Math.random() * this.game.canvas.width,
            y: Math.random() * this.game.canvas.height
        }
        this.speed = 50
        this.sprite = new Sprite('../public/img/Run.png', 70, 110, 6)
        this.health = 3
        this.toRemove = false

    }

    update(deltaTime){
        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)

        if(distance > 0){
            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime
        }
    }

    render(context){
        context.save()
        context.translate(-this.game.camera.x, -this.game.camera.y)
        // this.sprite.draw(context, this.position.x, this.position.y, this.width, this.height)
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.restore()
    }

    takeDamage(){
        this.health --
        if(this.health <= 0){
            this.toRemove = true
        }
    }

}

