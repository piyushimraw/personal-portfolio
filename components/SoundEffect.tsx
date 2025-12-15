"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

// Space-themed procedural ambient music generator with rich instrumentation
class SpaceAmbientGenerator {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private intervalIds: NodeJS.Timeout[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private currentChordIndex = 0;
  private currentScaleIndex = 0;

  // Multiple chord progressions for variety
  private chordProgressions = [
    [
      [220, 277.18, 329.63, 440],
      [196, 246.94, 293.66, 392],
      [174.61, 220, 261.63, 349.23],
    ], // Am - G - F
    [
      [220, 261.63, 329.63, 440],
      [233.08, 293.66, 349.23, 466.16],
      [196, 246.94, 311.13, 392],
    ], // Am - Bb - G
    [
      [220, 277.18, 329.63, 523.25],
      [261.63, 329.63, 392, 523.25],
      [196, 246.94, 293.66, 392],
    ], // Am7 - C - G
    [
      [220, 293.66, 349.23, 440],
      [207.65, 261.63, 311.13, 415.3],
      [185, 233.08, 277.18, 370],
    ], // Dm - C#dim - Bm
  ];

  // Different scales for arpeggios to add variety
  private scales = [
    [220, 246.94, 293.66, 329.63, 392, 440, 493.88, 523.25], // A minor
    [261.63, 293.66, 329.63, 392, 440, 493.88, 523.25, 587.33], // C major
    [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33], // A pentatonic minor extended
    [246.94, 293.66, 369.99, 392, 493.88, 523.25, 659.25, 698.46], // B phrygian
    [196, 220, 261.63, 293.66, 329.63, 392, 440, 493.88], // G mixolydian
  ];

  // Note frequencies for metallic bells
  private bellNotes = [523.25, 659.25, 783.99, 880, 1046.5, 1318.5, 1568, 1760];

  start(volume: number = 0.3) {
    if (this.isPlaying) return;

    this.audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    this.masterGain.connect(this.audioContext.destination);

    this.isPlaying = true;
    this.currentChordIndex = Math.floor(
      Math.random() * this.chordProgressions.length
    );
    this.currentScaleIndex = Math.floor(Math.random() * this.scales.length);

    // Create layered ambient sounds with more variety
    this.createEvolvingDrone();
    this.createEtherealPad();
    this.createRandomizedArpeggio();
    this.createSparkles();
    this.createDeepBassPulse();
    this.createCosmicSweep();
    this.createMetallicBells();
    this.createSubtleNoise();
  }

  private createEvolvingDrone() {
    if (!this.audioContext || !this.masterGain) return;

    // Enhanced evolving drone with filter modulation
    const frequencies = [55, 82.5, 110, 73.42]; // A1, E2, A2, D2

    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      const filter = this.audioContext!.createBiquadFilter();
      const filterLfo = this.audioContext!.createOscillator();
      const filterLfoGain = this.audioContext!.createGain();

      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
      osc.detune.setValueAtTime((i - 1.5) * 8, this.audioContext!.currentTime);

      // Slow filter modulation for evolving timbre
      filterLfo.frequency.setValueAtTime(
        0.03 + i * 0.02,
        this.audioContext!.currentTime
      );
      filterLfoGain.gain.setValueAtTime(
        50 + i * 20,
        this.audioContext!.currentTime
      );
      filterLfo.connect(filterLfoGain);
      filterLfoGain.connect(filter.frequency);
      filterLfo.start();
      this.oscillators.push(filterLfo);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(
        150 + i * 30,
        this.audioContext!.currentTime
      );

      gain.gain.setValueAtTime(0.1, this.audioContext!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.oscillators.push(osc);
    });
  }

