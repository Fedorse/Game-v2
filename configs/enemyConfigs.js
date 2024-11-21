import { mushroomWalkAnim } from '../animations/mushroomWalkAnim';
import { skeletonWalkAnim } from '../animations/skeletonWalkAnim';
import { pigletWalkAnim } from '../animations/pigletWalkAnim';
export const ENEMY_CONFIGS = {
  SKELETON: {
    name: 'skeleton',
    width: 64,
    height: 64,
    stats: {
      health: 20,
      speed: 80,
      damage: 10,
    },
    animation: {
      frames: skeletonWalkAnim,
      spriteName: 'skeleton',
      frameInterval: 200,
    },
  },
  PIGLET: {
    name: 'piglet',
    width: 64,
    height: 64,
    stats: {
      health: 50,
      speed: 100,
      damage: 20,
    },
    animation: {
      frames: pigletWalkAnim,
      spriteName: 'piglet',
      frameInterval: 200,
    },
  },
  MUSHROOM: {
    name: 'mushroom',
    width: 64,
    height: 64,
    stats: {
      health: 100,
      speed: 150,
      damage: 30,
    },
    animation: {
      frames: mushroomWalkAnim,
      spriteName: 'mushroom',
      frameInterval: 200,
    },
  },
};
