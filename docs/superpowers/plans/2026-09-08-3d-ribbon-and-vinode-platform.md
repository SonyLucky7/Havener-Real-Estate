# 3D Serpentine Ribbon & Vinode Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxury real-estate web experience for Havener Property combining a 3D serpentine ribbon property gallery with click-to-zoom editorial showcase (inspired by the Dribbble reference) and comprehensive off-plan real estate sales features (inspired by Vinode.io).

**Architecture:** A Three.js WebGL 3D serpentine ribbon scene displaying floating property cards along an S-curve spline with inertia drag and click-to-zoom transitions. A dual-mode hero switcher allowing users to toggle between the 3D Ribbon and the 360° Architectural Tower. Clicking any property smoothly expands into an editorial project showcase with 3D floorplans, payment milestones, and dynamic PDF brochures. An investor yield & Golden Visa decision engine below.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Three.js (`three`), Tailwind CSS, `motion/react`, Lucide React.

**Spec:** `docs/superpowers/specs/2026-09-08-3d-ribbon-and-vinode-platform-design.md`

## Global Constraints
- Preserve brand color architecture: Royal Blue (`#2D3E8C`), Sunset Amber (`#E8922D`), Pure White (`#FFFFFF`), Deep Navy Ink (`#0A0E24`).
- Strict natural cursor rule: absolutely NO custom trailing mouse cursor follower ("not curser").
- Bilingual English + Arabic (`dir="rtl"`) support across all new components.
- Zero TypeScript and ESLint errors (`npm run lint` and `npm run build` must pass cleanly).

---

### Task 1: Enrich Property Data Model (`data/properties.ts`)

**Files:**
- Modify: `data/properties.ts`

**Interfaces:**
- Produces: Enhanced `Property` interface with `blueprintUrl`, `developer`, `floors`, `architecturalNarrative`, `architecturalNarrativeAr`, `dimensions`, `paymentPlan`, and Google Maps query coordinates.

- [ ] **Step 1: Extend the Property interface and mock data**
  Update `data/properties.ts` to include architectural narratives, high-resolution imagery, floorplan diagrams, and developer milestone structures for all featured properties.
- [ ] **Step 2: Verify type check**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.
- [ ] **Step 3: Commit changes**
  Run: `git add data/properties.ts && git commit -m "feat: enrich property data model with architectural narratives and payment milestones"`

---

### Task 2: Build Interactive 3D Serpentine Ribbon (`components/3d/SerpentineRibbonScene.tsx`)

**Files:**
- Create: `components/3d/SerpentineRibbonScene.tsx`

**Interfaces:**
- Produces: `<SerpentineRibbonScene onSelectProperty={(prop: Property) => void} activePropertyId?: string />`
- Interactivity: Touch/mouse horizontal drag with inertia damping, mouse scroll navigation along the spline, raycaster pointer hover & click detection.

- [ ] **Step 1: Create the Serpentine Ribbon Three.js component**
  Construct a Catmull-Rom 3D parametric S-curve spline in space. Generate 3D card planes textured with property imagery and metallic luxury border frames.
- [ ] **Step 2: Implement pointer drag, inertia physics, and raycasting**
  Support smooth dragging along the ribbon. Add hover tooltip/pill displaying project name and price, and click-to-zoom camera tween that focuses on the clicked card.
- [ ] **Step 3: Run linter check**
  Run: `npx eslint components/3d/SerpentineRibbonScene.tsx`
  Expected: 0 errors.
- [ ] **Step 4: Commit changes**
  Run: `git add components/3d/SerpentineRibbonScene.tsx && git commit -m "feat: create interactive 3D serpentine ribbon scene"`

---

### Task 3: Build Editorial Property Detail View (`components/properties/PropertyDetailView.tsx`)

**Files:**
- Create: `components/properties/PropertyDetailView.tsx`

