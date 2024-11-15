export class Entity {
    constructor(game){
        this.game = game
        this.position = {x: 0, y: 0}
        this.width = 0
        this.height = 0
        this.velocity = {x: 0, y: 0}
        this.sprite = null
        this.stateMachine = null
        this.flipX = false
        this.toRemove = false
    }
    update(deltaTime){

    }
    render(context){
        
    }
}