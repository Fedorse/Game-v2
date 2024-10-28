import { BaseEnemy } from "./BaseEnemy"
import { Animation } from "../Animation"
import { Sprite } from "../Sprite"
import { pigletWalkAnim } from "../animations/pigletWalkAnim"

export class PigletEnemy extends BaseEnemy {
    constructor(game, position){
        super(game, position)
        this.game = game


        this.name = 'piglet'
        this.speed = 50
        this.maxHealth = 100
        this.damage = 10
        this.attackCooldown = 1
        this.currentHealth = this.maxHealth



        this.animationSetup()
    }
    animationSetup(){
        this.walkAnim = new Animation(pigletWalkAnim, 200, 'piglet')
        this.sprite = new Sprite({walk: this.walkAnim}, this.game.resourceManager);
    }
    }