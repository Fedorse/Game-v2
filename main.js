import { Game } from './core/Game.js';
import { ResourceManager } from './managers/ResourceManager.js';
import { AUDIO_CONFIG } from './configs/audioConfig.js';
import { SPRITES_CONFIG } from './configs/spritesConfig.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const resourceManager = new ResourceManager();

resourceManager
  .loadImages(SPRITES_CONFIG)
  .then(() => resourceManager.loadAudios(AUDIO_CONFIG))
  .then(() => {
    const game = new Game(canvas, context, resourceManager);
    game.start();
    console.log(game);
  })
  .catch((err) => {
    console.error(err);
  });
