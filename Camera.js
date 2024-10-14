export class Camera {
    constructor(x, y, width, height, game){
        this.game = game, 
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    follow(target){
        this.x = target.x - this.width / 2
        this.y = target.y - this.height / 2
    }
}