export class Animation {
    constructor(frames, frameInterval, imageName){
        this.frames = frames;// collection of frames
        this.frameInterval = frameInterval;
        this.imageName = imageName;
        this.currentFrameIndex = 0;
        this.frameTimer = 0;
    }
    update(deltaTime){
        this.frameTimer += deltaTime * 1000

        if(this.frameTimer > this.frameInterval){
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length
            this.frameTimer = 0
        }
    }

    getCurrentFrame(){
        return this.frames[this.currentFrameIndex]
    }

    getImageName(){
        return this.imageName
    }
}