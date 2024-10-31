// // AxeWeapon.js
// // import { Weapon } from './Weapon';

// export class AxeWeapon extends Weapon {
//     constructor(game, owner) {
//         super(game, owner);
//         this.name = 'Spear';
//         this.sprite = game.resourceManager.getImage('axe');
//         this.damage = 15;
//         this.attackRange = 120;
//         this.attackCooldown = 0.6;
//         this.weaponHeight = 50; // Длиннее обычного оружия
//     }

//     upgrade() {
//         switch (this.level) {
//             case 2:
//                 this.damage += 5;
//                 break;
//             case 3:
//                 this.attackRange += 20;
//                 break;
//             case 4:
//                 this.attackCooldown *= 0.9;
//                 break;
//             case 5:
//                 this.damage += 8;
//                 break;
//             case 6:
//                 this.attackRange += 30;
//                 break;
//         }
//     }
// }