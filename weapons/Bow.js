import { RangedWeapon } from "./RangedWeapon";
export class Bow extends RangedWeapon {
    constructor(game, owner) {
        const projectileSprite = game.resourceManager.getImage('arrow');
        super(game, owner,projectileSprite);
        this.damage = 1;
        this.attackRange = 250;
        this.attackCooldown = 3;
        this.projectileSpeed = 350;
        this.sprite = this.game.resourceManager.getImage('bow');

    }
}