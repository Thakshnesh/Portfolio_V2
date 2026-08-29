import React, { useRef, useEffect } from 'react';
import { educationData } from '../../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, BookOpen, Layers, Cpu, Zap } from 'lucide-react';

// =========================================================================
// Live Semiconductor Wafer & VLSI Oscilloscope Canvas Visualizer
// =========================================================================
const VLSISemiconductorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = (canvas.width = 600);
    const height = (canvas.height = 100);

    const render = () => {
      time += 0.04;
      ctx.fillStyle = '#060e22';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Background
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 1. Digital Clock Pulse Waveform (Channel A)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const period = 50;
        const phase = (x + time * 60) % period;
        const y = phase < period / 2 ? 30 : 50;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Analog CMOS Propagation Waveform (Channel B)
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 3) {
        const y = 75 + Math.sin(x * 0.04 - time * 2) * 14 * Math.cos(time * 0.8);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('CLK0: 100 MHz (TTL)', 10, 22);

      ctx.fillStyle = '#a5b4fc';
      ctx.fillText('RTL_OUT (PROPAGATION DLY < 1.2ns)', 10, 70);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-[95px] rounded-2xl overflow-hidden border border-blue-500/30 bg-[#060e22] shadow-inner mb-6">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-600/20 border border-blue-400/30 text-[9px] font-mono text-cyan-300">
        VLSI LOGIC & TIMING ANALYZER
      </div>
      <div className="absolute bottom-1 right-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>CALIBRATED</span>
      </div>
    </div>
  );
};

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Education & <span className="gradient-text-blue">VLSI Specialization</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Pursuing a Bachelor of Engineering in Electronics Engineering with a core focus on VLSI Design & Technology.
          </p>
        </div>

        {/* Main Education Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel p-6 sm:p-10 border border-blue-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#08132e] via-[#060e22] to-[#040816]">
          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {educationData.period}
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {educationData.degree}
                </h3>

                <p className="text-sm sm:text-base font-semibold text-blue-400">
                  Specialization: {educationData.specialization}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <p className="text-sm text-slate-300 font-medium flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    {educationData.institution}
                  </p>
                  <a
                    href={educationData.mapsUrl || 'https://maps.app.goo.gl/NwCivf8YVTJngjw88'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/15 hover:bg-blue-500/30 border border-blue-400/30 text-cyan-300 hover:text-white text-xs font-semibold transition-all group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                    <span>View on Google Maps ↗</span>
                  </a>
                </div>
              </div>

              {/* Overall CGPA Big Badge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-900/60 to-slate-900/80 border border-blue-400/40 text-center shadow-lg shadow-blue-900/30">
                <div className="flex items-center justify-center gap-1.5 text-blue-300 text-xs font-mono mb-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>OVERALL CGPA</span>
                </div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  8.5 <span className="text-base text-blue-400 font-normal">/ 10</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Consistent Academic Excellence</span>
              </div>
            </div>

            {/* Live Semiconductor Oscilloscope Canvas */}
            <VLSISemiconductorCanvas />

            {/* Semester breakdown cards */}
            <div>
              <h4 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Semester Performance Breakdown</span>
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                {educationData.semesters.map((sem) => (
                  <div
                    key={sem.semester}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-blue-500/20 space-y-2 hover:border-blue-400/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{sem.semester}</span>
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-cyan-300 font-mono text-xs font-bold">
                        {sem.gpa} {sem.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{sem.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Highlights & Labs */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="font-display font-semibold text-xs font-mono uppercase text-slate-400 mb-3">
                Key Academic Focus & Lab Competencies:
              </h4>
              <div className="grid sm:grid-cols-3 gap-3">
                {educationData.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/50 border border-white/5 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location strip */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {educationData.location}
              </span>
              <span className="text-blue-400">Anna University Affiliated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
