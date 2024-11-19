export class Entity {
    constructor(game){
        this.game = game
        this.position = {x: 0, y: 0}
        this.width = 64
        this.height = 64
        this.velocity = {x: 0, y: 0}
        this.sprite = null
        this.stateMachine = null
        this.flipX = false
        this.toRemove = false

        
        
    }
    isColliding(obj) {
        return (
            this.position.x < obj.position.x + obj.width &&
            this.position.x + this.width > obj.position.x &&
            this.position.y < obj.position.y + obj.height &&
            this.position.y + this.height > obj.position.y
        );
    }
    isCollidingWithPlayer() {
        return this.isColliding(this.game.player);
    }

    getDistanceTo(entity) {
        const dx = this.position.x - entity.position.x;
        const dy = this.position.y - entity.position.y;
        return Math.hypot(dx, dy);
    }


    getDirectionTo(entity) {
        const dx = entity.position.x - this.position.x;
        const dy = entity.position.y - this.position.y;
        const distance = Math.hypot(dx, dy);
        
        return {
            x: distance ? dx / distance : 0,
            y: distance ? dy / distance : 0
        };
    }

    update(deltaTime){
        if(this.toRemove) return
        this.stateMachine.update(deltaTime);
        this.sprite.update(deltaTime);


    }
    render(context){
        if (this.sprite) {
            this.sprite.draw(
                context, 
                this.position.x - this.game.camera.x, 
                this.position.y - this.game.camera.y, 
                this.width, 
                this.height,
                this.flipX
            );
        }
    }
}