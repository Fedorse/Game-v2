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
    this.mapGenerator = new MapGenerator(32, 32)


    this.tilesetImage = new Image()
    this.tilesetImage.src = '../public/img/tileset.png'
    this.tilesetImage.onload = () => {
        this.mapGenerator.setTilesetImage(this.tilesetImage)
        this.mapGenerator.generateMap(100, 100)
    }
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
    this.player.update(deltaTime)
    this.spawner.update(deltaTime)
    this.camera.follow(this.player)
 }
 render(){
   this.context.fillStyle = 'black'
   this.context.fillRect(0, 0 , this.canvas.width, this.canvas.height)
   //  this.context.clearRect(0, 0 , this.canvas.width, this.canvas.height)
   this.context.save()
   this.context.translate(-this.camera.x, -this.camera.y)
   this.mapGenerator.render(this.context,this.camera)
   this.player.render(this.context)
   this.context.restore()

   //  this.enemies.forEach(enemy => enemy.render(this.context))
 }
 
}

