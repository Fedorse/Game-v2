import { MAP_CONFIG } from '../configs/mapConfig.js';
import { StaticEntity } from './StaticEntity.js';
export class MapObjFactory {
  constructor(game) {
    this.game = game;
  }
  createObj(type, x, y) {
    const config = MAP_CONFIG[type];
    return new StaticEntity(this.game, x, y, config);
  }
}
