
import { MeleeWeapon } from "./MeleWeapon";
export class Mace extends MeleeWeapon {
    constructor(game, owner) {
        super(game, owner);
        this.damage = 15;
        this.attackRange = 80;
        this.attackCooldown = 0.8;
        this.sprite = this.game.resourceManager.getImage('mace'); 

    }

        upgrade() {
        switch (this.level) {
            case 2:
                this.damage += 4;
                break;
            case 3:
                this.attackCooldown *= 0.8;
                break;
            case 4:
                this.damage += 6;
                break;
            case 5:
                this.attackCooldown *= 0.8;
                break;
            case 6:
                this.damage += 10;
                break;
        }
    }
}