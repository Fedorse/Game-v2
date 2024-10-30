
// WeaponManager.js
export class WeaponManager {
    constructor(game, owner) {
        this.game = game;
        this.owner = owner;
        this.weapons = [];
        this.maxWeapons = 6;
    }

    addWeapon(WeaponClass) {
        if (this.weapons.length >= this.maxWeapons) return;

        const weapon = new WeaponClass(this.game, this.owner);
        
        // Рассчитываем позицию для нового оружия
        const angle = (2 * Math.PI / (this.weapons.length + 1)) * this.weapons.length;
        weapon.offsetX = Math.cos(angle) * 50;
        weapon.offsetY = Math.sin(angle) * 50;

        this.weapons.push(weapon);
        this.recalculatePositions();

    }

    recalculatePositions() {
        const totalWeapons = this.weapons.length;
        this.weapons.forEach((weapon, index) => {
            const angle = (2 * Math.PI / totalWeapons) * index;
            weapon.offsetX = Math.cos(angle) * 50;
            weapon.offsetY = Math.sin(angle) * 50;
        });
    }

    update(deltaTime) {
        this.weapons.forEach(weapon => weapon.update(deltaTime));
    }

    render(context) {
        this.weapons.forEach(weapon => weapon.render(context));
    }

    gainExperience(exp) {
        this.weapons.forEach(weapon => weapon.gainExperience(exp));
    }
}
