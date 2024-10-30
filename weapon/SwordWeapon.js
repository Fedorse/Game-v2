// AxeWeapon.js
import { Weapon } from './Weapon';

export class SwordWeapon extends Weapon {
constructor(game, owner) {
        super(game, owner);
        this.name = 'Sword';
        this.sprite = game.resourceManager.getImage('mele');
        this.damage = 12;
        this.attackRange = 80;
        this.attackCooldown = 0.4;
        this.weaponWidth = 15; // Шире обычного оружия
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