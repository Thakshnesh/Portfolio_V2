import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, ArrowUp, ShieldCheck, Heart, Terminal, Code2 } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const { playClick } = useAudio();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-blue-500/20 bg-[#040814]/95 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-display font-bold text-white text-sm shadow-md shadow-blue-500/30">
                TB
              </div>
              <span className="font-display font-bold text-lg text-white">
                Thakshnesh B
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Electronics Engineering Undergraduate specializing in VLSI Design & Technology, Embedded Systems, and AI. Built with React, Three.js, Tailwind CSS & Node.js Express.
            </p>
            <a
              href="https://maps.app.goo.gl/NwCivf8YVTJngjw88"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-cyan-300 font-mono transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Location: Tiruchengode, Tamil Nadu (KSRCT) 📍 ↗</span>
            </a>
          </div>

          {/* Col 2: Navigation Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About & Career Objective</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">Hardware Lab (Simulations)</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition-colors">Technical Skills Matrix</a>
              </li>
              <li>
                <a href="#education" className="hover:text-blue-400 transition-colors">Education & VLSI D&T</a>
              </li>
              <li>
                <a href="#chat" className="hover:text-blue-400 transition-colors">Bujji AI Assistant</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Telemetry & Socials */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-white">Live System Status</h4>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Local Time:</span>
                <span className="text-cyan-300">{timeStr} IST</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Backend API:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-blue-400 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-blue-400 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Thakshnesh B. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
