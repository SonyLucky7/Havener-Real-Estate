'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LuxuryTowerSceneProps {
  className?: string;
}

export const LuxuryTowerScene: React.FC<LuxuryTowerSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup for Bright Luxury Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.02);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9.5);

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

    // Brand Materials: Royal Blue & Warm Amber
    const royalBlueMat = new THREE.MeshStandardMaterial({
      color: 0x243274,
      metalness: 0.85,
      roughness: 0.2,
    });

    const amberMetallicMat = new THREE.MeshStandardMaterial({
      color: 0xe8922d,
      metalness: 0.9,
      roughness: 0.15,
    });

    const crystallineGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x4f62b8,
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.82,
      thickness: 0.6,
      transparent: true,
      opacity: 0.78,
    });

    // Tiered Sculptural Tower Facets
    const tiers = 14;
    const floorSlabs: THREE.Mesh[] = [];

    for (let i = 0; i < tiers; i++) {
      const progress = i / tiers;
      const radiusBottom = 1.6 * (1 - progress * 0.65);
      const radiusTop = 1.5 * (1 - (progress + 1 / tiers) * 0.65);
      const height = 0.45;
      const yPos = (i - tiers / 2.5) * 0.52;

      const segments = 6 + (i % 2);
      const geo = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        segments,
        1,
        false
      );

      const slabMat = i % 3 === 0 ? royalBlueMat : i % 3 === 1 ? amberMetallicMat : crystallineGlassMat;
      const slab = new THREE.Mesh(geo, slabMat);
      slab.position.y = yPos;
      slab.rotation.y = progress * Math.PI * 0.45;
      towerGroup.add(slab);
      floorSlabs.push(slab);

      const ringGeo = new THREE.TorusGeometry(radiusBottom * 1.02, 0.015, 8, segments);
      const ring = new THREE.Mesh(ringGeo, amberMetallicMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yPos - height / 2;
      slab.add(ring);
    }

    // Soaring Spire Pinnacle
    const spireGeo = new THREE.ConeGeometry(0.15, 2.5, 6);
    const spire = new THREE.Mesh(spireGeo, amberMetallicMat);
    spire.position.y = (tiers / 2.5) * 0.52 + 1.2;
    towerGroup.add(spire);

    // Floating Elliptical Orbital Rings
    const orbitalGeo = new THREE.TorusGeometry(3.0, 0.025, 12, 100);
    const orbitalRing = new THREE.Mesh(orbitalGeo, royalBlueMat);
    orbitalRing.rotation.x = Math.PI / 2.8;
    orbitalRing.rotation.y = Math.PI / 6;
    orbitalRing.position.y = 0.5;
    towerGroup.add(orbitalRing);

    const innerOrbitalGeo = new THREE.TorusGeometry(2.2, 0.015, 8, 80);
    const innerOrbital = new THREE.Mesh(innerOrbitalGeo, amberMetallicMat);
    innerOrbital.rotation.x = -Math.PI / 3;
    innerOrbital.position.y = -0.2;
    towerGroup.add(innerOrbital);

    // Ambient Light Motes
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleSpeeds[i] = 0.002 + Math.random() * 0.004;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xe8922d,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Luminous Lighting
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

    // Mouse Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Slow architectural rotation
      towerGroup.rotation.y = elapsedTime * 0.08 + mouse.x * 0.4;
      towerGroup.rotation.x = mouse.y * 0.15;

      // Orbital rings counter-rotation
      orbitalRing.rotation.z = elapsedTime * 0.05;
      innerOrbital.rotation.z = -elapsedTime * 0.07;

      // Subtle camera float
      camera.position.y = 2.5 + Math.sin(elapsedTime * 0.4) * 0.15 - mouse.y * 0.3;
      camera.position.x = mouse.x * 0.5;
      camera.lookAt(0, 0.4, 0);

      // Particle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 5) {
          positions[i * 3 + 1] = -5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean Up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      royalBlueMat.dispose();
      amberMetallicMat.dispose();
      crystallineGlassMat.dispose();
      spireGeo.dispose();
      orbitalGeo.dispose();
      innerOrbitalGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
    />
  );
};
