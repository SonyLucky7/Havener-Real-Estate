# Design Specification: Havener Property 3D Serpentine Ribbon & Vinode Platform

## 1. Overview & Objective
Transform the **Havener Property | Dubai Luxury Living** digital presence into a world-class luxury real estate platform that combines:
1. **The 3D Serpentine Ribbon Hero Experience** (inspired by the Dribbble/WAUI architectural portfolio reference):
   - A WebGL 3D winding S-curve ribbon made of floating property snapshots.
   - Smooth horizontal drag/scroll navigation through 3D space with inertia damping.
   - Seamless click-to-zoom camera transition into full property details with editorial narrative, architectural blueprints, and specs.
2. **The Vinode.io Real Estate Platform Features**:
   - Dual hero toggle: "3D Property Ribbon" vs "360° Interactive Tower / Masterplan".
   - Dynamic estate category switcher (Off-Plan Mega-Projects, Waterfront Villas, Branded Sky Residences).
   - Interactive 3D floor plan and virtual tour previewer.
   - Dynamic PDF investor brochure download generator.
   - Real-time ROI and UAE Golden Visa eligibility calculator.
   - VIP WhatsApp concierge & private consultation integration.

---

## 2. Architectural Components

### A. Dual-Mode 3D Hero (`components/hero/HeroSection.tsx` & `components/3d/SerpentineRibbonScene.tsx`)
- **Serpentine Ribbon Scene (`SerpentineRibbonScene.tsx`)**:
  - Implemented using Three.js / WebGL.
  - Generates a 3D CatmullRom spline or parametric sinusoidal S-curve trajectory in 3D space.
  - Distributes high-resolution luxury Dubai property image planes along the spline with progressive yaw and pitch angles matching the winding curve.
  - Supports smooth touch/mouse drag horizontally and wheel scroll to glide along the ribbon.
  - Raycasting detects pointer hover and clicks on property cards:
    - On hover: Displays property card pill with name, location, and price.
    - On click: Triggers smooth camera tween zoom directly toward the selected property card, fades the surrounding ribbon, and opens the detailed editorial property showcase.
- **Hero Mode Switcher**:
  - A sleek pill toggle in the hero allows switching between:
    - **"3D Property Ribbon"**: Serpentine card gallery from the reference video.
    - **"3D Masterplan Tower"**: The 360° crystalline tower with Day/Sunset/Blueprint shaders and interactive hotspots.
- **Floating Luxury Header & Telemetry**:
  - Logo, navigation links, currency switcher (`AED`, `USD`, `EUR`, `GBP`), language toggle (`EN` / `AR` RTL).
  - Live Dubai time badge (GST UTC+4) and DLD Escrow status.

### B. Full Editorial Property Showcase (`components/properties/PropertyDetailView.tsx`)
- Triggered when any property is clicked from either the 3D Ribbon, the 3D Tower, or the Curated Properties grid.
- Follows the video's layout:
  - **Header Bar:** Project title (e.g. *The Palm Crown Waterfront Estate*), Dubai Google Maps coordinates link, and developer metadata (Client, Location, Handover, Architecture).
  - **Hero Media:** Full-width high-res architectural photography with subtle zoom and gallery thumbnails.
  - **Section (01) Narrative & Dimensions:** Editorial description with large architectural typography (e.g., `12,800 sq.ft` built-up area, private beach frontage, infinity pool).
  - **Section (02) Interactive 3D Floorplan & Virtual Walkthrough Preview:** Vinode-inspired 2D/3D floorplan toggle with room tags and dimensions.
  - **Section (03) Milestone Payment Structure:** Transparent breakdown (e.g., 20% down, 60% construction, 20% handover).
  - **Dynamic PDF Brochure Generator:** Client clicks to generate and download a branded PDF summary.
  - **Direct Concierge Action:** "Schedule Private Viewing" and "Inquire on WhatsApp" with pre-filled property reference.
  - **Back Navigation:** Smooth return button to resume exploring the 3D Ribbon or property grid.

### C. Platform Discovery & Conversion Suite (`components/properties/PropertiesSection.tsx`, `components/tools/InvestorCalculator.tsx`)
- **Estate Showcase Switcher (Vinode pattern):**
  - Instant filtering across *Off-Plan Mega Projects*, *Waterfront Mansions*, *Branded Sky Residences*, and *High-Yield Investments*.
- **Investor Decision Engine (`InvestorCalculator.tsx`):**
  - Interactive property price slider, anticipated annual capital growth, and rental yield calculation.
  - Instant UAE Golden Visa qualification badge (properties >= AED 2M).
  - 0% personal income and capital gains tax savings comparison against major global cities (London, New York, Singapore).
- **Comprehensive Multilingual Support:**
  - 100% synchronized English and Arabic (`dir="rtl"`) dictionaries for all new components, labels, and modals.

---

## 3. Data Model & Assets
- Expand `data/properties.ts` to include:
  - High-resolution architectural photography for each property.
  - Blueprint / floorplan diagram assets.
  - Detailed milestones, developer partner tags, and Google Maps query links.
  - Rich narrative copy for both English and Arabic.

---

## 4. Performance & UX Rules
- Maintain 60 FPS WebGL rendering with requestAnimationFrame loop management and resource cleanup on unmount.
- Natural cursor preserved: strict adherence to "not curser" (no trailing dots or artificial pointer replacement).
- Zero build errors (`npm run build`) and zero linter warnings (`npm run lint`).
