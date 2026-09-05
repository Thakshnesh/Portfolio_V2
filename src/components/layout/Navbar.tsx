import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';
import {
  Sparkles,
  Cpu,
  Zap,
  GraduationCap,
  Award,
  Bot,
  Send,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

// =========================================================================
// Real-time Interactive Liquid Flow Canvas Engine
// =========================================================================
const LiquidFlowCanvas: React.FC<{ isHovered: boolean; soundActive: boolean }> = ({
  isHovered,
  soundActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseRef.current.x = (e.clientX - rect.left) / rect.width;
        mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += isHovered ? 0.05 : soundActive ? 0.035 : 0.02;

      const w = (canvas.width = canvas.offsetWidth || 560);
      const h = (canvas.height = canvas.offsetHeight || 50);

      ctx.clearRect(0, 0, w, h);

      // Layer 1: Deep fluid wave
      const grad1 = ctx.createLinearGradient(0, 0, w, h);
      grad1.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
      grad1.addColorStop(0.5, 'rgba(6, 182, 212, 0.45)');
      grad1.addColorStop(1, 'rgba(79, 70, 229, 0.35)');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.moveTo(0, h);

      const waveFreq1 = isHovered ? 0.015 : 0.01;
      const waveAmp1 = isHovered ? 8 : 5;

      for (let x = 0; x <= w; x += 4) {
        const mouseDist = Math.abs(x / w - mouseRef.current.x);
        const mouseLift = Math.max(0, (1 - mouseDist * 3) * (isHovered ? 6 : 2));
        const y =
          h * 0.4 +
          Math.sin(x * waveFreq1 + time * 2) * waveAmp1 +
          Math.cos(x * 0.02 - time) * 3 -
          mouseLift;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Layer 2: Fast luminous crest wave
      const grad2 = ctx.createLinearGradient(0, 0, w, 0);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
      grad2.addColorStop(0.5, 'rgba(251, 191, 36, 0.7)');
      grad2.addColorStop(1, 'rgba(129, 140, 248, 0.6)');

      ctx.strokeStyle = grad2;
      ctx.lineWidth = isHovered ? 2.5 : 1.5;
      ctx.beginPath();

      for (let x = 0; x <= w; x += 5) {
        const y =
          h * 0.35 +
          Math.sin(x * 0.018 - time * 2.5) * (waveAmp1 * 0.8) +
          Math.sin(x * 0.03 + time) * 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Layer 3: Bioluminescent Floating Liquid Droplets
      for (let i = 0; i < 6; i++) {
        const dropX = ((time * 30 * (i + 1) * 0.3 + i * 95) % (w - 20)) + 10;
        const dropY =
          h * 0.45 +
          Math.sin(dropX * 0.02 + time * 3 + i) * (waveAmp1 * 0.9) -
          (i % 2 === 0 ? 3 : -2);
        const radius = (Math.sin(time * 3 + i) * 0.8 + 1.6) * (isHovered ? 1.4 : 1);

        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#f59e0b';
        ctx.shadowColor = i % 2 === 0 ? '#38bdf8' : '#f59e0b';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(dropX, dropY, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, soundActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-hidden opacity-75"
    />
  );
};

// =========================================================================
// Main Navbar with Dynamic Island Component
// =========================================================================
export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playClick, playSelect } = useAudio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);

  const navLinks = [
    { id: 'about', label: 'About', href: '#about', icon: Sparkles, status: 'CAREER & VLSI GOALS' },
    { id: 'projects', label: 'Hardware Lab', href: '#projects', icon: Cpu, status: 'SOLAR & MQ-2 ACTIVE' },
    { id: 'skills', label: 'Skills Matrix', href: '#skills', icon: Zap, status: '4 ENGINES ONLINE' },
    { id: 'education', label: 'Education', href: '#education', icon: GraduationCap, status: '8.5 CGPA • KSRCT' },
    { id: 'achievements', label: 'Certifications', href: '#achievements', icon: Award, status: 'SILVER MEDAL • NSS' },
    { id: 'chat', label: 'Bujji AI', href: '#chat', icon: Bot, status: 'BUJJI AI AGENT SYNTHESIZING' },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Send, status: 'SECURE SSL PIPELINE' },
  ];

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Scroll detection & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = navLinks.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = navLinks.find((l) => l.id === activeSection) || navLinks[0];
  const ActiveIcon = activeItem.icon;

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    playSelect();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? theme === 'light'
              ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md py-2.5'
              : 'bg-[#060a14]/90 backdrop-blur-xl border-b border-blue-500/25 shadow-xl shadow-blue-950/40 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        {/* Animated Laser Energy Sweep along the header bottom edge */}
        <div className="absolute bottom-0 inset-x-0 h-[1.5px] overflow-hidden pointer-events-none opacity-80">
          <div className="w-64 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-sweep" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo with Animated Holographic Ring */}
          <a
            href="#"
            onClick={playClick}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9 rounded-xl p-[2px] shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
              {/* Continuous Rotating Cyber Aura Ring */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 animate-spin-slow opacity-90" />
              <div
                className={`relative z-10 w-full h-full rounded-[10px] flex items-center justify-center font-display font-black text-base shadow-inner ${
                  theme === 'light' ? 'bg-blue-600 text-white' : 'bg-[#060a14] text-white'
                }`}
              >
                TB
              </div>
            </div>
            <span
              className={`font-display font-bold text-lg sm:text-xl tracking-tight transition-colors duration-200 ${
                theme === 'light'
                  ? 'text-slate-900 group-hover:text-blue-600'
                  : 'text-white group-hover:text-blue-300'
              }`}
            >
              Thakshnesh<span className="text-blue-500 animate-pulse">.</span>B
            </span>
          </a>

          {/* ========================================================= */}
          {/* DYNAMIC ISLAND WITH LIQUID FLOW (Central Navigation Dock) */}
          {/* ========================================================= */}
          <div
            onMouseEnter={() => setIsIslandExpanded(true)}
            onMouseLeave={() => setIsIslandExpanded(false)}
            className={`hidden lg:flex flex-col items-center relative transition-all duration-500 ease-out ${
              isIslandExpanded ? 'scale-[1.02]' : 'scale-100'
            }`}
          >
            {/* Outer Liquid Flow Container */}
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 via-indigo-500 to-blue-600 animate-nav-shimmer shadow-xl shadow-blue-500/20 hover:shadow-cyan-500/40 transition-all duration-300">
              {/* Inner Glass Dock */}
              <div
                className={`relative px-4 rounded-full backdrop-blur-2xl transition-all duration-300 flex flex-col items-center overflow-hidden ${
                  theme === 'light'
                    ? 'bg-white/85 text-slate-800'
                    : 'bg-[#060d22]/90 text-white'
                } ${isIslandExpanded ? 'py-2 gap-1.5 min-w-[560px]' : 'py-1.5 gap-0 min-w-[520px]'}`}
              >
                {/* Embedded Real-time Liquid Physics Canvas */}
                <LiquidFlowCanvas
                  isHovered={isIslandExpanded}
                  soundActive={soundEnabled}
                />

                {/* Top Dynamic Island Telemetry Capsule */}
                <div className="relative z-10 w-full flex items-center justify-between px-3 text-[10px] font-mono opacity-90">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <ActiveIcon className="w-3 h-3 text-cyan-400" />
                    <span className="font-semibold tracking-wider">{activeItem.status}</span>
                  </div>

                  {/* Equalizer Wave Bars */}
                  <div className="flex items-center gap-0.5 text-blue-400">
                    <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-0.5 h-3.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.4s]" />
                    <span className="w-0.5 h-3 bg-cyan-300 rounded-full animate-bounce [animation-delay:-0.2s]" />
                  </div>
                </div>

                {/* Navigation Links Row */}
                <nav className="relative z-10 flex items-center gap-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={() => handleNavClick(link.id)}
                        className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 group/nav ${
                          isActive
                            ? theme === 'light'
                              ? 'text-blue-700 font-bold'
                              : 'text-white font-bold'
                            : theme === 'light'
                            ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
                            : 'text-slate-300 hover:text-white hover:bg-blue-600/20'
                        }`}
                      >
                        {/* Active Liquid Pill Highlight */}
                        {isActive && (
                          <span
                            className={`absolute inset-0 rounded-full -z-10 shadow-lg transition-all duration-300 ${
                              theme === 'light'
                                ? 'bg-white border border-blue-200 shadow-blue-200/60'
                                : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-500/40'
                            }`}
                          />
                        )}
                        <Icon
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isActive
                              ? 'scale-110 text-cyan-300'
                              : 'text-slate-400 group-hover/nav:text-cyan-400 group-hover/nav:scale-105'
                          }`}
                        />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio FX Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playClick();
              }}
              title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
              className={`p-2 rounded-xl border transition-all duration-200 hover:scale-105 ${
                theme === 'light'
                  ? soundEnabled
                    ? 'bg-blue-100 text-blue-700 border-blue-300 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                  : soundEnabled
                  ? 'bg-blue-600/20 text-cyan-300 border-blue-400/50 shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                playClick();
              }}
              title="Toggle Theme"
              className={`p-2 rounded-xl border transition-all duration-200 hover:scale-105 ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 shadow-sm'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/40'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600 transition-transform duration-300 rotate-0 hover:-rotate-45" />
              )}
            </button>

            {/* Mobile Menu Open Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(true);
                playClick();
              }}
              aria-label="Open Navigation Menu"
              className={`lg:hidden p-2 rounded-xl border transition-colors ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  : 'bg-slate-900/80 border-blue-500/30 text-slate-300 hover:text-white'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* FULL-SCREEN SOLID MOBILE NAVIGATION MODAL DRAWER */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          {/* Dimmed Blurred Backdrop with Click-to-Close */}
          <div
            onClick={() => {
              setMobileMenuOpen(false);
              playClick();
            }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity cursor-pointer"
          />

          {/* Solid Navigation Modal Card */}
          <div
            className={`relative z-10 w-full max-w-lg mx-auto rounded-3xl p-5 sm:p-6 shadow-2xl border transition-all ${
              theme === 'light'
                ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
                : 'bg-[#070f26] border-blue-500/40 text-white shadow-blue-950/80'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                theme === 'light' ? 'border-slate-200' : 'border-blue-500/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-display font-black text-white text-sm shadow-md">
                  TB
                </div>
                <div>
                  <h3
                    className={`font-display font-bold text-base ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Thakshnesh.B
                  </h3>
                  <span
                    className={`text-[10px] font-mono ${
                      theme === 'light' ? 'text-blue-600 font-semibold' : 'text-cyan-300'
                    }`}
                  >
                    Navigation Menu
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClick();
                }}
                aria-label="Close Navigation Menu"
                className={`p-2 rounded-xl border transition-colors ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-900 border-blue-500/30 text-slate-300 hover:text-white hover:bg-blue-600/30'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links Grid */}
            <div className="py-4 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-4 py-3 text-sm font-semibold rounded-2xl transition-all flex items-center justify-between group ${
                      isActive
                        ? theme === 'light'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/40'
                        : theme === 'light'
                        ? 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                        : 'text-slate-300 hover:bg-slate-900/90 hover:text-cyan-300 border border-transparent hover:border-blue-500/20'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-500/15 text-cyan-400 group-hover:scale-110 transition-transform'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{link.label}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono opacity-70 hidden sm:inline-block">
                        {link.status}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'translate-x-0 text-white' : 'opacity-40 group-hover:translate-x-1 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Quick Action Footer in Drawer */}
            <div
              className={`pt-4 border-t grid grid-cols-2 gap-2 ${
                theme === 'light' ? 'border-slate-200' : 'border-blue-500/20'
              }`}
            >
              <a
                href="#chat"
                onClick={() => handleNavClick('chat')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  theme === 'light'
                    ? 'bg-amber-100/80 border border-amber-300 text-amber-900 hover:bg-amber-200'
                    : 'bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:bg-amber-500/25'
                }`}
              >
                <Bot className="w-4 h-4 text-amber-500" />
                <span>Ask Bujji</span>
              </a>

              <a
                href="#contact"
                onClick={() => handleNavClick('contact')}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
