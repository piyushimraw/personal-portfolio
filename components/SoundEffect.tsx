"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

// Space-themed procedural ambient music generator
class SpaceAmbientGenerator {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private intervalIds: NodeJS.Timeout[] = [];

  start(volume: number = 0.3) {
    if (this.isPlaying) return;

    this.audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    this.masterGain.connect(this.audioContext.destination);

    this.isPlaying = true;

    // Create layered ambient sounds
    this.createDrone();
    this.createPad();
    this.createArpeggio();
    this.createSparkles();
  }

  private createDrone() {
    if (!this.audioContext || !this.masterGain) return;

    // Deep space drone - low frequency oscillators
    const frequencies = [55, 82.5, 110]; // A1, E2, A2 - open fifth harmony

    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      const filter = this.audioContext!.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);

      // Subtle detuning for richness
      osc.detune.setValueAtTime((i - 1) * 5, this.audioContext!.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, this.audioContext!.currentTime);

      gain.gain.setValueAtTime(0.15, this.audioContext!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.oscillators.push(osc);
    });
  }

  private createPad() {
    if (!this.audioContext || !this.masterGain) return;

    // Evolving pad with slow LFO modulation
    const padFreqs = [220, 277.18, 329.63, 440]; // Am7 chord

    padFreqs.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      const filter = this.audioContext!.createBiquadFilter();

      // Triangle wave for softer pad sound
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);

      // LFO for slow volume modulation
      const lfo = this.audioContext!.createOscillator();
      const lfoGain = this.audioContext!.createGain();
      lfo.frequency.setValueAtTime(
        0.1 + i * 0.05,
        this.audioContext!.currentTime
      );
      lfoGain.gain.setValueAtTime(0.03, this.audioContext!.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();
      this.oscillators.push(lfo);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, this.audioContext!.currentTime);
      filter.Q.setValueAtTime(1, this.audioContext!.currentTime);

      gain.gain.setValueAtTime(0.06, this.audioContext!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.oscillators.push(osc);
    });
  }

  private createArpeggio() {
    if (!this.audioContext || !this.masterGain) return;

    // Gentle repeating arpeggio pattern
    const notes = [440, 523.25, 659.25, 783.99, 880, 783.99, 659.25, 523.25]; // A4 pentatonic-ish
    let noteIndex = 0;

    const playNote = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const freq = notes[noteIndex];
      noteIndex = (noteIndex + 1) % notes.length;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);

      const now = this.audioContext.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 2);
    };

    // Play notes at random intervals for organic feel
    const scheduleNext = () => {
      if (!this.isPlaying) return;
      const delay = 800 + Math.random() * 1200; // 0.8-2 seconds
      const id = setTimeout(() => {
        playNote();
        scheduleNext();
      }, delay);
      this.intervalIds.push(id);
    };

    scheduleNext();
  }

  private createSparkles() {
    if (!this.audioContext || !this.masterGain) return;

    // Random high-frequency sparkles like distant stars
    const addSparkle = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

      const freq = 2000 + Math.random() * 4000;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      const now = this.audioContext.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(
        0.02 + Math.random() * 0.02,
        now + 0.05
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.3 + Math.random() * 0.3
      );

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.6);
    };

    // Random sparkles every 0.5-2 seconds
    const scheduleSparkle = () => {
      if (!this.isPlaying) return;
      const delay = 500 + Math.random() * 1500;
      const id = setTimeout(() => {
        addSparkle();
        scheduleSparkle();
      }, delay);
      this.intervalIds.push(id);
    };

    scheduleSparkle();
  }

  stop() {
    this.isPlaying = false;

    // Clear all intervals
    this.intervalIds.forEach((id) => clearTimeout(id));
    this.intervalIds = [];

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
