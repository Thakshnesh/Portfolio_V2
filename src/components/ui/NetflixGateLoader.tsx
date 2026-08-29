import React, { useState } from 'react';
import { Play, Sparkles, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface Props {
  onComplete: () => void;
}

export const NetflixGateLoader: React.FC<Props> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playPowerUp, toggleSound, soundEnabled } = useAudio();

  const handleOpenGate = () => {
    playPowerUp();
    setIsOpen(true);

    // Scroll to top immediately to ensure portfolio opens at the Hero section
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      onComplete();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black flex items-center justify-center select-none">
      {/* Background Central Portal Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#08122c] to-[#030712] flex items-center justify-center">
        <div
          className={`w-[600px] h-[600px] rounded-full bg-blue-600/30 blur-[150px] transition-all duration-1000 ${
            isOpen ? 'scale-150 opacity-100' : 'scale-100 opacity-50 animate-pulse-slow'
          }`}
        />
      </div>

      {/* ========================================================= */}
      {/* CINEMATIC DUAL GATES (Left & Right Door Panels) */}
      {/* ========================================================= */}

      {/* Left Gate Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#040817] via-[#071026] to-[#0a1838] border-r-2 border-blue-500/40 shadow-2xl z-20 transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Left Gate Futuristic Circuit Line Texture */}
        <div className="absolute inset-0 circuit-grid opacity-20" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-500/10 to-transparent" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 space-y-4">
          <div className="w-1.5 h-16 rounded-full bg-blue-500/40 animate-pulse" />
          <div className="w-1.5 h-8 rounded-full bg-cyan-400/60" />
          <div className="w-1.5 h-24 rounded-full bg-blue-600/30" />
        </div>
      </div>

      {/* Right Gate Panel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#040817] via-[#071026] to-[#0a1838] border-l-2 border-blue-500/40 shadow-2xl z-20 transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Right Gate Futuristic Circuit Line Texture */}
        <div className="absolute inset-0 circuit-grid opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-500/10 to-transparent" />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 space-y-4">
          <div className="w-1.5 h-16 rounded-full bg-blue-500/40 animate-pulse" />
          <div className="w-1.5 h-24 rounded-full bg-cyan-400/60" />
          <div className="w-1.5 h-8 rounded-full bg-blue-600/30" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* CENTER STAGE: NETFLIX-STYLE MONOGRAM & OPEN GATE BUTTON */}
      {/* ========================================================= */}
      <div
        className={`relative z-30 flex flex-col items-center justify-center p-6 text-center max-w-lg transition-all duration-700 ${
          isOpen ? 'opacity-0 scale-125 filter blur-md pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Cinematic Netflix-style Glowing TB Monogram */}
        <div className="relative mb-6 group cursor-pointer" onClick={handleOpenGate}>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-800 p-[2.5px] shadow-2xl shadow-blue-600/50 group-hover:shadow-cyan-400/70 group-hover:scale-105 transition-all duration-500">
            <div className="w-full h-full bg-[#050b1a] rounded-[22px] flex items-center justify-center">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                TB
              </span>
            </div>
          </div>
          {/* Pulsing ring */}
          <div className="absolute -inset-2 rounded-3xl border border-blue-500/40 animate-ping pointer-events-none opacity-50" />
        </div>

        {/* Title */}
        <div className="space-y-1.5 mb-8">
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            THAKSHNESH B
          </h1>
          <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wider uppercase">
            Electronics & VLSI Engineer • 3D Portfolio
          </p>
        </div>

        {/* Big Netflix Style "Open Gate / Enter" Button */}
        <button
          onClick={handleOpenGate}
          className="group relative px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-display font-bold text-base sm:text-lg shadow-2xl shadow-blue-600/50 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-cyan-300/40"
        >
          <Play className="w-5 h-5 fill-white text-white group-hover:translate-x-0.5 transition-transform" />
          <span>ENTER PORTFOLIO</span>
          <ChevronRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Subtitle instructions */}
        <p className="mt-4 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Click to open gate and enter 3D experience</span>
        </p>
      </div>
    </div>
  );
};
