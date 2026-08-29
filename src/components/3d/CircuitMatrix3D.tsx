import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CircuitMatrix3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060a14, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x1e3a8a, 1.5);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 3, 60);
    blueLight.position.set(10, 10, 10);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 60);
    cyanLight.position.set(-15, -10, 5);
    scene.add(cyanLight);

    // =========================================================================
    // 1. Interconnected Silicon Bus Matrix (VLSI Circuit Constellation)
    // =========================================================================
    const nodeCount = 90;
    const nodePositions: THREE.Vector3[] = [];
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    // Generate balanced distributed silicon nodes
    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 20 - 4
      );
      nodePositions.push(pos);
    }

    // Connect nearby nodes with circuit bus traces
    const maxDist = 12;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDist) {
          linePositions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );

          const alpha = 1 - dist / maxDist;
          // Sky blue to cyan gradient traces
          lineColors.push(0.22, 0.74 * alpha, 0.97 * alpha);
          lineColors.push(0.02, 0.71 * alpha, 0.83 * alpha);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const circuitLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(circuitLines);

    // =========================================================================
    // 2. Glowing Semiconductor Particle Stars
    // =========================================================================
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cRoyal = new THREE.Color(0x2563eb);
    const cAmber = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 65;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 55;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5;

      const pick = Math.random();
      const col = pick > 0.6 ? cCyan : pick > 0.3 ? cRoyal : cAmber;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // =========================================================================
    // 3. Smooth Subtle Floating Silicon Wafer Ring
    // =========================================================================
    const waferGroup = new THREE.Group();

    // Elegant thin quantum toroidal ring
    const quantumRingGeo = new THREE.TorusGeometry(7.5, 0.02, 16, 120);
    const quantumRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const quantumRing = new THREE.Mesh(quantumRingGeo, quantumRingMat);
    quantumRing.rotation.x = Math.PI / 2.8;
    waferGroup.add(quantumRing);

    waferGroup.position.set(0, 0, -10);
    scene.add(waferGroup);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      targetX = mouseX * 2.5;
      targetY = -mouseY * 2.5;
      camera.position.x += (targetX - camera.position.x) * 0.025;
      camera.position.y += (targetY - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      // Subtle, graceful floating of circuit matrix & particles
      circuitLines.rotation.y = elapsed * 0.015;
      circuitLines.rotation.x = Math.sin(elapsed * 0.01) * 0.04;

      particles.rotation.y = elapsed * 0.012;
      particles.rotation.x = Math.cos(elapsed * 0.008) * 0.03;

      quantumRing.rotation.z = elapsed * 0.025;

      // Theme detection
      const isLight = document.documentElement.classList.contains('light');
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).color.setHex(isLight ? 0xf8fafc : 0x060a14);
      }
      particleMaterial.opacity = isLight ? 0.25 : 0.65;
      lineMaterial.opacity = isLight ? 0.15 : 0.35;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      quantumRingGeo.dispose();
      quantumRingMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
