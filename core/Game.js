import { InputHandler } from '../utils/InputHandler.js';
import { Spawner } from './Spawner.js';
import { Camera } from './Camera.js';
import { MapGenerator } from '../entities/map/MapGenerator.js';
import { UiManager } from '../managers/UiManager.js';
import { Warrior } from '../entities/characters/Warrior.js';
import { Hunter } from '../entities/characters/Hunter.js';
import { DamageText } from '../ui/DamageText.js';
import { SoundController } from '../utils/SoundContoller.js';
import { ScreenManager } from '../managers/ScreenManager.js';

export class Game {
  constructor(canvas, context, resourceManager) {
    this.canvas = canvas;
    this.context = context;
    this.resourceManager = resourceManager;
    this.inputHandler = new InputHandler(this);
    this.spawner = new Spawner(this);
    this.ui = new UiManager(this, null);
    this.camera = new Camera(0, 0, canvas.width, canvas.height, this);
    this.enemies = [];
    this.mapGenerator = new MapGenerator(this);
    this.soundController = new SoundController(this.resourceManager);
    this.mapObjects = this.mapGenerator.mapObjects;
    this.experienceOrbs = [];
    this.projectiles = [];
    this.damageTexts = [];
    this.lastTime = 0;
    this.deltaTime = 0;
    this.gameOver = false;
    this.elapsedTime = 0;
    this.isPaused = false;
    this.state = 'menu'; // state game 'menu', 'heroSelection', 'playing'
    this.screenManager = new ScreenManager(this);
    this.screenManager.showScreen('mainMenu');
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.soundController.setMusicVolume(
        this.soundController.musicVolume * 0.2
      );
      this.screenManager.showScreen('pause');
    } else {
      this.soundController.setMusicVolume(
        this.soundController.musicVolume / 0.2
      );
      this.screenManager.hideScreen('pause');
    }
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  setPlayerHero(heroType) {
    switch (heroType) {
      case 'warrior':
        this.player = new Warrior(this);
        break;
      case 'hunter':
        this.player = new Hunter(this);
        break;
    }
    this.ui.setPlayer(this.player);
    this.state = 'playing';
    this.screenManager.hideScreen('heroSelection');
    this.soundController.playMusic('mainTheme');
  }

  gameLoop(timeStamp) {
    this.deltaTime = (timeStamp - this.lastTime) / 1000;
    this.lastTime = timeStamp;

    if (!this.isPaused && this.state === 'playing') {
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
  addDamageText(position, damage) {
    this.damageTexts.push(new DamageText(position, damage));
  }
  resetGame() {
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.experienceOrbs = [];
    this.damageTexts = [];
    this.ui = new UiManager(this, null);
    this.spawner = new Spawner(this);
    this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height, this);

    this.soundController.stopMusic();

    this.isPaused = false;
    this.gameOver = false;
    this.elapsedTime = 0;
    this.state = 'menu';
  }

  update(deltaTime) {
    this.enemies.forEach((enemy, index) => {
      enemy.update(deltaTime);
      if (enemy.toRemove) {
        this.enemies.splice(index, 1);
      }
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
    this.mapObjects.forEach((object, index) => {
      object.update(deltaTime);
      if (object.toRemove) {
        this.mapObjects.splice(index, 1);
      }
    });
    this.mapGenerator.checkCollisions();
    this.player.update(deltaTime);
    this.camera.follow(this.player);
    this.spawner.update(deltaTime);
    this.damageTexts.forEach((text) => text.update(deltaTime));
    this.damageTexts = this.damageTexts.filter((text) => !text.isFinished());
    this.ui.update(this.player);
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'playing') {
      this.mapGenerator.generateMap(this.context, this.camera);
      this.mapObjects.forEach((object) => object.render(this.context));
      this.player.render(this.context);

      this.enemies.forEach((enemy) => enemy.render(this.context));
      this.experienceOrbs.forEach((orb) => orb.render(this.context));
      this.projectiles.forEach((projectil) => projectil.render(this.context));
      this.damageTexts.forEach((text) =>
        text.render(this.context, this.camera)
      );
      this.ui.render(this.context);
    }
    this.screenManager.render(this.context);
  }
}
