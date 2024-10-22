export class UiManager {
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
        context.fillText(`level: ${this.player.level}`, 10, 40);
        context.fillText(`weapon: ${this.player.weapon.name}`, 10, 60);
        context.fillText(`level weapon: ${this.player.weapon.level}`, 10, 80);

        this.renderTimer(context)

        // health bar player ui
        this.drawHealthBar(context);
        // experience bar player ui
        this.renderExperienceBar(context);
        // pause ui
        this.rednderPause(context)

    }

    rednderPause(context){
        if(this.game.isPaused){
            context.fillStyle = 'rgba(0, 0, 0, 0.5)'
            context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
            context.fillStyle = 'white'
            context.font = '40px Arial'
            context.fillText('Paused', this.game.canvas.width / 2 - 50 , this.game.canvas.height / 2)
        }
    }

    renderTimer(context){
        const timer = this.game.elapsedTime
        const minutes = Math.floor(timer / 60)
        const seconds = Math.floor(timer % 60)
        const timeString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`

        context.fillStyle = 'white';
        context.font = '20px Arial';
        context.fillText(timeString, 30, this.game.canvas.height - 30);
    }

    renderExperienceBar(context){
        const currentExperience = this.player.experience
        const nextLevelExp = this.player.nextLevelUp
        const barWidth = this.game.canvas.width - 20
        const barHeight = 10

        const x = 5
        const y = 2

        const experiencePercentage = currentExperience / nextLevelExp

        context.fillStyle = 'gray'
        context.fillRect(x, y, barWidth, barHeight)

        
        context.fillStyle = 'blue'
        context.fillRect(x, y, barWidth * experiencePercentage, barHeight)

        context.strokeStyle = 'black';
        context.lineWidth = 0.5;
        context.strokeRect(x, y, barWidth, barHeight); // border of exp bar
    }
    drawHealthBar(context) {
        const barWidth = this.player.width; 
        const barHeight = 10; 
        const x = this.player.position.x - this.game.camera.x;
        const y = this.player.position.y - barHeight - 5 - this.game.camera.y; // 5 px above player 
      
        const healthPercentage = this.player.currentHealth / this.player.maxHealth; // calculate health percentage
      
        context.fillStyle = 'gray';
        context.fillRect(x, y, barWidth, barHeight);
      
        context.fillStyle = 'green';
        context.fillRect(x, y, barWidth * healthPercentage, barHeight);
      
        context.strokeStyle = 'black';
        context.lineWidth = 0.5;
        context.strokeRect(x, y, barWidth, barHeight); // border of health bar
      }
}