**Interfaces:**
- Produces: `<PropertyDetailView property={property} onClose={() => void} onInquire={(prop) => void} />`
- Sections:
  - Editorial header with project name, location coordinates, developer credentials, and back button.
  - Full-width hero gallery with zoom transition.
  - Section (01) Architectural Narrative & Specifications.
  - Section (02) Interactive Floorplan / 3D Walkthrough Preview.
  - Section (03) Milestone Payment Schedule.
  - Dynamic PDF brochure generator action.
  - Direct VIP Concierge buttons (WhatsApp & Consultation modal).

- [ ] **Step 1: Implement the component layout and animations**
  Build the editorial view with `motion/react` spring transitions matching the reference video.
- [ ] **Step 2: Add dynamic PDF brochure generator and print stylesheet**
  Include a client-side print/PDF brochure download trigger that formats the property into a high-end luxury investor one-pager.
- [ ] **Step 3: Run linter check**
  Run: `npx eslint components/properties/PropertyDetailView.tsx`
  Expected: 0 errors.
- [ ] **Step 4: Commit changes**
  Run: `git add components/properties/PropertyDetailView.tsx && git commit -m "feat: implement editorial property detail view with floorplans and brochure generator"`

---

### Task 4: Upgrade Hero Section with Dual-Mode Switcher (`components/hero/HeroSection.tsx`)

**Files:**
- Modify: `components/hero/HeroSection.tsx`

**Interfaces:**
- Integrates both `SerpentineRibbonScene` and `LuxuryTowerScene`.
- Provides an animated pill toggle: `[ 3D Property Ribbon ]` / `[ 360° Architectural Tower ]`.
- Connects card selection directly to `PropertyDetailView`.

- [ ] **Step 1: Update HeroSection with mode switching and detail overlay**
  Wire the dual-mode switcher and handle property selection state.
- [ ] **Step 2: Verify responsive layouts on desktop and mobile**
  Ensure controls and typography remain legible and touch-friendly on all screen sizes.
- [ ] **Step 3: Commit changes**
  Run: `git add components/hero/HeroSection.tsx && git commit -m "feat: integrate dual-mode 3D hero with ribbon explorer and tower showcase"`

---

### Task 5: Build Investor Yield & Golden Visa Engine (`components/tools/InvestorCalculator.tsx`)

**Files:**
- Create: `components/tools/InvestorCalculator.tsx`
- Modify: `components/properties/PropertiesSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<InvestorCalculator />` with interactive investment sliders (Property Value, Anticipated Yield, 0% Tax Savings, UAE 10-Year Golden Visa Eligibility).
- Adds Vinode-style estate demo switchers and dynamic brochure links to the properties section.

- [ ] **Step 1: Create InvestorCalculator component**
  Implement the real-time financial math for Dubai real estate yields, capital appreciation, and tax comparisons.
- [ ] **Step 2: Integrate into main page flow**
  Add the calculator and update the properties section with instant brochure downloads.
- [ ] **Step 3: Run linter and build check**
  Run: `npm run lint && npm run build`
  Expected: 0 errors.
- [ ] **Step 4: Commit changes**
  Run: `git add components/tools/InvestorCalculator.tsx components/properties/PropertiesSection.tsx app/page.tsx && git commit -m "feat: add investor yield calculator and vinode-style estate tools"`

---

### Task 6: Full Verification & Polish

**Files:**
- Review all touched files.

- [ ] **Step 1: Run comprehensive ESLint audit**
  Run: `npm run lint` (must be 0 errors, 0 warnings).
- [ ] **Step 2: Run production Next.js build**
  Run: `npm run build` (must be exit code 0).
- [ ] **Step 3: Verify dev server response**
  Test `http://localhost:3000` via curl / Invoke-WebRequest (HTTP 200).
- [ ] **Step 4: Update walkthrough documentation**
  Update `walkthrough.md` with complete documentation and interactive verification instructions.
- [ ] **Step 5: Final git commit**
