import React, { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import { Project } from '../../types';
import { SolarTracker3D } from '../3d/SolarTracker3D';
import { SmokeDetector3D } from '../3d/SmokeDetector3D';
import {
  Sun,
  Flame,
  Cpu,
  CircuitBoard,
  CheckCircle,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('solar-tracker');
  const { playClick } = useAudio();

  const currentProject = projectsData.find((p) => p.id === activeTab) || projectsData[0];

  return (
    <section id="projects" className="relative py-20 sm:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-semibold">
            <CircuitBoard className="w-3.5 h-3.5" />
            <span>INTERACTIVE HARDWARE LAB</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Featured <span className="gradient-text-blue">Embedded & VLSI Hardware</span> Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real-time interactive simulations replicating physical Arduino sensor circuits, actuators, and telemetry.
          </p>
        </div>

        {/* Project Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {projectsData.map((project) => {
            const isActive = project.id === activeTab;
            const Icon =
              project.id === 'solar-tracker'
                ? Sun
                : project.id === 'smoke-detector'
                ? Flame
                : Cpu;

            return (
              <button
                key={project.id}
                onClick={() => {
                  setActiveTab(project.id);
                  playClick();
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    project.id === 'solar-tracker'
                      ? 'text-amber-400'
                      : project.id === 'smoke-detector'
                      ? 'text-red-400'
                      : 'text-blue-400'
                  }`}
                />
                <span>{project.title.split(' using')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Showcase Area */}
        <div className="space-y-8">
          {/* 1. Interactive Simulation Stage */}
          {currentProject.simulationType === 'solar' && <SolarTracker3D />}
          {currentProject.simulationType === 'smoke' && <SmokeDetector3D />}

          {/* 2. Detailed Technical Breakdown & Pinout Card */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Overview, Features, Tech Stack */}
            <div className="lg:col-span-7 rounded-2xl glass-panel p-6 sm:p-8 border border-blue-500/20 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                  {currentProject.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {currentProject.title}
                </h3>
                <p className="text-xs text-blue-300 font-mono mt-1">
                  Category: {currentProject.category}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentProject.description}
              </p>

              {/* Key Capabilities */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold font-mono uppercase text-slate-400">
                  Key Engineering Features:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {currentProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
                {currentProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-blue-500/20 text-xs font-medium text-blue-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hardware Pinout & Circuit Schematic Details */}
            <div className="lg:col-span-5 rounded-2xl glass-panel p-6 sm:p-8 border border-blue-500/20 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CircuitBoard className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-display font-bold text-lg text-white">Hardware Pinout Map</h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-blue-500/20 text-slate-400 font-mono">
                        <th className="pb-2">Pin / Port</th>
                        <th className="pb-2">Interface Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {currentProject.pinout.map((p, idx) => (
                        <tr key={idx} className="hover:bg-blue-500/5">
                          <td className="py-2.5 font-bold text-blue-400">{p.pin}</td>
                          <td className="py-2.5 text-slate-300">{p.function}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-900/40 text-xs space-y-1">
                <span className="text-slate-400 font-mono font-semibold block">Schematic Circuit Summary:</span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                  {currentProject.schematicDetails}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
