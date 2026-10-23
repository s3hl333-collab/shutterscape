/**
 * Native Web Audio API camera sound effects.
 * 100% synthesized client-side with zero external assets, zero bandwidth, and zero lag.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return soundEnabled;
}

export function toggleSound(): boolean {
  if (typeof window === "undefined") return false;
  soundEnabled = !soundEnabled;
  if (soundEnabled && !audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (soundEnabled && audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (soundEnabled) {
    playShutterSound();
  }
  return soundEnabled;
}

/**
 * Synthesizes a realistic analog mechanical camera shutter click:
 * Mirror slap up -> curtain slit -> mirror down latch.
 */
export function playShutterSound() {
  if (!soundEnabled || typeof window === "undefined") return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 1. Initial mechanical click / mirror slap (bandpass filtered noise burst)
    const bufferSize = audioCtx.sampleRate * 0.08;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3, now);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.28, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.08);

    // 2. Secondary curtain latch click 65ms later (slight metallic snap)
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, now + 0.065);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.setValueAtTime(0.22, now + 0.065);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    osc.start(now + 0.065);
    osc.stop(now + 0.14);
  } catch {
    // AudioContext blocked or not supported - silently ignore
  }
}
