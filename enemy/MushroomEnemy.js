import { mushroomWalkAnim } from "../animations/mushroomWalkAnim"
import { BaseEnemy } from "./BaseEnemy"
import { Animation } from "../Animation"
import { Sprite } from "../Sprite"

export class MushroomEnemy extends BaseEnemy {
    constructor(game, position){
        super(game, position)


        this.name = 'mushroom'
        this.speed = 70
        this.maxHealth = 10
        this.damage = 20
        this.attackCooldown = 1.5
        this.currentHealth = this.maxHealth

        this.animationSetup()

    }

    animationSetup(){
        this.walkAnim = new Animation(mushroomWalkAnim, 200, 'mushroom')
        this.sprite = new Sprite({walk: this.walkAnim}, this.game.resourceManager);
    }
}