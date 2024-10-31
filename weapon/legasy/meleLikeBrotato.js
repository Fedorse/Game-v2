// // MeleeWeapon.js
// // import { Weapon } from './Weapon';

// export class meleLikeBrotato extends Weapon {
//     constructor(game, owner) {
//         super(game, owner);
//         this.name = 'Melee Weapon';

//         this.weapons = [];
//         this.weaponCount = 1;

//         this.attackCooldown = 0.5; // Задержка между атаками
//         this.attackRange = 100; // Радиус обнаружения врагов

//         this.attackDuration = 0.2; // Длительность анимации атаки
//         this.returnDuration = 0.2; // Длительность анимации возврата

//         this.damage = 10;

//         this.sprite = this.game.resourceManager.getImage('mele'); // Предполагается, что есть изображение мили-оружия

//         this.initWeapons();
//     }

//     initWeapons() {
//         this.weapons = [];
//         for (let i = 0; i < this.weaponCount; i++) {
//             const angle = (2 * Math.PI / this.weaponCount) * i;
//             const offsetX = Math.cos(angle) * 50; // Смещение относительно игрока
//             const offsetY = Math.sin(angle) * 50;
//             this.weapons.push({
//                 offsetX,
//                 offsetY,
//                 baseAngle: angle,
//                 position: { x: 0, y: 0 },
//                 angle: angle,
//                 state: 'idle', // 'idle', 'attacking', 'returning'
//                 timer: 0,
//                 targetEnemy: null,
//                 startPosition: { x: 0, y: 0 },
//                 endPosition: { x: 0, y: 0 },
//                 damageDealtEnemies: new Set(),
//             });
//         }
//     }

//     update(deltaTime) {
//         this.weapons.forEach(weapon => {
//             switch (weapon.state) {
//                 case 'idle':
//                     // Располагаем оружие вокруг игрока
//                     weapon.position.x = this.owner.position.x + this.owner.width / 2 + weapon.offsetX;
//                     weapon.position.y = this.owner.position.y + this.owner.height / 2 + weapon.offsetY;

//                     // Ищем ближайшего врага в радиусе атаки
//                     const target = this.findNearestEnemyInRange();
//                     if (target && this.attackTimer <= 0) {
//                         // Начинаем атаку
//                         weapon.state = 'attacking';
//                         weapon.timer = 0;
//                         weapon.targetEnemy = target;
//                         weapon.startPosition = { ...weapon.position };

//                         // Позиция врага на момент начала атаки
//                         weapon.endPosition = {
//                             x: target.position.x + target.width / 2,
//                             y: target.position.y + target.height / 2,
//                         };

//                         // Обновляем угол оружия в направлении врага
//                         const dx = weapon.endPosition.x - weapon.startPosition.x;
//                         const dy = weapon.endPosition.y - weapon.startPosition.y;
//                         weapon.angle = Math.atan2(dy, dx);
//                     }
//                     break;

//                 case 'attacking':
//                     weapon.timer += deltaTime;
//                     const attackProgress = weapon.timer / this.attackDuration;

//                     if (attackProgress >= 1) {
//                         // Атака завершена, начинаем возвращение
//                         weapon.state = 'returning';
//                         weapon.timer = 0;
//                         weapon.startPosition = { ...weapon.position };
//                         weapon.endPosition = {
//                             x: this.owner.position.x + this.owner.width / 2 + weapon.offsetX,
//                             y: this.owner.position.y + this.owner.height / 2 + weapon.offsetY,
//                         };
//                         weapon.damageDealtEnemies.clear();
//                     } else {
//                         // Интерполируем позицию оружия к врагу
//                         weapon.position.x = weapon.startPosition.x + (weapon.endPosition.x - weapon.startPosition.x) * attackProgress;
//                         weapon.position.y = weapon.startPosition.y + (weapon.endPosition.y - weapon.startPosition.y) * attackProgress;

//                         // Проверяем столкновение с врагами во время атаки
//                         this.game.enemies.forEach(enemy => {
//                             if (!weapon.damageDealtEnemies.has(enemy)) {
//                                 if (this.isColliding(weapon, enemy)) {
//                                     enemy.takeDamage(this.damage);
//                                     weapon.damageDealtEnemies.add(enemy);
//                                 }
//                             }
//                         });
//                     }
//                     break;

//                 case 'returning':
//                     weapon.timer += deltaTime;
//                     const returnProgress = weapon.timer / this.returnDuration;

