import React, { useRef, useState } from 'react';
import { Cpu, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const HeroAvatarCard3D: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const { playClick } = useAudio();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlintPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playClick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative perspective-1000 flex items-center justify-center p-4"
      style={{ perspective: '1200px' }}
    >
      {/* Outer ambient glow behind card */}
      <div
        className="absolute w-72 h-96 sm:w-80 sm:h-[440px] rounded-3xl bg-blue-600/30 blur-3xl transition-all duration-700 pointer-events-none"
        style={{
          transform: `translate(${rotateY * 2}px, ${-rotateX * 2}px) scale(${isHovered ? 1.15 : 1})`,
        }}
      />

      {/* 3D Tiltable Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-72 sm:w-80 h-[430px] sm:h-[470px] rounded-3xl transition-transform duration-150 ease-out select-none group"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Border Ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800 p-[2px] shadow-2xl shadow-blue-900/50">
          {/* Card Body with Glass Effect */}
          <div className="relative w-full h-full rounded-[22px] bg-gradient-to-b from-[#0c1836] via-[#091124] to-[#050a17] overflow-hidden flex flex-col p-4">
            {/* Holographic Specular Glint */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 mix-blend-color-dodge"
              style={{
                background: `radial-gradient(circle at ${glintPos.x}% ${glintPos.y}%, rgba(255,255,255,0.8) 0%, rgba(56,189,248,0.4) 30%, transparent 65%)`,
              }}
            />

            {/* Circuit Line Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="#38bdf8" strokeWidth="1.5">
                <path d="M10 0v30l20 20h40" />
                <circle cx="70" cy="50" r="3" fill="#38bdf8" />
                <path d="M40 0v20l15 15h35" />
                <circle cx="90" cy="35" r="3" fill="#38bdf8" />
              </svg>
            </div>

            {/* Header Badges */}
            <div className="flex items-center justify-between z-10 mb-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>VLSI & Embedded</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-blue-400/30 text-cyan-300 text-[11px] font-mono shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Innovator</span>
              </div>
            </div>

            {/* Main Avatar Cutout Container with 3D Depth */}
            <div
              className="relative flex-1 flex items-center justify-center my-1"
              style={{ transform: 'translateZ(30px)' }}
            >
              {/* Backing shadow silhouette */}
              <div className="absolute w-[200px] sm:w-[220px] h-[260px] sm:h-[290px] rounded-2xl bg-blue-600/20 blur-md transform scale-95" />
              
              <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-xl bg-gradient-to-b from-blue-900/40 to-slate-900/80 transition-all duration-500">
                {/* Comic Illustration Avatar Image */}
                <img
                  src="/avatar.jpg"
                  alt="Thakshnesh B - Illustrated Avatar"
                  className="w-[190px] sm:w-[210px] h-[255px] sm:h-[285px] object-cover object-top"
                />
              </div>

              {/* Floating 3D Badge: CGPA */}
              <div
                className="absolute -top-1 -right-2 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-emerald-400/40 text-[11px] font-semibold text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md"
                style={{ transform: 'translateZ(45px)' }}
              >
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>8.5 CGPA</span>
              </div>
            </div>

            {/* Bottom Card Footer with Name & College */}
            <div
              className="mt-2 pt-2 border-t border-blue-500/20 text-center z-10"
              style={{ transform: 'translateZ(25px)' }}
            >
              <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-wide flex items-center justify-center gap-1.5">
                <span>Thakshnesh B</span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </h3>
              <p className="text-xs text-blue-300/80 font-medium">
                K. S. Rangasamy College of Technology
              </p>
            </div>
          </div>
        </div>

        {/* 3D Depth Back Plate */}
        <div
          className="absolute inset-0 rounded-3xl bg-blue-950/80 -z-10 border border-blue-500/20"
          style={{ transform: 'translateZ(-15px)' }}
        />
      </div>
    </div>
  );
};
