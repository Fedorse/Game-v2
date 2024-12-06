import { MainMenuScreen } from '../ui/screens/MainMenuScreen.js';
import { HeroSelectionScreen } from '../ui/screens/HeroSelectionScreen.js';
import { AugmentScreen } from '../ui/screens/AugmentScreen.js';
import { SettingsScreen } from '../ui/screens/SettingsScreen.js';
import { PauseScreen } from '../ui/screens/PauseScreen.js';
export class ScreenManager {
  constructor(game) {
    this.game = game;
    this.screens = {};
    this.activeScreen = null;
    this.createScreens();
  }
  createScreens() {
    this.screens['mainMenu'] = new MainMenuScreen(this.game);
    this.screens['heroSelection'] = new HeroSelectionScreen(this.game);
    this.screens['augment'] = new AugmentScreen(this.game);
    this.screens['settings'] = new SettingsScreen(this.game);
    this.screens['pause'] = new PauseScreen(this.game);
  }

  showScreen(name) {
    if (this.activeScreen) {
      this.activeScreen.hide();
    }
    this.activeScreen = this.screens[name];
    if (this.activeScreen) {
      this.activeScreen.show();
    }
  }
  hideScreen(name) {
    if (this.screens[name]) {
      this.screens[name].hide();
      if (this.activeScreen === this.screens[name]) {
        this.activeScreen = null;
      }
    }
  }
  render(context) {
    if (this.activeScreen) {
      this.activeScreen.render(context);
    }
  }
}