  private createEtherealPad() {
    if (!this.audioContext || !this.masterGain) return;

    // Get current chord progression and start cycling through
    const progression = this.chordProgressions[this.currentChordIndex];
    let chordStep = 0;

    const playChord = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const padFreqs = progression[chordStep];
      chordStep = (chordStep + 1) % progression.length;

      padFreqs.forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();

        // Alternate between triangle and sine for richer texture
        osc.type = i % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
        osc.detune.setValueAtTime(
          Math.random() * 10 - 5,
          this.audioContext!.currentTime
        );

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(
          600 + Math.random() * 400,
          this.audioContext!.currentTime
        );
        filter.Q.setValueAtTime(
          0.5 + Math.random() * 0.5,
          this.audioContext!.currentTime
        );

        const now = this.audioContext!.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 2);
        gain.gain.setValueAtTime(0.04, now + 6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 10);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 10);
      });
    };

    // Change chord every 8-12 seconds
    const scheduleChord = () => {
      if (!this.isPlaying) return;
      playChord();
      const delay = 8000 + Math.random() * 4000;
      const id = setTimeout(scheduleChord, delay);
      this.intervalIds.push(id);
    };

    scheduleChord();

    // Occasionally switch to a new progression
    const switchProgression = () => {
      if (!this.isPlaying) return;
      this.currentChordIndex = Math.floor(
        Math.random() * this.chordProgressions.length
      );
      const delay = 30000 + Math.random() * 30000; // 30-60 seconds
      const id = setTimeout(switchProgression, delay);
      this.intervalIds.push(id);
    };
    const id = setTimeout(switchProgression, 30000 + Math.random() * 30000);
    this.intervalIds.push(id);
  }

  private createRandomizedArpeggio() {
    if (!this.audioContext || !this.masterGain) return;

    const playNote = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const scale = this.scales[this.currentScaleIndex];
      // Pick random notes from scale rather than sequential
      const noteIndex = Math.floor(Math.random() * scale.length);
      const octaveShift = Math.random() > 0.7 ? 2 : 1; // Sometimes go up an octave
      const freq = scale[noteIndex] * octaveShift;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      const panner = this.audioContext.createStereoPanner();

      // Randomly choose wave type
      const waveTypes: OscillatorType[] = ["sine", "triangle"];
      osc.type = waveTypes[Math.floor(Math.random() * waveTypes.length)];
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(
        1500 + Math.random() * 1500,
        this.audioContext.currentTime
      );

      // Random panning for spatial effect
      panner.pan.setValueAtTime(
        Math.random() * 2 - 1,
        this.audioContext.currentTime
      );

      const now = this.audioContext.currentTime;
      const attackTime = 0.05 + Math.random() * 0.1;
      const decayTime = 1.5 + Math.random() * 2;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(
        0.05 + Math.random() * 0.03,
        now + attackTime
      );
      gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

      osc.connect(filter);
      filter.connect(panner);
      panner.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + decayTime);
    };

    // Variable timing for organic feel
    const scheduleNext = () => {
      if (!this.isPlaying) return;
      // Sometimes play multiple notes quickly, sometimes wait longer
      const delay =
        Math.random() > 0.8
          ? 200 + Math.random() * 400 // Quick succession
          : 1000 + Math.random() * 2000; // Normal spacing
      const id = setTimeout(() => {
        playNote();
        scheduleNext();
      }, delay);
      this.intervalIds.push(id);
    };

    // Occasionally switch scales
    const switchScale = () => {
      if (!this.isPlaying) return;
      this.currentScaleIndex = Math.floor(Math.random() * this.scales.length);
      const delay = 20000 + Math.random() * 20000; // 20-40 seconds
      const id = setTimeout(switchScale, delay);
      this.intervalIds.push(id);
    };
    const id = setTimeout(switchScale, 20000 + Math.random() * 20000);
    this.intervalIds.push(id);

    scheduleNext();
  }

  private createSparkles() {
    if (!this.audioContext || !this.masterGain) return;

    const addSparkle = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      // Occasionally create clusters of sparkles
      const sparkleCount = Math.random() > 0.7 ? 3 : 1;

      for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
          if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

          const freq = 1500 + Math.random() * 5000;
          const osc = this.audioContext!.createOscillator();
          const gain = this.audioContext!.createGain();
          const panner = this.audioContext!.createStereoPanner();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);

          panner.pan.setValueAtTime(
            Math.random() * 2 - 1,
            this.audioContext!.currentTime
          );

          const now = this.audioContext!.currentTime;
          const duration = 0.2 + Math.random() * 0.4;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(
            0.015 + Math.random() * 0.025,
            now + 0.02
          );
          gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

          osc.connect(panner);
          panner.connect(gain);
          gain.connect(this.masterGain!);

          osc.start(now);
          osc.stop(now + duration + 0.1);
        }, i * (50 + Math.random() * 100));
      }
    };

    const scheduleSparkle = () => {
      if (!this.isPlaying) return;
      const delay = 400 + Math.random() * 2000;
      const id = setTimeout(() => {
        addSparkle();
        scheduleSparkle();
      }, delay);
      this.intervalIds.push(id);
    };

    scheduleSparkle();
  }

  private createDeepBassPulse() {
    if (!this.audioContext || !this.masterGain) return;

    // Deep rumbling bass pulses like a distant pulsar
    const bassPulse = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const baseFreq = 30 + Math.random() * 25; // Very low frequencies
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(80, this.audioContext.currentTime);

      const now = this.audioContext.currentTime;
      const duration = 2 + Math.random() * 3;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
      gain.gain.setValueAtTime(0.12, now + duration - 1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + duration);
    };

    const schedulePulse = () => {
      if (!this.isPlaying) return;
      const delay = 5000 + Math.random() * 8000; // 5-13 seconds
      const id = setTimeout(() => {
        bassPulse();
        schedulePulse();
      }, delay);
      this.intervalIds.push(id);
    };

    // Start after a short delay
    const id = setTimeout(schedulePulse, 3000);
    this.intervalIds.push(id);
  }

  private createCosmicSweep() {
    if (!this.audioContext || !this.masterGain) return;

    // Whooshing sweep sounds like cosmic winds
    const sweep = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      const panner = this.audioContext.createStereoPanner();

      // White noise approximation using detuned oscillators
      osc.type = "sawtooth";

      const now = this.audioContext.currentTime;
      const duration = 3 + Math.random() * 4;
      const direction = Math.random() > 0.5 ? 1 : -1; // Sweep up or down

      const startFreq = direction > 0 ? 100 : 800;
      const endFreq = direction > 0 ? 800 : 100;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(
        direction > 0 ? 1200 : 200,
        now + duration
      );
      filter.Q.setValueAtTime(2, now);

      // Pan across stereo field
      const startPan = (Math.random() - 0.5) * 2;
      panner.pan.setValueAtTime(startPan, now);
      panner.pan.linearRampToValueAtTime(-startPan, now + duration);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.03, now + duration * 0.2);
      gain.gain.setValueAtTime(0.03, now + duration * 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(panner);
      panner.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + duration);
    };

    const scheduleSweep = () => {
      if (!this.isPlaying) return;
      const delay = 8000 + Math.random() * 15000; // 8-23 seconds
      const id = setTimeout(() => {
        sweep();
        scheduleSweep();
      }, delay);
      this.intervalIds.push(id);
    };

    const id = setTimeout(scheduleSweep, 5000);
    this.intervalIds.push(id);
  }

  private createMetallicBells() {
    if (!this.audioContext || !this.masterGain) return;

    // Ethereal metallic bell tones
    const playBell = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const freq =
        this.bellNotes[Math.floor(Math.random() * this.bellNotes.length)];

      // Bell-like sound using multiple sine waves at harmonic ratios
      const harmonics = [1, 2.4, 5.95, 8.5]; // Bell-like harmonic series
      const harmonicGains = [0.5, 0.3, 0.15, 0.08];

      harmonics.forEach((ratio, i) => {
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();
        const panner = this.audioContext!.createStereoPanner();

        osc.type = "sine";
        osc.frequency.setValueAtTime(
          freq * ratio,
          this.audioContext!.currentTime
        );

        panner.pan.setValueAtTime(
          Math.random() * 2 - 1,
          this.audioContext!.currentTime
        );

        const now = this.audioContext!.currentTime;
        const baseGain = 0.015 * harmonicGains[i];
        const decayTime = 3 + Math.random() * 2 - i * 0.5; // Higher harmonics decay faster

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(baseGain, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

        osc.connect(panner);
        panner.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + decayTime);
      });
    };

    const scheduleBell = () => {
      if (!this.isPlaying) return;
      const delay = 4000 + Math.random() * 8000; // 4-12 seconds
      const id = setTimeout(() => {
        playBell();
        scheduleBell();
      }, delay);
      this.intervalIds.push(id);
    };

    const id = setTimeout(scheduleBell, 2000);
    this.intervalIds.push(id);
  }

  private createSubtleNoise() {
    if (!this.audioContext || !this.masterGain) return;

    // Create pink-ish noise for cosmic texture
    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate
    );
    const output = noiseBuffer.getChannelData(0);

    // Pink noise generation (1/f noise)
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.audioContext.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    const noiseLfo = this.audioContext.createOscillator();
    const noiseLfoGain = this.audioContext.createGain();

    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(500, this.audioContext.currentTime);

    // Slow modulation of noise level
    noiseLfo.frequency.setValueAtTime(0.05, this.audioContext.currentTime);
    noiseLfoGain.gain.setValueAtTime(0.005, this.audioContext.currentTime);
    noiseLfo.connect(noiseLfoGain);
    noiseLfoGain.connect(noiseGain.gain);
    noiseLfo.start();
    this.oscillators.push(noiseLfo);

    noiseGain.gain.setValueAtTime(0.015, this.audioContext.currentTime);

    this.noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    this.noiseNode.start();
  }

  stop() {
    this.isPlaying = false;

    // Clear all intervals
    this.intervalIds.forEach((id) => clearTimeout(id));
    this.intervalIds = [];

    // Stop noise node
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
      } catch {}
      this.noiseNode = null;
    }

    // Stop all oscillators
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {}
    });
    this.oscillators = [];

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.masterGain = null;
  }

  setVolume(volume: number) {
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.linearRampToValueAtTime(
        volume,
        this.audioContext.currentTime + 0.1
      );
    }
  }
}

