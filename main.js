import {Game} from './game.js';


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')

const game = new Game(canvas, context);
console.log(game)

game.start();

