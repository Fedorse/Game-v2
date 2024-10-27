// Weapon.js
export class Weapon {
    constructor(game, owner) {
      this.game = game; 
      this.owner = owner; // owner weapon

      // level stats
      this.level = 1; 
      this.maxLevel = 6; 
      this.experience = 0; 
      this.nextLevelExperience = 10; 
      this.sprite = null

      this.attackTimer = 0; 
    }
  
    update(deltaTime) {
      if (this.attackTimer > 0) {
        this.attackTimer -= deltaTime;
      } else {
        this.attack();
      }
    }

    render(context) {
      if(this.sprite){
        this.sprite.draw(
          context,
          x,
          y,
          this.width,
          this.height,

        )
      }
    }
  
    attack() {
        // abstract method 
    }
    upgrade() {
        // abstract method
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
  
  }
  