export class DamageText {
    constructor(position, damage, color = 'gainsboro', fontSize = 16, duration = 1 ) {
        this.position = position ;  
        this.damage = damage;  
        this.color = color;  
        this.fontSize = fontSize;  
        this.duration = duration;  
        this.opacity = 1;  
        this.timer = 0;  
    }

    update(deltaTime) {
        this.timer += deltaTime;

        // increase poisition y to show text up
        this.position.y -= 30 * deltaTime;

        // opacity decrease
        this.opacity = Math.max(0, 1 - (this.timer / this.duration));
    }

    render(context) {
        context.globalAlpha = this.opacity;  
        context.fillStyle = this.color;
        context.font = `${this.fontSize}px Arial`;
        context.fillText(this.damage, this.position.x, this.position.y);
    }

    isFinished() {
        return this.timer >= this.duration;  
    }
}
