import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Flame, Wind, Bell, AlertTriangle, ShieldCheck, Activity, RotateCcw, Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const SmokeDetector3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const oscCanvasRef = useRef<HTMLCanvasElement>(null);

  // Gas concentration state
  const [gasPPM, setGasPPM] = useState<number>(75);
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [alarmState, setAlarmState] = useState<'safe' | 'warning' | 'danger'>('safe');
  const [sensorVoltage, setSensorVoltage] = useState<number>(0.85);

  const { playAlarm, playClick } = useAudio();

  // Animation Refs
  const gasPPMRef = useRef<number>(75);
  const isInjectingRef = useRef<boolean>(false);
  const redLedRef = useRef<THREE.Mesh | null>(null);
  const redLightRef = useRef<THREE.PointLight | null>(null);
  const greenLedRef = useRef<THREE.Mesh | null>(null);
  const heaterMeshRef = useRef<THREE.Mesh | null>(null);
  const smokeParticlesRef = useRef<THREE.Points | null>(null);
  const smokePosArrayRef = useRef<Float32Array | null>(null);

  // Sync state with refs
  useEffect(() => {
    gasPPMRef.current = gasPPM;
    isInjectingRef.current = isInjecting;
  }, [gasPPM, isInjecting]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.2);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    // Emergency Red Strobe Light
    const redLight = new THREE.PointLight(0xef4444, 0, 15);
    redLight.position.set(1.2, 1.2, 0.5);
    scene.add(redLight);
    redLightRef.current = redLight;

    // Base Chamber Platform
    const baseGeo = new THREE.BoxGeometry(5.2, 0.25, 4.2);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.3,
    });
    const basePlatform = new THREE.Mesh(baseGeo, baseMat);
    scene.add(basePlatform);

    // ==========================================
    // 3D MODEL: MQ-2 Gas Sensor Breakout Board
    // ==========================================
    const moduleGroup = new THREE.Group();
    scene.add(moduleGroup);

    // Blue PCB Board (FR4)
    const pcbGeo = new THREE.BoxGeometry(2.4, 0.1, 3.2);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0055aa, // Classic Blue PCB
      roughness: 0.3,
      metalness: 0.2,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = 0.18;
    moduleGroup.add(pcb);

    // Golden Header Pins (VCC, GND, DO, AO)
    const pinGeo = new THREE.BoxGeometry(0.8, 0.25, 0.1);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
    const headerPins = new THREE.Mesh(pinGeo, pinMat);
    headerPins.position.set(0, 0.12, 1.5);
    moduleGroup.add(headerPins);

    // Potentiometer (Blue square knob with brass screw)
    const potGeo = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-0.6, 0.4, 0.8);
    moduleGroup.add(pot);

    // LM393 Comparator IC (Black SOIC chip with pins)
    const icGeo = new THREE.BoxGeometry(0.6, 0.15, 0.4);
    const icMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const ic = new THREE.Mesh(icGeo, icMat);
    ic.position.set(0.6, 0.28, 0.8);
    moduleGroup.add(ic);

    // MQ-2 Cylindrical Metal Mesh Sensor Dome
    const domeBaseGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.2, 32);
    const bakeliteMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18 });
    const domeBase = new THREE.Mesh(domeBaseGeo, bakeliteMat);
    domeBase.position.set(0, 0.3, -0.4);
    moduleGroup.add(domeBase);

    // Stainless Steel Double Mesh Cylinder
    const meshGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.9, 32, 8, true);
    const meshMat = new THREE.MeshStandardMaterial({
      color: 0xc0c7d0,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: true,
    });
    const meshCylinder = new THREE.Mesh(meshGeo, meshMat);
    meshCylinder.position.set(0, 0.8, -0.4);
    moduleGroup.add(meshCylinder);

    // Top Mesh Cap
    const capGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.08, 32);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(0, 1.25, -0.4);
    moduleGroup.add(cap);

    // Internal Glowing Tin Dioxide ($SnO_2$) Ceramic Heater Coil
    const heaterGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 16);
    const heaterMat = new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff4500,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const heater = new THREE.Mesh(heaterGeo, heaterMat);
    heater.position.set(0, 0.8, -0.4);
    moduleGroup.add(heater);
    heaterMeshRef.current = heater;

    // Status Green LED
    const ledGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16);
    const greenMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const greenLed = new THREE.Mesh(ledGeo, greenMat);
    greenLed.position.set(-0.7, 0.35, 1.2);
    moduleGroup.add(greenLed);
    greenLedRef.current = greenLed;

    // Emergency Red LED
    const redMat = new THREE.MeshBasicMaterial({ color: 0x550000 });
    const redLed = new THREE.Mesh(ledGeo, redMat);
    redLed.position.set(0.7, 0.35, 1.2);
    moduleGroup.add(redLed);
    redLedRef.current = redLed;

    // Piezo Buzzer
    const buzzerGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.45, 24);
    const buzzerMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
    const buzzer = new THREE.Mesh(buzzerGeo, buzzerMat);
    buzzer.position.set(1.8, 0.35, -0.5);
    scene.add(buzzer);

    // ==========================================
    // 3D Smoke & Gas Particles Emitter
    // ==========================================
    const smokeCount = 180;
    const smokeGeo = new THREE.BufferGeometry();
    const smokePos = new Float32Array(smokeCount * 3);

    for (let i = 0; i < smokeCount; i++) {
      smokePos[i * 3] = (Math.random() - 0.5) * 1.5;
      smokePos[i * 3 + 1] = 0.5 + Math.random() * 2.5;
      smokePos[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 1.5;
    }

    smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3));
    smokePosArrayRef.current = smokePos;

    const smokeMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const smokeParticles = new THREE.Points(smokeGeo, smokeMat);
    scene.add(smokeParticles);
    smokeParticlesRef.current = smokeParticles;

    // Orbit Dragging
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let camRadius = 7.5;
    let camAngleTheta = 0;
    let camAnglePhi = Math.PI / 3.5;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      camAngleTheta -= deltaX * 0.008;
      camAnglePhi = Math.max(0.1, Math.min(Math.PI / 2.1, camAnglePhi - deltaY * 0.008));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let sampleTimer = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera position
      camera.position.x = camRadius * Math.sin(camAnglePhi) * Math.sin(camAngleTheta);
      camera.position.y = camRadius * Math.cos(camAnglePhi);
      camera.position.z = camRadius * Math.sin(camAnglePhi) * Math.cos(camAngleTheta);
      camera.lookAt(0, 0.6, 0);

      // Gas Dynamics
      let currentPPM = gasPPMRef.current;
      if (isInjectingRef.current) {
        currentPPM = Math.min(950, currentPPM + delta * 240);
      } else {
        // Natural air decay back to baseline 75 PPM
        currentPPM = Math.max(75, currentPPM - delta * 90);
      }
      gasPPMRef.current = currentPPM;

      // Update Smoke Particles
      const smokeDensity = Math.max(0, (currentPPM - 100) / 850);
      if (smokeParticlesRef.current && smokePosArrayRef.current) {
        (smokeParticlesRef.current.material as THREE.PointsMaterial).opacity = smokeDensity * 0.65;
        const positions = smokePosArrayRef.current;

        for (let i = 0; i < smokeCount; i++) {
          positions[i * 3 + 1] += delta * (0.8 + Math.random() * 0.5); // Rise upwards
          positions[i * 3] += (Math.random() - 0.5) * delta * 0.4;
          positions[i * 3 + 2] += (Math.random() - 0.5) * delta * 0.4;

          // Reset if exceeded top chamber
          if (positions[i * 3 + 1] > 3.5) {
            positions[i * 3] = (Math.random() - 0.5) * 0.8;
            positions[i * 3 + 1] = 0.5 + Math.random() * 0.2;
            positions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 0.8;
          }
        }
        smokeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Alarm Strobe Trigger (> 500 PPM Hazard)
      if (currentPPM > 500) {
        const strobe = Math.sin(elapsedTime * 18) > 0 ? 1 : 0;
        if (redLedRef.current) {
          (redLedRef.current.material as THREE.MeshBasicMaterial).color.setHex(
            strobe ? 0xff0000 : 0x330000
          );
        }
        if (redLightRef.current) {
          redLightRef.current.intensity = strobe * 4;
        }
      } else if (currentPPM > 200) {
        // Warning (dim steady red)
        if (redLedRef.current) {
          (redLedRef.current.material as THREE.MeshBasicMaterial).color.setHex(0xffaa00);
        }
        if (redLightRef.current) {
          redLightRef.current.intensity = 0.5;
        }
      } else {
        // Safe (Red OFF, Green ON)
        if (redLedRef.current) {
          (redLedRef.current.material as THREE.MeshBasicMaterial).color.setHex(0x330000);
        }
        if (redLightRef.current) {
          redLightRef.current.intensity = 0;
        }
      }

      // Heater Coil Glow Intensity
      if (heaterMeshRef.current) {
        (heaterMeshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.8 + Math.sin(elapsedTime * 4) * 0.2 + (currentPPM / 1000) * 0.5;
      }

      // Telemetry Sync
      sampleTimer += delta;
      if (sampleTimer > 0.1) {
        sampleTimer = 0;
        const roundedPPM = Math.round(currentPPM);
        setGasPPM(roundedPPM);

        const volt = (0.8 + (currentPPM / 1000) * 4.2).toFixed(2);
        setSensorVoltage(parseFloat(volt));

        if (roundedPPM > 500) {
          setAlarmState('danger');
        } else if (roundedPPM > 200) {
          setAlarmState('warning');
        } else {
          setAlarmState('safe');
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      baseGeo.dispose();
      pcbGeo.dispose();
    };
  }, []);

  // Oscilloscope Waveform Animation
  useEffect(() => {
    const oscCanvas = oscCanvasRef.current;
    if (!oscCanvas) return;
    const ctx = oscCanvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let waveOffset = 0;

    const renderWave = () => {
      animId = requestAnimationFrame(renderWave);
      waveOffset += 0.08;

      ctx.fillStyle = '#060d1f';
      ctx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.4)';
      ctx.lineWidth = 1;

      for (let x = 0; x < oscCanvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, oscCanvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < oscCanvas.height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(oscCanvas.width, y);
        ctx.stroke();
      }

      // Live Oscilloscope Wave
      const isHazard = gasPPMRef.current > 500;
      const isWarn = gasPPMRef.current > 200;
      ctx.strokeStyle = isHazard ? '#ef4444' : isWarn ? '#f59e0b' : '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = oscCanvas.height / 2;
      const amplitude = Math.min(30, 6 + (gasPPMRef.current / 1000) * 28);
      const freq = 0.05 + (gasPPMRef.current / 1000) * 0.08;

      for (let x = 0; x < oscCanvas.width; x++) {
        const noise = (Math.random() - 0.5) * (gasPPMRef.current > 400 ? 5 : 1);
        const y = centerY + Math.sin(x * freq + waveOffset) * amplitude + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleInjectPress = () => {
    setIsInjecting(true);
    playClick();
  };

  const handleInjectRelease = () => {
    setIsInjecting(false);
  };

  const handleResetAir = () => {
    setGasPPM(75);
    gasPPMRef.current = 75;
    playClick();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-blue-500/30 p-4 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400">
            <Flame className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span>MQ-2 Smoke & Gas Chamber 3D Simulator</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-mono">
                ELECTROCHEMICAL SENSOR
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Hold "Inject Smoke / Gas" to simulate toxic leak • Watch 3D particles, heating coil, and alarm trip
            </p>
          </div>
        </div>

        {/* State Banner */}
        <div
          className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 border transition-all ${
            alarmState === 'danger'
              ? 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse'
              : alarmState === 'warning'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          }`}
        >
          {alarmState === 'danger' ? (
            <>
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>EMERGENCY HAZARD (&gt;500 PPM)</span>
            </>
          ) : alarmState === 'warning' ? (
            <>
              <Wind className="w-4 h-4 text-amber-400" />
              <span>ELEVATED GAS DETECTED</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AIR QUALITY NORMAL</span>
            </>
          )}
        </div>
      </div>

      {/* Grid: 3D Viewport & Sensor Telemetry */}
      <div className="grid lg:grid-cols-12 gap-4">
        {/* 3D Viewport */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative h-[340px] sm:h-[390px] rounded-xl overflow-hidden bg-gradient-to-b from-[#040814] to-[#0a1226] border border-blue-500/20 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive Smoke Trigger Overlay */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-auto">
            <button
              onMouseDown={handleInjectPress}
              onMouseUp={handleInjectRelease}
              onTouchStart={handleInjectPress}
              onTouchEnd={handleInjectRelease}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-500/30 active:scale-95 transition-all flex items-center gap-2 border border-red-400/40"
            >
              <Flame className="w-4 h-4" />
              <span>{isInjecting ? 'Emitting Smoke...' : 'Hold to Inject Smoke'}</span>
            </button>

            <button
              onClick={handleResetAir}
              className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Flush Air</span>
            </button>
          </div>
        </div>

        {/* Telemetry & Oscilloscope Sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          {/* Real-time PPM Gas Level Meter */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                Gas Concentration
              </span>
              <span
                className={`text-lg font-mono font-bold ${
                  gasPPM > 500 ? 'text-red-400' : gasPPM > 200 ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {gasPPM} PPM
              </span>
            </div>

            {/* Threshold Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-150 ${
                  gasPPM > 500
                    ? 'bg-gradient-to-r from-amber-500 to-red-500'
                    : gasPPM > 200
                    ? 'bg-gradient-to-r from-blue-500 to-amber-400'
                    : 'bg-gradient-to-r from-blue-500 to-emerald-400'
                }`}
                style={{ width: `${Math.min(100, (gasPPM / 900) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-mono">
              <span>0 PPM (Clean)</span>
              <span>200 (Warn)</span>
              <span>500+ (Hazard)</span>
            </div>
          </div>

          {/* Real-time Oscilloscope Waveform */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                Analog Out Oscilloscope (A0)
              </span>
              <span className="text-[11px] font-mono text-blue-400">{sensorVoltage} V</span>
            </div>
            <div className="w-full h-[85px] rounded-lg overflow-hidden border border-blue-900/50">
              <canvas ref={oscCanvasRef} width={280} height={85} className="w-full h-full block" />
            </div>
          </div>

          {/* Hardware Pin & Interrupt Status */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20 text-xs">
            <span className="text-slate-300 font-semibold block mb-2">Hardware Trip Status</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-1.5 rounded bg-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Green LED (Pin 7):</span>
                <span className={gasPPM <= 200 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {gasPPM <= 200 ? 'ACTIVE' : 'LOW'}
                </span>
              </div>
              <div className="p-1.5 rounded bg-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Red LED (Pin 8):</span>
                <span className={gasPPM > 200 ? 'text-red-400 font-bold' : 'text-slate-500'}>
                  {gasPPM > 200 ? 'ACTIVE' : 'LOW'}
                </span>
              </div>
              <div className="p-1.5 rounded bg-slate-800/80 flex items-center justify-between col-span-2">
                <span className="text-slate-400 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-amber-400" />
                  Buzzer Siren (Pin 11):
                </span>
                <span className={gasPPM > 500 ? 'text-red-400 font-bold animate-pulse' : 'text-slate-500'}>
                  {gasPPM > 500 ? 'HIGH FREQ TRIP' : 'MUTED'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
