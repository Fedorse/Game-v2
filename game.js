import { Player } from './Player.js'
import { InputHandler } from './utils/InputHandler.js'
import { Spawner } from './Spawner.js'
import { Camera } from './Camera.js'
import { MapGenerator } from './map/MapGenerator.js'
import { UiManager } from './ui/UiManager.js'
import {CollisionManager} from './utils/CollisionManager.js'


export class Game {
 constructor(canvas, context, resourceManager) {
    this.canvas = canvas
    this.context = context
    this.resourceManager = resourceManager

    // game state 
    this.gameState = {
         isPaused: false,
         isGameOver: false,
         elapsedTime: 0,
         difficulty: 1,
         score: 1
    }

    // systems parameters 
    this.lastTime = 0
    this.deltaTime = 0

    //game obj collections
    this.gameObjects = {
      enemies: [],
      projectiles: [],
      experienceOrbs: [],
      mapObjects: []
    }
    this.initializeSystems()
    this.initialGameObjects()
 }

   initializeSystems(){
      this.inputHandler = new InputHandler(this)
      this.collisionManager = new CollisionManager(this)
      this.camera = new Camera(0, 0, canvas.width, canvas.height, this)

   }

   initialGameObjects(){
      this.mapGenerator = new MapGenerator(this);
      this.player = new Player(this)
      this.ui = new UiManager(this, this.player)

      this.spawner = new Spawner(this)
   }


   start() {
      this.gameState.isPaused = false
      this.gameState.isGameOver = false
      requestAnimationFrame(this.gameLoop.bind(this))
   }

 gameLoop(timeStamp){
    this.calculateDeltaTime(timeStamp)

    if(!this.gameState.isPaused) {
       this.update(this.deltaTime)
    }
    
    this.render()

    if(!this.gameState.isGameOver){
        requestAnimationFrame(this.gameLoop.bind(this))
    }
 }

 calculateDeltaTime(timeStamp){
   this.deltaTime = (timeStamp - this.lastTime) / 1000
   this.lastTime = timeStamp
 }

 
   update(deltaTime) {
      if(this.gameState.isGameOver) return

      this.gameState.elapsedTime += deltaTime

      this.updateGameObjects(deltaTime)

      this.collisionManager.update()
      
      this.cleanupObjects()

      this.camera.follow(this.player)

 }

 updateGameObjects(deltaTime){
   this.player.update(deltaTime)

   Object.values(this.gameObjects).forEach(collection => {
      collection.forEach(object => object.update(deltaTime))
   })
   this.spawner.update(deltaTime)
 }

 cleanupObjects(){
   for(const [key, collection] of Object.entries(this.gameObjects)){
      this.gameObjects[key] = collection.filter(object => !object.toRemove)
   }
 }

 // render game objects
 render(){
   this.context.clearRect(0, 0 , this.canvas.width, this.canvas.height)
   this.mapGenerator.generateMap(this.context, this.camera);
   this.renderGameObjects()
   this.ui.render(this.context)
 }

 renderGameObjects() {
   // Создаем массив всех объектов для сортировки по Y
   const allObjects = [
       ...this.gameObjects.mapObjects,
       ...this.gameObjects.experienceOrbs,
       ...this.gameObjects.enemies,
       this.player,
       ...this.gameObjects.projectiles
   ].filter(obj => obj != null);

   // Сортируем объекты по Y координате для правильного наложения
   allObjects
       .sort((a, b) => a.position.y - b.position.y)
       .forEach(obj => obj.render(this.context));
}

    // Вспомогательные методы для управления состоянием
    pause() {
      this.gameState.isPaused = true;
  }

  resume() {
      this.gameState.isPaused = false;
  }

  togglePause() {
      this.gameState.isPaused = !this.gameState.isPaused;
  }

  gameOver() {
      this.gameState.isGameOver = true;
  }

  // Методы для управления игровыми объектами
  addEnemy(enemy) {
      this.gameObjects.enemies.push(enemy);
  }

  addProjectile(projectile) {
      this.gameObjects.projectiles.push(projectile);
  }

  addExperienceOrb(orb) {
      this.gameObjects.experienceOrbs.push(orb);
  }

  removeGameObject(object, collectionName) {
      const index = this.gameObjects[collectionName].indexOf(object);
      if (index !== -1) {
          this.gameObjects[collectionName].splice(index, 1);
      }
  }

}

