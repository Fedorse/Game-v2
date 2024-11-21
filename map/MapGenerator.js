import { MapObjFactory } from './MapObjFactory';

export class MapGenerator {
  constructor(game) {
    this.game = game;
    this.tileWidth = 16;
    this.tileHeight = 16;
    this.mapFactory = new MapObjFactory(game);
    this.tileSetImage = this.game.resourceManager.getImage('atlas');

    this.groundTile = { row: 4, col: 2 };

    this.mapWidthInTiles = 1000;
    this.mapHeightInTiles = 1000;

    this.mapData = [];
    this.mapObjects = [];

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
      this.mapObjects.push(chest);
    }
  }

  getRandomPosition() {
    const tileX = Math.floor(Math.random() * this.mapWidthInTiles);
    const tileY = Math.floor(Math.random() * this.mapHeightInTiles);

    return {
      x: tileX * this.tileWidth,
      y: tileY * this.tileHeight,
    };
  }

  generateMapData() {
    for (let row = 0; row < this.mapHeightInTiles; row++) {
      const rowData = new Array(this.mapWidthInTiles).fill(this.groundTile);
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
        this.drawTile(
          this.groundTile,
          col * this.tileWidth,
          row * this.tileHeight,
          context,
          camera
        );
      }
    }
  }

  isInBounds(row, col) {
    return (
      row >= 0 &&
      row < this.mapHeightInTiles &&
      col >= 0 &&
      col < this.mapWidthInTiles
    );
  }

  checkCollisions() {
    this.mapObjects.forEach((object) => object.update());
  }

  constrainPosition(entity) {
    return {
      x: Math.max(
        0 + entity.width / 2,
        Math.min(
          entity.position.x,
          this.mapWidthInTiles * this.tileWidth - entity.width
        )
      ),
      y: Math.max(
        0 + entity.height / 2,
        Math.min(
          entity.position.y,
          this.mapHeightInTiles * this.tileHeight - entity.height
        )
      ),
    };
  }
}
