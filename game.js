// import { Player } from './Player.js'
import { InputHandler } from './utils/InputHandler.js';
import { Spawner } from './Spawner.js';
import { Camera } from './Camera.js';
import { MapGenerator } from './map/MapGenerator.js';
import { UiManager } from './ui/UiManager.js';
import { Warrior } from './characters/Warrior.js';
import { Hunter } from './characters/Hunter.js';

export class Game {
  constructor(canvas, context, resourceManager) {
    this.canvas = canvas;
    this.context = context;
    this.resourceManager = resourceManager;
    const characterType = 'warrior';
    switch (characterType) {
      case 'warrior':
        this.player = new Warrior(this);
        break;
      case 'hunter':
        this.player = new Hunter(this);
        break;
    }
    // this.player = new Player(this)
    this.inputHandler = new InputHandler(this);
    this.spawner = new Spawner(this);
    this.ui = new UiManager(this, this.player);
    this.camera = new Camera(0, 0, canvas.width, canvas.height, this);
    this.enemies = [];
    this.mapGenerator = new MapGenerator(this);
    this.mapObjects = this.mapGenerator.mapObjects;
    this.experienceOrbs = [];
    this.projectiles = [];
    this.lastTime = 0;
    this.deltaTime = 0;
    this.gameOver = false;
    this.elapsedTime = 0;
    this.isPaused = false;
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  pause() {
    this.isPaused = !this.isPaused;
  }

  gameLoop(timeStamp) {
    this.deltaTime = (timeStamp - this.lastTime) / 1000;
    this.lastTime = timeStamp;

    if (!this.isPaused) {
      this.elapsedTime += this.deltaTime;
      this.update(this.deltaTime);
    }

    this.render();

    if (!this.gameOver) {
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      document.location.reload();
    }
  }

  update(deltaTime) {
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });

    this.experienceOrbs.forEach((orb, index) => {
      orb.update(deltaTime);
      if (orb.toRemove) {
        this.experienceOrbs.splice(index, 1);
      }
    });

    this.projectiles.forEach((projectil, index) => {
      projectil.update(deltaTime);
      if (projectil.toRemove) {
        this.projectiles.splice(index, 1);
      }
    });
    this.mapObjects.forEach((object) => object.update(deltaTime));

    this.enemies = this.enemies.filter((enemy) => !enemy.toRemove);
    this.mapObjects = this.mapObjects.filter((object) => !object.toRemove);
    this.mapGenerator.checkCollisions();
    this.player.update(deltaTime);
    this.camera.follow(this.player);
    this.spawner.update(deltaTime);
    this.ui.update(this.player);
  }

  // render game objects
  render() {
    this.mapGenerator.generateMap(this.context, this.camera);
    this.mapObjects.forEach((object) => object.render(this.context));
    this.player.render(this.context);
    this.enemies.forEach((enemy) => enemy.render(this.context));
    this.experienceOrbs.forEach((orb) => orb.render(this.context));
    this.projectiles.forEach((projectil) => projectil.render(this.context));
    this.ui.render(this.context);
  }
}
