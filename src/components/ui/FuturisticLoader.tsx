import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, Zap, ArrowRight, ShieldCheck, Radio, Layers, Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface Props {
  onComplete: () => void;
}

export const FuturisticLoader: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { playSelect, playPowerUp, toggleSound, soundEnabled } = useAudio();

  const bootSteps = [
    'Initializing Silicon Microarchitecture & VLSI Core...',
    'Calibrating 4-Quadrant LDR Solar Tracking Array (A0-A3)...',
    'Preheating MQ-2 Electrochemical Gas Chamber...',
    'Compiling 3D WebGL Shaders & Photovoltaic Geometry...',
    'Synchronizing Gemini AI Neural Knowledge Engine...',
    'All Systems Nominal. Ready for 3D Exploration.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }

        // Variable realistic loading speed
        const increment = Math.floor(Math.random() * 4) + 2;
        const next = Math.min(100, prev + increment);

        // Update step index according to progress
        const stepIdx = Math.min(
          bootSteps.length - 1,
          Math.floor((next / 100) * bootSteps.length)
        );
        setCurrentStepIndex(stepIdx);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    playPowerUp();
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#040814] flex flex-col items-center justify-center p-4 select-none overflow-hidden transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-110 pointer-events-none filter blur-md' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cyber Grid & Hex Elements */}
      <div className="absolute inset-0 circuit-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Outer Rotating HUD Rings */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Ring 1 - Outermost dashed */}
        <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-blue-500/20 border-dashed animate-spin-slow pointer-events-none absolute" />

        {/* Ring 2 - Reverse rotation with cyan notches */}
        <div
          className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-transparent border-t-cyan-400 border-b-blue-600 animate-spin pointer-events-none absolute"
          style={{ animationDuration: '6s' }}
        />

        {/* Ring 3 - Glowing Core Orbit */}
        <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-blue-900/60 via-slate-900/90 to-blue-950/80 border border-blue-400/40 p-4 flex flex-col items-center justify-center text-center shadow-2xl shadow-blue-500/30 backdrop-blur-md relative z-10">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/50 flex items-center justify-center text-cyan-300 mb-1 animate-pulse">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-wider">
            {progress}%
          </span>
          <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest">
            {isReady ? 'LINK READY' : 'BOOTING'}
          </span>
        </div>
      </div>

      {/* Central Identity Text */}
      <div className="text-center max-w-md space-y-2 mb-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>THAKSHNESH B • 3D ARCHITECTURE</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Loading <span className="gradient-text-blue">Interactive Experience</span>
        </h1>

        {/* Live Step Readout */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-xs sm:text-sm font-mono text-slate-300 flex items-center gap-1.5 animate-pulse">
            <span className="text-cyan-400">&gt;</span>
            <span>{bootSteps[currentStepIndex]}</span>
          </p>
        </div>
      </div>

      {/* Futuristic Multi-Segment Progress Bar */}
      <div className="w-full max-w-md space-y-2 z-10">
        <div className="h-2 w-full bg-slate-900/90 rounded-full border border-blue-500/30 p-[1px] overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full transition-all duration-150 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer line inside progress */}
            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
          </div>
        </div>

        {/* Telemetry info row */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-400">
          <span>MEM: 64MB OK</span>
          <span>GPU: WEBGL 2.0</span>
          <span>SYS: 60 FPS</span>
        </div>
      </div>

      {/* Action Button: Enter Portfolio / Skip */}
      <div className="mt-8 z-10 flex flex-col items-center gap-3">
        {isReady ? (
          <button
            onClick={handleEnter}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-display font-bold text-sm sm:text-base shadow-2xl shadow-blue-500/50 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-cyan-300/50 animate-bounce"
          >
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>ENTER 3D PORTFOLIO</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleEnter}
            className="text-xs font-mono text-slate-400 hover:text-blue-300 transition-colors underline underline-offset-4 py-1"
          >
            Skip Intro & Enter Directly →
          </button>
        )}

        {/* Audio notice */}
        <button
          onClick={() => toggleSound()}
          className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5 text-blue-400" />
          <span>{soundEnabled ? 'Audio FX: Enabled' : 'Click to Enable Audio FX'}</span>
        </button>
      </div>
    </div>
  );
};
