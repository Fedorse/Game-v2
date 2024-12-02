export class SoundController {
  constructor(resourceManager) {
    this.resourceManager = resourceManager;
    this.currentMusic = null;
    this.isMusicMuted = false;
    this.isSoundMuted = false;
    this.musicVolume = 0.2;
    this.soundVolume = 0.4;
  }
  playMusic(name, shouldLoop = true) {
    const audio = this.resourceManager.getAudio(name);
    if (!audio) return;

    // stop current music
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }
    audio.volume = this.isMusicMuted ? 0 : this.musicVolume;
    audio.loop = shouldLoop;
    audio.play();
    this.currentMusic = audio;
  }
  playSound(name) {
    if (this.isSoundMuted) return;
    const audio = this.resourceManager.getAudio(name);
    if (!audio) return;

    const clone = audio.cloneNode(true);
    clone.volume = this.soundVolume;
    clone.play();
  }
  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }
  }
  setSoundVolume(volume) {
    this.soundVolume = volume;
  }
  setMusicVolume(volume) {
    this.musicVolume = volume;
    if (this.currentMusic) {
      this.currentMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;
    }
  }
  toggleMusic() {
    this.isMusicMuted = !this.isMusicMuted;
    if (this.currentMusic) {
      this.currentMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;
    }
  }
  toggleSound() {
    this.isSoundMuted = !this.isSoundMuted;
  }
}
