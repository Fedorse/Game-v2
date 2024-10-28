import { EnemyFactory } from "./enemy/EnemyFactory"
export class Spawner {
    constructor(game) {
        this.game = game,
        this.spawnInterval = 2,
        this.spawnTimer = 0
        this.lastDifficultyIncrease = 0
        this.difficultyIncreaseInterval = 60
        this.minSpawnInterval = 0.5

        this.enemyFactory = new EnemyFactory(this.game)

        this.spawnSchedule = [
            {time: 0, type: 'Piglet'},
            {time: 10, type: 'Skeleton'},
            {time: 20, type: 'Mushroom'},
        ]

        this.nextEnemyTypeIndex = 0

        this.activeEnemyTypes = []; 
    }
    update(deltaTime) {
        this.spawnTimer += deltaTime
        const elapsedTime = this.game.elapsedTime

        this.checkForNewEnemyTypes(elapsedTime);

        if(this.spawnTimer >= this.spawnInterval){
            this.spawnEnemy()
            this.spawnTimer = 0
        }

        if(elapsedTime - this.lastDifficultyIncrease >= this.difficultyIncreaseInterval){
            this.increaseDifficulty()
            this.lastDifficultyIncrease = elapsedTime
        }
    }
    checkForNewEnemyTypes(elapsedTime) {
        while (
            this.nextEnemyTypeIndex < this.spawnSchedule.length &&
            elapsedTime >= this.spawnSchedule[this.nextEnemyTypeIndex].time
        ) {
            const enemyTypeInfo = this.spawnSchedule[this.nextEnemyTypeIndex]; 
            this.activateEnemyType(enemyTypeInfo.type);
            this.nextEnemyTypeIndex++;
        }
    }
    

    activateEnemyType(type) {
        if (!this.activeEnemyTypes.includes(type)) {
            this.activeEnemyTypes.push(type);
            console.log(`new enemy type: ${type}`);
        }
    }
    
    spawnEnemy() {
        const spawnPosition = this.getSpawnPosition();
        const enemyType = this.chooseEnemyType();
        const enemy = this.enemyFactory.createEnemy(enemyType, spawnPosition);
        this.game.enemies.push(enemy);
    }

    chooseEnemyType() {
        const randomIndex = Math.floor(Math.random() * this.activeEnemyTypes.length);
        return this.activeEnemyTypes[randomIndex];
    }
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