import React, { useRef, useEffect } from 'react';
import { personalInfo } from '../../data/portfolioData';
import {
  Cpu,
  Radio,
  LineChart,
  Users,
  GraduationCap,
  MapPin,
  Compass,
  CheckCircle2,
  FileText,
  Activity,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

// =========================================================================
// Biometric & Engineering Telemetry HUD Canvas Visualizer
// =========================================================================
const EngineeringRadarCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const width = (canvas.width = 320);
    const height = (canvas.height = 200);

    const render = () => {
      angle += 0.03;
      ctx.fillStyle = '#050c1e';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Concentric Radar Rings
      [30, 60, 85].forEach((r, idx) => {
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 + idx * 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      ctx.moveTo(cx - 95, cy);
      ctx.lineTo(cx + 95, cy);
      ctx.moveTo(cx, cy - 95);
      ctx.lineTo(cx, cy + 95);
      ctx.stroke();

      // Sweeping Radar Beam
      const gradient = ctx.createConicGradient(angle, cx, cy);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      gradient.addColorStop(0.15, 'rgba(56, 189, 248, 0.0)');
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      // Blips / Target Nodes
      const blips = [
        { angle: angle * 0.7, dist: 45, label: 'VLSI RTL' },
        { angle: -angle * 0.5 + 1.2, dist: 70, label: 'ANALYTICS' },
        { angle: angle * 1.1 + 2.5, dist: 55, label: 'ARDUINO' },
      ];

      blips.forEach((b) => {
        const bx = cx + Math.cos(b.angle) * b.dist;
        const by = cy + Math.sin(b.angle) * b.dist;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#93c5fd';
        ctx.font = '8px monospace';
        ctx.fillText(b.label, bx + 6, by + 3);
      });

      // Outer Rotating Dash Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 0.5);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 92, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-blue-500/30 bg-[#050c1e] shadow-inner mb-4">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600/20 border border-blue-400/30 text-[9px] font-mono text-cyan-300">
        LIVE RADAR TELEMETRY
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] font-mono text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>16 MHz CLK SYNC</span>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { playClick } = useAudio();

  const pillars = [
    {
      title: 'VLSI & Circuit Design',
      icon: Cpu,
      color: 'from-blue-600 to-indigo-600',
      description:
        'Focus on digital circuit synthesis, CMOS logic optimization, and silicon integrated circuit architectures.',
    },
    {
      title: 'Embedded Systems & IoT',
      icon: Radio,
      color: 'from-cyan-600 to-blue-600',
      description:
        'Hands-on sensor calibration, real-time ADC sampling, PWM actuator control, and Arduino microcontroller firmware.',
    },
    {
      title: 'Business Analytics & AI',
      icon: LineChart,
      color: 'from-blue-600 to-emerald-600',
      description:
        'Applying analytical thinking, algorithmic modeling, and artificial intelligence to streamline engineering systems.',
    },
    {
      title: 'Professional Leadership & Soft Skills',
      icon: Users,
      color: 'from-indigo-600 to-purple-600',
      description:
        'NPTEL Elite + Silver certified in soft skills, dedicated to analytical problem solving, critical thinking, and collaborative engineering.',
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>ABOUT & CAREER OBJECTIVE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Engineering at the Intersection of <span className="gradient-text-blue">Hardware & Intelligence</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Undergraduate Electronics Engineer specializing in VLSI Design, embedded hardware interfaces, and analytical problem-solving.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bio & Radar Telemetry */}
          <div className="lg:col-span-5 rounded-3xl glass-panel p-6 sm:p-8 border border-blue-500/30 bg-[#060e22]/90 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              {/* Embedded Live Radar Telemetry Visualizer */}
              <EngineeringRadarCanvas />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>MISSION STATEMENT</span>
              </div>

              <blockquote className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-cyan-500 pl-4 py-1 mb-4">
                "{personalInfo.careerObjective}"
              </blockquote>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Bachelor of Engineering in Electronics (VLSI D&T)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>K. S. Rangasamy College of Technology, Tiruchengode</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>NPTEL Elite + Silver Soft Skill Distinction (Silver Medal)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Embedded Systems & Microcontroller Prototyping</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {personalInfo.location}
              </span>
              <a
                href={personalInfo.mapsUrl || 'https://maps.app.goo.gl/NwCivf8YVTJngjw88'}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Campus Map ↗
              </a>
            </div>
          </div>

          {/* Right: 4 Engineering Pillars Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl glass-panel p-6 border border-blue-500/20 hover:border-blue-400/60 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 bg-gradient-to-b from-[#091533] via-[#071026] to-[#050a18]"
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} p-[1.5px] shadow-lg shadow-blue-600/20`}
                    >
                      <div className="w-full h-full bg-[#071026] rounded-[14px] flex items-center justify-center text-cyan-300">
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-blue-400">
                    <span>CORE FOCUS</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
