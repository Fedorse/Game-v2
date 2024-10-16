import { Player } from './Player.js'
import { InputHandler } from './InputHandler.js'
import { Spawner } from './Spawner.js'
import { Camera } from './Camera.js'
import { MapGenerator } from './MapGenerator.js'


export  class Game {
 constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.lastTime = 0
    this.deltaTime = 0
    this.gameOver = false
    this.player = new Player(this)
    this.inputHandler = new InputHandler
    this.enemies = []
    this.spawner = new Spawner(this)
    this.camera = new Camera(0, 0, canvas.width, canvas.height, this)

    this.tileSetImage = new Image();
    this.tileSetImage.src = '../public/img/tileset.png';
    this.mapGenerator = new MapGenerator(this, this.tileSetImage);

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
   this.enemies.forEach((enemy , index) => {
      enemy.update(deltaTime)
   })
    this.enemies = this.enemies.filter(enemy => !enemy.toRemove)
    this.player.update(deltaTime)
    this.camera.follow(this.player)
    this.spawner.update(deltaTime)
 }
 render(){
   this.mapGenerator.generateMap(this.context, this.camera);
   this.player.render(this.context)
   this.enemies.forEach(enemy => enemy.render(this.context))
 }
 
}

