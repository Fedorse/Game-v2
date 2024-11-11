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

      //state
      this.currentCooldown = 0;
      this.attackCooldown = 1
      this.attackRange = 100
  }

  update(deltaTime) {
      this.updatePosition();
      this.rotateTowardsTarget()
      this.handleAttack(deltaTime);

      if(this.currentCooldown > 0){
          this.currentCooldown -= deltaTime
      }
  }

  updatePosition() {
      this.position.x = this.owner.position.x + this.owner.width / 2 + this.offsetX;
      this.position.y = this.owner.position.y + this.owner.height / 2 + this.offsetY;
  }

  handleAttack(deltaTime) {
  }
  rotateTowardsTarget(){
    const target = this.findTarget();
    if(target) {
        this.rotationAngle = this.calculateRotationToTarget(
            target.position.x + target.width / 2,
            target.position.y + target.height / 2
        );
        this.angle = this.rotationAngle;
    } else {
        this.rotationAngle = this.baseAngle;
    }
}

  findTarget(){
    let nearestEnemy = null;
    let minDistance = Infinity; // Устанавливаем минимальную дистанцию как бесконечность

    this.game.enemies.forEach(enemy => {
        const distance = this.calculateDistance(this.position, enemy.position);
        if(distance < minDistance){
            minDistance = distance;
            nearestEnemy = enemy;
        }
    });
    return nearestEnemy;
}


  calculateDistance(pos1, pos2){
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.hypot(dx, dy);
  }


  calculateRotationToTarget(targetX, targetY) {
    const dx = targetX - this.position.x;
    const dy = targetY - this.position.y;
    return Math.atan2(dy, dx);
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
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
    context.restore();
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