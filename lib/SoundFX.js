class SoundFX {
  constructor(source) {
    this.source = source;
  }

  playSound() {
    this.source.play();
    this.source.loop = true;
    this.source.muted = false;
    this.source.playbackRate = 1;
    this.source.currentTime = 0;
  }

  playSoundNoLoop() {
    this.source.play();
    this.source.muted = false;
    this.source.playbackRate = 1;
    this.source.currentTime = 0;
  }

  stopSound() {
    this.source.playbackRate = 0;
    this.source.muted = true;
    this.source.currentTime = 0;
  }

  pausePlay() {
    this.source.pause();
  }

  resumePlay() {
    this.source.play();
  }
}

module.exports = SoundFX;
