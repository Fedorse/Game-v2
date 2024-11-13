import { MapObj } from "./MapObj";
import { ExperienceOrb } from "../ExperienceOrb";
export class MapChest extends MapObj {
    constructor(game, x, y, sprite) {
        const width = 48;
        const height = 32;
        super(game, x, y, width, height, sprite);
        this.isSolid = true;
        this.health = 10
        this.currentHealth = this.health
    }

    takeDamage(damage){
        this.currentHealth -= damage
        if(this.currentHealth <= 0){
            this.die()

        }
    }

    die(){
        this.toRemove = true
        const experienceValue = 20
        const orb = new ExperienceOrb(this.game, this.position, experienceValue)
        this.game.addExperienceOrb(orb)
    }
}