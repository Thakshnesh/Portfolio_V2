import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, RotateCw, Play, Pause, Zap, Activity, Cpu, Sliders, Eye } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const SolarTracker3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation Controls State
  const [sunAzimuth, setSunAzimuth] = useState<number>(45); // degrees
  const [sunElevation, setSunElevation] = useState<number>(55); // degrees
  const [autoOrbit, setAutoOrbit] = useState<boolean>(true);
  const [trackingMode, setTrackingMode] = useState<'arduino' | 'manual'>('arduino');
  const [isCloudy, setIsCloudy] = useState<boolean>(false);

  // Live Telemetry Readouts
  const [panelAzimuth, setPanelAzimuth] = useState<number>(45);
  const [panelElevation, setPanelElevation] = useState<number>(55);
  const [efficiency, setEfficiency] = useState<number>(98.5);
  const [outputPower, setOutputPower] = useState<number>(14.8); // Watts
  const [ldrValues, setLdrValues] = useState<{ top: number; bottom: number; left: number; right: number }>({
    top: 850,
    bottom: 840,
    left: 860,
    right: 855,
  });

  const { playServoPulse, playClick } = useAudio();

  // Three.js object references for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const panelPivotRef = useRef<THREE.Group | null>(null);
  const basePivotRef = useRef<THREE.Group | null>(null);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const sunAzimuthRef = useRef<number>(45);
  const sunElevationRef = useRef<number>(55);
  const autoOrbitRef = useRef<boolean>(true);
  const trackingModeRef = useRef<'arduino' | 'manual'>('arduino');
  const isCloudyRef = useRef<boolean>(false);

  // Sync refs with state
  useEffect(() => {
    sunAzimuthRef.current = sunAzimuth;
    sunElevationRef.current = sunElevation;
    autoOrbitRef.current = autoOrbit;
    trackingModeRef.current = trackingMode;
    isCloudyRef.current = isCloudy;
  }, [sunAzimuth, sunElevation, autoOrbit, trackingMode, isCloudy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 5, 8);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ambient & Ground Lights
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.6);
    scene.add(hemiLight);

    // Dynamic Sun Point & Directional Light
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 3.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Sun Visual Mesh
    const sunGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);
    sunMeshRef.current = sunMesh;

    // Sun Corona Glow
    const glowGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const sunGlow = new THREE.Mesh(glowGeo, glowMat);
    sunMesh.add(sunGlow);

    // Ground Platform
    const groundGeo = new THREE.CylinderGeometry(4.5, 4.8, 0.3, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x091124,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.15;
    ground.receiveShadow = true;
    scene.add(ground);

    // Circular Circuit Tracks on Ground
    const gridHelper = new THREE.PolarGridHelper(4.2, 16, 8, 32, 0x1d4ed8, 0x1e3a8a);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // ==========================================
    // 3D MODEL: Dual-Axis Solar Tracker Mechanism
    // ==========================================
    const trackerRoot = new THREE.Group();
    scene.add(trackerRoot);

    // 1. Pedestal Base Stand
    const basePillarGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.6, 24);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.25,
    });
    const basePillar = new THREE.Mesh(basePillarGeo, metalMat);
    basePillar.position.y = 0.8;
    basePillar.castShadow = true;
    trackerRoot.add(basePillar);

    // Arduino Microcontroller Case on Base
    const arduinoGeo = new THREE.BoxGeometry(0.8, 0.2, 0.6);
    const arduinoMat = new THREE.MeshStandardMaterial({
      color: 0x00878f, // Classic Arduino Teal
      roughness: 0.4,
      metalness: 0.3,
    });
    const arduinoBox = new THREE.Mesh(arduinoGeo, arduinoMat);
    arduinoBox.position.set(0, 0.2, 0.5);
    trackerRoot.add(arduinoBox);

    // Status LED on Arduino
    const ledGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const statusLed = new THREE.Mesh(ledGeo, ledMat);
    statusLed.position.set(0.3, 0.32, 0.65);
    trackerRoot.add(statusLed);

    // 2. Azimuth Rotating Turntable (Horizontal Servo Hub)
    const basePivot = new THREE.Group();
    basePivot.position.y = 1.6;
    trackerRoot.add(basePivot);
    basePivotRef.current = basePivot;

    const hubGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.25, 24);
    const hub = new THREE.Mesh(hubGeo, metalMat);
    basePivot.add(hub);

    // Dual Support Arms (Yoke)
    const armGeo = new THREE.BoxGeometry(0.12, 0.8, 0.25);
    const leftArm = new THREE.Mesh(armGeo, metalMat);
    leftArm.position.set(-0.4, 0.4, 0);
    leftArm.castShadow = true;
    basePivot.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, metalMat);
    rightArm.position.set(0.4, 0.4, 0);
    rightArm.castShadow = true;
    basePivot.add(rightArm);

    // 3. Elevation Pitching Pivot (Vertical Servo Axis)
    const panelPivot = new THREE.Group();
    panelPivot.position.set(0, 0.7, 0);
    basePivot.add(panelPivot);
    panelPivotRef.current = panelPivot;

    // Cross axle rod
    const axleGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.95, 16);
    axleGeo.rotateZ(Math.PI / 2);
    const axle = new THREE.Mesh(axleGeo, metalMat);
    panelPivot.add(axle);

    // 4. Photovoltaic Solar Panel Module
    const panelFrameGeo = new THREE.BoxGeometry(2.8, 0.1, 2.0);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.3,
    });
    const panelFrame = new THREE.Mesh(panelFrameGeo, frameMat);
    panelFrame.castShadow = true;
    panelPivot.add(panelFrame);

    // Monocrystalline PV Cells (Deep Navy Glass Texture)
    const pvCellsGeo = new THREE.BoxGeometry(2.65, 0.04, 1.85);
    const pvMat = new THREE.MeshStandardMaterial({
      color: 0x0a214d,
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.2,
    });
    const pvCells = new THREE.Mesh(pvCellsGeo, pvMat);
    pvCells.position.y = 0.06;
    panelPivot.add(pvCells);

    // Silver Busbar Grid on PV Cells
    const busbarGeo = new THREE.PlaneGeometry(2.6, 1.8);
    const busbarMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const busbars = new THREE.Mesh(busbarGeo, busbarMat);
    busbars.rotation.x = -Math.PI / 2;
    busbars.position.y = 0.09;
    panelPivot.add(busbars);

    // 4x LDR Light Dependent Resistor Probes (Corners)
    const ldrGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.12, 8);
    const ldrMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });

    const ldrPositions = [
      { x: -1.2, z: -0.8 }, // Top Left
      { x: 1.2, z: -0.8 },  // Top Right
      { x: -1.2, z: 0.8 },  // Bottom Left
      { x: 1.2, z: 0.8 },   // Bottom Right
    ];

    ldrPositions.forEach((pos) => {
      const ldr = new THREE.Mesh(ldrGeo, ldrMat);
      ldr.position.set(pos.x, 0.1, pos.z);
      panelPivot.add(ldr);
    });

    // Central Normal Vector Ray Indicator (Yellow pointer)
    const rayGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.2, 8);
    rayGeo.translate(0, 0.6, 0);
    const rayMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const normalRay = new THREE.Mesh(rayGeo, rayMat);
    panelPivot.add(normalRay);

    // Camera Orbit Mouse Drag
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let camRadius = 11;
    let camAngleTheta = Math.PI / 4;
    let camAnglePhi = Math.PI / 5;

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

      camAngleTheta -= deltaX * 0.008;
      camAnglePhi = Math.max(0.1, Math.min(Math.PI / 2.2, camAnglePhi - deltaY * 0.008));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Current panel angle tracking interpolation
    let curBaseAngle = (45 * Math.PI) / 180;
    let curPitchAngle = (35 * Math.PI) / 180;

    let animId: number;
    let clock = new THREE.Clock();
    let telemetryTimer = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera position from spherical coords
      camera.position.x = camRadius * Math.sin(camAnglePhi) * Math.sin(camAngleTheta);
      camera.position.y = camRadius * Math.cos(camAnglePhi);
      camera.position.z = camRadius * Math.sin(camAnglePhi) * Math.cos(camAngleTheta);
      camera.lookAt(0, 1.2, 0);

      // Auto Orbit Sun if enabled
      let curSunAz = sunAzimuthRef.current;
      let curSunEl = sunElevationRef.current;

      if (autoOrbitRef.current) {
        curSunAz = (elapsedTime * 18) % 360;
        curSunEl = 30 + Math.sin(elapsedTime * 0.3) * 35; // oscillates 30° to 65°
        setSunAzimuth(Math.round(curSunAz));
        setSunElevation(Math.round(curSunEl));
      }

      // Convert Sun spherical angles to 3D Coordinates
      const sunDist = 7.5;
      const radAz = (curSunAz * Math.PI) / 180;
      const radEl = (curSunEl * Math.PI) / 180;

      const sunX = sunDist * Math.cos(radEl) * Math.sin(radAz);
      const sunY = Math.max(0.5, sunDist * Math.sin(radEl));
      const sunZ = sunDist * Math.cos(radEl) * Math.cos(radAz);

      if (sunMeshRef.current && sunLightRef.current) {
        sunMeshRef.current.position.set(sunX, sunY, sunZ);
        sunLightRef.current.position.set(sunX, sunY, sunZ);
        sunLightRef.current.target.position.set(0, 1.2, 0);
        sunLightRef.current.target.updateMatrixWorld();

        // Dim sun if cloudy
        const cloudFactor = isCloudyRef.current ? 0.35 : 1.0;
        sunLightRef.current.intensity = 3.5 * cloudFactor;
      }

      // Calculate Target Panel Angles
      // Azimuth angle: facing sunX, sunZ
      const targetBaseAngle = Math.atan2(sunX, sunZ);
      // Elevation pitch angle: 90° - sun elevation angle
      const targetPitchAngle = Math.PI / 2 - radEl;

      // Tracking Algorithm: Smooth Servo Rotation (Arduino emulation)
      if (trackingModeRef.current === 'arduino') {
        const servoSpeed = 2.5 * delta;
        curBaseAngle += (targetBaseAngle - curBaseAngle) * servoSpeed;
        curPitchAngle += (targetPitchAngle - curPitchAngle) * servoSpeed;
      }

      if (basePivotRef.current) {
        basePivotRef.current.rotation.y = curBaseAngle;
      }
      if (panelPivotRef.current) {
        panelPivotRef.current.rotation.x = curPitchAngle;
      }

      // Telemetry computation (Update every 0.15s)
      telemetryTimer += delta;
      if (telemetryTimer > 0.15) {
        telemetryTimer = 0;

        // Angle difference between panel normal and Sun vector
        const angleDiffDeg = Math.abs(curPitchAngle - targetPitchAngle) * (180 / Math.PI) +
                             Math.abs(curBaseAngle - targetBaseAngle) * (180 / Math.PI) * 0.5;

        const eff = Math.max(15, 100 - angleDiffDeg * 1.8) * (isCloudyRef.current ? 0.4 : 1.0);
        const pwr = (15 * (eff / 100)).toFixed(1);

        setPanelAzimuth(Math.round(((curBaseAngle * 180) / Math.PI + 360) % 360));
        setPanelElevation(Math.round(90 - (curPitchAngle * 180) / Math.PI));
        setEfficiency(parseFloat(eff.toFixed(1)));
        setOutputPower(parseFloat(pwr));

        // Simulated LDR values (0 - 1023 ADC range)
        const baseLux = isCloudyRef.current ? 350 : 850;
        const diffX = (targetBaseAngle - curBaseAngle) * 300;
        const diffY = (targetPitchAngle - curPitchAngle) * 300;

        setLdrValues({
          top: Math.round(Math.min(1023, Math.max(50, baseLux - diffY))),
          bottom: Math.round(Math.min(1023, Math.max(50, baseLux + diffY))),
          left: Math.round(Math.min(1023, Math.max(50, baseLux - diffX))),
          right: Math.round(Math.min(1023, Math.max(50, baseLux + diffX))),
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      metalMat.dispose();
    };
  }, []);

  const handleManualAzimuth = (val: number) => {
    setAutoOrbit(false);
    setSunAzimuth(val);
    playServoPulse();
  };

  const handleManualElevation = (val: number) => {
    setAutoOrbit(false);
    setSunElevation(val);
    playServoPulse();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-blue-500/30 p-4 sm:p-6 shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400">
            <Sun className="w-5 h-5 animate-spin-slow text-amber-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span>Dual-Axis Solar Tracker 3D Simulator</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-mono">
                ARDUINO INTERACTIVE
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Drag on 3D view to rotate camera • Move sun or toggle Auto-Orbit to test real-time servo tracking
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAutoOrbit(!autoOrbit);
              playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              autoOrbit
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {autoOrbit ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{autoOrbit ? 'Pause Orbit' : 'Auto Orbit'}</span>
          </button>

          <button
            onClick={() => {
              setIsCloudy(!isCloudy);
              playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isCloudy
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isCloudy ? '☁️ Cloudy (Dim)' : '☀️ Clear Sky'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Area & Floating Telemetry HUD */}
      <div className="grid lg:grid-cols-12 gap-4">
        {/* Main 3D Canvas Viewport */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative h-[340px] sm:h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-[#040814] to-[#0a1226] border border-blue-500/20 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive Quick Overlay Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-blue-400/30 text-[11px] font-mono text-blue-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SERVO LOOP: 50Hz ACTIVE</span>
          </div>

          <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 bg-slate-950/70 px-2 py-1 rounded border border-white/5 backdrop-blur-sm pointer-events-none flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>Click & Drag to Rotate 3D View</span>
          </div>
        </div>

        {/* Real-time Hardware Telemetry Sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          {/* Real-Time Efficiency Gauge */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                PV Efficiency
              </span>
              <span className="text-sm font-mono font-bold text-emerald-400">{efficiency}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${efficiency}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-mono">
              <span>Power: {outputPower}W</span>
              <span>Voltage: 5.12V</span>
            </div>
          </div>

          {/* Servo Angles Telemetry */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20">
              <span className="text-[11px] text-slate-400 block mb-0.5">Horizontal Servo</span>
              <div className="text-base font-bold font-mono text-blue-300">
                {panelAzimuth}°
              </div>
              <span className="text-[10px] text-slate-500">Pin 9 (PWM)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20">
              <span className="text-[11px] text-slate-400 block mb-0.5">Vertical Servo</span>
              <div className="text-base font-bold font-mono text-cyan-300">
                {panelElevation}°
              </div>
              <span className="text-[10px] text-slate-500">Pin 10 (PWM)</span>
            </div>
          </div>

          {/* 4-Quadrant LDR Sensors ADC Readout */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20">
            <span className="text-xs text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              LDR Sensor Array (ADC A0 - A3)
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              <div className="p-1.5 rounded bg-slate-800/80 flex justify-between">
                <span className="text-slate-400">Top:</span>
                <span className="text-amber-300">{ldrValues.top}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-800/80 flex justify-between">
                <span className="text-slate-400">Bottom:</span>
                <span className="text-amber-300">{ldrValues.bottom}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-800/80 flex justify-between">
                <span className="text-slate-400">Left:</span>
                <span className="text-amber-300">{ldrValues.left}</span>
              </div>
              <div className="p-1.5 rounded bg-slate-800/80 flex justify-between">
                <span className="text-slate-400">Right:</span>
                <span className="text-amber-300">{ldrValues.right}</span>
              </div>
            </div>
          </div>

          {/* Manual Sun Sliders */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Sliders className="w-3 h-3 text-blue-400" />
                Manual Sun Azimuth
              </span>
              <span className="font-mono text-blue-400">{sunAzimuth}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={sunAzimuth}
              onChange={(e) => handleManualAzimuth(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <span>Sun Elevation</span>
              <span className="font-mono text-cyan-400">{sunElevation}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="80"
              value={sunElevation}
              onChange={(e) => handleManualElevation(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
