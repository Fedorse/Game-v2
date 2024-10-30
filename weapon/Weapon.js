
// Weapon.js (базовый класс)
export class Weapon {
  constructor(game, owner) {
      this.game = game;
      this.owner = owner;
      
      // level stats
      this.level = 1;
      this.maxLevel = 6;
      this.experience = 0;
      this.nextLevelExperience = 10;
      
      // base parametrs wepaon
      this.timer = 0;
      this.position = {x: 0, y: 0};
      this.startPosition = {x: 0, y: 0};
      this.endPosition = {x: 0, y: 0}
      this.offsetX = 0
      this.offsetY = 0

      
      // attack parametrs
      this.attackTimer = 0;
      this.attackCooldown = 0.5;
      this.attackRange = 100;
      this.attackDuration = 0.2;
      this.returnDuration = 0.2;
      this.damage = 10
      
      // collision
      this.weaponWidth = 10;
      this.weaponHeight = 40;
      this.damageDealtEnemies = new Set();
      
      // state
      this.state = 'idle'; // 'idle', 'attacking', 'returning'
      this.angle = 0;
  }

  update(deltaTime){
    switch(this.state){
      case 'idle':
        this.updateIdle(deltaTime)
        break
      case 'attacking':
        this.updateAttacking(deltaTime)
        break
      case 'returning':
        this.updateReturning(deltaTime)
        break
    }
    if(this.attackTimer > 0){
      this.attackTimer -= deltaTime
    }
  }

  updateIdle(deltaTime) {
    // Обновляем позицию вокруг игрока
    this.position.x = this.owner.position.x + this.owner.width / 2 + this.offsetX;
    this.position.y = this.owner.position.y + this.owner.height / 2 + this.offsetY;

    // Ищем цель и атакуем
    const target = this.findNearestEnemyInRange();
    if (target && this.attackTimer <= 0) {
        this.startAttack(target);
    }
}

  updateAttacking(deltaTime) {
    this.timer += deltaTime;
    const attackProgress = this.timer / this.attackDuration;

    if (attackProgress >= 1) {
        this.startReturn();
    } else {
        // Интерполяция движения к цели
        this.position.x = this.startPosition.x + (this.endPosition.x - this.startPosition.x) * attackProgress;
        this.position.y = this.startPosition.y + (this.endPosition.y - this.startPosition.y) * attackProgress;

        // Проверяем попадания
        this.checkHits();
    }
  }
  updateReturning(deltaTime) {
    this.timer += deltaTime;
    const returnProgress = this.timer / this.returnDuration;

    if (returnProgress >= 1) {
        this.state = 'idle';
        this.attackTimer = this.attackCooldown;
        this.damageDealtEnemies.clear();
    } else {
        // Интерполяция возврата
        this.position.x = this.startPosition.x + (this.endPosition.x - this.startPosition.x) * returnProgress;
        this.position.y = this.startPosition.y + (this.endPosition.y - this.startPosition.y) * returnProgress;
    }
}

  startAttack(target) {
    this.state = 'attacking';
    this.timer = 0;
    this.startPosition = { ...this.position };
    this.endPosition = {
        x: target.position.x + target.width / 2,
        y: target.position.y + target.height / 2
    };
    
    // Обновляем угол
    const dx = this.endPosition.x - this.startPosition.x;
    const dy = this.endPosition.y - this.startPosition.y;
    this.angle = Math.atan2(dy, dx);
  }
    startReturn() {
      this.state = 'returning';
      this.timer = 0;
      this.startPosition = { ...this.position };
      this.endPosition = {
          x: this.owner.position.x + this.owner.width / 2 + this.offsetX,
          y: this.owner.position.y + this.owner.height / 2 + this.offsetY
      };
  }

  findNearestEnemyInRange() {
    let nearestEnemy = null;
    let minDistance = this.attackRange;
    
    this.game.enemies.forEach(enemy => {
        const dx = enemy.position.x + enemy.width / 2 - this.position.x;
        const dy = enemy.position.y + enemy.height / 2 - this.position.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestEnemy = enemy;
        }
    });
    
    return nearestEnemy;
}
  checkHits() {
    this.game.enemies.forEach(enemy => {
        if (!this.damageDealtEnemies.has(enemy) && this.isColliding(enemy)) {
            enemy.takeDamage(this.damage);
            this.damageDealtEnemies.add(enemy);
        }
    });
  }
  isColliding(enemy) {
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    // Считаем углы оружия
    const corners = [
        { x: -this.weaponWidth / 2, y: -this.weaponHeight / 2 },
        { x: this.weaponWidth / 2, y: -this.weaponHeight / 2 },
        { x: this.weaponWidth / 2, y: this.weaponHeight / 2 },
        { x: -this.weaponWidth / 2, y: this.weaponHeight / 2 },
    ].map(corner => ({
        x: this.position.x + corner.x * cos - corner.y * sin,
        y: this.position.y + corner.x * sin + corner.y * cos,
    }));

    // AABB коллизия
    const weaponMinX = Math.min(...corners.map(c => c.x));
    const weaponMaxX = Math.max(...corners.map(c => c.x));
    const weaponMinY = Math.min(...corners.map(c => c.y));
    const weaponMaxY = Math.max(...corners.map(c => c.y));

    return (
        weaponMinX < enemy.position.x + enemy.width &&
        weaponMaxX > enemy.position.x &&
        weaponMinY < enemy.position.y + enemy.height &&
        weaponMaxY > enemy.position.y
    );
}

render(context) {
  context.save();
  context.translate(-this.game.camera.x, -this.game.camera.y);

  context.translate(this.position.x, this.position.y);
  context.rotate(this.angle);

  if (this.sprite) {
      context.drawImage(
          this.sprite,
          -16,
          -16,
          32,
          32
      );
  } else {
      context.fillStyle = 'gray';
      context.fillRect(-5, -20, 10, 40);
  }

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
      this.nextLevelExperience += 10;
      this.upgrade();
  }
}

upgrade() {
  // Переопределяется в наследниках
}
}
