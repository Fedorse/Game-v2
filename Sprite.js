export class Sprite {
    constructor(animations, resourceManager) {
        this.animations = animations // collection of animations
        this.resourceManager = resourceManager
        this.currentAnimation = null
    }

    setAnimation(name){
        if(this.animations[name]){
            this.currentAnimation = this.animations[name]
        } else {
            console.error(`Animation ${name} not found`)
        }
    }

    update(deltaTime){
        if(this.currentAnimation){
            this.currentAnimation.update(deltaTime)
        }
    }

    draw(context, x, y, width, height, flipX = false ){
        if(!this.currentAnimation) return
        const imageName = this.currentAnimation.getImageName()
        const image = this.resourceManager.getImage(imageName)
        const frame = this.currentAnimation.getCurrentFrame()
        context.save()
        if(flipX){
            context.translate(x + width, y)
            context.scale(-1, 1)
        } else {
            context.translate(x, y)
        }
        context
        .drawImage(
            image, 
            frame.x, 
            frame.y, 
            frame.width, 
            frame.height, 
            0, 
            0, 
            width, 
            height)
            context.restore()
    }
}