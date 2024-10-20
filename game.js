import { Player } from './Player.js'
import { InputHandler } from './InputHandler.js'
import { Spawner } from './Spawner.js'
import { Camera } from './Camera.js'
import { MapGenerator } from './MapGenerator.js'


export  class Game {
 constructor(canvas, context, resourceManager) {
    this.canvas = canvas
    this.context = context
    this.resourceManager = resourceManager
    this.lastTime = 0
    this.deltaTime = 0
    this.gameOver = false
    this.player = new Player(this)
    this.inputHandler = new InputHandler()
    this.enemies = []
    this.experienceOrbs = []
    this.spawner = new Spawner(this)
    this.camera = new Camera(0, 0, canvas.width, canvas.height, this)
    this.mapGenerator = new MapGenerator(this);


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
   this.enemies.forEach((enemy ) => {
      enemy.update(deltaTime)
   })
   this.experienceOrbs.forEach((orb, index)=> {
      orb.update(deltaTime)
      if(orb.toRemove){
         this.experienceOrbs.splice(index, 1)
      }
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
   this.experienceOrbs.forEach(orb => orb.render(this.context))
 }
 
}

