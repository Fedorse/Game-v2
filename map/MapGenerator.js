import { MapStone } from "./MapStone";
import { MapTree } from "./MapTree";
import { MapChest } from "./MapChest";
export class MapGenerator {
  constructor(game) {
    this.game = game;
    this.tileWidth = 16;
    this.tileHeight = 16;
    this.tileSetImage = this.game.resourceManager.getImage('atlas');

    this.tileMapping = {
      ground: { row: 4, col: 2 },
      path: { row: 1, col: 1 },

    };

    this.mapWidthInTiles = 1000;
    this.mapHeightInTiles = 1000;

    this.mapData = [];
    this.mapObjects = []

    this.generateMapData();
    this.initializeMapObjects();
  }

  initializeMapObjects(){
    const stoneSprite = this.game.resourceManager.getImage('stone')

    const numberOfStones = 400;

    for(let i = 0; i < numberOfStones; i++) {
      const position = this.getRandomPosition();
      const stone = new MapStone(this.game, position.x, position.y, stoneSprite);
      this.mapObjects.push(stone);
    }

    const treeSprite = this.game.resourceManager.getImage('tree')
    const numberOfTrees = 100;
    for(let i = 0; i < numberOfTrees; i++) {
      const position = this.getRandomPosition();
      const tree = new MapTree(this.game, position.x, position.y, treeSprite);
      this.mapObjects.push(tree);
    }

    const chestSprite = this.game.resourceManager.getImage('chest')
    const numberOfChests = 300;
    for(let i = 0; i < numberOfChests; i++) {
      const position = this.getRandomPosition();
      const chest = new MapChest(this.game, position.x, position.y, chestSprite);
      this.game.enemies.push(chest);
    }
  }

  getRandomPosition(){
    const maxTileY = this.mapHeightInTiles ;
    const maxTileX = this.mapWidthInTiles ;

    const tileX = Math.floor(Math.random() * maxTileX);
    const tileY = Math.floor(Math.random() * maxTileY);

    const x = tileX * this.tileWidth;
    const y = tileY * this.tileHeight;

    return {x, y};
  }


  generateMapData() {
    for (let row = 0; row < this.mapHeightInTiles; row++) {
      const rowData = [];
      for (let col = 0; col < this.mapWidthInTiles; col++) {
        let tileIndex;

        // Пример: создаём дорожку по центру карты
        if (col === Math.floor(this.mapWidthInTiles / 2)) {
          tileIndex = this.tileMapping.path; // Тайл для дорожки
        } else {
          tileIndex = this.tileMapping.ground; // Основной тайл
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
    const endCol = startCol + Math.ceil(this.game.canvas.width / this.tileWidth) + 1;
    const endRow = startRow + Math.ceil(this.game.canvas.height / this.tileHeight) + 1;

    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        if (row >= 0 && row < this.mapHeightInTiles && col >= 0 && col < this.mapWidthInTiles) {
          const tileIndex = this.mapData[row][col];
          this.drawTile(tileIndex, col * this.tileWidth, row * this.tileHeight, context, camera);
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
    this.mapObjects.forEach(object => {
      if (object.isSolid && this.checkCollision(this.game.player, object)) {
        this.resolveCollision(this.game.player, object);
      }
    });
  }
 
 
  checkCollision(obj1, obj2) {
    return (
      obj1.position.x < obj2.position.x + obj2.width &&
      obj1.position.x + obj1.width > obj2.position.x &&
      obj1.position.y < obj2.position.y + obj2.height &&
      obj1.position.y + obj1.height > obj2.position.y
    );
  }
 
  resolveCollision(player, object) {
    const dx = (player.position.x + player.width / 2) - (object.position.x + object.width / 2);
    const dy = (player.position.y + player.height / 2) - (object.position.y + object.height / 2);
 
    const width = (player.width + object.width) / 2;
    const height = (player.height + object.height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;
 
    if (Math.abs(crossWidth) > Math.abs(crossHeight)) {
      if (crossWidth > 0) {
        player.position.y = object.position.y + object.height;
      } else {
        player.position.y = object.position.y - player.height;
      }
    } else {
      if (crossHeight > 0) {
        player.position.x = object.position.x + object.width;
      } else {
        player.position.x = object.position.x - player.width;
      }
    }
  }
}
