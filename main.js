import {Game} from './game.js';
import {ResourceManager} from './utils/ResourceManager.js'

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const resourceManager = new ResourceManager()

const imagesLoad = [
    { name: 'playerIdle', src: '../public/assets/player/Vinny_idle.png' },
    { name: 'playerWalk', src: '../public/assets/player/Vinny_walk.png' },
    { name: 'piglet', src: '../public/assets/enemy/PIglet_walk.png' },
    { name: 'tileset', src: '../public/assets/tileset.png' },
    {name: 'projectile', src: '../public/assets/projectiles/explosion.png'},
    {name : 'experience', src : '../public/assets/ExpOrb.png'},
    {name: 'mele', src: '../public/assets/mele.png'},
    {name: 'skeleton', src: '../public/assets/enemy/skeleton.png'},
    {name: 'mushroom', src: '../public/assets/enemy/mushroom.png'}
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




