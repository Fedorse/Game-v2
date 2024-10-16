export class Sprite {
    constructor(animations) {
        this.animations = animations
        this.currentAnimation = 'idle'
        this.currentFrame = 0
        this.frameTimer = 0
        this.isLoaded = false


        this.loadAnimations()

    }
    loadAnimations(){
        Object.keys(this.animations).forEach((key)=> {
            const animation = this.animations[key]
            animation.img = new Image()
            animation.img.src = animation.imgSrc
            animation.img.onload = () => {
                animation.isLoaded = true;
                this.isLoaded = true;
            };
        })
    }
    update(deltaTime){
            //animation
            if(!this.isLoaded) return

            const animation = this.animations[this.currentAnimation]
            this.frameTimer += deltaTime * 1000 ;

            if(this.frameTimer > animation.frameInterval){
                this.currentFrame = (this.currentFrame + 1) % animation.frames
                this.frameTimer = 0
            }
    }
    draw(context, x, y, width, height, flipX=false ){
        
        if(!this.isLoaded) return

        const animation = this.animations[this.currentAnimation]
        const frameX = this.currentFrame * animation.frameWidth
        context.save()
        if(flipX){
            context.translate(x + width, y)
            context.scale(-1, 1)
        } else {
            context.translate(x, y)
        }
        context
        .drawImage(animation.img, frameX, animation.frameY, 
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