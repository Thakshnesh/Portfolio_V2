import React, { useRef, useEffect, useState } from 'react';
import { skillsData } from '../../data/portfolioData';
import {
  Code2,
  Cpu,
  Wrench,
  Users,
  Sparkles,
  Terminal,
  Layers,
  CheckCircle2,
  X,
  Play,
  Zap,
  Activity,
  HeartHandshake,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

// =========================================================================
// 1. Matrix Code Stream Canvas Visualizer
// =========================================================================
const MatrixCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 300);
    const height = (canvas.height = 130);

    const chars = '01{}<>/*=;λπΩC_Py#$';
    const fontSize = 11;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const render = () => {
      ctx.fillStyle = 'rgba(2, 12, 8, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient glow color
        ctx.fillStyle = i % 3 === 0 ? '#6ee7b7' : '#059669';
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#020b08] mb-4 shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b08] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-mono text-emerald-300">
        LIVE CODE STREAM
      </div>
    </div>
  );
};

// =========================================================================
// 2. Silicon Wafer & Circuit Trace Canvas Visualizer
// =========================================================================
const SiliconCircuitCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const width = (canvas.width = 300);
    const height = (canvas.height = 130);

    const render = () => {
      time += 0.03;
      ctx.fillStyle = '#040b1a';
      ctx.fillRect(0, 0, width, height);

      // Draw Silicon Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Central Microchip Die
      const cx = width / 2;
      const cy = height / 2;
      ctx.fillStyle = '#0a1a3a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 30, cy - 25, 60, 50);
      ctx.fillRect(cx - 30, cy - 25, 60, 50);

      // Microchip Core Label
      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VLSI DIE', cx, cy - 3);

      // Pulsing Frequency Wave
      const pulseRadius = 15 + Math.sin(time * 3) * 6;
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 + Math.sin(time * 3) * 0.3})`;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Radiating Bus Trace Lines
      const busLines = [
        { x1: cx - 30, y1: cy - 15, x2: 20, y2: cy - 15 },
        { x1: cx - 30, y1: cy + 15, x2: 20, y2: cy + 15 },
        { x1: cx + 30, y1: cy - 15, x2: width - 20, y2: cy - 15 },
        { x1: cx + 30, y1: cy + 15, x2: width - 20, y2: cy + 15 },
        { x1: cx, y1: cy - 25, x2: cx, y2: 15 },
        { x1: cx, y1: cy + 25, x2: cx, y2: height - 15 },
      ];

      busLines.forEach((line, idx) => {
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();

        // Animated Electron Pulses along traces
        const progress = (time + idx * 0.3) % 1;
        const px = line.x1 + (line.x2 - line.x1) * progress;
        const py = line.y1 + (line.y2 - line.y1) * progress;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border border-blue-500/30 bg-[#040b1a] mb-4 shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040b1a] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-400/40 text-[9px] font-mono text-cyan-300">
        CMOS / RTL CORE
      </div>
    </div>
  );
};

// =========================================================================
// 3. Developer Laser Workbench Visualizer
// =========================================================================
const WorkbenchCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    const width = (canvas.width = 300);
    const height = (canvas.height = 130);

    const render = () => {
      angle += 0.02;
      ctx.fillStyle = '#03101c';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Rotating Wireframe Octagon Prism
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = angle + (i * Math.PI) / 4;
        const x = cx + Math.cos(a) * 45;
        const y = cy + Math.sin(a) * 25;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Tool Dock Nodes
      const tools = ['VS Code', 'Eclipse', 'Canva', 'App Inv'];
      tools.forEach((tool, i) => {
        const a = -angle + (i * Math.PI) / 2;
        const x = cx + Math.cos(a) * 80;
        const y = cy + Math.sin(a) * 35;

        ctx.fillStyle = '#0891b2';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = '#a5f3fc';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(tool, x, y - 7);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#03101c] mb-4 shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03101c] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-[9px] font-mono text-cyan-300">
        TOOLCHAIN DEPLOY
      </div>
    </div>
  );
};

// =========================================================================
// 4. Synaptic Neural & Soft Skills Constellation Canvas Visualizer
// =========================================================================
const SynapticNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 300);
    const height = (canvas.height = 130);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      name?: string;
    }

    const nodes: Node[] = [
      { x: 50, y: 40, vx: 0.3, vy: 0.2, radius: 3, name: 'Logic' },
      { x: 120, y: 30, vx: -0.2, vy: 0.3, radius: 4, name: 'Lead' },
      { x: 220, y: 50, vx: -0.3, vy: -0.2, radius: 3, name: 'Comms' },
      { x: 80, y: 90, vx: 0.2, vy: -0.3, radius: 3.5, name: 'Solve' },
      { x: 170, y: 85, vx: 0.3, vy: 0.2, radius: 3, name: 'Team' },
      { x: 250, y: 95, vx: -0.2, vy: 0.2, radius: 2.5, name: 'Ethics' },
    ];

    const render = () => {
      ctx.fillStyle = '#120b02';
      ctx.fillRect(0, 0, width, height);

      // Move & wrap nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = 1 - dist / 110;
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        if (n.name) {
          ctx.fillStyle = '#fde68a';
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(n.name, n.x, n.y - 6);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border border-amber-500/30 bg-[#120b02] mb-4 shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120b02] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[9px] font-mono text-amber-300">
        SYNAPTIC SYNERGY
      </div>
    </div>
  );
};

// =========================================================================
// Main Skills Section Component
// =========================================================================
export const SkillsSection: React.FC = () => {
  const { playClick, playSelect } = useAudio();
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level?: number;
    details: string;
    category: string;
    codeSnippet?: string;
  } | null>(null);

  const technicalSkills = skillsData.filter((s) => s.category === 'Technical Skills');
  const toolsSkills = skillsData.filter((s) => s.category === 'Tools & Platforms');
  const softSkills = skillsData.filter((s) => s.category === 'Soft Skills');
  const domainSkills = skillsData.filter((s) => s.category === 'Domains');

  const openSkillModal = (skill: any) => {
    playSelect();
    setSelectedSkill(skill);
  };

  const closeModal = () => {
    playClick();
    setSelectedSkill(null);
  };

  return (
    <section id="skills" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL & ANALYTICAL MATRIX</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Skills & <span className="gradient-text-blue">Core Competencies</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Interactive visual matrix covering programming languages, semiconductor VLSI architectures, development tools, and community initiatives.
          </p>
        </div>

        {/* 4 Themed Graphical Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* ========================================================= */}
          {/* CARD 1: HACKER BINARY MATRIX (PROGRAMMING) */}
          {/* ========================================================= */}
          <div className="relative rounded-3xl p-5 sm:p-6 overflow-hidden border border-emerald-500/40 bg-white dark:bg-gradient-to-b dark:from-[#03140e] dark:via-[#051a14] dark:to-[#020b08] shadow-xl dark:shadow-2xl flex flex-col justify-between group hover:border-emerald-500 hover:shadow-emerald-500/15 transition-all duration-300 hover:-translate-y-1">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/20">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-sm text-emerald-800 dark:text-emerald-300">Programming</h3>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400/80 font-semibold">HACKER BINARY CORE</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Matrix Canvas Visualizer */}
              <MatrixCanvas />

              {/* Skills List */}
              <div className="space-y-3">
                {technicalSkills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => openSkillModal(skill)}
                    className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 hover:border-emerald-400 cursor-pointer transition-all space-y-1 group/item"
                  >
                    <div className="flex justify-between text-xs font-mono font-semibold">
                      <span className="text-emerald-950 dark:text-emerald-200 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-100 flex items-center gap-1 font-bold">
                        <span className="text-emerald-500">&gt;</span>
                        {skill.name}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-emerald-300/70 font-mono font-medium">{skill.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono text-emerald-700 dark:text-emerald-400/90 font-semibold">
              <span>STATUS: COMPILED</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GCC -O3
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 2: SILICON MICROCHIP IC (CORE DOMAINS) */}
          {/* ========================================================= */}
          <div className="relative rounded-3xl p-5 sm:p-6 overflow-hidden border border-blue-500/40 bg-white dark:bg-gradient-to-b dark:from-[#051129] dark:via-[#091b40] dark:to-[#040c1e] shadow-xl dark:shadow-2xl flex flex-col justify-between group hover:border-blue-500 hover:shadow-blue-500/15 transition-all duration-300 hover:-translate-y-1">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-blue-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-400/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Core Domains</h3>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 font-semibold">SILICON & VLSI IC</span>
                  </div>
                </div>
              </div>

              {/* Silicon Circuit Canvas Visualizer */}
              <SiliconCircuitCanvas />

              {/* Domains List */}
              <div className="space-y-2.5">
                {domainSkills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => openSkillModal(skill)}
                    className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 hover:border-blue-400 cursor-pointer transition-all space-y-1 group/item"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-900 dark:text-cyan-200 group-hover/item:text-blue-600 dark:group-hover/item:text-white">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300 font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{skill.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-blue-500/20 flex items-center justify-between text-[10px] font-mono text-blue-700 dark:text-cyan-300 font-semibold">
              <span>CMOS / RTL ARCH</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping" />
                ACTIVE
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 3: DEVELOPER WORKBENCH (TOOLS & IDES) */}
          {/* ========================================================= */}
          <div className="relative rounded-3xl p-5 sm:p-6 overflow-hidden border border-cyan-500/40 bg-white dark:bg-gradient-to-b dark:from-[#041624] dark:via-[#07243b] dark:to-[#03101c] shadow-xl dark:shadow-2xl flex flex-col justify-between group hover:border-cyan-500 hover:shadow-cyan-500/15 transition-all duration-300 hover:-translate-y-1">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-400/50 flex items-center justify-center text-cyan-600 dark:text-cyan-300 shadow-md shadow-cyan-500/20">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Tools & IDEs</h3>
                    <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">DEVELOPER WORKBENCH</span>
                  </div>
                </div>
              </div>

              {/* Developer Workbench Canvas Visualizer */}
              <WorkbenchCanvas />

              {/* Tools List */}
              <div className="space-y-2">
                {toolsSkills.map((tool) => (
                  <div
                    key={tool.name}
                    onClick={() => openSkillModal(tool)}
                    className="p-2.5 rounded-xl bg-cyan-50/80 dark:bg-[#082035]/80 border border-cyan-200 dark:border-cyan-500/20 hover:border-cyan-400 cursor-pointer transition-all flex items-center justify-between text-xs group/item"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-200 block">
                        {tool.name}
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-cyan-200/70 font-medium">{tool.details}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-300 dark:border-cyan-400/30 text-cyan-800 dark:text-cyan-300 text-[10px] font-mono font-bold flex-shrink-0">
                      Proficient
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono text-cyan-700 dark:text-cyan-300 font-semibold">
              <span>TOOLCHAIN DEPLOY</span>
              <span className="text-cyan-700 dark:text-cyan-400">100% OPERATIONAL</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 4: SYNAPTIC NETWORK (PROFESSIONAL & SOFT SKILLS) */}
          {/* ========================================================= */}
          <div className="relative rounded-3xl p-5 sm:p-6 overflow-hidden border border-amber-500/40 bg-white dark:bg-gradient-to-b dark:from-[#1c1204] dark:via-[#2d1e08] dark:to-[#120b02] shadow-xl dark:shadow-2xl flex flex-col justify-between group hover:border-amber-500 hover:shadow-amber-500/15 transition-all duration-300 hover:-translate-y-1">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-md shadow-amber-500/20">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-amber-900 dark:text-amber-200">Soft Skills & Leadership</h3>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-semibold">SYNAPTIC & LEADERSHIP</span>
                  </div>
                </div>
              </div>

              {/* Synaptic Constellation Canvas Visualizer */}
              <SynapticNetworkCanvas />

              {/* Soft Skills & Leadership List */}
              <div className="space-y-2">
                {softSkills.map((soft) => (
                  <div
                    key={soft.name}
                    onClick={() => openSkillModal(soft)}
                    className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/20 hover:border-amber-400 cursor-pointer transition-all flex items-start gap-2 text-xs group/item"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white group-hover/item:text-amber-700 dark:group-hover/item:text-amber-200 block">
                        {soft.name}
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-amber-200/70 font-medium">{soft.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono text-amber-800 dark:text-amber-300 font-semibold">
              <span>NPTEL CERTIFIED</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                ELITE + SILVER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal on Click */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#091329] border border-blue-400/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-blue-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {selectedSkill.name}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                <span>Category: {selectedSkill.category}</span>
                {selectedSkill.level && (
                  <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300 font-bold">
                    {selectedSkill.level}% Proficiency
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{selectedSkill.details}</p>

              {selectedSkill.codeSnippet && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold">Code Architecture Sample:</span>
                  <pre className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-800 text-[11px] font-mono text-slate-900 dark:text-cyan-300 overflow-x-auto">
                    {selectedSkill.codeSnippet}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
