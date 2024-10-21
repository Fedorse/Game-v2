import { Enemy } from "./Enemy"
export class Spawner {
    constructor(game) {
        this.game = game,
        this.spawnInterval = 1,
        this.spawnTimer = 0
    }
    update(deltaTime) {
        this.spawnTimer += deltaTime
        if(this.spawnTimer >= this.spawnInterval){
            this.spawnEnemy()
            this.spawnTimer = 0
            // this.spawnInterval = Math.max(0.5, this.spawnInterval - 0.1)
        }
    }
    
    spawnEnemy(){
        const spawnPosition = this.getSpawnPosition()
        const enemy = new Enemy(this.game, spawnPosition)
        this.game.enemies.push(enemy)
    }

    //random generate enemy position cyrcle
    getSpawnPosition(){
        const radius = Math.max(this.game.canvas.width, this.game.canvas.height) 
        const angle = Math.random() * Math.PI * 2

        const x = this.game.player.position.x + radius * Math.cos(angle)
        const y = this.game.player.position.y + radius * Math.sin(angle)

        return { x, y }
    }
}