export class DamageText {
  constructor(
    position,
    damage,
    color = 'gainsboro',
    fontSize = 16,
    duration = 1
  ) {
    this.position = { ...position };
    this.damage = damage;
    this.color = color;
    this.fontSize = fontSize;
    this.duration = duration;
    this.opacity = 1;
    this.timer = 0;
  }

  update(deltaTime) {
    this.timer += deltaTime;

    // increase poisition y to show text up
    this.position.y -= 30 * deltaTime;

    // opacity decrease
    this.opacity = Math.max(0, 0.9 - this.timer / this.duration);
  }

  render(context, camera) {
    if (this.opacity <= 0) return;
    context.save();
    context.globalAlpha = this.opacity;
    context.fillStyle = this.color;
    context.font = `${this.fontSize}px Arial`;

    context.fillText(
      this.damage,
      this.position.x - camera.x,
      this.position.y - camera.y
    );
    context.restore();
  }

  isFinished() {
    return this.timer >= this.duration;
  }
}
