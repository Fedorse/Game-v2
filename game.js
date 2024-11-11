import { Player } from './Player.js'
import { InputHandler } from './utils/InputHandler.js'
import { Spawner } from './Spawner.js'
import { Camera } from './Camera.js'
import { MapGenerator } from './map/MapGenerator.js'
import { UiManager } from './ui/UiManager.js'


export class Game {
 constructor(canvas, context, resourceManager) {
    this.canvas = canvas
    this.context = context
    this.resourceManager = resourceManager
    this.player = new Player(this)
    this.inputHandler = new InputHandler(this)
    this.spawner = new Spawner(this)
    this.ui = new UiManager(this, this.player)
    this.camera = new Camera(0, 0, canvas.width, canvas.height, this)
    this.enemies = []
    this.mapGenerator = new MapGenerator(this);
    this.mapObjects = this.mapGenerator.mapObjects
    this.experienceOrbs = []
    this.projectiles = []
    this.lastTime = 0
    this.deltaTime = 0
    this.gameOver = false
    this.elapsedTime = 0
    this.isPaused = false
 }

   start() {

   requestAnimationFrame(this.gameLoop.bind(this))

   }

   pause(){

      this.isPaused = !this.isPaused
   }


 gameLoop(timeStamp){
    this.deltaTime = (timeStamp - this.lastTime) / 1000
    this.lastTime = timeStamp

    if(!this.isPaused){
       this.elapsedTime += this.deltaTime
       this.update(this.deltaTime)
    }
    
    this.render()

    if(!this.gameOver){
        requestAnimationFrame(this.gameLoop.bind(this))
    } else  {
      document.location.reload();
    }
 }
 checkCollisions() {
   this.mapObjects.forEach(object => {
     if (object.isSolid && this.checkCollision(this.player, object)) {
       this.resolveCollision(this.player, object);
     }
   });
 }


 checkCollision(obj1, obj2) {
   return (
     obj1.position.x < obj2.position.x + obj2.width &&
     obj1.position.x + obj1.width > obj2.position.x &&
     obj1.position.y < obj2.position.y + obj2.height &&
     obj1.position.y + obj1.height > obj2.position.y
   );
 }

 resolveCollision(player, object) {
   const dx = (player.position.x + player.width / 2) - (object.position.x + object.width / 2);
   const dy = (player.position.y + player.height / 2) - (object.position.y + object.height / 2);

   const width = (player.width + object.width) / 2;
   const height = (player.height + object.height) / 2;
   const crossWidth = width * dy;
   const crossHeight = height * dx;

   if (Math.abs(crossWidth) > Math.abs(crossHeight)) {
     if (crossWidth > 0) {
       player.position.y = object.position.y + object.height;
     } else {
       player.position.y = object.position.y - player.height;
     }
   } else {
     if (crossHeight > 0) {
       player.position.x = object.position.x + object.width;
     } else {
       player.position.x = object.position.x - player.width;
     }
   }
 }
 
   update(deltaTime) {

   this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
   })

   this.experienceOrbs.forEach((orb, index)=> {
      orb.update(deltaTime)
      if(orb.toRemove){
         this.experienceOrbs.splice(index, 1)
      }
   })

   this.projectiles.forEach((projectil, index) => {
      projectil.update(deltaTime)
      if(projectil.toRemove){
         this.projectiles.splice(index, 1)
      }
   })
   this.mapObjects.forEach(object => object.update(deltaTime));

    this.enemies = this.enemies.filter(enemy => !enemy.toRemove)
    this.mapObjects = this.mapObjects.filter(object => !object.toRemove)
    this.checkCollisions()
    this.player.update(deltaTime)
    this.camera.follow(this.player)
    this.spawner.update(deltaTime)
    this.ui.update(this.player)
 }

 // render game objects
 render(){

   this.mapGenerator.generateMap(this.context, this.camera); 
   this.mapObjects.forEach(object => object.render(this.context))
   this.player.render(this.context) 
   this.enemies.forEach(enemy => enemy.render(this.context)) 
   this.experienceOrbs.forEach(orb => orb.render(this.context)) 
   this.projectiles.forEach(projectil => projectil.render(this.context))
   this.ui.render(this.context)
 }
}

