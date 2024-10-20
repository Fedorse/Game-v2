export class ExperienceOrb {
    constructor(game, position){
        this.game = game,
        this.position = {...position},
        this.width = 10,
        this.height = 10,
        this.speed = 100,
        this.toRemove = false,
        this.value = 20
    }

    update(deltaTime){
        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)

        if(distance < 50){
            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime
        }
        // console.log(this.position)
    }

    render(context){
        context.save()
        context.translate(-this.game.camera.x, -this.game.camera.y)
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.restore()

    }
}