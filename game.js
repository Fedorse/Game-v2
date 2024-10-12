import { Player } from './Player.js'
export  class Game {
 constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.lastTime = 0
    this.deltaTime = 0
    this.gameOver = false
    this.player = new Player(this)
 }
 start() {
requestAnimationFrame(this.gameLoop.bind(this))
 }

 gameLoop(timeStamp){
    this.deltaTime = (timeStamp - this.lastTime) / 1000
    this.lastTime = timeStamp

    this.update(this.deltaTime)
    this.render()
    if(!this.gameOver){
        requestAnimationFrame(this.gameLoop.bind(this))
    }else{
        alert('game over');
        document.location.reload();
    }
 }
 update(deltaTime) {

 }
 render(){
    this.context.clearRect(0, 0 , this.canvas.width, this.canvas.height)
 }
}

