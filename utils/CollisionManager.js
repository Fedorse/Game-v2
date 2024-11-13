import { MapChest } from "../map/MapChest"
export class CollisionManager {
    constructor(game){
        this.game = game

        this.config = {
            expirencePicupRadius: 100,
            knockbackDuration: 0.2
        }
    }
    update(){
        this.checkPlayerMapCollision()
        this.checkExperienceCollision()
        this.checkWeaponCollision()
        this.checkEnemyCollision()
        this.checkProjectileCollision()
    }

    checkPlayerMapCollision(){
        const player = this.game.player

        const prevPosition = {
            x: player.position.x,
            y: player.position.y
        }
        this.game.gameObjects.mapObjects.forEach(object => {
            if(object.isSolid && this.isColliding(player, object)){
                player.position.x = prevPosition.x
                player.position.y = prevPosition.y
            }
        })
    }

    checkExperienceCollision(){
        const player = this.game.player

        this.game.gameObjects.experienceOrbs.forEach(orb => {
            const distance = this.getDistance(player.position, orb.position)

            if(distance < this.config.expirencePicupRadius){

                const direction = this.getDirection(player.position, orb.position)

                orb.position.x += direction.x * orb.speed * this.game.deltaTime
                orb.position.y += direction.y * orb.speed * this.game.deltaTime
            }

            if(this.isColliding(player, orb)){
                player.gainExperience(orb.value)
                orb.toRemove = true
            }
        })
    }


    checkWeaponCollision() {
        if (!this.game.player.weaponManager) return;

        this.game.player.weaponManager.weapons.forEach(weapon => {
            if (weapon.isAttacking) {
                // Проверка врагов
                this.game.gameObjects.enemies.forEach(enemy => {
                    if (!enemy.isHit && this.isInWeaponRange(weapon, enemy)) {
                        this.handleWeaponHit(weapon, enemy);
                    }
                });

                this.game.gameObjects.mapObjects.forEach(object => {
                    if (object instanceof MapChest && this.isInWeaponRange(weapon, object)) {
                        console.log('Hitting chest'); // Для отладки
                        object.takeDamage(weapon.damage);
                    }
                });
            }
        });
    }

    checkEnemyCollision(){
        const player = this.game.player

        this.game.gameObjects.enemies.forEach( enemy => {
            if(this.isColliding(enemy, player) && !player.isInvulnerable){
                player.takeDamage(enemy.damage)
            }
        })
    }

    checkProjectileCollision(){
        this.game.gameObjects.projectiles.forEach(projectile =>{
            this.game.gameObjects.enemies.forEach( enemy => {
                if(this.isColliding(projectile, enemy)){
                    enemy.takeDamage(projectile.damage)
                    if(!projectile.piercing){
                        projectile.toRemove = true
                    }
                }
            })
        })
    }

    isColliding(obj1, obj2){
        return (
            obj1.position.x < obj2.position.x + obj2.width &&
            obj1.position.x + obj1.width > obj2.position.x &&
            obj1.position.y < obj2.position.y + obj2.height &&
            obj1.position.y + obj1.height > obj2.position.y
        )
    }
    isInWeaponRange(weapon, target){
        const distance = this.getDistance(weapon.position, target.position)
        return distance <= weapon.attackRange
    }

    handleWeaponHit(weapon, enemy){
        enemy.takeDamage(weapon.damage)
        enemy.isHit = true

        if(weapon.knockBackForce){
            const direction = this.getDirection(weapon.position, enemy.position)
            enemy.velocity.x += direction.x * weapon.knockBackForce
            enemy.velocity.y += direction.y * weapon.knockBackForce
        }
    }
    getDistance(pos1, pos2){
        const dx = pos1.x - pos2.x
        const dy = pos1.y - pos2.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    getDirection(from, to){
        const dx = to.x - from.x
        const dy = to.y - from.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        return {
            x: dx / distance,
            y: dy / distance
        }
    }
}