import { EnemyFactory } from "./enemy/EnemyFactory.js"
import {SPAWN_CONFIG} from './configs/spawnerConfig.js'
export class Spawner {
    constructor(game) {
        this.game = game,
        this.enemyFactory = new EnemyFactory(this.game)

        this.spawnInterval = SPAWN_CONFIG.waves[0].interval
        this.spawnTimer = 0
        this.lastDifficultyIncrease = 0


        this.currentWaveIndex = 0
        this.activeTypes = SPAWN_CONFIG.waves[0].types
    }
    update(deltaTime) {
        const elapsedTime = this.game.elapsedTime
        this.spawnTimer += deltaTime
        this.updateWave(elapsedTime);

        if(this.spawnTimer >= this.spawnInterval){
            this.spawn()
            this.spawnTimer = 0
        }
        if (elapsedTime - this.lastDifficultyIncrease >= SPAWN_CONFIG.difficultyIncreaseInterval) {
            this.increaseDifficulty();
            this.lastDifficultyIncrease = elapsedTime;
        }
    }
    updateWave(elapsedTime) {
        const waves = SPAWN_CONFIG.waves
        while (
            this.currentWaveIndex < waves.length - 1 &&
            elapsedTime >= waves[this.currentWaveIndex + 1].time
        ) {
            this.currentWaveIndex++;
            this.activeTypes = waves[this.currentWaveIndex].types
            this.spawnInterval = waves[this.currentWaveIndex].interval

        }
    }

    spawn() {
        const position = this.getSpawnPosition();
        const type = this.getRandomEnemyType();
        console.log(position)

        const enemy = this.enemyFactory.createEnemy(type, position);
        if(enemy){
            this.game.enemies.push(enemy);
        }
    }

    getRandomEnemyType() {
        const index = Math.floor(Math.random() * this.activeTypes.length);
        return this.activeTypes[index];
    }
    getSpawnPosition() {
        const radius = Math.random() * (SPAWN_CONFIG.maxRadius - SPAWN_CONFIG.minRadius) + SPAWN_CONFIG.minRadius
        const angle = Math.random() * Math.PI * 2
    
        const x = this.game.player.position.x + radius * Math.cos(angle);
        const y = this.game.player.position.y + radius * Math.sin(angle);
    
        return { x, y };
    }
    // dicrease spawn interval
    increaseDifficulty(){
        this.spawnInterval = Math.max(SPAWN_CONFIG.minSpawnInterval, this.spawnInterval - 0.1);

    }
}