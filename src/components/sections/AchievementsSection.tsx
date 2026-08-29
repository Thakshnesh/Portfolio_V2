import React, { useRef, useState, useEffect } from 'react';
import { Award, ShieldCheck, CheckCircle2, Medal, HeartHandshake, Sparkles, Zap } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

// =========================================================================
// Holographic Luminous Shimmer Canvas
// =========================================================================
const HolographicShimmerCanvas: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = (canvas.width = 160);
    const height = (canvas.height = 160);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Soft Pulsing Radial Aura
      const pulse = 45 + Math.sin(time * 2) * 5;
      const radGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, pulse + 20);
      radGrad.addColorStop(0, `${color}25`);
      radGrad.addColorStop(0.6, `${color}10`);
      radGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse + 20, 0, Math.PI * 2);
      ctx.fill();

      // 2. Smooth Rotating Perimeter Halo
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.8);
      const ringGrad = ctx.createConicGradient(0, 0, 0);
      ringGrad.addColorStop(0, 'transparent');
      ringGrad.addColorStop(0.25, `${color}55`);
      ringGrad.addColorStop(0.5, 'transparent');
      ringGrad.addColorStop(0.75, `${color}40`);
      ringGrad.addColorStop(1, 'transparent');

      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 56, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Gentle Floating Micro-Aura Particles
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4 + time * 0.2;
        const r = 50 + Math.sin(time * 1.5 + i) * 6;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const alpha = (0.4 + Math.sin(time * 3 + i) * 0.4).toFixed(2);

        ctx.fillStyle = `${color}${Math.floor(parseFloat(alpha) * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export const AchievementsSection: React.FC = () => {
  const { playClick, playSelect } = useAudio();
  const [tiltCard1, setTiltCard1] = useState({ x: 0, y: 0 });
  const [tiltCard2, setTiltCard2] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="achievements" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>HONORS & CREDENTIALS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Milestones & <span className="gradient-text-blue">Recognitions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Distinctions demonstrating technical rigor, soft skills mastery, and community volunteering.
          </p>
        </div>

        {/* Certificate & Honor Cards Grid */}
        <div className="max-w-4xl mx-auto space-y-8" style={{ perspective: '1200px' }}>
          {/* Card 1: NPTEL Elite + Silver Certificate (Silver Medal Distinction) */}
          <div
            onMouseMove={(e) => handleMouseMove(e, setTiltCard1)}
            onMouseLeave={() => handleMouseLeave(setTiltCard1)}
            style={{
              transform: `rotateX(${tiltCard1.x}deg) rotateY(${tiltCard1.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-400/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group hover:border-slate-200 transition-all bg-gradient-to-br from-[#0c1322] via-[#091120] to-[#040812]"
          >
            {/* Glowing Metallic Ambient */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-slate-300/10 rounded-full blur-3xl pointer-events-none" />

            {/* Silver Medal Visual Badge with Shimmer Aura */}
            <div className="relative flex-shrink-0 w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-slate-200 via-slate-800 to-slate-950 border-2 border-slate-300/70 p-4 flex flex-col items-center justify-center text-center shadow-2xl shadow-slate-400/20 group-hover:scale-105 transition-transform">
              <HolographicShimmerCanvas color="#cbd5e1" />
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-300 flex items-center justify-center shadow-lg mb-1 border border-white/60">
                <Medal className="w-8 h-8 text-slate-900" />
              </div>
              <span className="relative z-10 text-[11px] font-mono uppercase font-bold text-slate-100">
                SILVER MEDAL
              </span>
              <span className="relative z-10 text-[9px] text-slate-300 font-mono">Elite + Silver (IIT-M)</span>
            </div>

            {/* Certificate Details */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-200/15 border border-slate-300/40 text-slate-200 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
                  <Medal className="w-3.5 h-3.5 text-slate-300" />
                  <span>Elite + Silver Certificate</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">NPTEL (IIT Madras) • 2026</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                NPTEL Certification in Soft Skill Development
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Completed the Soft Skill Development course from NPTEL (IIT Madras) with an Elite + Silver category certification.
              </p>

              {/* Competencies */}
              <div className="pt-1">
                <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-semibold">
                  Core Competencies Validated:
                </span>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {['Professional Communication', 'Team Leadership', 'Workplace Ethics', 'Critical Decision Making'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-600/40 text-xs font-medium text-slate-200 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{skill}</span>
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: National Service Scheme (NSS) Active Volunteer with Official NSS Logo */}
          <div
            onMouseMove={(e) => handleMouseMove(e, setTiltCard2)}
            onMouseLeave={() => handleMouseLeave(setTiltCard2)}
            style={{
              transform: `rotateX(${tiltCard2.x}deg) rotateY(${tiltCard2.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-blue-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group hover:border-blue-300 transition-all bg-gradient-to-br from-[#0a1530] via-[#071026] to-[#040816]"
          >
            {/* Glowing Blue Ambient */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Official NSS Logo Frame with Aura Canvas */}
            <div className="relative flex-shrink-0 w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-blue-900/50 to-slate-950 border-2 border-blue-400/50 p-3 flex flex-col items-center justify-center text-center shadow-2xl shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <HolographicShimmerCanvas color="#38bdf8" />
              <img
                src="/nss-logo.jpg"
                alt="National Service Scheme Logo"
                className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full shadow-lg border border-blue-300/30"
              />
              <span className="relative z-10 text-[11px] font-mono uppercase font-bold text-cyan-300 mt-1">
                NSS VOLUNTEER
              </span>
            </div>

            {/* NSS Volunteer Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-cyan-300 text-xs font-bold font-mono flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
                  <span>National Service Scheme (NSS)</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">KSRCT Volunteer Wing • 2025 – Present</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Active NSS Community & Social Volunteer
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dedicated active volunteer contributing to village development camps, environmental cleanliness drives, health/hygiene awareness seminars, and community empowerment initiatives representing K. S. Rangasamy College of Technology.
              </p>

              {/* Service Initiatives */}
              <div className="pt-1">
                <span className="text-xs font-mono uppercase text-cyan-400 block mb-2 font-semibold">
                  Key Community Service Areas:
                </span>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {[
                    'Village Community Outreach',
                    'Environmental & Green Drives',
                    'Health & Social Awareness',
                    'Team Civic Engagement',
                  ].map((service) => (
                    <span
                      key={service}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/30 text-xs font-medium text-cyan-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{service}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
