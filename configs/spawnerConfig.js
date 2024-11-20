export const SPAWN_CONFIG = {
  waves: [
    {
      time: 0,
      types: ['SKELETON'],
      interval: 2.0,
    },
    {
      time: 60,
      types: ['SKELETON', 'PIGLET'],
      interval: 1.8,
    },
    {
      time: 120,
      types: ['SKELETON', 'PIGLET', 'MUSHROOM'],
      interval: 1.5,
    },
  ],
  minSpawnInterval: 0.5,
  difficultyIncreaseInterval: 60,
  spawnDistanceFromPlayer: 30,
  minRadius: 400,
  maxRadius: 600,
};
