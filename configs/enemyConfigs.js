import { mushroomWalkAnim } from "../animations/mushroomWalkAnim"
import { skeletonWalkAnim } from "../animations/skeletonWalkAnim"
import { pigletWalkAnim } from "../animations/pigletWalkAnim"
export const ENEMY_CONFIGS = {
    SKELETON: {
        name: 'skeleton',
        stats: {

        },
        animation: {
            frames:skeletonWalkAnim,
            spriteName: 'skeleton',
            frameInterval: 200
        }
    },
    PIGLET:{
        name: 'piglet',
        stats: {

        },
        animation: {
            frames:pigletWalkAnim,
            spriteName: 'piglet',
            frameInterval: 200
        }
    },
    MUSHROOM:{
        name: 'mushroom',
        stats: {

        },
        animation: {
            frames:mushroomWalkAnim,
            spriteName: 'mushroom',
            frameInterval: 200
        }
    }
}