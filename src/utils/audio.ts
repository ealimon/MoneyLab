// Web Audio API synthesizer for tactile UI sound effects
// Features an organic "wooden bubble pop / thock" click sound

let audioCtx: AudioContext | null = null;
const STORAGE_KEY = "moneylab_audio_muted";

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setAudioMuted(muted: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, muted ? "true" : "false");
}

export function toggleAudioMuted(): boolean {
  const current = isAudioMuted();
  const next = !current;
  setAudioMuted(next);
  if (!next) {
    playPopSound(true); // play quick preview pop when unmuting
  }
  return next;
}

/**
 * Plays a warm, tactile "wooden bubble pop / thock" sound
 * Pitch drops rapidly from ~440Hz to ~120Hz with a low-pass filter
 * for a rounded, organic feel that is friendly in classroom settings.
 */
export function playPopSound(force = false): void {
  if (isAudioMuted() && !force) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Master gain for safety & volume control
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.28, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    // Warm resonant filter to eliminate harsh high frequencies
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.07);
    filter.Q.setValueAtTime(2.2, now);

    // Primary bubble body oscillator
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

    // Subtle wooden transient click
    const clickOsc = ctx.createOscillator();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(220, now);
    clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.03);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.2, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    // Connect audio graph
    osc.connect(filter);
    clickOsc.connect(clickGain);
    clickGain.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Trigger & cleanup
    osc.start(now);
    clickOsc.start(now);
    osc.stop(now + 0.085);
    clickOsc.stop(now + 0.03);
  } catch {
    // Gracefully ignore audio errors (e.g. autoplay permissions)
  }
}

/**
 * Gentle, positive two-tone chime for completion / celebration
 */
export function playSuccessChime(): void {
  if (isAudioMuted()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    playTone(523.25, now, 0.18);        // C5
    playTone(659.25, now + 0.1, 0.25);   // E5
    playTone(783.99, now + 0.2, 0.35);   // G5
  } catch {
    // Gracefully ignore
  }
}
