export class Projectile {
    constructor(game, position, direction, speed, damage){
        this.game = game,
        this.width = 30,
        this.height = 30,
        this.position = {
            x: position.x - this.width / 2,
            y: position.y - this.height / 2,
          };
        this.speed = speed,
        this.img = this.game.resourceManager.getImage('projectile')
        this.toRemove = false,


        this.velocity = {
            x: direction.x * this.speed,
            y: direction.y * this.speed,
          };
        this.damage = damage
    }

    update(deltaTime){
        this.position.x += this.velocity.x * deltaTime
        this.position.y += this.velocity.y * deltaTime

            //delete borders collision
    // if(
    //     this.position.x < 0 ||
    //     this.position.x > this.game.canvas.width ||
    //     this.position.y < 0 ||
    //     this.position.y > this.game.canvas.height
    // ){
    //     this.toRemove = true
    // }

    this.game.enemies.forEach((enemy)=> {
        if(this.isColliding(enemy)){
            this.toRemove = true
            enemy.takeDamage(this.damage)
        }
    })
    }

    render(context) {
        context.drawImage(
          this.img,
          this.position.x - this.game.camera.x,
          this.position.y - this.game.camera.y,
          this.width,
          this.height
        );
        
      }
    isColliding(obj) {
        return (
          this.position.x < obj.position.x + obj.width &&
          this.position.x + this.width > obj.position.x &&
          this.position.y < obj.position.y + obj.height &&
          this.height + this.position.y > obj.position.y
        );
      }
}