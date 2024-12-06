export class Screen {
  constructor(game) {
    this.game = game;
    this.components = [];
    this.isInitialized = false;
    this.width = game.canvas.width;
    this.height = game.canvas.height;
  }
  init() {
    if (this.isInitialized) return;
    this.createComponents();
    this.isInitialized = true;
  }

  show() {
    if (!this.isInitialized) {
      this.init();
    }
  }
  hide() {
    this.components.forEach((component) => {
      if (component.removeEvents) {
        component.removeEvents();
      }
    });
    this.components = [];
    this.isInitialized = false;
  }
  addComponent(component) {
    this.components.push(component);
  }
  createComponents() {}

  render(context) {
    this.components.forEach((component) => component.render(context));
  }
}
