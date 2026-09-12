import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Maximize2, Layers, Cpu, Ruler, Sparkles } from 'lucide-react';

interface ThreeImplantViewerProps {
  modelType: 'pedicle-screw' | 'cervical-cage' | 'femur-plate' | 'si-implant' | 'cannulated-screw';
  productName: string;
  materialFinish?: 'titanium' | 'titanium-blue' | 'titanium-gold' | 'stainless';
  isDarkMode?: boolean;
}

export const ThreeImplantViewer: React.FC<ThreeImplantViewerProps> = ({
  modelType,
  productName,
  materialFinish: initialFinish = 'titanium',
  isDarkMode = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const explodedPartsRef = useRef<{ obj: THREE.Object3D; originalPos: THREE.Vector3; explodedPos: THREE.Vector3 }[]>([]);

  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [explodedView, setExplodedView] = useState(false);
  const [showCalipers, setShowCalipers] = useState(true);
  const [activeFinish, setActiveFinish] = useState<'titanium' | 'titanium-blue' | 'titanium-gold' | 'stainless'>(initialFinish);

  // Mouse drag orbit state
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Get Three.js Material based on selected finish
  const getPbrMaterial = (finish: string, isWireframe = false) => {
    let color = 0xb0b8c4;
    let metalness = 0.92;
    let roughness = 0.28;

    if (finish === 'stainless') {
      color = 0xd8e0eb;
      metalness = 0.98;
      roughness = 0.12;
    } else if (finish === 'titanium-blue') {
      color = 0x2563eb;
      metalness = 0.85;
      roughness = 0.3;
    } else if (finish === 'titanium-gold') {
      color = 0xd97706;
      metalness = 0.9;
      roughness = 0.25;
    }

    return new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
      wireframe: isWireframe,
      flatShading: false,
    });
  };

  useEffect(() => {
    setActiveFinish(initialFinish);
  }, [initialFinish]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 26);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.9 : 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(15, 20, 20);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-15, -10, -15);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.0);
    fillLight.position.set(0, -15, 10);
    scene.add(fillLight);

    // 5. Build Procedural Orthopedic Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;
    explodedPartsRef.current = [];

    const mat = getPbrMaterial(activeFinish, wireframeMode);

    if (modelType === 'pedicle-screw') {
      buildPedicleScrew(modelGroup, mat);
    } else if (modelType === 'cervical-cage') {
      buildCervicalCage(modelGroup, mat);
    } else if (modelType === 'femur-plate') {
      buildFemurPlate(modelGroup, mat);
    } else if (modelType === 'si-implant') {
      buildSiImplant(modelGroup, mat);
    } else {
      buildCannulatedScrew(modelGroup, mat);
    }

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (modelGroupRef.current && isRotating && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += 0.007;
      }

      // Smoothly interpolate exploded parts positions
      explodedPartsRef.current.forEach(({ obj, originalPos, explodedPos }) => {
        const target = explodedView ? explodedPos : originalPos;
        obj.position.lerp(target, 0.08);
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [modelType, activeFinish, wireframeMode, isDarkMode]);

  // Update exploded view state
  useEffect(() => {
    // triggers lerp in render loop
  }, [explodedView]);

  // Model builders
  function buildPedicleScrew(group: THREE.Group, mat: THREE.Material) {
    // Pedicle Screw Shaft with helical thread rings
    const shaftGroup = new THREE.Group();
    const shaftGeom = new THREE.CylinderGeometry(0.7, 0.45, 11, 32);
    const shaftMesh = new THREE.Mesh(shaftGeom, mat);
    shaftMesh.position.y = -3.5;
    shaftGroup.add(shaftMesh);

    // Helical thread ribs
    for (let i = 0; i < 18; i++) {
      const threadGeom = new THREE.TorusGeometry(0.78 - (i * 0.012), 0.09, 8, 24);
      const threadMesh = new THREE.Mesh(threadGeom, mat);
      threadMesh.position.y = 1.2 - i * 0.52;
      threadMesh.rotation.x = Math.PI / 2 + 0.15;
      shaftGroup.add(threadMesh);
    }

    // Self-tapping tip flutes
    const tipGeom = new THREE.ConeGeometry(0.45, 1.2, 16);
    const tipMesh = new THREE.Mesh(tipGeom, mat);
    tipMesh.position.y = -9.4;
    tipMesh.rotation.x = Math.PI;
    shaftGroup.add(tipMesh);

    // Ball Joint connecting shaft to tulip head
    const ballGeom = new THREE.SphereGeometry(1.2, 24, 24);
    const ballMesh = new THREE.Mesh(ballGeom, mat);
    ballMesh.position.y = 2.0;
    shaftGroup.add(ballMesh);

    group.add(shaftGroup);
    explodedPartsRef.current.push({
      obj: shaftGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, -3.5, 0),
    });

    // Polyaxial Tulip Head
    const tulipGroup = new THREE.Group();
    tulipGroup.position.y = 2.8;

    // Tulip outer body
    const tulipGeom = new THREE.CylinderGeometry(1.8, 1.5, 3.8, 28, 1, true);
    const tulipMesh = new THREE.Mesh(tulipGeom, mat);
    tulipGroup.add(tulipMesh);

    // Tulip Base ring
    const baseRingGeom = new THREE.TorusGeometry(1.5, 0.25, 12, 24);
    const baseRing = new THREE.Mesh(baseRingGeom, mat);
    baseRing.position.y = -1.8;
    baseRing.rotation.x = Math.PI / 2;
    tulipGroup.add(baseRing);

    // Inner saddle
    const saddleGeom = new THREE.CylinderGeometry(1.2, 1.2, 1.2, 20);
    const saddleMesh = new THREE.Mesh(saddleGeom, mat);
    saddleMesh.position.y = -0.6;
    tulipGroup.add(saddleMesh);

    group.add(tulipGroup);
    explodedPartsRef.current.push({
      obj: tulipGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 1.0, 0),
    });

    // Spinal Rod segment (Ø 5.5mm rod)
    const rodGroup = new THREE.Group();
    const rodGeom = new THREE.CylinderGeometry(0.65, 0.65, 7.5, 24);
    const rodMesh = new THREE.Mesh(rodGeom, mat);
    rodMesh.rotation.z = Math.PI / 2;
    rodMesh.position.y = 2.8;
    rodGroup.add(rodMesh);
    group.add(rodGroup);
    explodedPartsRef.current.push({
      obj: rodGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 4.2, 0),
    });

    // Dovetail Set Screw (Locking Cap)
    const setScrewGroup = new THREE.Group();
    const setScrewGeom = new THREE.CylinderGeometry(1.3, 1.3, 1.0, 24);
    const setScrewMesh = new THREE.Mesh(setScrewGeom, mat);
    setScrewMesh.position.y = 4.2;

    // Star drive socket in set screw
    const socketGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 6);
    const socketMesh = new THREE.Mesh(socketGeom, new THREE.MeshBasicMaterial({ color: 0x1e293b }));
    socketMesh.position.y = 4.6;
    setScrewGroup.add(setScrewMesh);
    setScrewGroup.add(socketMesh);
    group.add(setScrewGroup);
    explodedPartsRef.current.push({
      obj: setScrewGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 7.5, 0),
    });
  }

  function buildCervicalCage(group: THREE.Group, mat: THREE.Material) {
    const cageGroup = new THREE.Group();

    // Main anatomical lordotic body
    const bodyGeom = new THREE.BoxGeometry(7, 3.8, 5.5, 6, 4, 6);
    const bodyMesh = new THREE.Mesh(bodyGeom, mat);
    cageGroup.add(bodyMesh);

    // Central Bone Graft Window (cutout illusion)
    const windowGeom = new THREE.BoxGeometry(4.2, 4.0, 3.0);
    const windowMesh = new THREE.Mesh(
      windowGeom,
      new THREE.MeshBasicMaterial({ color: 0x0f172a, wireframe: false })
    );
    cageGroup.add(windowMesh);

    // Anti-migration pyramidal teeth on superior & inferior surfaces
    for (let x = -2.6; x <= 2.6; x += 1.3) {
      for (let z = -2.0; z <= 2.0; z += 1.3) {
        if (Math.abs(x) < 1.8 && Math.abs(z) < 1.3) continue; // skip graft window
        // Top tooth
        const toothGeom = new THREE.ConeGeometry(0.3, 0.5, 4);
        const topTooth = new THREE.Mesh(toothGeom, mat);
        topTooth.position.set(x, 2.1, z);
        cageGroup.add(topTooth);

        // Bottom tooth
        const btmTooth = new THREE.Mesh(toothGeom, mat);
        btmTooth.position.set(x, -2.1, z);
        btmTooth.rotation.x = Math.PI;
        cageGroup.add(btmTooth);
      }
    }

    // 3D Porous Trabecular Lattice overlay simulation
    const latticeGeom = new THREE.BoxGeometry(6.8, 3.6, 5.3, 16, 12, 16);
    const latticeMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      wireframe: true,
      roughness: 0.8,
      metalness: 0.7,
      transparent: true,
      opacity: 0.35,
    });
    const latticeMesh = new THREE.Mesh(latticeGeom, latticeMat);
    cageGroup.add(latticeMesh);

    // Anterior bullet nose
    const noseGeom = new THREE.CylinderGeometry(0.3, 1.9, 5.5, 16);
    const noseMesh = new THREE.Mesh(noseGeom, mat);
    noseMesh.rotation.z = Math.PI / 2;
    noseMesh.rotation.y = Math.PI / 2;
    noseMesh.position.x = 3.6;
    cageGroup.add(noseMesh);

    group.add(cageGroup);
    explodedPartsRef.current.push({
      obj: cageGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, 0),
    });
  }

  function buildFemurPlate(group: THREE.Group, mat: THREE.Material) {
    const plateGroup = new THREE.Group();

    // Curved anatomical plate body
    const curvePoints = [];
    for (let i = 0; i <= 20; i++) {
      const y = -10 + i * 1.0;
      const x = Math.sin(i * 0.15) * 1.2;
      const z = Math.cos(i * 0.15) * 0.6;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    // Plate shaft
    const shaftGeom = new THREE.BoxGeometry(2.4, 16, 0.7, 4, 16, 2);
    const shaftMesh = new THREE.Mesh(shaftGeom, mat);
    shaftMesh.position.y = -2;
    shaftMesh.rotation.z = 0.05;
    plateGroup.add(shaftMesh);

    // Flared distal condylar head
    const headGeom = new THREE.CylinderGeometry(3.2, 1.4, 5.0, 16);
    const headMesh = new THREE.Mesh(headGeom, mat);
    headMesh.position.set(0.5, 7.2, 0);
    headMesh.rotation.z = -0.15;
    plateGroup.add(headMesh);

    // Combination locking & compression holes
    const holePositions = [
      { x: 0.2, y: -7.5, z: 0 },
      { x: 0.2, y: -4.5, z: 0 },
      { x: 0.2, y: -1.5, z: 0 },
      { x: 0.2, y: 1.5, z: 0 },
      { x: -0.8, y: 6.2, z: 0 },
      { x: 1.2, y: 6.2, z: 0 },
      { x: 0.3, y: 8.5, z: 0 },
    ];

    holePositions.forEach((pos, idx) => {
      const holeGeom = new THREE.CylinderGeometry(0.55, 0.55, 1.0, 16);
      const holeMesh = new THREE.Mesh(
        holeGeom,
        new THREE.MeshBasicMaterial({ color: 0x090d16 })
      );
      holeMesh.position.set(pos.x, pos.y, pos.z);
      holeMesh.rotation.x = Math.PI / 2;
      plateGroup.add(holeMesh);

      // Add exploded screws
      const screwGroup = new THREE.Group();
      const screwShaft = new THREE.CylinderGeometry(0.35, 0.25, 4.5, 12);
      const sShaftMesh = new THREE.Mesh(screwShaft, mat);
      sShaftMesh.position.z = 2.25;
      sShaftMesh.rotation.x = Math.PI / 2;
      screwGroup.add(sShaftMesh);

      const screwHead = new THREE.CylinderGeometry(0.65, 0.45, 0.8, 16);
      const sHeadMesh = new THREE.Mesh(screwHead, mat);
      sHeadMesh.position.z = 0.4;
      sHeadMesh.rotation.x = Math.PI / 2;
      screwGroup.add(sHeadMesh);

      screwGroup.position.set(pos.x, pos.y, pos.z);
      group.add(screwGroup);

      explodedPartsRef.current.push({
        obj: screwGroup,
        originalPos: new THREE.Vector3(pos.x, pos.y, pos.z),
        explodedPos: new THREE.Vector3(pos.x, pos.y, pos.z + 4.5 + idx * 0.4),
      });
    });

    group.add(plateGroup);
    explodedPartsRef.current.push({
      obj: plateGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, -2.5),
    });
  }

  function buildSiImplant(group: THREE.Group, mat: THREE.Material) {
    const siGroup = new THREE.Group();

    // Hollow Cylindrical Body with Dual-Pitch Thread
    const bodyGeom = new THREE.CylinderGeometry(1.8, 1.4, 12, 32);
    const bodyMesh = new THREE.Mesh(bodyGeom, mat);
    siGroup.add(bodyMesh);

    // Central Cannulation Guide Lumen
    const lumenGeom = new THREE.CylinderGeometry(0.5, 0.5, 12.5, 16);
    const lumenMesh = new THREE.Mesh(
      lumenGeom,
      new THREE.MeshBasicMaterial({ color: 0x020617 })
    );
    siGroup.add(lumenMesh);

    // Aggressive Dual-Pitch Spiral Flutes
    for (let i = 0; i < 16; i++) {
      const pitchOffset = i > 8 ? 0.75 : 0.6;
      const ringGeom = new THREE.TorusGeometry(1.95, 0.18, 8, 28);
      const ringMesh = new THREE.Mesh(ringGeom, mat);
      ringMesh.position.y = 5.2 - i * pitchOffset;
      ringMesh.rotation.x = Math.PI / 2 + 0.18;
      siGroup.add(ringMesh);
    }

    // Lateral Bone Graft Windows / Fenestrations
    for (let j = 0; j < 3; j++) {
      const fenGeom = new THREE.BoxGeometry(0.8, 3.2, 4.0);
      const fenMesh = new THREE.Mesh(
        fenGeom,
        new THREE.MeshBasicMaterial({ color: 0x0f172a })
      );
      fenMesh.position.y = 1.0 - j * 3.2;
      fenMesh.rotation.y = (j * Math.PI) / 3;
      siGroup.add(fenMesh);
    }

    // Drive Head
    const headGeom = new THREE.CylinderGeometry(2.2, 2.0, 1.8, 24);
    const headMesh = new THREE.Mesh(headGeom, mat);
    headMesh.position.y = 6.8;
    siGroup.add(headMesh);

    group.add(siGroup);
    explodedPartsRef.current.push({
      obj: siGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, 0),
    });
  }

  function buildCannulatedScrew(group: THREE.Group, mat: THREE.Material) {
    const screwGroup = new THREE.Group();

    // Shaft
    const shaftGeom = new THREE.CylinderGeometry(0.85, 0.75, 13, 28);
    const shaftMesh = new THREE.Mesh(shaftGeom, mat);
    shaftMesh.position.y = -2;
    screwGroup.add(shaftMesh);

    // Central hollow lumen
    const lumenGeom = new THREE.CylinderGeometry(0.35, 0.35, 16, 16);
    const lumenMesh = new THREE.Mesh(
      lumenGeom,
      new THREE.MeshBasicMaterial({ color: 0x020617 })
    );
    screwGroup.add(lumenMesh);

    // Deep Cancellous Threads (distal 50%)
    for (let i = 0; i < 12; i++) {
      const threadGeom = new THREE.TorusGeometry(1.35, 0.14, 8, 24);
      const threadMesh = new THREE.Mesh(threadGeom, mat);
      threadMesh.position.y = -2.5 - i * 0.55;
      threadMesh.rotation.x = Math.PI / 2 + 0.14;
      screwGroup.add(threadMesh);
    }

    // Low-profile hemispherical head
    const headGeom = new THREE.SphereGeometry(1.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const headMesh = new THREE.Mesh(headGeom, mat);
    headMesh.position.y = 4.5;
    screwGroup.add(headMesh);

    // Washer
    const washerGeom = new THREE.TorusGeometry(1.8, 0.25, 12, 32);
    const washerMesh = new THREE.Mesh(washerGeom, mat);
    washerMesh.position.y = 4.4;
    washerMesh.rotation.x = Math.PI / 2;
    screwGroup.add(washerMesh);

    group.add(screwGroup);
    explodedPartsRef.current.push({
      obj: screwGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, 0),
    });
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    const deltaX = e.clientX - prevMouseRef.current.x;
    const deltaY = e.clientY - prevMouseRef.current.y;

    modelGroupRef.current.rotation.y += deltaX * 0.01;
    modelGroupRef.current.rotation.x += deltaY * 0.01;

    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] md:h-[540px] rounded-2xl overflow-hidden select-none border transition-colors ${
        isDarkMode
          ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-slate-800'
          : 'bg-gradient-to-b from-slate-50 via-white to-slate-100 border-slate-200 shadow-inner'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Top Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 pointer-events-auto">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
            isDarkMode
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-[#085F2C]/10 text-[#085F2C] border-[#085F2C]/30 shadow-sm'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse mr-1.5 ${isDarkMode ? 'bg-emerald-400' : 'bg-[#085F2C]'}`} />
            Interactive 3D CAD Metrology
          </span>
          <span className={`hidden sm:inline-block px-2 py-1 rounded-md text-[11px] font-mono-code border backdrop-blur-md ${
            isDarkMode
              ? 'bg-slate-800/80 text-slate-300 border-slate-700/50'
              : 'bg-white/90 text-slate-700 border-slate-200 shadow-sm'
          }`}>
            Swiss CNC: ±0.0001" (2.54µm)
          </span>
        </div>

        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause rotation' : 'Auto rotate'}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors shadow-sm ${
              isRotating
                ? isDarkMode
                  ? 'bg-[#085F2C]/40 text-emerald-300 border-[#085F2C]/50'
                  : 'bg-[#085F2C] text-white border-[#085F2C]'
                : isDarkMode
                  ? 'bg-slate-800/60 text-slate-400 border-slate-700/40 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>
          <button
            onClick={resetView}
            title="Reset Orientation"
            className={`p-2 rounded-lg text-xs font-medium border transition-colors shadow-sm ${
              isDarkMode
                ? 'bg-slate-800/60 text-slate-400 border-slate-700/40 hover:text-white'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Measurement Caliper & Tolerance Callout */}
      {showCalipers && (
        <div className="absolute left-4 top-16 max-w-[240px] pointer-events-none hidden sm:block">
          <div className={`p-3 rounded-xl backdrop-blur-md border text-xs shadow-xl space-y-2 ${
            isDarkMode
              ? 'bg-slate-900/85 border-slate-700/60 text-slate-200'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/40'
          }`}>
            <div className={`flex items-center justify-between border-b pb-1.5 font-medium ${
              isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span className={`flex items-center font-bold ${isDarkMode ? 'text-emerald-400' : 'text-[#085F2C]'}`}>
                <Ruler className="w-3.5 h-3.5 mr-1" />
                Optical Metrology
              </span>
              <span className={`text-[10px] font-mono-code ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700 font-bold'}`}>Zeiss CMM</span>
            </div>
            <div className="space-y-1 font-mono-code text-[11px]">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Concentricity:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>&lt; 0.003 mm</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Pitch Accuracy:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>±0.001 mm</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Surface Finish:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-[#085F2C]'}`}>Ra 0.24 µm (ISO 4287)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Material finish selectors */}
        <div className={`flex items-center space-x-1.5 p-1 rounded-xl backdrop-blur-md border pointer-events-auto shadow-md ${
          isDarkMode
            ? 'bg-slate-900/85 border-slate-700/50 text-slate-300'
            : 'bg-white/95 border-slate-200 text-slate-800'
        }`}>
          <span className={`text-[11px] font-medium px-2 flex items-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <Sparkles className={`w-3 h-3 mr-1 ${isDarkMode ? 'text-emerald-400' : 'text-[#085F2C]'}`} />
            Alloy:
          </span>
          <button
            onClick={() => setActiveFinish('titanium')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFinish === 'titanium'
                ? isDarkMode
                  ? 'bg-slate-700 text-white shadow-sm ring-1 ring-slate-500'
                  : 'bg-[#085F2C] text-white shadow-sm'
                : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ti-6Al-4V Natural
          </button>
          <button
            onClick={() => setActiveFinish('titanium-blue')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFinish === 'titanium-blue'
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Anodized Blue
          </button>
          <button
            onClick={() => setActiveFinish('stainless')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFinish === 'stainless'
                ? isDarkMode
                  ? 'bg-slate-200 text-slate-900 shadow-sm ring-1 ring-white'
                  : 'bg-slate-800 text-white shadow-sm'
                : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            316L Mirror Polish
          </button>
        </div>

        {/* View Mode Switches */}
        <div className={`flex items-center space-x-1.5 p-1 rounded-xl backdrop-blur-md border pointer-events-auto shadow-md ${
          isDarkMode
            ? 'bg-slate-900/85 border-slate-700/50'
            : 'bg-white/95 border-slate-200'
        }`}>
          <button
            onClick={() => setExplodedView(!explodedView)}
            className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              explodedView
                ? 'bg-indigo-600 text-white'
                : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 mr-1" />
            Exploded
          </button>
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              wireframeMode
                ? 'bg-[#085F2C] text-white'
                : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 mr-1" />
            Wireframe CAD
          </button>
          <button
            onClick={() => setShowCalipers(!showCalipers)}
            className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showCalipers
                ? isDarkMode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-700 text-white'
                : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Metrology
          </button>
        </div>
      </div>
    </div>
  );
};
