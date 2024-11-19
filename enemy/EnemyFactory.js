import { Enemy } from "./Enemy"

export class EnemyFactory {
    constructor(game){
        this.game = game
    }
    createEnemy(type, position){
        return new Enemy(this.game, position, type)
    }
}