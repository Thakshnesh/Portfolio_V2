import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Bot,
  GraduationCap,
  Award,
  Send,
  MapPin,
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
      grad1.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
      grad1.addColorStop(0.5, 'rgba(56, 189, 248, 0.28)');
      grad1.addColorStop(1, 'rgba(79, 70, 229, 0.22)');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.moveTo(0, h);

      const wave1Amp = isHovered ? 12 : soundActive ? 10 : 6;
      const wave1Freq = 0.015;

      for (let x = 0; x <= w; x += 4) {
        const mx = mouseRef.current.x * w;
        const distToMouse = Math.abs(x - mx);
        const mouseRipple = Math.exp(-distToMouse / 60) * Math.sin(time * 4) * 8;

        const y =
          h * 0.45 +
          Math.sin(x * wave1Freq + time * 1.5) * wave1Amp +
          Math.cos(x * 0.02 - time) * (wave1Amp * 0.5) +
          mouseRipple;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Layer 2: Fast luminous crest wave
      const grad2 = ctx.createLinearGradient(0, 0, w, 0);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      grad2.addColorStop(0.5, 'rgba(147, 197, 253, 0.45)');
      grad2.addColorStop(1, 'rgba(59, 130, 246, 0.35)');

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.moveTo(0, h);

      const wave2Amp = isHovered ? 8 : 4;
      for (let x = 0; x <= w; x += 4) {
        const y =
          h * 0.6 +
          Math.sin(x * 0.02 - time * 2) * wave2Amp +
          Math.cos(x * 0.012 + time * 1.2) * (wave2Amp * 0.6);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Layer 3: Organic floating liquid droplets / bioluminescent nodes
      const dropletCount = 5;
      for (let i = 0; i < dropletCount; i++) {
        const dx = ((time * 25 + i * (w / dropletCount)) % (w + 40)) - 20;
        const dy = h * 0.4 + Math.sin(time * 2 + i * 1.5) * (h * 0.25);
        const radius = 2 + Math.sin(time * 3 + i) * 1.2;

        ctx.fillStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(147, 197, 253, 0.8)';
        ctx.beginPath();
        ctx.arc(dx, dy, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fill();
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
      className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
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
              className={`relative rounded-full overflow-hidden transition-all duration-300 backdrop-blur-2xl ${
                theme === 'light'
                  ? 'bg-slate-100/90 border border-white/60 shadow-inner'
                  : 'bg-[#060c1d]/90 border border-blue-500/30'
              }`}
            >
              {/* Real-time Liquid Wave Flow Canvas Engine */}
              <LiquidFlowCanvas isHovered={isIslandExpanded} soundActive={soundEnabled} />

              {/* Dynamic Island Status Pill (Pops up when active or hovered) */}
              <div
                className={`overflow-hidden transition-all duration-300 flex items-center justify-between px-4 border-b ${
                  isIslandExpanded
                    ? 'max-h-8 py-1.5 opacity-100 border-blue-400/20'
                    : 'max-h-0 py-0 opacity-0 border-transparent pointer-events-none'
                } ${
                  theme === 'light' ? 'bg-blue-50/70 text-blue-900' : 'bg-blue-950/60 text-cyan-300'
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <ActiveIcon className="w-3 h-3 text-cyan-400" />
                  <span>{activeItem.label.toUpperCase()}</span>
                  <span className="opacity-40">•</span>
                  <span className="text-blue-400">{activeItem.status}</span>
                </div>

                {/* Real-time sound wave visualizer inside the Dynamic Island */}
                {soundEnabled && (
                  <div className="flex items-center gap-0.5">
                    <span className="w-0.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-0.5 h-3.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-0.5 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                )}
              </div>

              {/* Navigation Links Dock floating over Liquid Flow */}
              <nav className="relative z-10 flex items-center gap-1 p-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => handleNavClick(link.id)}
                      className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 z-10 flex items-center gap-1.5 group/nav ${
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

        {/* Right Action Icons (Animated Micro-interactions) */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-4 space-y-2 animate-fadeIn ${
            theme === 'light'
              ? 'bg-white border-slate-200 shadow-xl text-slate-800'
              : 'bg-[#060a14]/98 border-blue-500/30 text-white'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                  isActive
                    ? theme === 'light'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                      : 'bg-blue-600/30 text-cyan-300 font-bold border border-blue-400/40'
                    : theme === 'light'
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-blue-600/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {link.label}
                </span>
                <span className="text-[10px] font-mono opacity-60">{link.status}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
