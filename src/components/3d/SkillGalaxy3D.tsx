import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillsData } from '../../data/portfolioData';
import { Skill } from '../../types';
import { Sparkles, Code, Cpu, Terminal, Eye, X, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const SkillGalaxy3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { playClick, playSelect } = useAudio();

  const selectedSkillRef = useRef<Skill | null>(null);
  useEffect(() => {
    selectedSkillRef.current = selectedSkill;
  }, [selectedSkill]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 4, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Core Lighting
    const ambientLight = new THREE.AmbientLight(0x1e3a8a, 2);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x38bdf8, 3, 20);
    scene.add(coreLight);

    // Central Nucleus: VLSI & Electronics Core Sphere
    const nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);

    const nucleusGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    nucleusGroup.add(nucleus);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.7 });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    nucleusGroup.add(innerCore);

    // Orbit Rings
    const orbitRadii = [3.8, 5.5, 7.2];
    orbitRadii.forEach((radius) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x1d4ed8, transparent: true, opacity: 0.35 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    });

    // Skill Nodes Spheres
    const skillNodes: { mesh: THREE.Mesh; skill: Skill; radius: number; angle: number; speed: number; yOffset: number }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.35, 16, 16);

    skillsData.forEach((skill, idx) => {
      const radius = orbitRadii[idx % orbitRadii.length];
      const angle = (idx / skillsData.length) * Math.PI * 2;
      const speed = 0.15 + (idx % 3) * 0.05;
      const yOffset = (Math.sin(idx * 1.5) * 1.2);

      const colorHex = parseInt(skill.color.replace('#', '0x'), 16) || 0x38bdf8;
      const sphereMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.7,
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.userData = { skill };
      scene.add(mesh);

      // Glowing outer ring for each skill node
      const haloGeo = new THREE.TorusGeometry(0.5, 0.02, 8, 32);
      const haloMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.6 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(halo);

      skillNodes.push({ mesh, skill, radius, angle, speed, yOffset });
    });

    // Raycasting for Hover and Click Interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedSkill = (clientX: number, clientY: number): Skill | null => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillNodes.map((n) => n.mesh));
      if (intersects.length > 0) {
        return intersects[0].object.userData.skill || null;
      }
      return null;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const hitSkill = getIntersectedSkill(e.clientX, e.clientY);
      if (hitSkill) {
        setSelectedSkill(hitSkill);
        playSelect();
      }
    };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const hitSkill = getIntersectedSkill(e.clientX, e.clientY);
      if (hitSkill) {
        canvas.style.cursor = 'pointer';
        setHoveredSkill(hitSkill.name);
      } else {
        canvas.style.cursor = 'grab';
        setHoveredSkill(null);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    // Orbit Camera Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let camRadius = 13;
    let camTheta = 0;
    let camPhi = Math.PI / 2.8;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      camTheta -= deltaX * 0.007;
      camPhi = Math.max(0.2, Math.min(Math.PI / 2.1, camPhi - deltaY * 0.007));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera position
      camera.position.x = camRadius * Math.sin(camPhi) * Math.sin(camTheta);
      camera.position.y = camRadius * Math.cos(camPhi);
      camera.position.z = camRadius * Math.sin(camPhi) * Math.cos(camTheta);
      camera.lookAt(0, 0, 0);

      // Rotate nucleus
      nucleusGroup.rotation.y = elapsedTime * 0.3;
      nucleusGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;

      // Orbit Skill Nodes
      skillNodes.forEach((node) => {
        const curAngle = node.angle + elapsedTime * node.speed * 0.5;
        node.mesh.position.x = Math.cos(curAngle) * node.radius;
        node.mesh.position.z = Math.sin(curAngle) * node.radius;
        node.mesh.position.y = node.yOffset + Math.sin(elapsedTime * 1.5 + node.angle) * 0.3;
        node.mesh.rotation.y = elapsedTime * 0.8;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-blue-500/30 p-4 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span>3D Orbiting Skill Constellation</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-mono">
                INTERACTIVE GALAXY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Click any orbiting tech sphere to inspect proficiency details and live code implementations
            </p>
          </div>
        </div>

        {/* Quick legend hover info */}
        {hoveredSkill && (
          <div className="px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/40 text-xs font-mono text-cyan-300 animate-pulse">
            Target: {hoveredSkill} (Click to inspect)
          </div>
        )}
      </div>

      {/* 3D Viewport */}
      <div
        ref={containerRef}
        className="relative h-[360px] sm:h-[430px] rounded-xl overflow-hidden bg-gradient-to-b from-[#040814] via-[#071026] to-[#040814] border border-blue-500/20 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Center Nucleus Tag */}
        <div className="absolute top-4 left-4 px-2.5 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-blue-400/30 text-[11px] font-mono text-blue-300 flex items-center gap-2 pointer-events-none">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span>CORE: VLSI & EMBEDDED SYSTEM</span>
        </div>

        <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 bg-slate-950/70 px-2.5 py-1 rounded border border-white/5 backdrop-blur-sm pointer-events-none flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-blue-400" />
          <span>Click & Drag to Orbit Camera • Click spheres to view code</span>
        </div>
      </div>

      {/* Selected Skill Detail Floating Modal */}
      {selectedSkill && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-blue-400/40 shadow-2xl relative animate-fadeIn">
          <button
            onClick={() => setSelectedSkill(null)}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-start justify-between gap-3 pr-8 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedSkill.color }}
                />
                <h4 className="font-display font-bold text-base text-white">{selectedSkill.name}</h4>
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 text-xs font-semibold">
                  {selectedSkill.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{selectedSkill.details}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Proficiency:</span>
              <span className="text-sm font-bold font-mono text-cyan-300">{selectedSkill.level}%</span>
            </div>
          </div>

          {/* Code Snippet if present */}
          {selectedSkill.codeSnippet && (
            <div className="mt-3 p-3 rounded-lg bg-[#060a14] border border-blue-900/60 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 mb-1.5 border-b border-slate-800">
                <span className="flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-blue-400" />
                  Code Implementation
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <pre className="text-blue-200/90 leading-relaxed">{selectedSkill.codeSnippet}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
