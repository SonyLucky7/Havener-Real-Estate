'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Property, Language } from '@/lib/types';
import { PROPERTIES_DATA } from '@/data/propertiesData';
import { RotateCcw, MoveHorizontal, ArrowUpRight } from 'lucide-react';

export interface SerpentineRibbonSceneProps {
  onSelectProperty: (property: Property) => void;
  activePropertyId?: string;
  lang?: 'en' | 'ar';
  className?: string;
}

// 3D Architectural Serpentine Ribbon Spline Control Points
// Winding from top-right to bottom-left in the foreground, looping smoothly through the background
const SPLINE_CONTROL_POINTS = [
  new THREE.Vector3(7.2, 4.5, -2.0),   // 0: Top-right entry
  new THREE.Vector3(3.8, 3.2, 0.8),    // 1: Upper right crest
  new THREE.Vector3(-0.6, 1.8, 2.4),   // 2: Upper center forward sweep
  new THREE.Vector3(-4.6, 0.3, 1.2),   // 3: Mid-left sweep
  new THREE.Vector3(-3.0, -1.8, 2.2),  // 4: Lower center sweep forward
  new THREE.Vector3(2.6, -2.8, 1.0),   // 5: Lower right sweep
  new THREE.Vector3(-1.4, -4.2, -0.2), // 6: Bottom left exit
  new THREE.Vector3(-6.4, -3.6, -3.0), // 7: Back left swoop
  new THREE.Vector3(-7.2, -0.6, -5.2), // 8: Deep left return
  new THREE.Vector3(-3.6, 2.8, -5.8),  // 9: Deep mid-top return
  new THREE.Vector3(3.0, 5.0, -4.0),   // 10: High right return
];

const CARD_COUNT = 24;
const CARD_WIDTH = 2.15;
const CARD_HEIGHT = 1.38;
const CARD_RADIUS = 0.08;

