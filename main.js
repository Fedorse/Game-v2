import {Game} from './game.js';
import {ResourceManager} from './ResourceManager.js'

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const resourceManager = new ResourceManager()

const imagesLoad = [
    { name: 'playerIdle', src: '../public/img/player/Vinny_idle.png' },
    { name: 'playerWalk', src: '../public/img/player/Vinny_walk.png' },
    { name: 'enemyWalk', src: '../public/img/enemy/PIglet_walk.png' },
    { name: 'tileset', src: '../public/img/tileset.png' },
    {name: 'projectile', src: '../public/img/projectiles/explosion.png'},
    {name : 'experience', src : '../public/img/ExpOrb.png'}
]

resourceManager.loadImages(imagesLoad)
    .then(()=> {
        const game = new Game(canvas, context, resourceManager);
        game.start();
        console.log(game)
    })
    .catch((err)=> {
        console.error(err)
    })




