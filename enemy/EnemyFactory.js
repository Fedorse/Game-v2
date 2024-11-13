import { SkeletonEnemy } from "./SkeletonEnemy"
import { MushroomEnemy } from "./MushroomEnemy"
import { PigletEnemy } from "./PigletEnemy"

export class EnemyFactory {
    constructor(game){
        this.game = game
    }

    createEnemy(type, position){
        let enemy = null
        switch(type){
            case 'Piglet':
                 enemy = new PigletEnemy(this.game, position)
                 break
            case 'Skeleton':
                enemy = new SkeletonEnemy(this.game, position)
                break
            case 'Mushroom':
                enemy = new MushroomEnemy(this.game, position)
                break
        }
        return enemy
    }
}