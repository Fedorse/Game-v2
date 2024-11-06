import { RangedWeapon } from "./RangedWeapon";
export class AK extends RangedWeapon {
    constructor(game, owner) {
        const projectileSprite = game.resourceManager.getImage('pistolShoot');
        super(game, owner,projectileSprite);
        this.damage = 1;
        this.attackRange = 250;
        this.attackCooldown = 2;
        this.projectileSpeed = 350;
        this.sprite = this.game.resourceManager.getImage('AK');

    }
}