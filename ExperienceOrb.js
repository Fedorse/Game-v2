import { Animation } from "./Animation"
import { Sprite } from "./Sprite"
import { expirenseOrbAnim } from "./animations/expirenseOrbAnim.js"

export class ExperienceOrb {
    constructor(game, position){
        this.game = game,
        this.position = position,
        this.width = 32,
        this.height = 32,
        this.toRemove = false;
        //animation
        const orbAnim = new Animation(expirenseOrbAnim, 200, 'experience');
        this.sprite = new Sprite({
                orb: orbAnim,
            }, this.game.resourceManager);


        this.sprite.setAnimation('orb')
        // stats exp
        this.value = 20,
        this.speed = 80;

    }

    update(deltaTime){
        // move to player
        const dx = this.game.player.position.x - this.position.x
        const dy = this.game.player.position.y - this.position.y
        const distance = Math.hypot(dx, dy)
        if(distance < 50){
            this.position.x += (dx / distance) * this.speed * deltaTime
            this.position.y += (dy / distance) * this.speed * deltaTime
        }
        this.sprite.update(deltaTime)
    }

    render(context){
        this.sprite.draw(
            context, 
            this.position.x -this.game.camera.x, 
            this.position.y -this.game.camera.y, 
            this.width, 
            this.height
        )
           // collision box-debug
           context.strokeStyle = 'green';
           context.strokeRect(
               this.position.x  -  this.game.camera.x ,
               this.position.y  - this.game.camera.y ,
               this.width,
               this.height
           );
    }
}
