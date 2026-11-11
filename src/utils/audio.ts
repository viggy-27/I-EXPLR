// Procedural Campfire & Night Breeze Ambience via Web Audio API
class CampfireAmbience {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private crackleInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtxClass();
  }

  public async toggle(): Promise<boolean> {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) return;
    this.isPlaying = true;

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low Rumble (Campfire Base)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise
      lastOut = output[i];
      output[i] *= 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Low pass filter for soft fire rumble
    const lowFilter = this.ctx.createBiquadFilter();
    lowFilter.type = 'lowpass';
    lowFilter.frequency.setValueAtTime(280, this.ctx.currentTime);

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    this.noiseNode.connect(lowFilter);
    lowFilter.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);
    this.noiseNode.start();

    // Crackle & Ember pops
    this.scheduleCrackles();
  }

  private scheduleCrackles() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const playPop = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      const bandpass = this.ctx.createBiquadFilter();

      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1000 + Math.random() * 2500, this.ctx.currentTime);
      bandpass.Q.setValueAtTime(3 + Math.random() * 5, this.ctx.currentTime);

      osc.type = Math.random() > 0.5 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(120 + Math.random() * 300, this.ctx.currentTime);

      const popTime = this.ctx.currentTime;
      const duration = 0.03 + Math.random() * 0.05;

      popGain.gain.setValueAtTime(0, popTime);
      popGain.gain.linearRampToValueAtTime(0.12 + Math.random() * 0.15, popTime + 0.005);
      popGain.gain.exponentialRampToValueAtTime(0.0001, popTime + duration);

      osc.connect(bandpass);
      bandpass.connect(popGain);
      popGain.connect(this.masterGain);

      osc.start(popTime);
      osc.stop(popTime + duration);

      // Random delay until next crackle (80ms to 450ms)
      const nextDelay = 70 + Math.random() * 320;
      this.crackleInterval = window.setTimeout(playPop, nextDelay);
    };

    playPop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.crackleInterval) {
      clearTimeout(this.crackleInterval);
      this.crackleInterval = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          if (this.noiseNode) {
            try { this.noiseNode.stop(); } catch { /* ignore */ }
          }
        }, 850);
      } catch {
        // ignore
      }
    }
  }
}

export const campfireAudio = new CampfireAmbience();
