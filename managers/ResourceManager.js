export class ResourceManager {
  constructor() {
    this.images = new Map();
    this.audio = new Map();
  }
  loadAudio(name, src) {
    if (this.audio.has(name)) {
      return Promise.resolve(this.audio.get(name));
    }
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      audio.src = src;

      audio.oncanplaythrough = () => {
        this.audio.set(name, audio);
        resolve(audio);
      };

      audio.onerror = () => {
        reject(new Error(`Failed to load audio: ${src}`));
      };
    });
  }
  loadAudios(audioList) {
    const promises = audioList.map(({ name, src }) => {
      return this.loadAudio(name, src);
    });
    return Promise.all(promises);
  }

  getAudio(name) {
    return this.audio.get(name);
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
