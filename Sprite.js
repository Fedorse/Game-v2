export class Sprite {
    constructor(animations, resourceManager, intitialAnimation = 'idle') {
        this.animations = animations
        this.currentAnimation = intitialAnimation
        this.currentFrame = 0
        this.frameTimer = 0
        this.resourceManager = resourceManager
    }

    update(deltaTime){
            //animation
            const animation = this.animations[this.currentAnimation]
            this.frameTimer += deltaTime * 1000 ;

            if(this.frameTimer > animation.frameInterval){
                this.currentFrame = (this.currentFrame + 1) % animation.frames
                this.frameTimer = 0
            }
    }

    draw(context, x, y, width, height, flipX = false ){

        const animation = this.animations[this.currentAnimation]
        const image = this.resourceManager.getImage(animation.imageName)
        if(!image) {
            console.error(`Image ${animation.imageName} not found`)
        }

        const frameX = this.currentFrame * animation.frameWidth
        context.save()
        if(flipX){
            context.translate(x + width, y)
            context.scale(-1, 1)
        } else {
            context.translate(x, y)
        }
        context
        .drawImage(image, frameX, animation.frameY, 
            animation.frameWidth, animation.frameHeight, 
            0, 0, 
            width, height)
            context.restore()
    }
    setAnimation(animationName){
        if  (this.currentAnimation !== animationName && this.animations[animationName]){
            this.currentAnimation = animationName
            this.currentFrame = 0
            this.frameTimer = 0
    }
}
}