//                     if (returnProgress >= 1) {
//                         // Возвращаемся в состояние ожидания
//                         weapon.state = 'idle';
//                         this.attackTimer = this.attackCooldown;
//                     } else {
//                         // Интерполируем позицию оружия обратно к игроку
//                         weapon.position.x = weapon.startPosition.x + (weapon.endPosition.x - weapon.startPosition.x) * returnProgress;
//                         weapon.position.y = weapon.startPosition.y + (weapon.endPosition.y - weapon.startPosition.y) * returnProgress;
//                     }
//                     break;
//             }
//         });

//         // Обновляем таймер перезарядки атаки
//         if (this.attackTimer > 0) {
//             this.attackTimer -= deltaTime;
//         }
//     }

//     findNearestEnemyInRange() {
//         let nearestEnemy = null;
//         let minDistance = this.attackRange;
//         this.game.enemies.forEach(enemy => {
//             const dx = enemy.position.x + enemy.width / 2 - (this.owner.position.x + this.owner.width / 2);
//             const dy = enemy.position.y + enemy.height / 2 - (this.owner.position.y + this.owner.height / 2);
//             const distance = Math.hypot(dx, dy);
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 nearestEnemy = enemy;
//             }
//         });
//         return nearestEnemy;
//     }

//     isColliding(weapon, enemy) {
//         // Определяем прямоугольник оружия для коллизии
//         const weaponWidth = 10; // Ширина оружия для коллизии
//         const weaponHeight = 40; // Длина оружия для коллизии

//         // Позиция оружия
//         const weaponX = weapon.position.x;
//         const weaponY = weapon.position.y;

//         // Преобразуем координаты оружия с учетом поворота
//         const cos = Math.cos(weapon.angle);
//         const sin = Math.sin(weapon.angle);

//         // Центр оружия
//         const cx = weaponX;
//         const cy = weaponY;

//         // Координаты углов оружия после поворота
//         const corners = [
//             { x: -weaponWidth / 2, y: -weaponHeight / 2 },
//             { x: weaponWidth / 2, y: -weaponHeight / 2 },
//             { x: weaponWidth / 2, y: weaponHeight / 2 },
//             { x: -weaponWidth / 2, y: weaponHeight / 2 },
//         ].map(corner => {
//             return {
//                 x: cx + corner.x * cos - corner.y * sin,
//                 y: cy + corner.x * sin + corner.y * cos,
//             };
//         });

//         // Ось-ориентированный ограничивающий прямоугольник (AABB) оружия
//         const weaponMinX = Math.min(...corners.map(c => c.x));
//         const weaponMaxX = Math.max(...corners.map(c => c.x));
//         const weaponMinY = Math.min(...corners.map(c => c.y));
//         const weaponMaxY = Math.max(...corners.map(c => c.y));

//         // Проверяем пересечение AABB оружия и AABB врага
//         return (
//             weaponMinX < enemy.position.x + enemy.width &&
//             weaponMaxX > enemy.position.x &&
//             weaponMinY < enemy.position.y + enemy.height &&
//             weaponMaxY > enemy.position.y
//         );
//     }

//     upgrade() {
//         switch (this.level) {
//             case 2:
//                 this.damage += 5;
//                 break;
//             case 3:
//                 this.weaponCount = 2;
//                 this.initWeapons();
//                 break;
//             case 4:
//                 this.attackCooldown -= 0.1;
//                 break;
//             case 5:
//                 this.damage += 10;
//                 break;
//             case 6:
//                 this.weaponCount = 3;
//                 this.initWeapons();
//                 break;
//             default:
//                 break;
//         }
//     }

//     render(context) {
//         context.save();
//         context.translate(-this.game.camera.x, -this.game.camera.y);

//         this.weapons.forEach(weapon => {
//             context.save();

//             // Позиция оружия
//             context.translate(weapon.position.x, weapon.position.y);

//             // Поворот оружия в направлении движения
//             context.rotate(weapon.angle);

//             // Отрисовка оружия
//             if (this.sprite) {
//                 context.drawImage(
//                     this.sprite,
//                     0,
//                     0,
//                     32,
//                     32,
//                     -16, // Центрируем изображение по оси X
//                     -16, // Центрируем изображение по оси Y
//                     32,
//                     32
//                 );
//             } else {
//                 // Если нет спрайта, отрисовываем простой прямоугольник
//                 context.fillStyle = 'gray';
//                 context.fillRect(-5, -20, 10, 40);
//             }

//             context.restore();
//         });

//         context.restore();
//     }
// }
