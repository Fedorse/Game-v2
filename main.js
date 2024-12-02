import { Game } from './core/Game.js';
import { ResourceManager } from './utils/ResourceManager.js';
import { AUDIO_CONFIG } from './configs/audioConfig.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const resourceManager = new ResourceManager();

const imagesLoad = [
  { name: 'playerIdle', src: '../public/assets/player/Vinny_idle.png' },
  { name: 'playerWalk', src: '../public/assets/player/Vinny_walk.png' },
  { name: 'piglet', src: '../public/assets/enemy/PIglet_walk.png' },
  { name: 'tileset', src: '../public/assets/tileset.png' },
  { name: 'projectile', src: '../public/assets/projectiles/projectile.png' },
  { name: 'experience', src: '../public/assets/ExpOrb.png' },
  { name: 'mele', src: '../public/assets/mele.png' },
  { name: 'skeleton', src: '../public/assets/enemy/skeleton.png' },
  { name: 'mushroom', src: '../public/assets/enemy/mushroom.png' },
  { name: 'sword', src: '../public/assets/sword.png' },
  { name: 'bow', src: '../public/assets/Bow02.png' },
  { name: 'arrow', src: '../public/assets/projectiles/Arrow01.png' },
  { name: 'hamer', src: '../public/assets/Hammer01.png' },
  { name: 'mace', src: '../public/assets/Mace01.png' },
  {
    name: 'pistolShoot',
    src: '../public/assets/projectiles/PistolAmmoBig.png',
  },
  { name: 'gunShoot', src: '../public/assets/projectiles/ShotgunShellBig.png' },
  { name: 'AK', src: '../public/assets/AK47.png' },
  { name: 'shootGun', src: '../public/assets/SawedOffShotgun.png' },
  { name: 'atlas', src: '../public/assets/Atlas.png' },
  { name: 'stone', src: '../public/assets/Stone.png' },
  { name: 'tree', src: '../public/assets/tree.png' },
  { name: 'chest', src: '../public/assets/chest.png' },
  { name: 'IdleHunter', src: '../public/assets/IdleHunter.png' },
  { name: 'RunHunter', src: '../public/assets/RunHunter.png' },
  { name: 'btnHover', src: '../public/assets/GUI/buttons/button_hover.png' },
  { name: 'btnNormal', src: '../public/assets/GUI/buttons/button_normal.png' },
  {
    name: 'btnPressed',
    src: '../public/assets/GUI/buttons/button_pressed.png',
  },
  { name: 'menu', src: '../public/assets/GUI/menu.png' },
  { name: 'heroBg', src: '../public/assets/GUI/heroBg.png' },
  { name: 'hunterIcon', src: '../public/assets/GUI/hunterIcon.png' },
  { name: 'warriorIcon', src: '../public/assets/GUI/warriorIcon.png' },
  { name: 'bgStats', src: '../public/assets/GUI/heroStats.png' },
  { name: 'healthBar', src: '../public/assets/GUI/helathBar.png' },
  { name: 'card', src: '../public/assets/GUI/cardLevel.png' },
];

resourceManager
  .loadImages(imagesLoad)
  .then(() => resourceManager.loadAudios(AUDIO_CONFIG))
  .then(() => {
    const game = new Game(canvas, context, resourceManager);
    game.start();
    console.log(game);
  })
  .catch((err) => {
    console.error(err);
  });
