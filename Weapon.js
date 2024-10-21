// Weapon.js
export class Weapon {
    constructor(game, owner) {
      this.game = game; // Ссылка на игру
      this.owner = owner; // Владелец оружия (игрок)
      this.level = 1; // Начальный уровень оружия
      this.maxLevel = 6; // Максимальный уровень
      this.experience = 0; // Опыт оружия
      this.nextLevelExperience = 100; // Опыт для повышения уровня
      this.attackCooldown = 1.0; // Время отката между атаками
      this.attackTimer = 0; // Таймер отката
    }
  
    update(deltaTime) {
      if (this.attackTimer > 0) {
        this.attackTimer -= deltaTime;
      } else {
        this.attack();
      }
    }
  
    attack() {
      // Абстрактный метод, реализуется в наследниках
    }
  
    gainExperience(amount) {
      if (this.level < this.maxLevel) {
        this.experience += amount;
        if (this.experience >= this.nextLevelExperience) {
          this.levelUp();
        }
      }
    }
  
    levelUp() {
      if (this.level < this.maxLevel) {
        this.level++;
        this.experience = 0;
        this.nextLevelExperience += 100; // Настройте формулу роста опыта
  
        // Логика улучшения оружия при повышении уровня
        this.upgrade();
      }
    }
  
    upgrade() {
      // Абстрактный метод, реализуется в наследниках
    }
  }
  