// Normalized UV rounded rectangle geometry generator
function createRoundedCardGeometry(width: number, height: number, radius: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ShapeGeometry(shape, 12);
  const pos = geometry.attributes.position;
  const uvs = new Float32Array(pos.count * 2);

  for (let i = 0; i < pos.count; i++) {
    uvs[i * 2] = (pos.getX(i) + width / 2) / width;
    uvs[i * 2 + 1] = (pos.getY(i) + height / 2) / height;
  }

  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

// Procedural high-resolution canvas texture generator as instant luxury fallback
function createProceduralCardTexture(property: Property, lang: Language): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 650;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Deep luxury sapphire gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 650);
    grad.addColorStop(0, '#060B18');
    grad.addColorStop(0.5, '#0E1A38');
    grad.addColorStop(1, '#1A2954');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 650);

    // Architectural grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 40; x < 1024; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 650);
      ctx.stroke();
    }
    for (let y = 40; y < 650; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Gold luxury border frame
    ctx.strokeStyle = '#E8922D';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 1024 - 48, 650 - 48);

    ctx.strokeStyle = 'rgba(232, 146, 45, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, 1024 - 64, 650 - 64);

    // Corner registration marks
    const markSize = 20;
    ctx.strokeStyle = '#E8922D';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(24, 24 + markSize); ctx.lineTo(24, 24); ctx.lineTo(24 + markSize, 24); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1000 - markSize, 24); ctx.lineTo(1000, 24); ctx.lineTo(1000, 24 + markSize); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(24, 626 - markSize); ctx.lineTo(24, 626); ctx.lineTo(24 + markSize, 626); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1000 - markSize, 626); ctx.lineTo(1000, 626); ctx.lineTo(1000, 626 - markSize); ctx.stroke();

    // Brand tag
    ctx.fillStyle = '#E8922D';
    ctx.font = 'bold 18px monospace, sans-serif';
    ctx.fillText('HAVENER PROPERTY DUBAI', 60, 75);

    ctx.fillStyle = 'rgba(147, 197, 253, 0.7)';
    ctx.font = '14px monospace, sans-serif';
    ctx.fillText('FLAGSHIP RESIDENTIAL · ARCHITECTURAL SCHEMATIC', 60, 100);

    // Category badge
    ctx.fillStyle = 'rgba(45, 62, 140, 0.6)';
    ctx.fillRect(60, 130, 240, 36);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(60, 130, 240, 36);
    ctx.fillStyle = '#93C5FD';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText((property.categoryLabel[lang] || property.categoryLabel.en).toUpperCase(), 75, 154);

    // Property title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 42px serif, sans-serif';
    const nameText = property.name[lang] || property.name.en;
    ctx.fillText(nameText, 60, 240);

    // Location
    ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
    ctx.font = '22px sans-serif';
    const locText = property.location[lang] || property.location.en;
    ctx.fillText(locText, 60, 280);

    // Key spec metrics
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(60, 330, 440, 80);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeRect(60, 330, 440, 80);

    ctx.fillStyle = 'rgba(147, 197, 253, 0.8)';
    ctx.font = '14px monospace, sans-serif';
    ctx.fillText('BUILT-UP AREA', 80, 360);
    ctx.fillText('STARTING VALUATION', 260, 360);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(property.sizeSqFt || '10,000+ sq.ft', 80, 392);

    ctx.fillStyle = '#E8922D';
    ctx.font = 'bold 22px monospace, sans-serif';
    const priceText = property.startingPriceFormatted[lang] || property.startingPriceFormatted.en;
    ctx.fillText(priceText, 260, 392);

    // Explore hint
    ctx.fillStyle = 'rgba(147, 197, 253, 0.65)';
    ctx.font = '15px sans-serif';
    ctx.fillText('◆ CLICK TO ENTER ARCHITECTURAL SHOWCASE ◆', 60, 580);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export const SerpentineRibbonScene: React.FC<SerpentineRibbonSceneProps> = ({
  onSelectProperty,
  activePropertyId,
  lang = 'en',
  className,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
  const isZoomedInRef = useRef<boolean>(false);

  // Dynamic refs to avoid stale closures in WebGL event handlers and render loop
  const langRef = useRef<Language>(lang);
  const activePropertyIdRef = useRef<string | undefined>(activePropertyId);
  const onSelectPropertyRef = useRef(onSelectProperty);

  // Keep callback and prop refs synchronised
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    activePropertyIdRef.current = activePropertyId;
  }, [activePropertyId]);

  useEffect(() => {
    onSelectPropertyRef.current = onSelectProperty;
  }, [onSelectProperty]);

  // Handle external camera reset trigger if needed
  const resetCameraTriggerRef = useRef<(() => void) | null>(null);

  const handleResetCamera = useCallback(() => {
    if (resetCameraTriggerRef.current) {
      resetCameraTriggerRef.current();
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    const defaultCamPos = new THREE.Vector3(0, 0, 14.5);
    const defaultLookAt = new THREE.Vector3(0, 0, 0);
    camera.position.copy(defaultCamPos);
    camera.lookAt(defaultLookAt);

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

    // 2. Lighting Rig
    // Warm luxury ambient light
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.3);
    scene.add(ambientLight);

    // Directional sunlight for metallic luster
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(8, 14, 10);
    scene.add(sunLight);

    // Golden rim light
    const goldRimLight = new THREE.PointLight(0xe8922d, 3.5, 32);
    goldRimLight.position.set(-6, 4, 6);
    scene.add(goldRimLight);

    // Royal blue accent light
    const blueRimLight = new THREE.PointLight(0x2d3e8c, 4.0, 36);
    blueRimLight.position.set(7, -4, 4);
    scene.add(blueRimLight);

    // Subtle upward ground bounce
    const groundFillLight = new THREE.DirectionalLight(0x93c5fd, 0.9);
    groundFillLight.position.set(0, -10, -4);
    scene.add(groundFillLight);

    // 3. CatmullRom Serpentine Spline Path
    const curve = new THREE.CatmullRomCurve3(SPLINE_CONTROL_POINTS, true, 'centripetal');

    // 4. Luminous Architectural Ribbon Spine / Rails
    const trackGroup = new THREE.Group();
    scene.add(trackGroup);

    const tubeGeo = new THREE.TubeGeometry(curve, 220, 0.035, 8, true);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xe8922d,
      emissive: 0x925510,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ribbonRail = new THREE.Mesh(tubeGeo, tubeMat);
    trackGroup.add(ribbonRail);

    // Secondary subtle royal blue guide rail offset along curve
    const secondaryTubeGeo = new THREE.TubeGeometry(curve, 220, 0.02, 8, true);
    const secondaryTubeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.25,
      metalness: 0.85,
      roughness: 0.3,
      transparent: true,
      opacity: 0.75,
    });
    const secondaryRail = new THREE.Mesh(secondaryTubeGeo, secondaryTubeMat);
    secondaryRail.scale.set(1.02, 1.02, 1.02);
    trackGroup.add(secondaryRail);

    // 5. Geometries & Resource Tracking
    const disposableGeometries: THREE.BufferGeometry[] = [tubeGeo, secondaryTubeGeo];
    const disposableMaterials: THREE.Material[] = [tubeMat, secondaryTubeMat];
    const disposableTextures: THREE.Texture[] = [];

    const cardGeometry = createRoundedCardGeometry(CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS);
    const borderGeometry = createRoundedCardGeometry(CARD_WIDTH + 0.07, CARD_HEIGHT + 0.07, CARD_RADIUS + 0.035);
    const shadowGeometry = createRoundedCardGeometry(CARD_WIDTH + 0.12, CARD_HEIGHT + 0.12, CARD_RADIUS + 0.06);

    disposableGeometries.push(cardGeometry, borderGeometry, shadowGeometry);

    // 6. Preload and Cache Textures for Unique Properties
    const propertyTextureMap: Map<string, THREE.Texture> = new Map();
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    PROPERTIES_DATA.forEach((property) => {
      // 1) Instant canvas texture
      const canvasTex = createProceduralCardTexture(property, langRef.current);
      disposableTextures.push(canvasTex);
      propertyTextureMap.set(property.id, canvasTex);

      // 2) Asynchronous hero photographic image
      if (property.image) {
        textureLoader.load(
          property.image,
          (loadedTex) => {
            loadedTex.colorSpace = THREE.SRGBColorSpace;
            loadedTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
            loadedTex.magFilter = THREE.LinearFilter;
            loadedTex.generateMipmaps = true;

            disposableTextures.push(loadedTex);
            propertyTextureMap.set(property.id, loadedTex);

            // Update matching card materials
            cards.forEach((item) => {
              if (item.property.id === property.id) {
                item.cardMaterial.map = loadedTex;
                item.cardMaterial.needsUpdate = true;
              }
            });
          },
          undefined,
          () => {
            // Retain procedural texture on load error
          }
        );
      }
    });

    // 7. Generate 24-30 3D Card Planes along the Serpentine Trajectory
    interface CardItem {
      group: THREE.Group;
      cardMesh: THREE.Mesh;
      borderMesh: THREE.Mesh;
      shadowMesh: THREE.Mesh;
      cardMaterial: THREE.MeshStandardMaterial;
      borderMaterial: THREE.MeshStandardMaterial;
      property: Property;
      baseT: number;
    }

    const cards: CardItem[] = [];
    const cardMeshes: THREE.Mesh[] = [];
    const ribbonContainer = new THREE.Group();
    scene.add(ribbonContainer);

    for (let i = 0; i < CARD_COUNT; i++) {
      const property = PROPERTIES_DATA[i % PROPERTIES_DATA.length];
      const initialTexture = propertyTextureMap.get(property.id);

      const cardMaterial = new THREE.MeshStandardMaterial({
        map: initialTexture,
        metalness: 0.08,
        roughness: 0.28,
        side: THREE.DoubleSide,
      });

      const borderMaterial = new THREE.MeshStandardMaterial({
        color: 0xdec282, // Champagne gold
        emissive: 0x000000,
        emissiveIntensity: 0.0,
        metalness: 0.9,
        roughness: 0.18,
        side: THREE.DoubleSide,
      });

      const shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x040816,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      });

      disposableMaterials.push(cardMaterial, borderMaterial, shadowMaterial);

      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
      cardMesh.position.set(0, 0, 0.002);

      const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
      borderMesh.position.set(0, 0, -0.004);

      const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
      shadowMesh.position.set(0, 0, -0.015);

      const cardGroup = new THREE.Group();
      cardGroup.add(shadowMesh);
      cardGroup.add(borderMesh);
      cardGroup.add(cardMesh);

      // Metadata for raycasting and selection
      cardGroup.userData = {
        cardIndex: i,
        property,
        isCard: true,
      };
      cardMesh.userData = cardGroup.userData;

      ribbonContainer.add(cardGroup);
      cards.push({
        group: cardGroup,
        cardMesh,
        borderMesh,
        shadowMesh,
        cardMaterial,
        borderMaterial,
        property,
        baseT: i / CARD_COUNT,
      });

      cardMeshes.push(cardMesh);
    }

    // 8. Motion & Interactivity State
    let currentOffset = 0;
    let targetOffset = 0;
    let velocity = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastDragX = 0;
    let lastDragY = 0;
    let lastDragTime = 0;

    // Raycasting & Hover State
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(-999, -999);
    let hoveredMesh: THREE.Mesh | null = null;

    // Camera Zoom Tween State
    let isZooming = false;
    let zoomStartTime = 0;
    let zoomDuration = 650;
    let zoomCallbackTriggered = false;
    let zoomTargetProperty: Property | null = null;
    const currentCameraLookAt = new THREE.Vector3().copy(defaultLookAt);
    const zoomStartCamPos = new THREE.Vector3();
    const zoomTargetCamPos = new THREE.Vector3();
    const zoomStartLookAt = new THREE.Vector3();
    const zoomTargetLookAt = new THREE.Vector3();

    // Start Camera Zoom Tween
    const startZoomToCard = (cardGroup: THREE.Group, property: Property) => {
      isZooming = true;
      zoomStartTime = performance.now();
      zoomDuration = 650;
      zoomCallbackTriggered = false;
      zoomTargetProperty = property;

      zoomStartCamPos.copy(camera.position);
      zoomStartLookAt.copy(currentCameraLookAt);

      const cardPos = new THREE.Vector3();
      cardGroup.getWorldPosition(cardPos);

      const cardNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(cardGroup.quaternion).normalize();

      // Position camera squarely in front of clicked card
      zoomTargetCamPos.copy(cardPos).addScaledVector(cardNormal, 2.85);
      zoomTargetLookAt.copy(cardPos);

      isZoomedInRef.current = true;
      setIsZoomedIn(true);
    };

    // Camera Reset Tween
    const resetCamera = () => {
      isZooming = true;
      zoomStartTime = performance.now();
      zoomDuration = 600;
      zoomCallbackTriggered = true; // No selection trigger on reset
      zoomTargetProperty = null;

      zoomStartCamPos.copy(camera.position);
      zoomStartLookAt.copy(currentCameraLookAt);

      zoomTargetCamPos.copy(defaultCamPos);
      zoomTargetLookAt.copy(defaultLookAt);

      isZoomedInRef.current = false;
      setIsZoomedIn(false);
    };

    resetCameraTriggerRef.current = resetCamera;

    // 9. Pointer Event Listeners (Drag-to-Glide & Inertia)
    const handlePointerDown = (e: PointerEvent) => {
      // Primary button only
      if (e.button !== 0) return;

      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastDragX = e.clientX;
      lastDragY = e.clientY;
      lastDragTime = performance.now();
      velocity = 0;

      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - lastDragX;
        const deltaY = e.clientY - lastDragY;

        // Diagonal drag sensitivity matching serpentine curve flow
        const dragDelta = deltaX * 0.00065 - deltaY * 0.0004;
        targetOffset -= dragDelta;

        const now = performance.now();
        const dt = Math.max(1, now - lastDragTime);
        velocity = -(dragDelta / dt) * 16;

        lastDragX = e.clientX;
        lastDragY = e.clientY;
        lastDragTime = now;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          container.releasePointerCapture(e.pointerId);
        } catch {
          // Ignore if pointer capture already lost
        }

        // Detect clean click vs drag
        const moveDist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
        if (moveDist < 6) {
          // Raycast click
          raycaster.setFromCamera(pointerNDC, camera);
          const intersects = raycaster.intersectObjects(cardMeshes, false);
          if (intersects.length > 0) {
            const hitMesh = intersects[0].object as THREE.Mesh;
            const hitGroup = hitMesh.parent as THREE.Group;
            const clickedProperty = hitGroup.userData.property as Property;
            startZoomToCard(hitGroup, clickedProperty);
          } else if (isZoomedInRef.current) {
            resetCamera();
          }
        }
      }
    };

    const handlePointerCancel = () => {
      isDragging = false;
    };

    // Wheel navigation (advance/reverse along the ribbon)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.00016, 0.016);
      targetOffset -= delta;
      velocity -= delta * 0.3;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Touch event fallbacks for robust mobile touch-drag
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        dragStartX = touch.clientX;
        dragStartY = touch.clientY;
        lastDragX = touch.clientX;
        lastDragY = touch.clientY;
        lastDragTime = performance.now();
        velocity = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastDragX;
        const deltaY = touch.clientY - lastDragY;
        const dragDelta = deltaX * 0.0008 - deltaY * 0.00045;
        targetOffset -= dragDelta;

        const now = performance.now();
        const dt = Math.max(1, now - lastDragTime);
        velocity = -(dragDelta / dt) * 16;

        lastDragX = touch.clientX;
        lastDragY = touch.clientY;
        lastDragTime = now;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDragging) {
        isDragging = false;
        if (e.changedTouches.length === 1) {
          const touch = e.changedTouches[0];
          const dist = Math.hypot(touch.clientX - dragStartX, touch.clientY - dragStartY);
          if (dist < 8) {
            const rect = container.getBoundingClientRect();
            pointerNDC.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            pointerNDC.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(pointerNDC, camera);
            const intersects = raycaster.intersectObjects(cardMeshes, false);
            if (intersects.length > 0) {
              const hitMesh = intersects[0].object as THREE.Mesh;
              const hitGroup = hitMesh.parent as THREE.Group;
              const clickedProperty = hitGroup.userData.property as Property;
              startZoomToCard(hitGroup, clickedProperty);
            }
          }
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 10. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 11. Render Loop
    let animFrameId: number;
    const upVector = new THREE.Vector3(0, 1, 0);

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Inertia & Auto-glide physics
      if (!isDragging && !isZooming) {
        // Ambient idle cruise
        targetOffset += 0.00016;

        // Damped velocity decay
        targetOffset += velocity;
        velocity *= 0.93;
        if (Math.abs(velocity) < 0.000005) velocity = 0;
      }

      // Smooth offset lerp
      currentOffset += (targetOffset - currentOffset) * 0.09;

      // 12. Position & Orient Each Card Along Spline
      const activeId = activePropertyIdRef.current;

      cards.forEach((card) => {
        // Continuous wrapping parameter along curve [0, 1)
        const t = (((card.baseT + currentOffset) % 1) + 1) % 1;

        const pos = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();

        // Calculate banking curve normal vector
        let curveNormal = new THREE.Vector3().crossVectors(tangent, upVector).normalize();
        if (curveNormal.lengthSq() < 0.001) {
          curveNormal = new THREE.Vector3(0, 0, 1);
        }

        // Blend curve normal with camera-facing direction for natural visibility
        const dirToCam = new THREE.Vector3().subVectors(camera.position, pos).normalize();
        if (curveNormal.dot(dirToCam) < 0) {
          curveNormal.negate();
        }

        const blendedForward = new THREE.Vector3()
          .copy(curveNormal)
          .multiplyScalar(0.42)
          .addScaledVector(dirToCam, 0.58)
          .normalize();

        card.group.position.copy(pos);
        card.group.lookAt(pos.clone().add(blendedForward));

        // Hover & Active States
        const isHovered = hoveredMesh === card.cardMesh;
        const isActive = activeId === card.property.id;

        // Scale lerp (1.08 on hover as requested)
        const targetScale = isHovered ? 1.08 : isActive ? 1.05 : 1.0;
        card.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.16);

        // Border highlighting
        if (isHovered) {
          card.borderMaterial.color.setHex(0xf59e0b); // Radiant gold
          card.borderMaterial.emissive.setHex(0xe8922d);
          card.borderMaterial.emissiveIntensity = 0.85;
        } else if (isActive) {
          card.borderMaterial.color.setHex(0xfbbf24);
          card.borderMaterial.emissive.setHex(0xe8922d);
          card.borderMaterial.emissiveIntensity = 0.6;
        } else {
          card.borderMaterial.color.setHex(0xdec282); // Luxury champagne gold
          card.borderMaterial.emissive.setHex(0x000000);
          card.borderMaterial.emissiveIntensity = 0.0;
        }
      });

      // 13. Raycaster Hover Check
      if (!isDragging && !isZooming) {
        raycaster.setFromCamera(pointerNDC, camera);
        const intersects = raycaster.intersectObjects(cardMeshes, false);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object as THREE.Mesh;
          const hitGroup = hitMesh.parent as THREE.Group;
          const property = hitGroup.userData.property as Property;

          if (hoveredMesh !== hitMesh) {
            hoveredMesh = hitMesh;
            setHoveredProperty(property);
          }
          container.style.cursor = 'pointer';
        } else {
          if (hoveredMesh !== null) {
            hoveredMesh = null;
            setHoveredProperty(null);
          }
          container.style.cursor = 'grab';
        }
      } else if (isDragging) {
        container.style.cursor = 'grabbing';
      }

      // 14. Floating Luxury Pill 2D Screen Positioning
      if (pillRef.current && hoveredMesh) {
        const hoveredGroup = hoveredMesh.parent as THREE.Group;
        if (hoveredGroup) {
          const worldPos = new THREE.Vector3();
          hoveredGroup.getWorldPosition(worldPos);

          // Project 3D coordinate to 2D screen coordinate
          const projected = worldPos.clone().project(camera);

          if (projected.z < 1) {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const screenX = ((projected.x + 1) / 2) * containerWidth;
            const screenY = ((-projected.y + 1) / 2) * containerHeight;

            // Offset above card center with viewport boundary clamping
            const pillWidth = 280;
            const pillHeight = 100;
            const posX = Math.max(16, Math.min(containerWidth - pillWidth - 16, screenX - pillWidth / 2));
            const posY = Math.max(16, Math.min(containerHeight - pillHeight - 16, screenY - pillHeight - 20));

            pillRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
            pillRef.current.style.opacity = '1';
          } else {
            pillRef.current.style.opacity = '0';
          }
        }
      } else if (pillRef.current) {
        pillRef.current.style.opacity = '0';
      }

      // 15. Camera Tweening Animation
      if (isZooming) {
        const elapsed = performance.now() - zoomStartTime;
        const progress = Math.min(1, elapsed / zoomDuration);

        // Smooth cubic ease out
        const ease = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(zoomStartCamPos, zoomTargetCamPos, ease);
        currentCameraLookAt.lerpVectors(zoomStartLookAt, zoomTargetLookAt, ease);
        camera.lookAt(currentCameraLookAt);

        // Trigger onSelectProperty ~400ms into the transition as required by brief
        if (elapsed >= 400 && !zoomCallbackTriggered && zoomTargetProperty) {
          zoomCallbackTriggered = true;
          onSelectPropertyRef.current(zoomTargetProperty);
        }

        if (progress >= 1) {
          isZooming = false;
        }
      }

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    // 16. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();

      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
      container.removeEventListener('wheel', handleWheel);

      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-auto touch-none select-none cursor-grab active:cursor-grabbing ${
        className || ''
      }`}
      style={{ minHeight: '100%' }}
    >
      {/* Floating Luxury Pill Overlay */}
      <div
        ref={pillRef}
        className="absolute top-0 left-0 z-30 transition-opacity duration-200 pointer-events-none opacity-0 will-change-transform"
        style={{ transform: 'translate3d(-9999px, -9999px, 0)' }}
      >
        {hoveredProperty && (
          <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-2xl bg-[#0A0E24]/90 backdrop-blur-xl border border-amber-500/40 shadow-2xl shadow-slate-950/60 text-white min-w-[260px] max-w-[320px]">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#E8922D] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8922D] animate-ping" />
                {hoveredProperty.categoryLabel[lang] || hoveredProperty.categoryLabel.en}
              </span>
              <span className="text-[11px] font-mono text-slate-300 font-bold">
                {hoveredProperty.startingPriceFormatted[lang] || hoveredProperty.startingPriceFormatted.en}
              </span>
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-tight leading-snug line-clamp-1">
              {hoveredProperty.name[lang] || hoveredProperty.name.en}
            </h4>
            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-0.5">
              <span className="truncate max-w-[180px]">
                {hoveredProperty.location[lang] || hoveredProperty.location.en}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#E8922D] font-semibold">
                <span>{lang === 'ar' ? 'استكشف' : 'Explore'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3D Ribbon HUD Navigation & Status Controls */}
      <div className="absolute bottom-20 sm:bottom-12 right-6 sm:right-10 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 pointer-events-auto">
        {/* Drag to Glide Guidance Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-[11px] text-slate-600 font-semibold">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#2D3E8C] animate-pulse" />
          <span>
            {lang === 'ar'
              ? 'اسحب للإبحار · عجلة الماوس للتصفح'
              : 'Drag to Glide · Scroll to Scrub'}
          </span>
        </div>

        {/* Reset Camera View Button (When Zoomed In) */}
        {isZoomedIn && (
          <button
            onClick={handleResetCamera}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full bg-[#2D3E8C] text-white font-semibold shadow-md hover:bg-[#1f2c68] transition-colors cursor-pointer"
            title={lang === 'ar' ? 'إعادة ضبط المنظور' : 'Reset Camera View'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'إعادة ضبط' : 'Overview'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SerpentineRibbonScene;
