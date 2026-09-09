'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  User,
  Eye,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import { Property, Language } from '@/lib/types';

export interface PropertyVrTourSceneProps {
  property: Property;
  initialNodeIndex?: number;
  onClose?: () => void;
  lang?: Language;
  className?: string;
  isModal?: boolean;
}

type VrViewMode = 'observer' | 'pov';

/**
 * Procedural fallback panoramic canvas when remote textures are loading or offline
 */
function createProceduralPanoramaCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Sky to sea gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0.0, '#0a1026'); // Zenith deep twilight navy
  grad.addColorStop(0.35, '#16234b');
  grad.addColorStop(0.5, '#e88a38'); // Sunset golden glow
  grad.addColorStop(0.53, '#f5ba68'); // Sun line
  grad.addColorStop(0.56, '#183c58'); // Horizon water transition
  grad.addColorStop(0.7, '#0d283d'); // Deep turquoise water
  grad.addColorStop(1.0, '#06141f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Soft glowing sun disk
  const sunGrad = ctx.createRadialGradient(1024, 530, 10, 1024, 530, 260);
  sunGrad.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
  sunGrad.addColorStop(0.3, 'rgba(245, 186, 104, 0.45)');
  sunGrad.addColorStop(0.8, 'rgba(232, 138, 56, 0.12)');
  sunGrad.addColorStop(1, 'rgba(232, 138, 56, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(1024, 530, 260, 0, Math.PI * 2);
  ctx.fill();

  // Distant architectural skyline silhouettes
  ctx.fillStyle = 'rgba(10, 16, 38, 0.45)';
  const towers = [
    { x: 400, w: 24, h: 90 },
    { x: 430, w: 32, h: 140 },
    { x: 470, w: 18, h: 80 },
    { x: 500, w: 40, h: 170 },
    { x: 545, w: 26, h: 110 },
    { x: 1380, w: 35, h: 125 },
    { x: 1420, w: 22, h: 160 },
    { x: 1450, w: 42, h: 210 },
    { x: 1500, w: 28, h: 130 },
  ];
  towers.forEach((t) => {
    ctx.fillRect(t.x, 545 - t.h, t.w, t.h);
    ctx.beginPath();
    ctx.moveTo(t.x + t.w / 2, 545 - t.h - 22);
    ctx.lineTo(t.x + t.w / 2 - 2, 545 - t.h);
    ctx.lineTo(t.x + t.w / 2 + 2, 545 - t.h);
    ctx.fill();
  });

  // Water reflection ripples
  ctx.fillStyle = 'rgba(245, 186, 104, 0.08)';
  for (let y = 560; y < 900; y += 8) {
    const width = 120 + (y - 560) * 1.8;
    ctx.fillRect(1024 - width / 2, y, width, 2);
  }

  return canvas;
}

export const PropertyVrTourScene: React.FC<PropertyVrTourSceneProps> = ({
  property,
  initialNodeIndex = 0,
  onClose,
  lang = 'en',
  className = '',
  isModal = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === 'ar';

  // State: keep only the main view mode and fullscreen
  const [viewMode, setViewMode] = useState<VrViewMode>('observer');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for render loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const skyMeshRef = useRef<THREE.Mesh | null>(null);
  const personGroupRef = useRef<THREE.Group | null>(null);
  const personHeadRef = useRef<THREE.Mesh | null>(null);
  const personTorsoRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction tracking refs
  const isDraggingRef = useRef(false);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const cameraAnglesRef = useRef({ yaw: -0.25, pitch: -0.04 });
  const targetAnglesRef = useRef({ yaw: -0.25, pitch: -0.04 });
  const targetCameraPosRef = useRef(new THREE.Vector3(0.85, 1.74, -1.05));
  const currentCameraPosRef = useRef(new THREE.Vector3(0.85, 1.74, -1.05));
  const viewModeRef = useRef<VrViewMode>(viewMode);

  useEffect(() => {
    viewModeRef.current = viewMode;
    // When in POV mode, camera is positioned at observer's eye level (1.72m) looking forward
    if (viewMode === 'pov') {
      targetCameraPosRef.current.set(0, 1.72, -2.6);
    } else {
      // In Observer mode, camera is positioned slightly behind and to the side to frame the resident
      targetCameraPosRef.current.set(0.85, 1.74, -1.05);
    }
  }, [viewMode]);

  // Load Panoramic Texture
  const loadPanoramaTexture = useCallback(() => {
    if (!skyMeshRef.current) return;

    const imageUrl =
      property.gallery?.[initialNodeIndex] ||
      property.gallery?.[0] ||
      property.image;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;

        if (skyMeshRef.current) {
          const mat = skyMeshRef.current.material as THREE.MeshBasicMaterial;
          if (mat.map) mat.map.dispose();
          mat.map = loadedTexture;
          mat.needsUpdate = true;
        }
      },
      undefined,
      () => {
        const fallbackCanvas = createProceduralPanoramaCanvas();
        const canvasTex = new THREE.CanvasTexture(fallbackCanvas);
        canvasTex.colorSpace = THREE.SRGBColorSpace;
        if (skyMeshRef.current) {
          const mat = skyMeshRef.current.material as THREE.MeshBasicMaterial;
          mat.map = canvasTex;
          mat.needsUpdate = true;
        }
      }
    );
  }, [property, initialNodeIndex]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (default 50° FOV)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 250);
    camera.position.copy(targetCameraPosRef.current);
    cameraRef.current = camera;

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.0);
    sunLight.position.set(12, 24, -18);
    scene.add(sunLight);

    const fillLight = new THREE.HemisphereLight(0x7397b8, 0x1d140e, 0.8);
    scene.add(fillLight);

    // 5. 360° Panoramic Sky Sphere (inverted normals, seamless across 360°)
    const skyGeo = new THREE.SphereGeometry(80, 60, 40);
    skyGeo.scale(-1, 1, 1);

    const proceduralCanvas = createProceduralPanoramaCanvas();
    const initTexture = new THREE.CanvasTexture(proceduralCanvas);
    initTexture.colorSpace = THREE.SRGBColorSpace;

    const skyMat = new THREE.MeshBasicMaterial({
      map: initTexture,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);
    skyMeshRef.current = skyMesh;

    // Load actual property image texture asynchronously
    loadPanoramaTexture();

    // ==============================================================
    // 6. ARCHITECTURAL LUXURY TERRACE (Completely open, unobstructed)
    // ==============================================================
    const terraceGroup = new THREE.Group();
    scene.add(terraceGroup);

    // A. Italian Calacatta / Travertine Floor Slab
    const floorGeo = new THREE.CylinderGeometry(7.0, 7.0, 0.4, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xded8cb,
      roughness: 0.28,
      metalness: 0.15,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -0.2, -1.5);
    terraceGroup.add(floorMesh);

    // Floor border ring in brushed bronze
    const ringGeo = new THREE.TorusGeometry(7.02, 0.04, 16, 64);
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0x9c7746,
      roughness: 0.25,
      metalness: 0.85,
    });
    const floorRing = new THREE.Mesh(ringGeo, bronzeMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.set(0, 0, -1.5);
    terraceGroup.add(floorRing);

    // B. Frameless Glass Balustrade with Bronze Top Handrail (at y = 1.05m)
    const glassGeo = new THREE.CylinderGeometry(6.2, 6.2, 1.05, 48, 1, true, -Math.PI * 0.75, Math.PI * 0.85);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xddeeff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.85,
      ior: 1.5,
    });
    const glassBalustrade = new THREE.Mesh(glassGeo, glassMat);
    glassBalustrade.position.set(0, 0.525, -1.5);
    terraceGroup.add(glassBalustrade);

    // Bronze Handrail Curve
    const handrailGeo = new THREE.TorusGeometry(6.2, 0.035, 12, 48, Math.PI * 0.85);
    const handrailMesh = new THREE.Mesh(handrailGeo, bronzeMat);
    handrailMesh.rotation.x = Math.PI / 2;
    handrailMesh.rotation.z = -Math.PI * 0.75;
    handrailMesh.position.set(0, 1.05, -1.5);
    terraceGroup.add(handrailMesh);

    // C. Minimalist Designer Outdoor Daybed & Lounge Table
    const daybedGroup = new THREE.Group();
    daybedGroup.position.set(-3.2, 0.22, -0.6);
    daybedGroup.rotation.y = 0.35;

    const baseMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.25, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x222a3d, roughness: 0.6 })
    );
    const cushionMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.16, 0.82),
      new THREE.MeshStandardMaterial({ color: 0xe6e0d4, roughness: 0.8 })
    );
    cushionMesh.position.y = 0.2;
    daybedGroup.add(baseMesh, cushionMesh);
    terraceGroup.add(daybedGroup);

    // Sculptural Travertine Side Table
    const tableGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.52, 24);
    const tableMesh = new THREE.Mesh(tableGeo, floorMat);
    tableMesh.position.set(2.6, 0.26, -1.4);
    terraceGroup.add(tableMesh);

    // ==============================================================
    // 7. THE 3D ARCHITECTURAL PERSON WATCHING ("RESIDENT OBSERVER")
    // ==============================================================
    const personGroup = new THREE.Group();
    personGroup.position.set(0, 0, -2.6);
    personGroup.rotation.y = Math.PI; // Facing outward toward the view
    scene.add(personGroup);
    personGroupRef.current = personGroup;

    // Materials for the Resident Figure
    const suitMat = new THREE.MeshStandardMaterial({
      color: 0x181e2b, // Midnight navy tailored blazer
      roughness: 0.45,
      metalness: 0.15,
    });

    const trouserMat = new THREE.MeshStandardMaterial({
      color: 0x22293a, // Charcoal tailored trousers
      roughness: 0.5,
      metalness: 0.1,
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a587,
      roughness: 0.6,
      metalness: 0.05,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1f1b18,
      roughness: 0.7,
      metalness: 0.0,
    });

    const goldWatchMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.9,
    });

    // Shoes
    const shoeGeo = new THREE.BoxGeometry(0.12, 0.08, 0.26);
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x0c0e14, roughness: 0.3 });
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.14, 0.04, -0.05);
    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0.14, 0.04, 0.02);
    personGroup.add(leftShoe, rightShoe);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.09, 0.075, 0.85, 16);
    const leftLeg = new THREE.Mesh(legGeo, trouserMat);
    leftLeg.position.set(-0.14, 0.46, -0.03);
    const rightLeg = new THREE.Mesh(legGeo, trouserMat);
    rightLeg.position.set(0.14, 0.46, 0.02);
    personGroup.add(leftLeg, rightLeg);

    // Torso & Blazer
    const torsoGeo = new THREE.BoxGeometry(0.42, 0.58, 0.24);
    const torsoMesh = new THREE.Mesh(torsoGeo, suitMat);
    torsoMesh.position.set(0, 1.15, 0);
    personGroup.add(torsoMesh);
    personTorsoRef.current = torsoMesh;

    // Collar
    const shirtGeo = new THREE.BoxGeometry(0.12, 0.18, 0.06);
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const shirtMesh = new THREE.Mesh(shirtGeo, shirtMat);
    shirtMesh.position.set(0, 1.38, 0.1);
    personGroup.add(shirtMesh);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.06, 0.055, 0.48, 14);
    const leftUpperArm = new THREE.Mesh(armGeo, suitMat);
    leftUpperArm.position.set(-0.25, 1.25, -0.08);
    leftUpperArm.rotation.x = -0.45;
    leftUpperArm.rotation.z = 0.15;
    personGroup.add(leftUpperArm);

    const forearmGeo = new THREE.CylinderGeometry(0.052, 0.048, 0.42, 14);
    const leftForearm = new THREE.Mesh(forearmGeo, suitMat);
    leftForearm.position.set(-0.26, 1.08, -0.26);
    leftForearm.rotation.x = -1.15;
    leftForearm.rotation.y = -0.15;
    personGroup.add(leftForearm);

    // Hand resting on balustrade
    const handGeo = new THREE.BoxGeometry(0.065, 0.04, 0.1);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.26, 1.06, -0.44);
    personGroup.add(leftHand);

    // Right Arm
    const rightUpperArm = new THREE.Mesh(armGeo, suitMat);
    rightUpperArm.position.set(0.25, 1.25, 0.0);
    rightUpperArm.rotation.z = -0.1;
    personGroup.add(rightUpperArm);

    const rightForearm = new THREE.Mesh(forearmGeo, suitMat);
    rightForearm.position.set(0.26, 0.95, -0.12);
    rightForearm.rotation.x = -0.55;
    personGroup.add(rightForearm);

    // Gold Watch
    const watchGeo = new THREE.TorusGeometry(0.052, 0.012, 12, 24);
    const watchMesh = new THREE.Mesh(watchGeo, goldWatchMat);
    watchMesh.position.set(0.26, 0.86, -0.22);
    watchMesh.rotation.x = Math.PI / 2;
    personGroup.add(watchMesh);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.26, 0.83, -0.24);
    personGroup.add(rightHand);

    // Neck & Head
    const neckGeo = new THREE.CylinderGeometry(0.055, 0.065, 0.12, 14);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, 1.48, 0);
    personGroup.add(neckMesh);

    const headGeo = new THREE.SphereGeometry(0.125, 20, 16);
    headGeo.scale(0.9, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.62, 0);
    personGroup.add(headMesh);
    personHeadRef.current = headMesh;

    // Hair
    const hairGeo = new THREE.SphereGeometry(0.13, 18, 14);
    hairGeo.scale(0.94, 0.8, 1.0);
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0, 1.68, -0.02);
    personGroup.add(hairMesh);

    // ==============================================================
    // 8. INTERACTIVE 360° DRAG CONTROLS
    // ==============================================================
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerDownPosRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - pointerDownPosRef.current.x;
      const deltaY = clientY - pointerDownPosRef.current.y;

      pointerDownPosRef.current = { x: clientX, y: clientY };

      const sensitivity = 0.0035;
      targetAnglesRef.current.yaw -= deltaX * sensitivity;
      targetAnglesRef.current.pitch -= deltaY * sensitivity;

      // Clamp vertical pitch
      targetAnglesRef.current.pitch = Math.max(
        -Math.PI * 0.35,
        Math.min(Math.PI * 0.35, targetAnglesRef.current.pitch)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElem.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // ==============================================================
    // 9. ANIMATION LOOP
    // ==============================================================
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Procedural breathing and subtle head turning for the resident figure
      if (personGroupRef.current) {
        const breathY = Math.sin(elapsedTime * 1.6) * 0.005;
        personGroupRef.current.position.y = breathY;

        if (personTorsoRef.current) {
          const torsoScale = 1.0 + Math.sin(elapsedTime * 1.6) * 0.015;
          personTorsoRef.current.scale.set(torsoScale, 1.0, torsoScale);
        }

        if (personHeadRef.current) {
          personHeadRef.current.rotation.y = Math.sin(elapsedTime * 0.35) * 0.12;
          personHeadRef.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.03;
        }

        // In POV mode, hide head/torso so camera isn't inside mesh
        if (viewModeRef.current === 'pov') {
          personGroupRef.current.visible = false;
        } else {
          personGroupRef.current.visible = true;
        }
      }

      // Smooth camera angle damping
      cameraAnglesRef.current.yaw = THREE.MathUtils.lerp(
        cameraAnglesRef.current.yaw,
        targetAnglesRef.current.yaw,
        0.08
      );
      cameraAnglesRef.current.pitch = THREE.MathUtils.lerp(
        cameraAnglesRef.current.pitch,
        targetAnglesRef.current.pitch,
        0.08
      );

      // Smooth camera position interpolation
      currentCameraPosRef.current.lerp(targetCameraPosRef.current, 0.06);

      if (cameraRef.current) {
        cameraRef.current.position.copy(currentCameraPosRef.current);

        const pitch = cameraAnglesRef.current.pitch;
        const yaw = cameraAnglesRef.current.yaw;

        const lookDist = 10;
        const targetX = currentCameraPosRef.current.x + lookDist * Math.sin(yaw) * Math.cos(pitch);
        const targetY = currentCameraPosRef.current.y + lookDist * Math.sin(pitch);
        const targetZ = currentCameraPosRef.current.z - lookDist * Math.cos(yaw) * Math.cos(pitch);

        cameraRef.current.lookAt(targetX, targetY, targetZ);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // ==============================================================
    // 10. CLEANUP
    // ==============================================================
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      domElem.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElem.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [loadPanoramaTexture]);

  return (
    <div
      className={`relative w-full overflow-hidden select-none bg-[#080D1A] ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen'
          : isModal
          ? 'h-full w-full'
          : className || 'h-[520px] rounded-2xl'
      }`}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Main Controls Only - Clean floating top controls */}
      <div className="absolute top-5 end-5 flex items-center gap-2.5 z-20 pointer-events-auto">
        {/* Main View Mode Switcher: Observer vs First-Person POV */}
        <div className="inline-flex rounded-xl p-1 bg-black/60 backdrop-blur-md border border-white/20 shadow-xl">
          <button
            onClick={() => setViewMode('observer')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'observer'
                ? 'bg-[#2D3E8C] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
            title={isRtl ? 'المراقب' : 'Observer Mode'}
          >
            <User className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{isRtl ? 'المراقب' : 'Observer'}</span>
          </button>
          <button
            onClick={() => setViewMode('pov')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'pov'
                ? 'bg-[#E8922D] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
            title={isRtl ? 'منظور العين' : 'First-Person POV'}
          >
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{isRtl ? 'منظور العين' : 'First-Person POV'}</span>
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-amber-400 transition-all cursor-pointer shadow-xl"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>

        {/* Close Button (if modal) */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-red-950/80 backdrop-blur-md border border-white/20 text-white hover:text-red-300 transition-all cursor-pointer shadow-xl"
            title="Close"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
};
