/**
 * VELOCITY X — Web Audio Synthesizer Engine (FR-12)
 * 
 * Generates a reactive dual-motor / twin-turbo kinetic engine hum.
 * Fully synthesized via native Web Audio API oscillators:
 * - Zero external MP3/WAV payload
 * - Muted by default, activated on user toggle
 * - Dynamically scales pitch and resonance with scroll velocity
 * - Remembers user preference in localStorage
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.filter = null;
    this.gainNode = null;
    this.isPlaying = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Gain Node
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // Lowpass Filter for deep mechanical rumble
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);
      this.filter.connect(this.gainNode);

      // Primary Oscillator (Sub rumble)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.osc1.connect(this.filter);
      this.osc1.start();

      // Secondary Oscillator (Turbine whine)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110, this.ctx.currentTime);
      this.osc2.connect(this.filter);
      this.osc2.start();

      this.isPlaying = true;
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  }

  setMuted(muted) {
    if (!this.ctx) {
      if (!muted) this.init();
      else return;
    }
    if (this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    if (muted) {
      this.gainNode.gain.setTargetAtTime(0.0001, now, 0.08);
    } else {
      this.gainNode.gain.setTargetAtTime(0.12, now, 0.1);
    }
  }

  updateVelocity(vel) {
    if (!this.ctx || !this.isPlaying) return;
    const absVel = Math.min(1.0, Math.abs(vel) * 0.05);
    const now = this.ctx.currentTime;

    // Pitch scales with velocity: idle 55Hz -> peak 240Hz
    const baseFreq = 55 + absVel * 185;
    this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.osc2.frequency.setTargetAtTime(baseFreq * 2.1, now, 0.05);

    // Filter opens up as speed increases
    const filterFreq = 140 + absVel * 600;
    this.filter.frequency.setTargetAtTime(filterFreq, now, 0.05);
  }
}

export const audioEngine = typeof window !== 'undefined' ? new AudioEngine() : null;
