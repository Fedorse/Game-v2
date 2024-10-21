export class Ui {
    constructor(game, player){
        this.game = game
        this.player = player
    }

    update(){
    
    }

    render(context){
        // debug info ui
        context.fillStyle = 'white';
        context.font = '20px Arial';
        context.fillText(`level: ${this.player.level}`, 10, 30);
        context.fillText(`Exp: ${this.player.experience}/${this.player.nextLevelUp}`, 10, 50);
        context.fillText(`weapon: ${this.player.weapon.name}`, 10, 70);
        context.fillText(`level weapon: ${this.player.weapon.level}`, 10, 90);
        
        context.save()
        context.translate(-this.game.camera.x, -this.game.camera.y); 
        // health bar player ui
        this.drawHealthBar(context);
        context.restore(); 
    }

    drawHealthBar(context) {
        const barWidth = this.player.width; 
        const barHeight = 10; 
        const x = this.player.position.x;
        const y = this.player.position.y - barHeight - 5; // 5 px above player 
      
        const healthPercentage = this.player.currentHealth / this.player.maxHealth; // calculate health percentage
      
        context.fillStyle = 'gray';
        context.fillRect(x, y, barWidth, barHeight);
      
        context.fillStyle = 'green';
        context.fillRect(x, y, barWidth * healthPercentage, barHeight);
      
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.strokeRect(x, y, barWidth, barHeight); // border of health bar
      }
}