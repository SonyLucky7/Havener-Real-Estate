'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Layers, Sun, RotateCw } from 'lucide-react';

interface LuxuryTowerSceneProps {
  className?: string;
}

type ViewMode = 'daylight' | 'sunset' | 'blueprint';

interface HotspotDefinition {
  id: string;
  label: string;
  detail: string;
  position: THREE.Vector3;
}

const ARCHITECTURAL_HOTSPOTS: HotspotDefinition[] = [
  {
    id: 'penthouses',
    label: 'Sky Penthouses',
    detail: 'Level 54 · Dual-Aspect Waterfront Living',
    position: new THREE.Vector3(0.6, 2.2, 0.4),
  },
  {
    id: 'pool',
    label: 'Infinity Sky Deck',
    detail: 'Level 32 · Cantilevered Glass Basin',
    position: new THREE.Vector3(-0.9, 0.4, 0.6),
  },
  {
    id: 'atrium',
    label: 'Grand Biophilic Atrium',
    detail: 'Ground · Triple-Volume Private Lobby',
    position: new THREE.Vector3(0.8, -1.8, 0.5),
  },
];

export const LuxuryTowerScene: React.FC<LuxuryTowerSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('daylight');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const viewModeRef = useRef<ViewMode>(viewMode);
  const hotspotDomRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 9.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Architectural Tower Group
    const towerGroup = new THREE.Group();
    scene.add(towerGroup);

    // Materials Palette
    const daylightBlueMat = new THREE.MeshStandardMaterial({
      color: 0x243274,
      metalness: 0.85,
      roughness: 0.2,
    });

    const daylightAmberMat = new THREE.MeshStandardMaterial({
      color: 0xe8922d,
      metalness: 0.9,
      roughness: 0.15,
    });

    const daylightGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b4fa6,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.82,
      thickness: 0.8,
      transparent: true,
      opacity: 0.8,
    });

    const blueprintMat = new THREE.MeshStandardMaterial({
      color: 0x2d3e8c,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    // 14 Sculpted Architectural Tiers
    const tiers = 14;
    const floorSlabs: THREE.Mesh[] = [];

    for (let i = 0; i < tiers; i++) {
      const progress = i / tiers;
      const radiusBottom = 1.65 * (1 - progress * 0.65);
      const radiusTop = 1.55 * (1 - (progress + 1 / tiers) * 0.65);
      const slabH = 0.46;
      const yPos = (i - tiers / 2.5) * 0.52;

      const segments = 6 + (i % 2);
      const geo = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        slabH,
        segments,
        1,
        false
      );

      const slabMat = i % 3 === 0 ? daylightBlueMat : i % 3 === 1 ? daylightAmberMat : daylightGlassMat;
      const slab = new THREE.Mesh(geo, slabMat);
      slab.position.y = yPos;
      slab.rotation.y = progress * Math.PI * 0.45;
      towerGroup.add(slab);
      floorSlabs.push(slab);

      // Amber Accent Trim Ring
      const ringGeo = new THREE.TorusGeometry(radiusBottom * 1.02, 0.016, 8, segments);
      const ring = new THREE.Mesh(ringGeo, daylightAmberMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yPos - slabH / 2;
      slab.add(ring);
    }

    // Pinnacle Spire
    const spireGeo = new THREE.ConeGeometry(0.14, 2.8, 6);
    const spire = new THREE.Mesh(spireGeo, daylightAmberMat);
    spire.position.y = (tiers / 2.5) * 0.52 + 1.35;
    towerGroup.add(spire);

    // Dual Orbital Kinematic Rings
    const orbitalGeo = new THREE.TorusGeometry(3.1, 0.025, 12, 100);
    const orbitalRing = new THREE.Mesh(orbitalGeo, daylightBlueMat);
    orbitalRing.rotation.x = Math.PI / 2.8;
    orbitalRing.rotation.y = Math.PI / 6;
    orbitalRing.position.y = 0.5;
    towerGroup.add(orbitalRing);

    const innerOrbitalGeo = new THREE.TorusGeometry(2.3, 0.016, 8, 80);
    const innerOrbital = new THREE.Mesh(innerOrbitalGeo, daylightAmberMat);
    innerOrbital.rotation.x = -Math.PI / 3;
    innerOrbital.position.y = -0.2;
    towerGroup.add(innerOrbital);

    // Floating Particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleSpeeds[i] = 0.002 + Math.random() * 0.003;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe8922d,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.4);
    sunLight.position.set(6, 9, 6);
    scene.add(sunLight);

    const blueFillLight = new THREE.DirectionalLight(0x2d3e8c, 1.8);
    blueFillLight.position.set(-6, -2, -4);
    scene.add(blueFillLight);

    const groundGlow = new THREE.PointLight(0xe8922d, 2.5, 10);
    groundGlow.position.set(0, -3.5, 2);
    scene.add(groundGlow);

    // Interactive Drag & Pointer Controls
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let userRotationY = 0;
    let userRotationX = 0;
    let userVelocityY = 0;
    let userVelocityX = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
      userVelocityX = 0;
      userVelocityY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        previousPointerX = clientX;
        previousPointerY = clientY;

        userVelocityY = deltaX * 0.006;
        userVelocityX = deltaY * 0.004;

        userRotationY += userVelocityY;
        userRotationX += userVelocityX;
      } else if ('clientX' in e) {
        mouseParallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseParallaxY = (e.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasEl = renderer.domElement;
    canvasEl.style.touchAction = 'none';
    canvasEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvasEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Scroll-linked camera glide
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia decay
      if (!isDragging) {
        userRotationY += userVelocityY;
        userRotationX += userVelocityX;
        userVelocityY *= 0.94;
        userVelocityX *= 0.94;
      }

      // Scroll progression effect
      const scrollProgress = Math.min(scrollY / 1000, 1.5);

      // Tower rotation (idle speed + drag rotation + mouse parallax)
      towerGroup.rotation.y = elapsedTime * 0.06 + userRotationY + mouseParallaxX * 0.25;
      towerGroup.rotation.x = userRotationX + mouseParallaxY * 0.1;

      // Vertical drift from scroll
      towerGroup.position.y = -scrollProgress * 0.8;

      // Orbital counter-rotation
      orbitalRing.rotation.z = elapsedTime * 0.05;
      innerOrbital.rotation.z = -elapsedTime * 0.07;

      // Camera position
      camera.position.y = 1.8 + Math.sin(elapsedTime * 0.4) * 0.1 - mouseParallaxY * 0.2;
      camera.position.x = mouseParallaxX * 0.35;
      camera.lookAt(0, 0.3 - scrollProgress * 0.4, 0);

      // View mode shader updates
      const currentMode = viewModeRef.current;
      if (currentMode === 'blueprint') {
        floorSlabs.forEach((s) => (s.material = blueprintMat));
        spire.material = blueprintMat;
        ambientLight.intensity = 1.0;
        sunLight.intensity = 1.5;
      } else if (currentMode === 'sunset') {
        ambientLight.intensity = 1.8;
        ambientLight.color.setHex(0xffddb0);
        sunLight.intensity = 4.0;
        sunLight.color.setHex(0xff7722);
        blueFillLight.color.setHex(0x1a2456);
        groundGlow.color.setHex(0xff5500);
        floorSlabs.forEach((s, idx) => {
          s.material = idx % 2 === 0 ? daylightAmberMat : daylightGlassMat;
        });
      } else {
        // Daylight default
        ambientLight.intensity = 2.4;
        ambientLight.color.setHex(0xffffff);
        sunLight.intensity = 3.4;
        sunLight.color.setHex(0xfff8ee);
        blueFillLight.color.setHex(0x2d3e8c);
        groundGlow.color.setHex(0xe8922d);
        floorSlabs.forEach((s, idx) => {
          s.material = idx % 3 === 0 ? daylightBlueMat : idx % 3 === 1 ? daylightAmberMat : daylightGlassMat;
        });
      }

      // Floating particles
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += particleSpeeds[i];
        if (posArr[i * 3 + 1] > 5) posArr[i * 3 + 1] = -5;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Render
      renderer.render(scene, camera);

      // Direct DOM update for hotspots (no 60fps React state re-renders)
      ARCHITECTURAL_HOTSPOTS.forEach((spot) => {
        const domNode = hotspotDomRefs.current[spot.id];
        if (!domNode) return;

        const worldPos = spot.position.clone();
        worldPos.applyEuler(towerGroup.rotation);
        worldPos.add(towerGroup.position);

        const screenVector = worldPos.clone().project(camera);
        const isBehind = screenVector.z > 1;

        const x = (screenVector.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-(screenVector.y * 0.5) + 0.5) * container.clientHeight;

        if (!isBehind && x >= -40 && x <= container.clientWidth + 40 && y >= -40 && y <= container.clientHeight + 40) {
          domNode.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          domNode.style.opacity = '1';
          domNode.style.pointerEvents = 'auto';
        } else {
          domNode.style.opacity = '0';
          domNode.style.pointerEvents = 'none';
        }
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvasEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      daylightBlueMat.dispose();
      daylightAmberMat.dispose();
      daylightGlassMat.dispose();
      blueprintMat.dispose();
      spireGeo.dispose();
      orbitalGeo.dispose();
      innerOrbitalGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className={`absolute inset-0 select-none overflow-hidden ${className || ''}`}>
      {/* Three.js Interactive Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing pointer-events-auto" />

      {/* Floating 3D Architectural Hotspots (Direct DOM Positioned) */}
      <div className="absolute inset-0 pointer-events-none">
        {ARCHITECTURAL_HOTSPOTS.map((spot) => {
          const isActive = activeHotspot === spot.id;

          return (
            <div
              key={spot.id}
              ref={(el) => {
                hotspotDomRefs.current[spot.id] = el;
              }}
              style={{ opacity: 0 }}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
            >
              <div
                className="relative group cursor-pointer pointer-events-auto"
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pulsing Beacon Ring */}
                <span className="absolute -inset-2 rounded-full bg-[#E8922D]/30 animate-ping opacity-75" />
                <button
                  className="relative w-7 h-7 rounded-full bg-white/95 border-2 border-[#2D3E8C] shadow-md flex items-center justify-center text-[10px] font-bold text-[#2D3E8C] transition-transform duration-300 group-hover:scale-115 group-hover:border-[#E8922D] group-hover:text-[#E8922D] cursor-pointer"
                  aria-label={spot.label}
                >
                  +
                </button>

                {/* Micro Glass Annotation Card */}
                {isActive && (
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/10 text-xs animate-in zoom-in-95 duration-200 z-30 pointer-events-auto">
                    <div className="flex items-center justify-between font-bold text-[#2D3E8C] mb-1">
                      <span>{spot.label}</span>
                      <span className="text-[10px] text-[#E8922D] uppercase tracking-wider font-mono">
                        DXB ARCH
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">{spot.detail}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive 3D HUD Controls at Bottom-Right */}
      <div className="absolute bottom-20 sm:bottom-12 right-6 sm:right-10 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 pointer-events-auto">
        {/* Drag Hint Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-[11px] text-slate-600 font-semibold">
          <RotateCw className="w-3.5 h-3.5 text-[#2D3E8C] animate-spin" style={{ animationDuration: '6s' }} />
          <span>360° Drag to Orbit</span>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm">
          <button
            onClick={() => setViewMode('daylight')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === 'daylight'
                ? 'bg-[#2D3E8C] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A0E24]'
            }`}
            title="Daylight Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Day</span>
          </button>

          <button
            onClick={() => setViewMode('sunset')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === 'sunset'
                ? 'bg-gradient-to-r from-[#E8922D] to-[#D97706] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A0E24]'
            }`}
            title="Sunset Horizon Mode"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sunset</span>
          </button>

          <button
            onClick={() => setViewMode('blueprint')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === 'blueprint'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A0E24]'
            }`}
            title="Architectural Blueprint Mode"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Structure</span>
          </button>
        </div>
      </div>
    </div>
  );
};
