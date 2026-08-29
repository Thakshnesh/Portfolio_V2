import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Cpu, HelpCircle, Sparkles } from 'lucide-react';
import { personalInfo, projectsData, skillsData, educationData } from '../../data/portfolioData';
import { api } from '../../utils/api';
import { useAudio } from '../../context/AudioContext';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
}

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: `⚡ THAKSHNESH OS [Version 3.4.2-VLSI]\n(c) 2026 Thakshnesh B. All rights reserved.\nType 'help' to see available commands or click quick action pills below.`,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClick, playSelect } = useAudio();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    playSelect();
    const cmd = trimmed.toLowerCase();

    // Record user command
    const newHistory: TerminalLine[] = [
      ...history,
      { id: `in-${Date.now()}`, type: 'input', content: `$ ${trimmed}` },
    ];

    api.recordEvent('terminal_cmd', cmd);

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `AVAILABLE COMMANDS:
  help             - Display this command manual
  about / bio      - Display Thakshnesh's biography & career objective
  skills           - List programming & hardware proficiencies
  projects         - Show featured embedded & VLSI projects
  solar            - Simulate dual-axis solar tracking algorithm
  smoke            - Simulate MQ-2 gas sensor sampling
  education        - Display academic background & CGPA
  contact          - Show email, phone & LinkedIn links
  stats            - Fetch live visitor & backend stats
  matrix           - Trigger green matrix cyber rain
  clear            - Clear the terminal console`,
        });
        break;

      case 'about':
      case 'bio':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `NAME: ${personalInfo.name}\nROLE: Electronics Engineering Undergraduate (VLSI D&T)\nINSTITUTION: K. S. Rangasamy College of Technology\nLOCATION: ${personalInfo.location}\n\nCAREER OBJECTIVE:\n${personalInfo.careerObjective}`,
        });
        break;

      case 'skills':
        const skillList = skillsData
          .map((s) => `  • ${s.name.padEnd(28)} [${s.level}%] - ${s.category}`)
          .join('\n');
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `TECHNICAL & DOMAIN PROFICIENCIES:\n${skillList}`,
        });
        break;

      case 'projects':
        const projList = projectsData
          .map(
            (p, i) =>
              `  [${i + 1}] ${p.title}\n      Tech: ${p.tech.join(', ')}\n      Summary: ${p.summary}`
          )
          .join('\n\n');
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `FEATURED ENGINEERING PROJECTS:\n\n${projList}`,
        });
        break;

      case 'solar':
      case 'simulate solar':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `☀️ INITIATING ARDUINO SOLAR TRACKING LOOP...
  [ADC A0] Top LDR:    842 Lux
  [ADC A1] Bottom LDR: 838 Lux
  [ADC A2] Left LDR:   860 Lux
  [ADC A3] Right LDR:  855 Lux
  >> ΔX = +5, ΔY = +4 (Within ±10 deadband)
  >> Servos aligned to Sun normal vector (Azimuth: 45°, Elevation: 55°)
  >> Instantaneous Power Yield: 14.8 Watts (98.5% Theoretical Max Efficiency)
  ✓ System operating nominally.`,
        });
        break;

      case 'smoke':
      case 'simulate smoke':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `🧪 SAMPLING MQ-2 ELECTROCHEMICAL GAS SENSOR...
  [Pin A0] Analog Voltage: 0.85 V
  [Sensor Resistance Rs/R0]: 4.2 kΩ
  [Calibrated Gas Concentration]: 75 PPM (Air Quality: SAFE)
  [Digital Pin 7]: HIGH (Green Safe LED)
  [Digital Pin 8]: LOW (Red Alert LED)
  [Pin 11 Buzzer]: MUTED
  ✓ No hazardous hydrocarbons or smoke detected.`,
        });
        break;

      case 'education':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `DEGREE: ${educationData.degree} (${educationData.specialization})\nINSTITUTION: ${educationData.institution}\nDURATION: ${educationData.period}\nCGPA: ${educationData.cgpa}\n1st Sem: 8.37 SGPA | 2nd Sem: 8.25 - 8.5 CGPA`,
        });
        break;

      case 'contact':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `GET IN TOUCH WITH THAKSHNESH B:
  Email:    ${personalInfo.email}
  LinkedIn: ${personalInfo.linkedin}
  Location: ${personalInfo.location}`,
        });
        break;

      case 'stats':
        const stats = await api.getStats();
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `📊 LIVE BACKEND DATABASE STATS:
  Total Visitor Views:  ${stats.visitorCount}
  Contact Inquiries:    ${stats.totalMessages} (${stats.unreadMessages} unread)
  Project Likes:        Solar (${stats.projectLikes['solar-tracker'] || 42}), Smoke (${stats.projectLikes['smoke-detector'] || 38})
  Database Status:      SQLite Connected (127.0.0.1:5000)`,
        });
        break;

      case 'matrix':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `01000001 01001001 00100000 01010110 01001100 01010011 01001001
[MATRIX DECODED]: "Driven and curious Electronics Engineering undergraduate passionate about combining analytical thinking, technology, and creativity."`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `Command not recognized: '${trimmed}'. Type 'help' for a list of commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const quickPills = ['help', 'skills', 'solar', 'smoke', 'stats', 'contact'];

  return (
    <section id="terminal" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>DEVELOPER CLI CONSOLE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Interactive <span className="gradient-text-blue">CLI Terminal</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Command-line interface to query profile telemetry, run text simulations, and inspect backend status.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl overflow-hidden glass-panel border border-blue-500/40 shadow-2xl bg-[#040814]/95">
          {/* Title Bar */}
          <div className="px-4 py-3 bg-[#081026] border-b border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                thakshnesh@vlsi-terminal:~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistory([])}
                title="Clear Terminal"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Console Output Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 h-[320px] sm:h-[380px] overflow-y-auto font-mono text-xs sm:text-sm space-y-3 cursor-text"
          >
            {history.map((line) => (
              <div
                key={line.id}
                className={`whitespace-pre-wrap leading-relaxed ${
                  line.type === 'input'
                    ? 'text-cyan-300 font-bold'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'success'
                    ? 'text-emerald-300'
                    : line.type === 'system'
                    ? 'text-blue-400'
                    : 'text-slate-300'
                }`}
              >
                {line.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick command buttons strip */}
          <div className="px-4 py-2 bg-[#060c1d] border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-500 text-[11px]">Quick commands:</span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleCommand(pill)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/20 text-[11px] transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#081026] border-t border-blue-500/20 flex items-center gap-2"
          >
            <span className="text-blue-400 font-mono font-bold text-sm pl-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. 'solar', 'skills', 'help')..."
              className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
