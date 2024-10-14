export class MapGenerator {
    constructor(tileWidth, tileHeight){
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.tilesetImage = null
        this.map = []
    }

    setTilesetImage(image){
        this.tilesetImage = image
    }

    generateMap(width, height){
         for(let y = 0; y < height; y++){
            this.map[y] = []
            for(let x = 0; x < width; x++){
                this.map[y][x] = Math.floor(Math.random() * 4) // random tile for demonstration
            }
         }
    }

    render(context, camera){
        const startCol = Math.floor(camera.x / this.tileWidth)
        const endCol = startCol + Math.ceil(camera.width / this.tileWidth) + 1
        const startRow = Math.floor(camera.y / this.tileHeight)
        const endRow = startRow + Math.ceil(camera.height / this.tileHeight) + 1


        for(let row = startRow; row < endRow; row ++){
            for(let col = startCol; col < endCol; col++){
                const tile = this.map[row][col]
                const x = col * this.tileWidth
                const y = row * this.tileHeight
                context.drawImage(
                    this.tilesetImage,
                    tile * this.tileWidth, 0, // source x, y
                    this.tileWidth, this.tileHeight,
                    x, y,
                    this.tileWidth, this.tileHeight
                )
            }
        }
    }
}