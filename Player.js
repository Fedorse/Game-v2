export class Player {
    constructor(game){
        this.game = game
        this.width = 50
        this.height = 50
        this.position = {
            x: this.game.canvas.width / 2,
            y: this.game.canvas.height / 2 
        }
        this.img = new Image()
        this.img.src = '../public/Run.png'
    }
        update(deltaTime){

        }

        render(context){

        }
    
}