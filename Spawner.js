import { Enemy } from "./Enemy"
export class Spawner {
    constructor(game) {
        this.game = game,
        this.spawnInterval = 2,
        this.spawnTimer = 0
        this.lastDifficultyIncrease = 0
        this.difficultyIncreaseInterval = 60
        this.minSpawnInterval = 0.1
    }
    update(deltaTime) {
        this.spawnTimer += deltaTime
        if(this.game.elapsedTime  - this.lastDifficultyIncrease >= this.difficultyIncreaseInterval){
            this.increaseDifficulty()
            this.lastDifficultyIncrease = this.game.elapsedTime
        }
        if(this.spawnTimer >= this.spawnInterval){
            this.spawnEnemy()
            this.spawnTimer = 0
        }
    }
    
    spawnEnemy(){
        const spawnPosition = this.getSpawnPosition()
        const enemy = new Enemy(this.game, spawnPosition)
        this.game.enemies.push(enemy)
    }

    //random generate enemy position cyrcle
    getSpawnPosition(){
        const radius = Math.max(this.game.canvas.width, this.game.canvas.height) - 300
        const angle = Math.random() * Math.PI * 2

        const x = this.game.player.position.x + radius * Math.cos(angle)
        const y = this.game.player.position.y + radius * Math.sin(angle)

        return { x, y }
    }
    // dicrease spawn interval
    increaseDifficulty(){
        this.spawnInterval = Math.max(this.minSpawnInterval, this.spawnInterval - 0.1)
        console.log(`new spawn enemy: ${ this.spawnInterval } sec`) 
    }
}