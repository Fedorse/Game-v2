export class Sprite {
    constructor(imgSrc, frameWidth, frameHeight, totalFrames) {
        this.img = new Image()
        this.img.src = imgSrc
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.totalFrames = totalFrames
        this.currentFrame = 6
        this.frameTime= 0
        this.frameTimer = 0
        this.frameInterval = 100
        this.isLoaded = false

        this.img.onload = () => {
            this.isLoaded = true;
        };

    }
    update(deltaTime){
            //animation
            if(!this.isLoaded) return
            this.frameTimer += deltaTime * 1000 ;
            if(this.frameTimer > this.frameInterval){
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames
                this.frameTimer = 0
            }
    }
    draw(context, x, y, width, height){
        if(!this.isLoaded) return
        const sourseX = this.currentFrame * this.frameWidth
        context
        .drawImage(this.img, sourseX, 0, 
            this.frameWidth, this.frameHeight, 
            x, y, 
            width, height)
    }
}