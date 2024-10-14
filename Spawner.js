import { Enemy } from "./Enemy"
export class Spawner {
    constructor(game) {
        this.game = game,
        this.spawnInterval = 2,
        this.spawnTimer = 0
    }
    update(deltaTime) {
        this.spawnTimer += deltaTime
        if(this.spawnTimer >= this.spawnInterval){
            this.spawnEnemy()
            this.spawnTimer = 0
            this.spawnInterval = Math.max(0.5, this.spawnInterval - 0.1)
        }
    }
    
    spawnEnemy(){
        this.game.enemies.push(new Enemy(this.game))
    }
}