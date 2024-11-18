import { State } from "../core/State";
export class EnemyIdleState extends State{
    enter(){
        if(this.entity.sprite){
            this.entity.sprite.setAnimation('idle')
        }
    }
    update(deltaTime){
        
    }
}