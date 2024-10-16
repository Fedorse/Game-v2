import { createNoise2D } from 'simplex-noise';

export class MapGenerator {
  constructor(game, tileSetImage) {
    this.game = game;
    this.tileSetImage = tileSetImage;
    this.simplex = createNoise2D();
    this.tileWidth = 32;
    this.tileHeight = 32;

    this.tileMapping = {
      grass: { row: 0, col: 0 },
      random1: { row: 3, col: 1 },
      random2: { row: 3, col: 5 },
      random3: { row: 4, col: 3 },
      random4: { row: 0, col: 4 },
    };
  }

  getTileIndex(noiseValue) {
    if (noiseValue < -0.9) {
      return this.tileMapping.random1;
    } else if (noiseValue < -0.8) {
      return this.tileMapping.random2;
    } else if (noiseValue < -0.7) {
      return this.tileMapping.random3;
    } else if (noiseValue < -0.6) {
      return this.tileMapping.random4;
    } else {
      return this.tileMapping.grass;
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
        const noiseValue = this.simplex(row * 0.1, col * 0.1);
        const tileIndex = this.getTileIndex(noiseValue);
        this.drawTile(tileIndex, col * this.tileWidth, row * this.tileHeight, context, camera);
      }
    }
  }
}
