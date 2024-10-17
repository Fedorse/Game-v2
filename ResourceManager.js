export class ResourceManager {
    constructor() {
      this.images = new Map();
    }
  
    loadImage(name, src) {
      if (this.images.has(name)) {
        return Promise.resolve(this.images.get(name));
      }
  
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          this.images.set(name, img);
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${src}`));
        };
      });
    }
  
    loadImages(imageList) {
      const promises = imageList.map(({ name, src }) => {
        return this.loadImage(name, src);
      });
      return Promise.all(promises);
    }
  
    getImage(name) {
      return this.images.get(name);
    }
  }
  