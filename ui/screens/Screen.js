import { UIComponent } from '../components/UIComponent.js';
export class Screen extends UIComponent {
  constructor(game) {
    super(game, 0, 0, game.canvas.width, game.canvas.height);
    this.components = [];
    this.isInitialized = false;
    console.log(this.components);
  }
  init() {
    if (this.isInitialized) return;
    this.createComponents();
    this.initEvents();
    this.isInitialized = true;
  }
  destroy(removeComponents = true) {
    this.components.forEach((component) => {
      if (component.removeEvents) {
        component.removeEvents();
      }
    });

    if (removeComponents) {
      this.components = [];
    }
    this.isInitialized = false;
  }
  show() {
    if (!this.isInitialized) {
      this.init();
    }
    this.visible = true;
  }
  hide() {
    this.visible = false;
    this.components.forEach((component) => {
      if (component.removeEvents) {
        component.removeEvents();
      }
    });
  }
  addComponent(component) {
    this.components.push(component);
  }
  createComponents() {}
  initEvents() {}

  render(context) {
    if (!this.visible) return;
    this.components.forEach((component) => component.render(context));
  }
}
