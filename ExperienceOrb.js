
export class ExperienceOrb {
    constructor(game, position){
        this.game = game,
        this.position = position,
        this.width = 32,
        this.height = 32,
        this.toRemove = false,

        // stats exp
        this.value = 20
        this.speed = 80,

        this.img = this.game.resourceManager.getImage('experience')
    }

    update(deltaTime){
        // move to player
        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)
        if(distance < 50){
            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime
        }

    }

    render(context){
        context.drawImage(
            this.img,
            this.position.x  -this.game.camera.x,
            this.position.y -this.game.camera.y,
            this.width,
            this.height
        )
           // collision box-debug
           context.strokeStyle = 'green';
           context.strokeRect(
               this.position.x  -  this.game.camera.x ,
               this.position.y  - this.game.camera.y ,
               this.width,
               this.height
           );
    }
}
