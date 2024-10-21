export class DamageText {
    constructor(position, damage, color = 'black', fontSize = 16, duration = 1 ) {
        this.position = { ...position };  // Позиция текста (над врагом)
        this.damage = damage;  // Значение урона
        this.color = color;  // Цвет текста
        this.fontSize = fontSize;  // Размер шрифта
        this.duration = duration;  // Продолжительность отображения текста (в секундах)
        this.opacity = 1;  // Прозрачность текста (изменяется со временем)
        this.timer = 0;  // Таймер для анимации
    }

    update(deltaTime) {
        this.timer += deltaTime;

        // Увеличиваем позицию по Y, чтобы текст поднимался вверх
        this.position.y -= 30 * deltaTime;

        // Постепенно уменьшаем прозрачность текста
        this.opacity = Math.max(0, 1 - (this.timer / this.duration));
    }

    render(context) {
        // context.save();
        // context.translate(-this.game.camera.x, -this.game.camera.y)
        context.globalAlpha = this.opacity;  
        context.fillStyle = this.color;
        context.font = `${this.fontSize}px Arial`;
        context.fillText(this.damage, this.position.x, this.position.y);
        // context.restore();
    }

    isFinished() {
        return this.timer >= this.duration;  // Если таймер больше продолжительности — убираем текст
    }
}
