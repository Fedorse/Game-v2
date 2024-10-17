export class Weapon {
    constructor(player, imgSrc) {
        this.player = player;
        this.img = new Image();
        this.img.src = imgSrc;
        this.width = 32;
        this.height = 32;
        this.angle = 0;  // Угол вращения
        this.radius = 50;  // Радиус вращения вокруг игрока
        this.rotationSpeed = Math.PI;  // Скорость вращения
    }

    update(deltaTime) {
        // Увеличиваем угол вращения
        this.angle += this.rotationSpeed * deltaTime;

        // Рассчитываем координаты оружия относительно центра игрока
        const offsetX = Math.cos(this.angle) * this.radius;
        const offsetY = Math.sin(this.angle) * this.radius;

        // Устанавливаем положение оружия
        this.position = {
            x: this.player.position.x + this.player.width / 2 + offsetX - this.width / 2,
            y: this.player.position.y + this.player.height / 2 + offsetY - this.height / 2
        };
    }

    render(context) {
        context.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}
