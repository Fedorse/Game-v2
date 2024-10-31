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

        // Проверка столкновений
        this.game.enemies.forEach(enemy => {
            if (this.checkCollision(enemy)) {
                enemy.takeDamage(this.damage);
                this.toRemove = true;
            }
        });
    }

    checkCollision(enemy) {
        return (
            this.position.x < enemy.position.x + enemy.width &&
            this.position.x + this.width > enemy.position.x &&
            this.position.y < enemy.position.y + enemy.height &&
            this.position.y + this.height > enemy.position.y
        );
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