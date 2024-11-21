export const MAP_CONFIG = {
  STONE: {
    type: 'stone',
    width: 32,
    height: 32,
    spriteName: 'stone',
    isSolid: true,
    isDestructible: false,
  },
  TREE: {
    type: 'tree',
    width: 64,
    height: 96,
    spriteName: 'tree',
    isSolid: true,
    isDestructible: false,
  },
  CHEST: {
    type: 'chest',
    width: 48,
    height: 32,
    spriteName: 'chest',
    isSolid: true,
    isDestructible: true,
    health: 10,
    loot: {
      experience: 20,
    },
  },
};
