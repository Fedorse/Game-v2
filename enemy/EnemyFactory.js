import { SkeletonEnemy } from "./SkeletonEnemy"
import { MushroomEnemy } from "./MushroomEnemy"
import { PigletEnemy } from "./PigletEnemy"

export class EnemyFactory {
    constructor(game){
        this.game = game
    }

    createEnemy(type, position){
        switch(type){
            case 'Piglet':
                return new PigletEnemy(this.game, position)
            case 'Skeleton':
                return new SkeletonEnemy(this.game, position)
            case 'Mushroom':
                return new MushroomEnemy(this.game, position)

        }
    }
}