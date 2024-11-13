export class Projectile {
    constructor(game, x, y, velocityX, velocityY, damage, sprite = null) {
        this.game = game;
        this.position = { x, y };
        this.velocity = { x: velocityX, y: velocityY };
        this.damage = damage;
        this.width = 16;
        this.height = 16;
        this.toRemove = false;
        this.sprite = sprite; // Спрайт для снаряда

    }

    update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }


    render(context) {
        context.save();
        context.translate(this.position.x - this.game.camera.x, this.position.y - this.game.camera.y);

        if (this.sprite) {
            // Отрисовка спрайта, если он задан
            context.drawImage(this.sprite, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            // Отрисовка стандартного снаряда, если спрайта нет
            context.fillStyle = 'yellow';
            context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }

        context.restore();
    }
}