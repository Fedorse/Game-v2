import { Sprite } from "./Spite"
export class Enemy { 
    constructor(game){
        this.game = game, 
        this.width = 100,
        this.height = 100,
        this.position = {
            x: Math.random() * this.game.canvas.width,
            y: Math.random() * this.game.canvas.height
        }
        this.speed = 100
        this.sprite = new Sprite('../public/img/enemy.png', 70, 110, 1)




    }

    update(deltaTime){

    }

    render(context){
        this.sprite.draw(context, this.position.x, this.position.y, this.width, this.height)
    }
}



