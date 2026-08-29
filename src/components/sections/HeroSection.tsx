import React, { useState, useEffect } from 'react';
import { HeroAvatarCard3D } from '../3d/HeroAvatarCard3D';
import { personalInfo } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import {
  Sparkles,
  ArrowRight,
  Mail,
  Linkedin,
  Download,
  Terminal,
  Cpu,
  Zap,
  Award,
  ChevronDown,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { playClick, playSelect } = useAudio();

  // Typewriter effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const roles = personalInfo.roles;
    const currentRole = roles[roleIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(currentRole.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setCurrentText(currentRole.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen pt-28 pb-16 sm:pb-24 flex items-center justify-center overflow-hidden">
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-indigo-700/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 status-beacon" />
              <span>Available for Opportunities & Projects</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="gradient-text-blue">Thakshnesh B</span>
              </h1>

              {/* Dynamic Typewriter */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="font-mono text-xl sm:text-2xl lg:text-3xl text-cyan-300 font-semibold">
                  {currentText}
                  <span className="animate-pulse text-blue-500">|</span>
                </span>
              </div>
            </div>

            {/* Concise Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Electronics Engineering undergraduate at{' '}
              <span className="text-white font-medium">K. S. Rangasamy College of Technology</span>,
              specializing in <span className="text-blue-400 font-semibold">VLSI Design & Technology</span>, embedded hardware, and AI-driven automation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                onClick={playSelect}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Explore Hardware Lab</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#chat"
                onClick={playClick}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-blue-500/30 hover:border-blue-400 shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span className="text-sm">🤖</span>
                <span>Chat with Bujji</span>
              </a>

              <a
                href="/api/resume/download"
                target="_blank"
                rel="noopener"
                onClick={playClick}
                className="px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-sm border border-slate-700 flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                title="Download Resume TXT"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Resume</span>
              </a>
            </div>

            {/* Quick Contact & Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={playClick}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-blue-500/20 text-xs text-slate-300 hover:text-white hover:border-blue-400/50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-blue-500/20 text-xs text-slate-300 hover:text-white hover:border-blue-400/50 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Key Engineering Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-500/20 text-center lg:text-left">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block font-mono">Academic CGPA</span>
                <span className="font-display text-xl font-bold text-emerald-400">8.5 / 10</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-500/20 text-center lg:text-left">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block font-mono">Specialization</span>
                <span className="font-display text-base font-bold text-blue-300">VLSI D&T</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-500/20 text-center lg:text-left">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block font-mono">Hardware Lab</span>
                <span className="font-display text-base font-bold text-cyan-300">2 Simulators</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-500/20 text-center lg:text-left">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block font-mono">NPTEL IIT-M</span>
                <span className="font-display text-base font-bold text-amber-400">Elite + Silver</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Avatar Card */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroAvatarCard3D />
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#about"
        onClick={playClick}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">EXPLORE PORTFOLIO</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </a>
    </section>
  );
};
