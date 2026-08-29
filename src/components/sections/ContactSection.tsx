import React, { useState, useRef, useEffect } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { api } from '../../utils/api';
import confetti from 'canvas-confetti';
import {
  Mail,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Radio,
  Globe,
  Zap,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

// =========================================================================
// Global Signal Transmission Canvas Visualizer
// =========================================================================
const GlobalSignalRadarCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = (canvas.width = 360);
    const height = (canvas.height = 140);

    const render = () => {
      time += 0.03;
      ctx.fillStyle = '#050d22';
      ctx.fillRect(0, 0, width, height);

      // Grid Network
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Transmission nodes
      const senderX = 40;
      const senderY = 70;
      const receiverX = width - 40;
      const receiverY = 70;

      // Draw Connection Beam Wave
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(senderX, senderY);
      ctx.bezierCurveTo(width / 3, 20 + Math.sin(time * 2) * 15, (2 * width) / 3, 120 - Math.sin(time * 2) * 15, receiverX, receiverY);
      ctx.stroke();

      // Animated Packet Pulses
      for (let i = 0; i < 4; i++) {
        const progress = (time * 0.4 + i * 0.25) % 1;
        const px = senderX + (receiverX - senderX) * progress;
        const py = 70 + Math.sin(progress * Math.PI * 2 + time) * 20;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sender Node
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(senderX, senderY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6ee7b7';
      ctx.font = '8px monospace';
      ctx.fillText('CLIENT', senderX - 14, senderY + 18);

      // Receiver Node
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(receiverX, receiverY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#93c5fd';
      ctx.fillText('THAKSHNESH', receiverX - 25, receiverY + 18);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border border-blue-500/30 bg-[#050d22] shadow-inner mb-4">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600/20 border border-blue-400/30 text-[9px] font-mono text-cyan-300">
        SECURE SSL SIGNAL PIPELINE
      </div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>DIRECT ROUTING</span>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');
  const { playClick, playSelect } = useAudio();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    playClick();

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setStatus('success');
        setResponseMsg(res.message || 'Thank you! Your message has been sent successfully.');
        playSelect();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#38bdf8', '#2563eb', '#10b981'],
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(res.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('An unexpected error occurred. Please reach out directly via email.');
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Start a <span className="gradient-text-blue">Conversation</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Open to internships, research projects, hardware collaborations, and engineering opportunities.
          </p>
        </div>

        {/* Grid: Direct Contact Channels & Contact Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Global Signal Pipeline Visualizer */}
            <GlobalSignalRadarCanvas />

            {/* Email Card */}
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={playClick}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-blue-500/20 flex items-center gap-4 block bg-gradient-to-b from-[#091533] via-[#060e22] to-[#040814]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-lg shadow-blue-600/20">
                <Mail className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-mono text-slate-400 block uppercase">Email Address</span>
                <span className="font-semibold text-sm sm:text-base text-white hover:text-blue-300 truncate block">
                  {personalInfo.email}
                </span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-blue-500/20 flex items-center gap-4 block bg-gradient-to-b from-[#091533] via-[#060e22] to-[#040814]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-700/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-lg shadow-blue-600/20">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block uppercase">LinkedIn Professional</span>
                <span className="font-semibold text-sm sm:text-base text-white hover:text-blue-300">
                  Connect with Thakshnesh B
                </span>
              </div>
            </a>

            {/* Location Card */}
            <a
              href="https://maps.app.goo.gl/NwCivf8YVTJngjw88"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-blue-500/20 flex items-center gap-4 block group bg-gradient-to-b from-[#091533] via-[#060e22] to-[#040814]"
            >
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-400/30 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-red-600/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 block uppercase">College & Location</span>
                  <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-0.5">
                    Google Maps ↗
                  </span>
                </div>
                <span className="font-semibold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {personalInfo.location}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">K. S. Rangasamy College of Technology</p>
              </div>
            </a>
          </div>

          {/* Right: Full-Stack Form */}
          <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative bg-gradient-to-b from-[#091533] via-[#060e22] to-[#040814]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship / Hardware Project Collaboration / Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white text-sm outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your project details or collaboration message..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Feedback Alert */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