export default function SoundEffect() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const generatorRef = useRef<SpaceAmbientGenerator | null>(null);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      generatorRef.current?.stop();
      generatorRef.current = null;
      setIsPlaying(false);
    } else {
      generatorRef.current = new SpaceAmbientGenerator();
      generatorRef.current.start(volume);
      setIsPlaying(true);
      setShowPrompt(false);
    }
  }, [isPlaying, volume]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    generatorRef.current?.setVolume(newVolume);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      generatorRef.current?.stop();
    };
  }, []);

  // Auto-hide prompt after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Music Enable Prompt */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm text-white text-sm flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={toggleMusic}
          >
            <IconPlayerPlay size={16} />
            <span>Click to play ambient space music 🚀</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-6 right-6 z-[100] flex items-center gap-2"
      >
        {/* Volume Slider (only when playing) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-3 py-2 overflow-hidden"
            >
              <IconVolumeOff size={14} className="text-neutral-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <IconVolume size={14} className="text-neutral-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause Button */}
        <motion.button
          onClick={toggleMusic}
          className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isPlaying ? "Pause music" : "Play ambient music"}
        >
          {isPlaying ? (
            <IconPlayerPause size={18} />
          ) : (
            <IconPlayerPlay size={18} />
          )}
        </motion.button>
      </motion.div>
    </>
  );
}
