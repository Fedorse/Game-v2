import { HealthBar } from '../ui/hud/HealthBar.js';
import { ExperienceBar } from '../ui/hud/ExperienceBar.js';
import { Timer } from '../ui/hud/Timer.js';
export class UiManager {
  constructor(game) {
    this.game = game;
    this.components = [];
  }

  update() {}

  setPlayer(player) {
    this.player = player;
    this.initComponents();
  }
  initComponents() {
    this.components = [];
    if (this.player) {
      this.components.push(new HealthBar(this.game, this.player));
      this.components.push(new ExperienceBar(this.game, this.player));
    }
    this.components.push(new Timer(this.game));
  }
  update(deltaTime) {
    this.components.forEach((component) => component.update(deltaTime));
  }

  render(context) {
    this.components.forEach((component) => component.render(context));
  }
}
