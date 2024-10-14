import {Sprite} from './Spite.js'
export class Player {
    constructor(game){
        this.game = game
        this.width = 100
        this.height = 100
        this.speed = 100
        this.position = {
            x: 100,
            y: 100
        }
        this.sprite = new Sprite('../public/img/Run.png', 70, 110, 6)
        
    }
    
        update(deltaTime){
            //movement
            const input = this.game.inputHandler
            let velocity ={
                x: 0,
                y: 0
            }

            if(input.left) velocity.x = -1
            if(input.right) velocity.x = 1
            if(input.up) velocity.y = -1
            if(input.down) velocity.y = 1

            this.position.x += velocity.x * this.speed * deltaTime
            this.position.y += velocity.y * this.speed * deltaTime

            this.sprite.update(deltaTime)
        }

        render(context){
            this.sprite.draw(context, this.position.x, this.position.y, this.width, this.height)
        }


    
}