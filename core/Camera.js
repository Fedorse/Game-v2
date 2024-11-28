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
        this.x = Math.max(0, Math.min(
            this.x,
            this.game.mapGenerator.mapWidthInTiles * this.game.mapGenerator.tileWidth - this.width
          ));
        this.y = Math.max(0, Math.min(
            this.y,
            this.game.mapGenerator.mapHeightInTiles * this.game.mapGenerator.tileHeight - this.height
        ))
    }
}