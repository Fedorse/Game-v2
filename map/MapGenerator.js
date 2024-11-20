import { MapObjFactory } from './MapObjFactory';
export class MapGenerator {
  constructor(game) {
    this.game = game;
    this.tileWidth = 16;
    this.tileHeight = 16;
    this.mapFactory = new MapObjFactory(game);
    this.tileSetImage = this.game.resourceManager.getImage('atlas');

    this.tileMapping = {
      ground: { row: 4, col: 2 },
      path: { row: 1, col: 1 },
    };

    this.mapWidthInTiles = 1000;
    this.mapHeightInTiles = 1000;

    this.mapData = [];
    this.mapObjects = [];
    console.log(this.mapObjects);
    this.generateMapData();
    this.initializeMapObjects();
  }

  initializeMapObjects() {
    const numberOfStones = 400;
    for (let i = 0; i < numberOfStones; i++) {
      const position = this.getRandomPosition();
      const stone = this.mapFactory.createObj('STONE', position.x, position.y);
      this.mapObjects.push(stone);
    }

    const numberOfTrees = 100;
    for (let i = 0; i < numberOfTrees; i++) {
      const position = this.getRandomPosition();
      const tree = this.mapFactory.createObj('TREE', position.x, position.y);
      this.mapObjects.push(tree);
    }

    const numberOfChests = 300;
    for (let i = 0; i < numberOfChests; i++) {
      const position = this.getRandomPosition();
      const chest = this.mapFactory.createObj('CHEST', position.x, position.y);
      this.game.enemies.push(chest);
    }
  }

  getRandomPosition() {
    const maxTileY = this.mapHeightInTiles;
    const maxTileX = this.mapWidthInTiles;

    const tileX = Math.floor(Math.random() * maxTileX);
    const tileY = Math.floor(Math.random() * maxTileY);

    const x = tileX * this.tileWidth;
    const y = tileY * this.tileHeight;

    return { x, y };
  }

  generateMapData() {
    for (let row = 0; row < this.mapHeightInTiles; row++) {
      const rowData = [];
      for (let col = 0; col < this.mapWidthInTiles; col++) {
        let tileIndex;
        if (col === Math.floor(this.mapWidthInTiles / 2)) {
          tileIndex = this.tileMapping.path;
        } else {
          tileIndex = this.tileMapping.ground;
        }

        rowData.push(tileIndex);
      }
      this.mapData.push(rowData);
    }
  }

  drawTile(tileInfo, x, y, context, camera) {
    const tileX = tileInfo.col * this.tileWidth;
    const tileY = tileInfo.row * this.tileHeight;

    context.drawImage(
      this.tileSetImage,
      tileX,
      tileY,
      this.tileWidth,
      this.tileHeight,
      x - camera.x,
      y - camera.y,
      this.tileWidth,
      this.tileHeight
    );
  }

  generateMap(context, camera) {
    const startCol = Math.floor(camera.x / this.tileWidth);
    const startRow = Math.floor(camera.y / this.tileHeight);
    const endCol =
      startCol + Math.ceil(this.game.canvas.width / this.tileWidth) + 1;
    const endRow =
      startRow + Math.ceil(this.game.canvas.height / this.tileHeight) + 1;

    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        if (
          row >= 0 &&
          row < this.mapHeightInTiles &&
          col >= 0 &&
          col < this.mapWidthInTiles
        ) {
          const tileIndex = this.mapData[row][col];
          this.drawTile(
            tileIndex,
            col * this.tileWidth,
            row * this.tileHeight,
            context,
            camera
          );
        } else {
          context.fillStyle = 'black';
          context.fillRect(
            col * this.tileWidth - camera.x,
            row * this.tileHeight - camera.y,
            this.tileWidth,
            this.tileHeight
          );
        }
      }
    }
  }
  checkCollisions() {
    this.mapObjects.forEach((object) => {
      object.update();
    });
  }
}
