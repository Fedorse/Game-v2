export class Camera {
    constructor(x, y, width, height, game){
        this.game = game, 
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    follow(target){
        this.x = target.position.x - this.width / 2
        this.y = target.position.y - this.height / 2
    }
}