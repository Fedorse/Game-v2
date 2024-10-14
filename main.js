import {Game} from './game.js';


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')

const game = new Game(canvas, context);


game.start();

console.log(game.InputHandler)