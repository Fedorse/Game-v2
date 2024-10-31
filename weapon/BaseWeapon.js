export class BaseWeapon {
  constructor(game, owner) {
      this.game = game;
      this.owner = owner;
      this.position = { x: 0, y: 0 };
      this.offsetX = 0;
      this.offsetY = 0;
      this.baseAngle = 0
      this.rotationAngle = 0
      
      
      // Base stats
      this.damage = 0.1;
      this.level = 1;
      this.maxLevel = 6;
      this.experience = 0;
      this.nextLevelExperience = 10;
      
      // ui 
      this.sprite = null;
      this.width = 32;
      this.height = 32;
      this.angle = 0;
  }

  update(deltaTime) {
      this.updatePosition();
      this.checkAttack(deltaTime);
      
  }

  updatePosition() {
      this.position.x = this.owner.position.x + this.owner.width / 2 + this.offsetX;
      this.position.y = this.owner.position.y + this.owner.height / 2 + this.offsetY;
  }

  checkAttack(deltaTime) {
        //abstract method
  }

  render(context) {
      context.save();
      context.translate(
          this.position.x - this.game.camera.x,
          this.position.y - this.game.camera.y
      );
      context.rotate(this.angle);
          context.drawImage(
              this.sprite,
              this.width ,
              this.height,
              this.width,
              this.height
          );
      context.restore();
  }

  calculateRotationToTarget(targetX, targetY) {
    const dx = targetX - this.position.x;
    const dy = targetY - this.position.y;
    return Math.atan2(dy, dx);
  }

  gainExperience(exp) {
      if (this.level < this.maxLevel) {
          this.experience += exp;
          if (this.experience >= this.nextLevelExperience) {
              this.levelUp();
          }
      }
  }

  levelUp() {
      if (this.level < this.maxLevel) {
          this.level++;
          this.experience = 0;
          this.nextLevelExperience *= 1.5;
          this.upgrade();
      }
  }

  upgrade() {
    // abstract method
  }
}