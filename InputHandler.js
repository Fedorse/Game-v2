export class InputHandler {
    constructor(){
        this.left = false,
        this.right = false,
        this.up = false, 
        this.down = false

        document.addEventListener('keydown', event => {
            switch(event.code){
                case 'ArrowLeft':
                case 'KeyA':
                    this.left = true
                    break
                case 'ArrowRight':
                case 'KeyD':
                    this.right = true
                    break
                case 'ArrowUp':
                case 'KeyW':
                    this.up = true
                    break
                case 'ArrowDown':
                case 'KeyS':
                    this.down = true
                    break
            }
        })
        document.addEventListener('keyup', (event)=> {
            switch(event.code){
                case 'ArrowLeft':
                case 'KeyA':
                    this.left = false
                    break
                case 'ArrowRight':
                case 'KeyD':
                    this.right = false
                    break
                case 'ArrowUp':
                case 'KeyW':
                    this.up = false
                    break
                case 'ArrowDown':
                case 'KeyS':
                    this.down = false
                    break
            }
        })
    }

}