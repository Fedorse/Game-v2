import { Weapon } from "./Weapon";
export class AuraWeapon extends Weapon {
    constructor(game, owner){
        super(game, owner)
        this.name = 'damage aura'
        this.radius = 100,
        this.tickInterval = 0.3,
        this.tickTimer = 0
        this.damage = 100

    }

    update(deltaTime){
        this.tickTimer -= deltaTime
        if(this.tickTimer <= 0){
            this.tickTimer = this.tickInterval
            this.attack()
        }
    }
    attack(){
        this.game.enemies.forEach(enemy =>{
            const dx = enemy.position.x + enemy.width / 2 - (this.owner.position.x + this.owner.width/2)
            const dy = enemy.position.y + enemy.height / 2 - (this.owner.position.y + this.owner.height/2)
            const distance = Math.hypot(dx, dy)

            if(distance < this.radius){
                enemy.takeDamage(this.damage)
            }
        })
    }

    upgrade(){
        switch(this.level){
            case 2:
                this.damage = 20
                break
            case 3:
                this.radius += 20
                break
            case 4:
                this.radius += 30
                this.tickInterval -= 0.2
                break
            case 5:
                this.damage = 50
                break
            case 6:
                this.damage = 60
                this.radius += 100
                break
            default: 
                break
        }
    }
    render(context){
        context.save()
        context.translate(-this.game.camera.x, -this.game.camera.y)
        context.strokeStyle = 'purple';
        context.beginPath()
        context.arc(
            this.owner.position.x + this.owner.width / 2,
            this.owner.position.y + this.owner.height / 2,
            this.radius,
            0,
            Math.PI * 2
        )
        context.stroke()
        context.restore()
    }
}