import { skeletonWalkAnim } from "../animations/skeletonWalkAnim"
import { BaseEnemy } from "./BaseEnemy"
import { Animation } from "../Animation"
import { Sprite } from "../Sprite"

export class SkeletonEnemy extends BaseEnemy {
    constructor(game, position){
        super(game, position)

        this.name = 'skeleton'
        this.speed = 70
        this.maxHealth = 100
        this.damage = 20
        this.attackCooldown = 1.5
        this.currentHealth = this.maxHealth

        this.animationSetup()

    }

    animationSetup(){
        this.walkAnim = new Animation(skeletonWalkAnim, 200, 'skeleton')
        this.sprite = new Sprite({walk: this.walkAnim}, this.game.resourceManager);
    }
}