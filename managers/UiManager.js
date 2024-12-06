import { HealthBar } from '../ui/hud/HealthBar.js';
import { ExperienceBar } from '../ui/hud/ExperienceBar.js';
import { Timer } from '../ui/hud/Timer.js';
import { UIButton } from '../ui/components/uiButton.js';
export class UiManager {
  constructor(game) {
    this.game = game;
    this.components = [];
  }

  setPlayer(player) {
    this.player = player;
    this.initComponents();
  }
  initComponents() {
    this.components = []; // Сбрасываем текущие компоненты
    if (this.player) {
      this.components.push(new HealthBar(this.game, this.player));
      this.components.push(new ExperienceBar(this.game, this.player));
    }
    this.components.push(new Timer(this.game));
    const settingsButton = new UIButton(
      this.game,
      this.game.canvas.width - 20 - 32,
      this.game.canvas.height - 20 - 32,
      32,
      32,
      {
        normal: this.game.resourceManager.getImage('settingsBtn'),
      },
      '',
      () => {
        this.openSettings();
      }
    );
    this.components.push(settingsButton);
  }
  openSettings() {
    this.game.togglePause();
    this.game.screenManager.showScreen('pause');
  }

  update(deltaTime) {
    this.components.forEach((component) => component.update(deltaTime));
  }

  render(context) {
    this.components.forEach((component) => component.render(context));
  }
}
