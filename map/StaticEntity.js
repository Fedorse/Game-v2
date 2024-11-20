export class StaticEntity {
  constructor(game, x, y, config) {
    this.game = game;
    this.position = { x, y };
    this.config = config;
    this.width = config.width;
    this.height = config.height;
    this.sprite = game.resourceManager.getImage(config.spriteName);
    this.isSolid = config.isSolid;
    this.isDestructible = config.isDestructible;
    this.toRemove = false;

    if (this.isDestructible) {
      this.health = config.health;
      this.maxHealth = config.health;
    }
  }
  update(deltaTime) {
    if (this.isSolid && this.isColliding(this.game.player)) {
      this.resolveCollision(this.game.player);
    }
  }
  render(context) {
    if (this.sprite) {
      context.drawImage(
        this.sprite,
        this.position.x - this.game.camera.x,
        this.position.y - this.game.camera.y,
        this.width,
        this.height
      );
    }
  }
  takeDamage(damage) {
    if (this.isDestructible && this.health > 0) {
      this.health -= damage;
      if (this.health <= 0) {
        this.destroy();
      }
    }
  }
  destroy() {
    this.toRemove = true;
    if (this.config.loot) {
      this.droopLoot();
    }
  }
  droopLoot() {
    if (this.config.loot.experience) {
      const orb = new ExperienceOrb(
        this.game,
        { ...this.position },
        this.config.loot.experience
      );
      this.game.experienceOrbs.push(orb);
    }
  }
  isColliding(entity) {
    return (
      this.position.x < entity.position.x + entity.width &&
      this.position.x + this.width > entity.position.x &&
      this.position.y < entity.position.y + entity.height &&
      this.position.y + this.height > entity.position.y
    );
  }

  resolveCollision(player) {
    const dx =
      player.position.x + player.width / 2 - (this.position.x + this.width / 2);
    const dy =
      player.position.y +
      player.height / 2 -
      (this.position.y + this.height / 2);

    const width = (player.width + this.width) / 2;
    const height = (player.height + this.height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;

    if (Math.abs(crossWidth) > Math.abs(crossHeight)) {
      if (crossWidth > 0) {
        player.position.y = this.position.y + this.height;
      } else {
        player.position.y = this.position.y - player.height;
      }
    } else {
      if (crossHeight > 0) {
        player.position.x = this.position.x + this.width;
      } else {
        player.position.x = this.position.x - player.width;
      }
    }
  }
}
