// import { Player } from './Player.js'
import { InputHandler } from './utils/InputHandler.js';
import { Spawner } from './Spawner.js';
import { Camera } from './Camera.js';
import { MapGenerator } from './map/MapGenerator.js';
import { UiManager } from './ui/UiManager.js';
import { Warrior } from './characters/Warrior.js';
import { Hunter } from './characters/Hunter.js';
import { DamageText } from './ui/DamageText.js';
import { MainMenu } from './ui/MainMenu.js';
import { HeroSelectionScreen } from './ui/HeroSelectionScreen.js';
export class Game {
  constructor(canvas, context, resourceManager) {
    this.canvas = canvas;
    this.context = context;
    this.resourceManager = resourceManager;
    // this.player = new Player(this)
    this.inputHandler = new InputHandler(this);
    this.spawner = new Spawner(this);
    this.ui = new UiManager(this, null);
    this.camera = new Camera(0, 0, canvas.width, canvas.height, this);
    this.enemies = [];
    this.mapGenerator = new MapGenerator(this);
    console.log(this.mainMenu);
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
    this.mainMenu = new MainMenu(this);
    this.start();
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.gameLoop.bind(this)); // start game loop
  }

  startGame() {
    this.state = 'heroSelection';
    this.mainMenu.removeEvents();
    this.heroSelectionScreen = new HeroSelectionScreen(this);
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

    this.heroSelectionScreen = null;
  }

  pause() {
    this.isPaused = !this.isPaused;
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
    this.damageTexts.forEach((text) => text.update(deltaTime));
    this.damageTexts = this.damageTexts.filter((text) => !text.isFinished());
    this.ui.update(this.player);
  }

  // render game objects
  render() {
    if (this.state === 'menu') {
      this.mainMenu.render(this.context);
    } else if (this.state === 'heroSelection') {
      this.heroSelectionScreen.render(this.context);
    } else if (this.state === 'playing') {
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
  }
}
