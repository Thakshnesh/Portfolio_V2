import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink, FileText, Eye } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const downloadTextResume = () => {
    const textContent = `============================================================
                     THAKSHNESH B
  Electronics Engineering Undergraduate (VLSI D&T)
  Email: ${personalInfo.email}
  LinkedIn: ${personalInfo.linkedin}
  Location: ${personalInfo.location}
============================================================

CAREER OBJECTIVE:
${personalInfo.careerObjective}

EDUCATION:
- Bachelor of Engineering in Electronics Engineering (VLSI Design & Technology)
  K. S. Rangasamy College of Technology, Tiruchengode (2025 - 2029)
  CGPA: 8.5 / 10 | Autonomous, Affiliated to Anna University

HARDWARE & EMBEDDED PROJECTS:
1. Solar Tracking System using Arduino and LDR Sensors
   - Dual-axis servo azimuth and elevation tracking
   - 4-quadrant LDR sensor array with dynamic thresholding
   - Increases solar PV generation efficiency by up to 35%

2. Smoke & Gas Detection System using MQ-2 Sensor and Arduino
   - Electrochemical gas resistance sensing with SnO2 heating coil
   - Multilevel safety thresholds (Clean <200 PPM, Warning 200-500 PPM, Hazard >500 PPM)
   - Visual strobe alert and high-decibel piezo siren cascade

3. VLSI Design & Digital Circuit Architecture
   - CMOS digital logic synthesis, RTL design, and gate-level netlists
   - Propagation delay minimization and timing constraints

TECHNICAL SKILLS:
- Languages: Python (80%), C Programming (75%), Java (70%)
- Core Engineering: VLSI Design & Technology (80%), Embedded Systems & IoT (85%), AI & Analytics (75%)
- Tools & IDEs: Visual Studio Code, Eclipse IDE, Canva, MIT App Inventor

ACHIEVEMENTS & CERTIFICATIONS:
- NPTEL Certification in Soft Skill Development (Elite + Silver Medal Distinction) - NPTEL (IIT Madras)
- Academic & Technical Excellence (8.5 CGPA Distinction) - Department of Electronics, KSRCT
============================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Thakshnesh_B_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume Document Preview"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#070e20] border border-blue-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-500/20 bg-[#050c1e]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-cyan-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white">Thakshnesh B — Official Resume</h3>
              <p className="text-[11px] font-mono text-cyan-300">B.E. Electronics Engineering (VLSI D&T)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700 transition-colors"
              aria-label="Close Resume Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body with High-Res Image Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#030712] flex justify-center items-start">
          <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white">
            <img
              src="/resume.jpg"
              alt="Thakshnesh B Resume Document"
              className="w-full h-auto object-contain block"
              loading="eager"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-blue-500/20 bg-[#050c1e]/95">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>High-Definition Official Copy</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/resume.jpg"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open in New Tab</span>
            </a>

            <a
              href="/resume.jpg"
              download="Thakshnesh_B_Resume.jpg"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Image</span>
            </a>

            <button
              onClick={downloadTextResume}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download TXT</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
