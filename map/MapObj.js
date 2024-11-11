export class MapObj {
    constructor(game, x, y, width, height, sprite) {
        this.game = game;
        this.position = { x, y };
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.isColliding = false;
        this.toRemove = false;
    }

    update(deltaTime) {

    }
    interact(){

    }
    render(context) {
        context.drawImage(
            this.sprite,
            this.position.x - this.game.camera.x,
            this.position.y - this.game.camera.y,
            this.width,
            this.height
        )
    }
}