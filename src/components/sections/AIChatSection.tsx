import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, User, Trash2, Copy, Check, Zap, Activity, Cpu, Sun, Flame, Code2, GraduationCap, Award, Send, MapPin } from 'lucide-react';
import { api } from '../../utils/api';
import { useAudio } from '../../context/AudioContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface QueryOption {
  id: string;
  category: 'all' | 'vlsi' | 'hardware' | 'code' | 'education' | 'contact' | 'bujji';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

// Helper to format inline markdown (bold, links, code, italics) properly without raw stars
function formatInlineText(text: string): React.ReactNode[] {
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic text-slate-200">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="font-mono text-cyan-300 bg-slate-950/80 border border-cyan-500/20 px-1.5 py-0.5 rounded text-[11px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            {match[1]}
          </a>
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
}

// =========================================================================
// Bujji Holographic Arc Reactor Canvas Visualizer
// =========================================================================
const BujjiArcReactorCanvas: React.FC<{ isThinking: boolean }> = ({ isThinking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const size = (canvas.width = canvas.height = 42);

    const render = () => {
      angle += isThinking ? 0.08 : 0.025;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // Outer Rotating Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = isThinking ? '#f59e0b' : '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner Counter-Rotating Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 1.5);
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Glowing Core Plasma
      const coreRadius = isThinking ? 6 + Math.sin(angle * 5) * 2 : 5;
      ctx.fillStyle = isThinking ? '#fbbf24' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isThinking]);

  return <canvas ref={canvasRef} className="w-10 h-10 block" />;
};

export const AIChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! I'm Bujji, a personal AI Assistant created and built solely by Thakshnesh B. 🤖\n\nSelect any topic from the interactive command panel below to explore Thakshnesh's VLSI specializations, interactive Hardware Lab simulations, academic milestones, programming architecture, or contact details!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatStreamRef = useRef<HTMLDivElement>(null);
  const { playClick, playSelect } = useAudio();

  const queryOptions: QueryOption[] = [
    {
      id: 'who-is-bujji',
      category: 'bujji',
      label: 'Who is Bujji?',
      icon: Bot,
      prompt: 'Who is Bujji and why was it created?',
    },
    {
      id: 'solar-tracker',
      category: 'hardware',
      label: 'Solar Tracking System',
      icon: Sun,
      prompt: 'Explain the Solar Tracking System using Arduino and LDR sensors',
    },
    {
      id: 'smoke-detector',
      category: 'hardware',
      label: 'MQ-2 Gas & Smoke Detector',
      icon: Flame,
      prompt: 'How does the MQ-2 Gas and Smoke Detection System work?',
    },
    {
      id: 'vlsi-specialization',
      category: 'vlsi',
      label: 'VLSI Design & Technology',
      icon: Cpu,
      prompt: 'Tell me about Thakshnesh\'s VLSI Design & Technology focus',
    },
    {
      id: 'code-skills',
      category: 'code',
      label: 'Programming & Software Skills',
      icon: Code2,
      prompt: 'What are your programming skills in Python, C, and Java?',
    },
    {
      id: 'academic-cgpa',
      category: 'education',
      label: 'Academic CGPA & Education',
      icon: GraduationCap,
      prompt: 'What are your academic marks, CGPA, and college details?',
    },
    {
      id: 'nss-volunteer',
      category: 'education',
      label: 'NSS Community Service',
      icon: Zap,
      prompt: 'Tell me about your NSS volunteering and social initiatives',
    },
    {
      id: 'nptel-cert',
      category: 'education',
      label: 'NPTEL IIT-M Certification',
      icon: Award,
      prompt: 'Tell me about the NPTEL certification in Soft Skill Development from IIT Madras',
    },
    {
      id: 'contact-details',
      category: 'contact',
      label: 'Contact & Communication',
      icon: Send,
      prompt: 'How can I contact Thakshnesh B directly?',
    },
    {
      id: 'campus-maps',
      category: 'contact',
      label: 'College Location on Maps',
      icon: MapPin,
      prompt: 'Where is K. S. Rangasamy College of Technology located on Google Maps?',
    },
  ];

  const categories = [
    { id: 'all', label: '🌟 All Topics' },
    { id: 'vlsi', label: '⚡ VLSI & Semiconductor' },
    { id: 'hardware', label: '☀️ Hardware Lab' },
    { id: 'code', label: '💻 Code & Skills' },
    { id: 'education', label: '🎓 Education & NSS' },
    { id: 'contact', label: '📬 Contact & Location' },
    { id: 'bujji', label: '🤖 About Bujji' },
  ];

  const filteredOptions =
    activeCategory === 'all'
      ? queryOptions
      : queryOptions.filter((opt) => opt.category === activeCategory);

  // Scroll ONLY the internal chat container, never the outer webpage window
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTo({
        top: chatStreamRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleSelectOption = async (optionPrompt: string) => {
    if (isTyping) return;

    playSelect();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: optionPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const aiReplyText = await api.sendChatMessage(optionPrompt);

      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        playClick();
      }, 350);
    } catch {
      setIsTyping(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    playClick();
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: `Chat history cleared. Please select any topic below to learn more about Thakshnesh's projects, hardware, and engineering background!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <section id="chat" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading with Bujji Branding */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-blue-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>BUJJI • PERSONAL AI ASSISTANT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
            <span>Ask</span>
            <span className="gradient-text-blue">Bujji</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Interactive inquiry portal. Select any question option below for immediate intelligent synthesis.
          </p>
        </div>

        {/* Bujji Container */}
        <div className="rounded-3xl overflow-hidden glass-panel border border-blue-500/30 shadow-2xl bg-[#060c1d]/95 flex flex-col h-[580px] sm:h-[640px] relative">
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0a142e] via-[#0b1b3d] to-[#0a142e] border-b border-blue-500/20 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              {/* Bujji Official Avatar & Arc Reactor */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-400 to-blue-500 p-[1.5px] shadow-lg shadow-orange-500/30 flex items-center justify-center bg-[#060c1d] overflow-hidden">
                <img
                  src="/bujji-logo.jpg"
                  alt="Bujji AI Avatar"
                  className="w-full h-full object-cover rounded-[9px]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Bujji</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    AI ASSISTANT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Thakshnesh's Personal Representative</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <BujjiArcReactorCanvas isThinking={isTyping} />
              </div>
              <button
                onClick={handleClear}
                title="Clear Conversation"
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dialogue Area Container with Centered Bujji Logo Watermark */}
          <div className="relative flex-1 overflow-hidden flex flex-col">
            {/* Bujji Watermark in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img
                src="/bujji-logo.jpg"
                alt="Bujji AI Watermark"
                className="w-64 sm:w-80 h-auto object-contain opacity-[0.09] sm:opacity-[0.12] filter drop-shadow-2xl select-none"
              />
            </div>

            {/* Messages Stream */}
            <div ref={chatStreamRef} className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Bujji Avatar */}
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-amber-500/20 overflow-hidden">
                      <img
                        src="/bujji-logo.jpg"
                        alt="Bujji AI"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-900/30'
                        : 'bg-slate-900/90 text-slate-200 border border-blue-500/20 rounded-tl-sm shadow-md shadow-black/40 backdrop-blur-sm'
                    }`}
                  >
                    {/* Markdown parsed text formatting with formatInlineText */}
                    <div className="space-y-2 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                      {msg.text.split('\n').map((line, idx) => {
                        if (line.startsWith('### ')) {
                          return (
                            <h4 key={idx} className="font-display font-bold text-sm sm:text-base text-cyan-300 pt-1">
                              {formatInlineText(line.replace('### ', ''))}
                            </h4>
                          );
                        }
                        if (line.startsWith('- ')) {
                          return (
                            <div key={idx} className="flex items-start gap-2 pl-1">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{formatInlineText(line.replace('- ', ''))}</span>
                            </div>
                          );
                        }
                        return <p key={idx}>{formatInlineText(line)}</p>;
                      })}
                    </div>

                    {/* Footer info: time + copy */}
                    <div
                      className={`mt-2.5 pt-1.5 border-t flex items-center justify-between text-[10px] ${
                        msg.sender === 'user'
                          ? 'border-blue-500/30 text-blue-200'
                          : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'ai' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 mt-1 text-blue-300">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Bujji Typing Animation Indicator */}
              {isTyping && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src="/bujji-logo.jpg"
                      alt="Bujji AI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-amber-500/20 rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-amber-300/80 ml-2 font-mono">Bujji is synthesizing response...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="relative z-10 px-4 py-2 bg-[#070f24] border-t border-blue-500/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-mono text-slate-400 flex-shrink-0">Topics:</span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  playClick();
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-blue-500/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Interactive Option Selection Grid */}
          <div className="relative z-10 p-3 sm:p-4 bg-[#091228] border-t border-blue-500/20 max-h-48 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredOptions.map((opt) => {
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.id}
                    disabled={isTyping}
                    onClick={() => handleSelectOption(opt.prompt)}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-400/60 disabled:opacity-50 text-left text-xs text-slate-200 hover:text-white transition-all flex items-center gap-2.5 group shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-400/30 flex items-center justify-center flex-shrink-0 text-cyan-300 group-hover:scale-110 group-hover:bg-blue-600/30 transition-transform">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
