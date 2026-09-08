import { Property } from '@/lib/types';

interface BlueprintRoom {
  name: string;
  dims: string;
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean;
}

function buildBlueprintSvg(config: {
  title: string;
  sheetNo: string;
  level: string;
  scale?: string;
  rooms: BlueprintRoom[];
}): string {
  const roomsSvg = config.rooms
    .map((r) => {
      const fill = r.accent ? 'rgba(232, 146, 45, 0.14)' : 'rgba(45, 62, 140, 0.18)';
      const stroke = r.accent ? '#E8922D' : '#3B82F6';
      const strokeWidth = r.accent ? '2' : '1.5';
      const textFill = r.accent ? '#FBBF24' : '#93C5FD';
      const centerX = r.x + r.w / 2;
      const centerY = r.y + r.h / 2;
      return `
      <g>
        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" rx="3" />
        <line x1="${r.x + 8}" y1="${r.y + 8}" x2="${r.x + 18}" y2="${r.y + 8}" stroke="${stroke}" stroke-width="1" />
        <line x1="${r.x + 8}" y1="${r.y + 8}" x2="${r.x + 8}" y2="${r.y + 18}" stroke="${stroke}" stroke-width="1" />
        <line x1="${r.x + r.w - 8}" y1="${r.y + r.h - 8}" x2="${r.x + r.w - 18}" y2="${r.y + r.h - 8}" stroke="${stroke}" stroke-width="1" />
        <line x1="${r.x + r.w - 8}" y1="${r.y + r.h - 8}" x2="${r.x + r.w - 8}" y2="${r.y + r.h - 18}" stroke="${stroke}" stroke-width="1" />
        <text x="${centerX}" y="${centerY - 4}" font-family="monospace, sans-serif" font-size="11" font-weight="600" fill="${textFill}" text-anchor="middle" letter-spacing="0.8">${r.name}</text>
        <text x="${centerX}" y="${centerY + 14}" font-family="monospace, sans-serif" font-size="9" fill="rgba(147, 197, 253, 0.75)" text-anchor="middle" letter-spacing="0.5">${r.dims}</text>
      </g>`;
    })
    .join('');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="100%" height="100%">
  <defs>
    <pattern id="grid-20-${config.sheetNo}" width="20" height="20" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(59, 130, 246, 0.08)" stroke-width="0.5" />
      <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(59, 130, 246, 0.08)" stroke-width="0.5" />
    </pattern>
    <pattern id="grid-100-${config.sheetNo}" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="url(#grid-20-${config.sheetNo})" />
      <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(59, 130, 246, 0.18)" stroke-width="1" />
      <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(59, 130, 246, 0.18)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1000" height="700" fill="#080D1A" />
  <rect width="1000" height="700" fill="url(#grid-100-${config.sheetNo})" />

  <!-- Outer Technical Border -->
  <rect x="20" y="20" width="960" height="660" fill="none" stroke="#2D3E8C" stroke-width="1.5" />
  <rect x="25" y="25" width="950" height="650" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="0.75" />

  <!-- CAD Registration Crosshairs -->
  <g stroke="#E8922D" stroke-width="1">
    <path d="M 20 20 L 35 20 M 20 20 L 20 35" />
    <path d="M 980 20 L 965 20 M 980 20 L 980 35" />
    <path d="M 20 680 L 35 680 M 20 680 L 20 665" />
    <path d="M 980 680 L 965 680 M 980 680 L 980 665" />
  </g>

  <!-- Compass Rose -->
  <g transform="translate(920, 65)">
    <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(59, 130, 246, 0.4)" stroke-width="1" />
    <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(232, 146, 45, 0.3)" stroke-width="0.75" />
    <polygon points="0,-22 5,-3 0,0 -5,-3" fill="#E8922D" />
    <polygon points="0,22 5,3 0,0 -5,3" fill="rgba(59, 130, 246, 0.5)" />
    <polygon points="22,0 3,5 0,0 3,-5" fill="rgba(59, 130, 246, 0.5)" />
    <polygon points="-22,0 -3,5 0,0 -3,-5" fill="rgba(59, 130, 246, 0.5)" />
    <text x="0" y="-26" font-family="monospace, sans-serif" font-size="10" font-weight="bold" fill="#E8922D" text-anchor="middle">N</text>
  </g>

  <!-- Scale Bar & Coordinate Markers -->
  <g transform="translate(45, 650)">
    <line x1="0" y1="0" x2="160" y2="0" stroke="#93C5FD" stroke-width="1.5" />
    <line x1="0" y1="-5" x2="0" y2="5" stroke="#93C5FD" stroke-width="1.5" />
    <line x1="40" y1="-3" x2="40" y2="3" stroke="#93C5FD" stroke-width="1" />
    <line x1="80" y1="-5" x2="80" y2="5" stroke="#93C5FD" stroke-width="1.5" />
    <line x1="120" y1="-3" x2="120" y2="3" stroke="#93C5FD" stroke-width="1" />
    <line x1="160" y1="-5" x2="160" y2="5" stroke="#93C5FD" stroke-width="1.5" />
    <text x="0" y="14" font-family="monospace, sans-serif" font-size="8" fill="rgba(147, 197, 253, 0.7)">0m</text>
    <text x="75" y="14" font-family="monospace, sans-serif" font-size="8" fill="rgba(147, 197, 253, 0.7)">10m</text>
    <text x="150" y="14" font-family="monospace, sans-serif" font-size="8" fill="rgba(147, 197, 253, 0.7)">20m</text>
    <text x="195" y="4" font-family="monospace, sans-serif" font-size="9" fill="#93C5FD" letter-spacing="1">SCALE 1:100 METRIC</text>
  </g>

  <!-- Rooms and Architectural Layout -->
  ${roomsSvg}

  <!-- Structural Dimension Lines -->
  <g stroke="rgba(147, 197, 253, 0.35)" stroke-width="0.8" stroke-dasharray="3,3">
    <line x1="50" y1="565" x2="950" y2="565" />
    <line x1="50" y1="560" x2="50" y2="570" stroke="rgba(147, 197, 253, 0.7)" stroke-width="1.5" stroke-dasharray="none" />
    <line x1="950" y1="560" x2="950" y2="570" stroke="rgba(147, 197, 253, 0.7)" stroke-width="1.5" stroke-dasharray="none" />
    <text x="500" y="560" font-family="monospace, sans-serif" font-size="9" fill="#93C5FD" text-anchor="middle">TOTAL AXIS SPAN: 48.00m</text>
  </g>

  <!-- Title Block (Bottom Right) -->
  <g transform="translate(620, 580)">
    <rect width="345" height="85" fill="#0A1128" stroke="#2D3E8C" stroke-width="1.5" rx="2" />
    <line x1="0" y1="32" x2="345" y2="32" stroke="rgba(59, 130, 246, 0.3)" stroke-width="1" />
    <line x1="220" y1="32" x2="220" y2="85" stroke="rgba(59, 130, 246, 0.3)" stroke-width="1" />
    
    <text x="15" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#E8922D" letter-spacing="1.5">HAVENER PROPERTY DUBAI</text>
    <text x="15" y="27" font-family="monospace, sans-serif" font-size="7.5" fill="rgba(147, 197, 253, 0.6)">ARCHITECTURAL SCHEMATICS &amp; SPECIFICATION</text>
    <text x="330" y="20" font-family="monospace, sans-serif" font-size="9" font-weight="bold" fill="#3B82F6" text-anchor="end">${config.sheetNo}</text>
    
    <text x="15" y="47" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF">${config.title}</text>
    <text x="15" y="60" font-family="monospace, sans-serif" font-size="8" fill="#93C5FD">${config.level}</text>
    <text x="15" y="73" font-family="monospace, sans-serif" font-size="7.5" fill="rgba(147, 197, 253, 0.5)">STATUS: DLD APPROVED · SCHEMATIC DESIGN</text>
    
    <text x="230" y="48" font-family="monospace, sans-serif" font-size="8" fill="rgba(147, 197, 253, 0.6)">SCALE</text>
    <text x="230" y="60" font-family="monospace, sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF">${config.scale || '1:100 @ A1'}</text>
    <text x="230" y="73" font-family="monospace, sans-serif" font-size="7.5" fill="#E8922D">REV 04.2026</text>
  </g>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'palm-crown-residence',
    slug: 'the-palm-crown-residence',
    name: {
      en: 'The Palm Crown Residence',
      ar: 'ذا بالم كراون ريزيدنس',
    },
    category: 'waterfront',
    categoryLabel: {
      en: 'Waterfront Villa',
      ar: 'فيلا واجهة بحرية',
    },
    location: {
      en: 'Palm Jumeirah, Dubai',
      ar: 'نخلة جميرا، دبي',
    },
    subLocation: {
      en: 'Frond M · Private Beachfront',
      ar: 'السعفة M · شاطئ خاص',
    },
    type: {
      en: 'Signature Beachfront Villa',
      ar: 'فيلا شاطئية مميزة',
    },
    priceAED: 48500000,
    priceUSD: 13200000,
    startingPriceFormatted: {
      en: 'AED 48.5M',
      ar: '48.5 مليون درهم',
    },
    paymentPlan: {
      en: '60/40 On Handover',
      ar: '60/40 عند التسليم',
    },
    paymentMilestones: [
      { stage: { en: 'Down Payment', ar: 'الدفعة الأولى' }, percentage: 20 },
      { stage: { en: 'During Construction', ar: 'أثناء البناء' }, percentage: 40 },
      { stage: { en: 'On Handover', ar: 'عند التسليم' }, percentage: 40 },
    ],
    completion: {
      en: 'Q4 2026',
      ar: 'الربع الرابع 2026',
    },
    developer: 'Select Private Development',
    bedrooms: {
      en: '6 Bedrooms + Staff',
      ar: '6 غرف نوم + أجنحة الخدمة',
    },
    sizeSqFt: '11,850 sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    ],
    investmentPositioning: {
      en: 'Rare Palm Jumeirah private beachfront plot with uninterrupted Arabian Gulf vistas, designed for generational capital preservation.',
      ar: 'قطعة أرض نادرة على شاطئ نخلة جميرا الخاص مع إطلالات خلابة على الخليج العربي، صُممت لحفظ القيمة والثروة للأجيال.',
    },
    highlights: {
      en: [
        'Private 120ft shoreline with yacht access',
        'Custom Travertine and Italian marble finishes',
        'Dual cantilever infinity pools & private cinema',
        'Turnkey designer interior furnishing',
      ],
      ar: [
        'واجهة شاطئية خاصة بطول 120 قدم مع إمكانية وصول اليخوت',
        'تشطيبات فاخرة من الترافرتين والرخام الإيطالي',
        'حمام سباحة مزدوج بتصميم معلق وسينما خاصة',
        'تأثيث داخلي متكامل بأرقى المعايير العالمية',
      ],
    },
    description: {
      en: 'A masterwork of contemporary architectural purity. Set upon a prime frond of Palm Jumeirah, this villa blends floor-to-ceiling acoustic glazing with sculpted volcanic stone, framing panoramic sunsets across the open waters of the Gulf.',
      ar: 'تحفة معمارية معاصرة تجمع بين الصفاء والحداثة. تقع على إحدى أبرز سعفات نخلة جميرا، وتدمج الواجهات الزجاجية العازلة للصوت مع الأحجار المنحوتة لإطلالات بانورامية ساحرة على غروب الخليج.',
    },
    tag: {
      en: 'Exclusive Listing',
      ar: 'عرض حصري',
    },
    scope: {
      en: 'Architecture, Interior Design & Landscape',
      ar: 'الهندسة المعمارية، التصميم الداخلي وتنسيق الحدائق',
    },
    mapUrl: 'https://maps.google.com/?q=Palm+Jumeirah+Dubai',
    blueprintUrl: buildBlueprintSvg({
      title: 'THE PALM CROWN RESIDENCE',
      sheetNo: 'DWG-PC-01',
      level: 'GROUND LEVEL & PRIVATE BEACHFRONT',
      rooms: [
        { name: 'GRAND DOUBLE-HEIGHT FOYER', dims: '8.4m × 6.8m', x: 380, y: 350, w: 240, h: 140 },
        { name: 'FORMAL OCEAN SALON & GALLERY', dims: '14.2m × 8.6m', x: 300, y: 170, w: 400, h: 160 },
        { name: 'PRIMARY MASTER WING', dims: '10.5m × 7.2m', x: 80, y: 170, w: 200, h: 210, accent: true },
        { name: 'CHEF SHOW KITCHEN & DINING', dims: '9.4m × 6.2m', x: 720, y: 170, w: 200, h: 170 },
        { name: 'CANTILEVER INFINITY LAP POOL', dims: '22.0m × 5.4m', x: 220, y: 65, w: 560, h: 80, accent: true },
        { name: 'PRIVATE BEACHFRONT DECK & JETTY', dims: '36.0m SHORELINE', x: 160, y: 18, w: 680, h: 36 },
        { name: 'WELLNESS SPA & PRIVATE GYM', dims: '7.8m × 6.0m', x: 80, y: 400, w: 200, h: 140 },
        { name: 'SERVICE SUITE & STAFF QUARTERS', dims: '8.2m × 5.6m', x: 720, y: 360, w: 200, h: 180 },
      ],
    }),
    architecturalNarrative: {
      en: 'Conceived as an organic dialogue between solid travertine volumes and the transparent horizon of the Arabian Gulf. The residence employs continuous floor-to-ceiling acoustic glass curtains recessed into monolithic fluted stone portals, creating uninterrupted sightlines from the double-height grand gallery directly to the water edge. Handcrafted basalt terraces float across dual cantilevered reflection pools, while interior spaces are sculpted with brushed bronze accents, bookmatched Calacatta marble, and automated solar-louvered pergolas engineered for optimal climate moderation.',
      ar: 'صُممت هذه الإقامة لتجسد حواراً متناغماً بين كتل الترافرتين الصلبة والأفق المفتوح للخليج العربي. تعتمد الفيلا واجهات زجاجية ممتدة عازلة للصوت مدمجة ببراعة داخل بوابات حجرية منحوتة، مما يتيح إطلالات بصرية مستمرة من البهو المزدوج الارتفاع نحو الشاطئ الخاص مباشرة. تطفو التراسات البازلتية فوق مسابح إنفينيتي معلقة، بينما تتألق المساحات الداخلية بلمسات برونزية ورخام كالاكاتا الإيطالي مع مظلات شمسية ذكية تضمن أقصى درجات الراحة والمناخ المثالي.',
    },
    dimensions: {
      builtUpArea: '11,850 sq.ft',
      plotArea: '15,400 sq.ft',
      ceilingHeight: '4.2m - 7.5m (Double-Height Gallery)',
    },
    virtualTourAvailable: true,
    expectedRoi: '8.4% Net Projected',
  },
  {
    id: 'palm-jebel-ali-ocean-estates',
    slug: 'palm-jebel-ali-ocean-estates',
    name: {
      en: 'Palm Jebel Ali Ocean Estates',
      ar: 'قصور المحيط في نخلة جبل علي',
    },
    category: 'off-plan',
    categoryLabel: {
      en: 'Off-Plan Mega Project',
      ar: 'مشروع رئيسي قيد الإنشاء',
    },
    location: {
      en: 'Palm Jebel Ali, Dubai',
      ar: 'نخلة جبل علي، دبي',
    },
    subLocation: {
      en: 'Cove Sector · Frond E',
      ar: 'قطاع الكوف · السعفة E',
    },
    type: {
      en: 'Ultra-Luxury Island Villa',
      ar: 'فيلا جزيرة فائقة الفخامة',
    },
    priceAED: 24000000,
    priceUSD: 6530000,
    startingPriceFormatted: {
      en: 'AED 24.0M',
      ar: '24.0 مليون درهم',
    },
    paymentPlan: {
      en: '80/20 Phased Schedule',
      ar: '80/20 جدول زمني مرحلي',
    },
    paymentMilestones: [
      { stage: { en: 'Booking Deposit', ar: 'دفعة الحجز' }, percentage: 20 },
      { stage: { en: 'Linked to Construction', ar: 'مرتبطة بالإنشاء' }, percentage: 60 },
      { stage: { en: 'Upon Completion', ar: 'عند الإنجاز' }, percentage: 20 },
    ],
    completion: {
      en: 'Q3 2027',
      ar: 'الربع الثالث 2027',
    },
    developer: 'Nakheel Master Development',
    bedrooms: {
      en: '5 & 6 Bedrooms',
      ar: '5 و 6 غرف نوم',
    },
    sizeSqFt: '9,450 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
    ],
    investmentPositioning: {
      en: 'Flagship off-plan entry into Dubai’s next maritime frontier. Unrivaled capital growth horizon as infrastructure unfolds across the island.',
      ar: 'فرصة استثمارية رائدة قيد الإنشاء في الواجهة البحرية الأبرز القادمة لدبي، مع أفق استثنائي لنمو رأس المال بالتزامن مع اكتمال البنية التحتية.',
    },
    highlights: {
      en: [
        'Twice the coastline footprint of Palm Jumeirah',
        'Smart sustainable island infrastructure',
        'Private beach frontage for every villa',
        'High institutional demand and limited supply',
      ],
      ar: [
        'ضعف المساحة الساحلية لنخلة جميرا',
        'بنية تحتية ذكية ومستدامة للجزيرة',
        'واجهة شاطئية خاصة لكل فيلا',
        'طلب مؤسسي مرتفع مع معروض حصري محدود',
      ],
    },
    description: {
      en: 'The resurgence of Dubai’s visionary archipelago. Offering generous plots and floorplans engineered for elevated open-air living, these residences celebrate sea-facing minimalism.',
      ar: 'عودة الأرخبيل الأسطوري لدبي برؤية مستقبلية متجددة. مساحات شاسعة وتصاميم هندسية تعزز أسلوب الحياة الراقي في الهواء الطلق مع إطلالة بحرية خلابة.',
    },
    tag: {
      en: 'High Growth Potential',
      ar: 'إمكانية نمو استثنائية',
    },
    scope: {
      en: 'Masterplanning, Structural Concept & Coastal Living',
      ar: 'المخطط الرئيسي، المفهوم الإنشائي والمعيشة الساحلية',
    },
    mapUrl: 'https://maps.google.com/?q=Palm+Jebel+Ali+Dubai',
    blueprintUrl: buildBlueprintSvg({
      title: 'PALM JEBEL ALI OCEAN ESTATES',
      sheetNo: 'DWG-PJA-02',
      level: 'COVE SECTOR · OCEAN ESTATE LAYOUT',
      rooms: [
        { name: 'CENTRAL WATER COURTYARD', dims: '7.5m × 7.5m', x: 410, y: 330, w: 180, h: 160, accent: true },
        { name: 'SEA-FACING GRAND LOUNGE', dims: '15.0m × 7.8m', x: 270, y: 165, w: 460, h: 145 },
        { name: 'COASTAL MASTER SUITE', dims: '9.6m × 6.8m', x: 70, y: 165, w: 180, h: 210, accent: true },
        { name: 'GOURMET KITCHEN & OCEAN DINING', dims: '8.8m × 6.5m', x: 750, y: 165, w: 180, h: 165 },
        { name: 'RADIAL OCEAN INFINITY POOL', dims: '24.0m × 5.0m', x: 210, y: 65, w: 580, h: 80, accent: true },
        { name: 'PRIVATE DUNE BEACH BOARDWALK', dims: '42.0m SHORELINE', x: 150, y: 18, w: 700, h: 34 },
        { name: 'FAMILY MAJLIS & MEDIA SALON', dims: '8.4m × 6.2m', x: 70, y: 395, w: 210, h: 145 },
        { name: '4-BAY VEHICLE GALLERY & STAFF', dims: '10.5m × 7.2m', x: 710, y: 350, w: 220, h: 190 },
      ],
    }),
    architecturalNarrative: {
      en: 'Pioneering Dubai’s next maritime paradigm on the newly shaped fronds of Palm Jebel Ali. The architectural scheme synthesizes curvilinear parametric canopies with natural coral-tone limestone and marine-grade brushed steel. The layout unfolds around a central water courtyard that naturally induces cross-ventilation, drawing sea breezes deep into private family lounges. Expansive shaded cantilevers shield the open-air entertainment decks, establishing an intimate threshold where private sands meet the tranquil azure waters.',
      ar: 'تؤسس هذه الإقامة لنمط المعيشة البحرية المستقبلي على سعفات نخلة جبل علي الأيقونية. يدمج المفهوم المعماري المظلات المنحنية الانسيابية مع الحجر الجيري بدرجات المرجان الطبيعي والفولاذ المقاوم للعوامل البحرية. يلتف المخطط المعماري حول فناء مائي مركزي يولد نسيم البحر الطبيعي في كافة الأجنحة والصالات العائلية، مع أسقف معلقة رحبة تظلل منصات الاستجمام الخارجية لتندمج الرمال الخاصة بالمياه الهادئة بانسيابية تامة.',
    },
    dimensions: {
      builtUpArea: '9,450 sq.ft',
      plotArea: '13,200 sq.ft',
      ceilingHeight: '3.8m - 6.8m',
    },
    virtualTourAvailable: true,
    expectedRoi: '9.2% Capital Growth Horizon',
  },
  {
    id: 'damac-island-beachfront-villas',
    slug: 'damac-island-beachfront-villas',
    name: {
      en: 'Damac Island Beachfront Villas',
      ar: 'فلل داماك آيلاند الشاطئية',
    },
    category: 'villas',
    categoryLabel: {
      en: 'Luxury Villas',
      ar: 'فلل فاخرة',
    },
    location: {
      en: 'Dubailand / Water Corridor',
      ar: 'دبي لاند / الممر المائي',
    },
    subLocation: {
      en: 'Crystal Island Central Cluster',
      ar: 'المجمع المركزي للجزيرة الكريستالية',
    },
    type: {
      en: 'Island Resort Residence',
      ar: 'إقامة منتجع على الجزيرة',
    },
    priceAED: 9200000,
    priceUSD: 2500000,
    startingPriceFormatted: {
      en: 'AED 9.2M',
      ar: '9.2 مليون درهم',
    },
    paymentPlan: {
      en: '70/30 Flexible Schedule',
      ar: '70/30 جدول سداد مرن',
    },
    paymentMilestones: [
      { stage: { en: 'Immediate Down Payment', ar: 'الدفعة الأولى الفورية' }, percentage: 20 },
      { stage: { en: 'Staged Installments', ar: 'أقساط مرحلية' }, percentage: 50 },
      { stage: { en: 'Final Handover', ar: 'التسليم النهائي' }, percentage: 30 },
    ],
    completion: {
      en: 'Q1 2028',
      ar: 'الربع الأول 2028',
    },
    developer: 'Damac Properties',
    bedrooms: {
      en: '4 to 6 Bedrooms',
      ar: '4 إلى 6 غرف نوم',
    },
    sizeSqFt: '5,800 - 8,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    ],
    investmentPositioning: {
      en: 'Resort-style master community designed for high family rental yield and long-term liquidity.',
      ar: 'مجتمع متكامل على طراز المنتجعات مصمم لتحقيق عائد إيجاري عائلي مرتفع وسيولة استثمارية طويلة المدى.',
    },
    highlights: {
      en: [
        'Crystal lagoons with private sandy shores',
        'Island clubhouse and wellness pavilion',
        'Flexible 5-year post-handover options available',
        'Direct access to major Dubai arterial highways',
      ],
      ar: [
        'بحيرات كريستالية مع شواطئ رملية خاصة',
        'نادي الجزيرة الاجتماعي ومركز صحي متكامل',
        'خيارات سداد مرنة لما بعد التسليم متوفرة',
        'وصول مباشر إلى أهم الشرايين والطرق السريعة بدبي',
      ],
    },
    description: {
      en: 'Designed around navigable turquoise waters, the Damac Island residences offer tropical elegance reimagined for Dubai. A sanctuary of balance with lush foliage and open courtyards.',
      ar: 'صُممت حول مياه تركوازية رقراقة، وتقدم إقامة تجمع بين الأناقة الاستوائية وطبيعة دبي الراقية في بيئة محاطة بالمساحات الخضراء والحدائق المفتوحة.',
    },
    tag: {
      en: 'Resort Lifestyle',
      ar: 'أسلوب حياة المنتجعات',
    },
    scope: {
      en: 'Resort Architecture & Biophilic Landscape',
      ar: 'العمارة المنتجعيه وتنسيق الحدائق الحيوية',
    },
    mapUrl: 'https://maps.google.com/?q=Damac+Islands+Dubailand+Dubai',
    blueprintUrl: buildBlueprintSvg({
      title: 'DAMAC ISLAND BEACHFRONT VILLAS',
      sheetNo: 'DWG-DI-03',
      level: 'ISLAND CLUSTER · RESORT VILLA PLAN',
      rooms: [
        { name: 'BIOPHILIC ENTRY & ATRIUM', dims: '6.5m × 6.5m', x: 410, y: 340, w: 180, h: 150 },
        { name: 'OPEN RESORT LIVING PAVILION', dims: '13.5m × 7.2m', x: 300, y: 170, w: 400, h: 150 },
        { name: 'LAGOON MASTER SUITE', dims: '8.4m × 6.4m', x: 80, y: 175, w: 200, h: 185, accent: true },
        { name: 'ISLAND SHOW KITCHEN', dims: '7.8m × 6.0m', x: 720, y: 175, w: 200, h: 150 },
        { name: 'TURQUOISE LAGOON PLUNGE POOL', dims: '18.5m × 4.8m', x: 250, y: 65, w: 500, h: 85, accent: true },
        { name: 'SUNKEN FIRE PIT LOUNGE', dims: '5.5m × 5.5m', x: 380, y: 15, w: 240, h: 38 },
        { name: 'WELLNESS SPA & STEAM PAVILION', dims: '6.8m × 5.2m', x: 80, y: 380, w: 200, h: 140 },
        { name: 'GUEST SUITE & STAFF QUARTERS', dims: '7.4m × 5.8m', x: 720, y: 345, w: 200, h: 175 },
      ],
    }),
    architecturalNarrative: {
      en: 'Conceived as an exclusive island sanctuary anchored within turquoise lagoons. The villas feature biophilic architectural envelopes with cascading vertical gardens, textured sandstone facades, and seamless indoor-outdoor floor transitions. Floorplates maximize water engagement through sunken fire-pit lounges, private plunge pools, and private crystalline beach access, while the upper-level sky observatories capture uninterrupted 360-degree views over the lush central archipelago.',
      ar: 'ملاذ جزيرة استثنائي يتوسط بحيرات كريستالية زرقاء ساحرة. يتميز التصميم المعماري بلمسات بيوفيلية متناغمة مع الطبيعة تتضمن حدائق رأسية متدرجة، واجهات من الحجر الرملي، وانتقالاً انسيابياً بين المساحات الداخلية والخارجية. تفتح المخططات الأرضية مباشرة على المياه مع جلسات غائرة بمواقد نار ومسابح خاصة، بينما تتيح منصات المراقبة العلوية إطلالات بانورامية بزاوية 360 درجة على الأرخبيل الأخضر.',
    },
    dimensions: {
      builtUpArea: '7,420 sq.ft',
      plotArea: '9,800 sq.ft',
      ceilingHeight: '3.6m - 4.5m',
    },
    virtualTourAvailable: true,
    expectedRoi: '8.8% Gross Rental Yield',
  },
  {
    id: 'bugatti-residences-binghatti',
    slug: 'bugatti-residences-binghatti',
    name: {
      en: 'Bugatti Residences by Binghatti',
      ar: 'بوجاتي ريزيدنسز من بن غاطي',
    },
    category: 'branded',
    categoryLabel: {
      en: 'Branded Ultra-Luxury',
      ar: 'إقامة علامة تجارية فائقة الفخامة',
    },
    location: {
      en: 'Business Bay, Dubai',
      ar: 'الخليج التجاري، دبي',
    },
    subLocation: {
      en: 'Canal District · Prime Elevation',
      ar: 'منطقة القناة المائية · موقع مميز',
    },
    type: {
      en: 'Sky Mansion & Branded Penthouses',
      ar: 'قصر معلق وبنتهاوس علامة تجارية',
    },
    priceAED: 36000000,
    priceUSD: 9800000,
    startingPriceFormatted: {
      en: 'AED 36.0M',
      ar: '36.0 مليون درهم',
    },
    paymentPlan: {
      en: '70/30 Linked Construction',
      ar: '70/30 مرتبط بمراحل البناء',
    },
    paymentMilestones: [
      { stage: { en: 'Down Payment', ar: 'الدفعة الأولى' }, percentage: 25 },
      { stage: { en: 'Construction Schedule', ar: 'جدول مراحل البناء' }, percentage: 45 },
      { stage: { en: 'Handover & Key Delivery', ar: 'التسليم وتسليم المفتاح' }, percentage: 30 },
    ],
    completion: {
      en: 'Q4 2026',
      ar: 'الربع الرابع 2026',
    },
    developer: 'Binghatti in Partnership with Bugatti',
    bedrooms: {
      en: '2 to 4 Bedrooms & Sky Mansions',
      ar: '2 إلى 4 غرف نوم وقصور معلقة',
    },
    sizeSqFt: '4,200 - 14,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
    ],
    investmentPositioning: {
      en: 'World’s first automotive-branded skyscraper by Bugatti. Ultra-exclusive asset class traded among international collectors and billionaires.',
      ar: 'أول ناطحة سحاب في العالم تحمل توقيع علامة بوجاتي للسيارات الخارقة. فئة أصول نادرة يتداولها جامعو التحف والمليارديرات حول العالم.',
    },
    highlights: {
      en: [
        'Private vehicular car-lift direct to sky garages',
        'Riviera-inspired artificial beach terrace on high floor',
        'Private chef, sommelier, and bespoke concierge',
        'Unobstructed Downtown & Dubai Canal vistas',
      ],
      ar: [
        'مصعد سيارات مخصص لنقل المركبات مباشرة إلى المرآب بالبنتهاوس',
        'شاطئ اصطناعي مستوحى من الريفييرا الفرنسية في الطوابق العليا',
        'طاهٍ خاص وخدمات كونسيرج مخصصة على مدار الساعة',
        'إطلالات مفتوحة على وسط مدينة دبي وقناة دبي المائية',
      ],
    },
    description: {
      en: 'Aerodynamic curves reminiscent of the Bugatti Chiron sculpted into Dubai’s skyline. Each sky mansion features custom craftsmanship, private pools, and bespoke vehicular displays.',
      ar: 'انحناءات ديناميكية هوائية مستوحاة من سيارة بوجاتي تشيرون منحوتة في أفق دبي. يتميز كل قصر معلق بحرفية متقنة ومسابح خاصة وإطلالات بانورامية لا تُضاهى.',
    },
    tag: {
      en: 'Trophy Asset',
      ar: 'أصل استثماري فريد',
    },
    scope: {
      en: 'Automotive Couture Architecture & Bespoke Engineering',
      ar: 'العمارة المستوحاة من كوتور السيارات الخارقة والهندسة المخصصة',
    },
    mapUrl: 'https://maps.google.com/?q=Bugatti+Residences+by+Binghatti+Business+Bay+Dubai',
    blueprintUrl: buildBlueprintSvg({
      title: 'BUGATTI RESIDENCES SKY MANSION',
      sheetNo: 'DWG-BR-04',
      level: 'CANAL DISTRICT · SKY MANSION PENTHOUSE',
      rooms: [
        { name: 'HIGH-SPEED VEHICULAR CAR LIFT', dims: '6.0m × 4.2m', x: 420, y: 375, w: 160, h: 140, accent: true },
        { name: 'SUPERCAR IN-RESIDENCE GALLERY', dims: '11.0m × 6.5m', x: 300, y: 220, w: 400, h: 140 },
        { name: 'RIVIERA SKY POOL TERRACE', dims: '20.0m × 5.2m', x: 200, y: 65, w: 600, h: 80, accent: true },
        { name: 'GRAND MASTER SKY SUITE', dims: '10.2m × 7.5m', x: 70, y: 160, w: 210, h: 220, accent: true },
        { name: 'BESPOKE DINING & SOMMELIER CELLAR', dims: '9.0m × 6.4m', x: 720, y: 160, w: 210, h: 180 },
        { name: 'CANTILEVER CANAL VIEW POOL', dims: '12.0m × 3.5m', x: 240, y: 15, w: 340, h: 36, accent: true },
        { name: 'PRIVATE SPA & CRYO SUITE', dims: '7.5m × 5.6m', x: 70, y: 400, w: 210, h: 130 },
        { name: 'BUTLER SERVICE & CONCIERGE HUB', dims: '8.0m × 6.0m', x: 720, y: 360, w: 210, h: 160 },
      ],
    }),
    architecturalNarrative: {
      en: 'An unprecedented fusion of hypercar aerodynamics and haute-living skyscraper engineering. The façade’s fluid parametric contours evoke the iconic Bugatti C-line and aerodynamics of the Chiron, clad in fluid titanium-infused composite panels. Inside, each Sky Mansion is served by high-speed vehicular lifts that deliver collector hypercars directly into climate-controlled penthouse glass galleries. Private infinity pools jut daringly over the Business Bay canal, flanked by French Riviera sand-textured terraces.',
      ar: 'اندماج ثوري بين الديناميكا الهوائية للسيارات الخارقة وأرقى هندسة لناطحات السحاب الفاخرة. تعكس الخطوط الانسيابية للواجهة انحناءة بوجاتي الشهيرة وحركة تشيرون، مغلفة بألواح التيتانيوم المتطورة. في الداخل، تتصل القصور المعلقة بمصاعد سيارات فائقة السرعة تنقل السيارات النادرة مباشرة إلى صالات عرض زجاجية مكيفة داخل البنتهاوس، مع مسابح إنفينيتي تتدلى بجرأة فوق قناة دبي المائية وشرفات رملية مستوحاة من الريفييرا الفرنسية.'
    },
    dimensions: {
      builtUpArea: '10,800 sq.ft',
      plotArea: 'Full Floor Sky Penthouse',
      ceilingHeight: '4.5m - 8.2m (Cathedral Living Salon)',
    },
    virtualTourAvailable: true,
    expectedRoi: '11.5% Asset Appreciation',
  },
  {
    id: 'downtown-sky-horizon',
    slug: 'downtown-sky-horizon',
    name: {
      en: 'Downtown Sky Horizon',
      ar: 'داون تاون سكاي هورايزون',
    },
    category: 'apartments',
    categoryLabel: {
      en: 'Luxury Apartment',
      ar: 'شقة فاخرة',
    },
    location: {
      en: 'Downtown Dubai',
      ar: 'وسط مدينة دبي',
    },
    subLocation: {
      en: 'Burj Khalifa District · Direct Mall Link',
      ar: 'منطقة برج خليفة · اتصال مباشر بدبي مول',
    },
    type: {
      en: 'High-Rise Architectural Residence',
      ar: 'إقامة معمارية شاهقة الارتفاع',
    },
    priceAED: 4800000,
    priceUSD: 1307000,
    startingPriceFormatted: {
      en: 'AED 4.8M',
      ar: '4.8 مليون درهم',
    },
    paymentPlan: {
      en: '60/40 Construction Linked',
      ar: '60/40 مرتبط بالإنشاء',
    },
    paymentMilestones: [
      { stage: { en: 'Reservation', ar: 'الحجز المبدئي' }, percentage: 10 },
      { stage: { en: 'During Construction', ar: 'خلال مراحل البناء' }, percentage: 50 },
      { stage: { en: 'Handover Delivery', ar: 'تسليم المفاتيح' }, percentage: 40 },
    ],
    completion: {
      en: 'Q2 2027',
      ar: 'الربع الثاني 2027',
    },
    developer: 'Emaar Hospitality & Residential',
    bedrooms: {
      en: '1 to 3 Bedrooms',
      ar: '1 إلى 3 غرف نوم',
    },
    sizeSqFt: '1,150 - 2,850 sq.ft',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    ],
    investmentPositioning: {
      en: 'Direct climate-controlled connectivity to Dubai Metro and Dubai Mall. Consistent prime rental demand from global executives and high-net-worth visitors.',
      ar: 'اتصال مباشر ومكيف بمحطة مترو دبي ودبي مول. طلب إيجاري عالمي مستمر من كبار التنفيذيين والمستثمرين الدوليين.',
    },
    highlights: {
      en: [
        'Front-row vantage of Burj Khalifa & Dubai Fountain',
        'Direct air-conditioned pedestrian bridge to Dubai Mall',
        'Infinity pool deck situated 220 meters above ground',
        'Fully serviced luxury residential management',
      ],
      ar: [
        'إطلالة مباشرة في الصف الأول على برج خليفة ونافورة دبي',
        'جسر مشاة مكيف مباشر يربط المبنى بدبي مول',
        'منصة مسبح إنفينيتي معلقة على ارتفاع 220 متراً',
        'إدارة فندقية وخدمات سكنية متكاملة رفيعة المستوى',
      ],
    },
    description: {
      en: 'The quintessential pulse of urban Dubai. Floor-to-ceiling glass pavilions look directly onto the tallest tower on earth, giving residents an address of international distinction.',
      ar: 'نبض دبي الحضري في أبهى صوره. جدران زجاجية ممتدة تطل مباشرة على أطول برج في العالم، لتمنح قاطنيها عنواناً يحظى بمكانة مرموقة عالمياً.',
    },
    tag: {
      en: 'Prime Downtown',
      ar: 'موقع استراتيجي وسط المدينة',
    },
    scope: {
      en: 'High-Rise Residential Architecture & Five-Star Hospitality',
      ar: 'العمارة السكنية الشاهقة والضيافة الفندقية الفاخرة',
    },
    mapUrl: 'https://maps.google.com/?q=Downtown+Dubai+Burj+Khalifa+District',
    blueprintUrl: buildBlueprintSvg({
      title: 'DOWNTOWN SKY HORIZON PENTHOUSE',
      sheetNo: 'DWG-DSH-05',
      level: 'BURJ KHALIFA DISTRICT · CORNER SKY RESIDENCE',
      rooms: [
        { name: 'FOYER & PRIVATE ELEVATOR LOBBY', dims: '5.6m × 4.8m', x: 420, y: 390, w: 160, h: 130 },
        { name: 'BURJ KHALIFA PANORAMIC SALON', dims: '14.0m × 7.6m', x: 290, y: 195, w: 420, h: 175, accent: true },
        { name: 'CONTINUOUS SKYLINE VIEW LOGGIA', dims: '24.0m CURVED BALCONY', x: 170, y: 55, w: 660, h: 80, accent: true },
        { name: 'EXECUTIVE MASTER CORNER SUITE', dims: '8.6m × 6.8m', x: 70, y: 180, w: 200, h: 200, accent: true },
        { name: 'POLIFORM SHOW KITCHEN & BAR', dims: '7.8m × 6.2m', x: 730, y: 195, w: 200, h: 160 },
        { name: 'SUNSET CANTILEVERED GLASS POD', dims: '8.0m × 3.2m', x: 320, y: 14, w: 360, h: 36 },
        { name: 'PRIVATE STUDY / GUEST BEDROOM', dims: '6.8m × 5.2m', x: 70, y: 400, w: 200, h: 130 },
        { name: 'UTILITY & INTEGRATED SMART HUB', dims: '7.2m × 5.4m', x: 730, y: 375, w: 200, h: 145 },
      ],
    }),
    architecturalNarrative: {
      en: 'Positioned at the epicentre of global metropolitan glamour. Rising vertically with a crystalline geometric façade engineered from triple-glazed ultra-low-iron glass, the residences offer framed, front-row vistas of the Burj Khalifa and the Dubai Fountains. Internal layouts emphasize open-format spatial freedom with minimalist concealed joinery, Poliform kitchens, and integrated smart home automation that harmonizes ambient lighting with the circadian sunset cycles of Downtown Dubai.',
      ar: 'تقع هذه الإقامة في قلب الأناقة العالمية لمدينة دبي. ترتفع الناطحة بواجهة بلورية هندسية مصنوعة من زجاج فائق النقاء ثلاثي الطبقات، موفرة إطلالات أمامية حصرية على برج خليفة ونافورة دبي الراقصة. تركز المخططات الداخلية على الرحابة مع مطابخ بوليفورم الإيطالية وحلول الأتمتة الذكية التي تضبط الإضاءة المتناغمة مع غروب شمس وسط المدينة.',
    },
    dimensions: {
      builtUpArea: '2,650 sq.ft',
      plotArea: 'High-Floor Corner Suite',
      ceilingHeight: '3.4m - 4.0m',
    },
    virtualTourAvailable: true,
    expectedRoi: '7.9% Projected Net Yield',
  },
  {
    id: 'al-marjan-island-haven',
    slug: 'al-marjan-island-haven',
    name: {
      en: 'Al Marjan Island Haven',
      ar: 'ملاذ جزيرة المرجان',
    },
    category: 'investment',
    categoryLabel: {
      en: 'Strategic Investment',
      ar: 'استثمار استراتيجي',
    },
    location: {
      en: 'Ras Al Khaimah / Marjan Island',
      ar: 'رأس الخيمة / جزيرة المرجان',
    },
    subLocation: {
      en: 'Wynn Resort Corridor · Waterfront Frontage',
      ar: 'ممر منتجع وين · واجهة مائية مباشرة',
    },
    type: {
      en: 'Branded Waterfront Suites',
      ar: 'أجنحة فاخرة بواجهة بحرية',
    },
    priceAED: 3200000,
    priceUSD: 871000,
    startingPriceFormatted: {
      en: 'AED 3.2M',
      ar: '3.2 مليون درهم',
    },
    paymentPlan: {
      en: '60/40 Construction Plan',
      ar: '60/40 خطة أثناء البناء',
    },
    paymentMilestones: [
      { stage: { en: 'Down Payment', ar: 'الدفعة الأولى' }, percentage: 15 },
      { stage: { en: 'During Construction', ar: 'أثناء الإنشاء' }, percentage: 45 },
      { stage: { en: 'Handover at Launch', ar: 'التسليم عند الافتتاح' }, percentage: 40 },
    ],
    completion: {
      en: 'Q1 2027',
      ar: 'الربع الأول 2027',
    },
    developer: 'Marjan Prime Holdings',
    bedrooms: {
      en: '1 to 3 Bedrooms',
      ar: '1 إلى 3 غرف نوم',
    },
    sizeSqFt: '980 - 2,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    ],
    investmentPositioning: {
      en: 'Strategically positioned next to the UAE’s first gaming integrated resort (Wynn Al Marjan). Capital growth catalyst driven by rising tourism infrastructure.',
      ar: 'موقع استراتيجي بالقرب من أول منتجع ألعاب متكامل في دولة الإمارات (وين جزيرة المرجان). محفز قوي لنمو رأس المال مدفوعاً بازدهار السياحة الفاخرة.',
    },
    highlights: {
      en: [
        'Direct adjacency to Wynn Integrated Resort',
        'Private marina berths and beach club access',
        'High short-term rental holiday home yields anticipated',
        'Golden Visa eligible investment structure',
      ],
      ar: [
        'ملاصقة مباشرة لمنتجع وين المتكامل',
        'مراسٍ خاصة لليخوت ونادٍ شاطئي حصري',
        'عوائد إيجارية سياحية قصيرة الأجل مرتقبة',
        'مؤهل للحصول على الإقامة الذهبية في الإمارات',
      ],
    },
    description: {
      en: 'Ras Al Khaimah’s crown jewel island. An exceptional growth opportunity capturing the transformative expansion of the Northern Emirates’ hospitality sector.',
      ar: 'درة جزر رأس الخيمة. فرصة نمو استثنائية تواكب التحول الكبير والتوسع السياحي الذي تشهده الإمارات الشمالية.',
    },
    tag: {
      en: 'High Yield Potential',
      ar: 'عائد مرتفع متوقع',
    },
    scope: {
      en: 'Hospitality-Branded Coastal Architecture',
      ar: 'العمارة الساحلية ذات العلامات الفندقية العالمية',
    },
    mapUrl: 'https://maps.google.com/?q=Al+Marjan+Island+Ras+Al+Khaimah',
    blueprintUrl: buildBlueprintSvg({
      title: 'AL MARJAN ISLAND RESORT SUITES',
      sheetNo: 'DWG-AMI-06',
      level: 'WYNN CORRIDOR · MARITIME EXECUTIVE SUITE',
      rooms: [
        { name: 'DUAL-KEY ENTRY VESTIBULE', dims: '5.2m × 4.5m', x: 420, y: 390, w: 160, h: 130 },
        { name: 'OCEANFRONT RESORT SALON', dims: '12.8m × 7.2m', x: 290, y: 195, w: 420, h: 175, accent: true },
        { name: 'GULF HORIZON CURVED TERRACE', dims: '22.0m GLASS BALCONY', x: 180, y: 55, w: 640, h: 80, accent: true },
        { name: 'MARITIME MASTER SUITE', dims: '7.8m × 6.4m', x: 80, y: 190, w: 190, h: 190, accent: true },
        { name: 'LOCK-OFF HOSPITALITY STUDIO', dims: '7.6m × 5.8m', x: 730, y: 195, w: 190, h: 170 },
        { name: 'SUN LOUNGER PLUNGE TERRACE', dims: '10.5m × 3.4m', x: 330, y: 15, w: 340, h: 36 },
        { name: 'WELLNESS ENSUITE & SOAK TUB', dims: '6.4m × 4.8m', x: 80, y: 400, w: 190, h: 130 },
        { name: 'SECURE OWNER STORAGE & PANTRY', dims: '6.5m × 4.5m', x: 730, y: 385, w: 190, h: 135 },
      ],
    }),
    architecturalNarrative: {
      en: 'Engineered as a prime institutional hospitality asset directly neighboring the landmark Wynn Integrated Resort on Al Marjan Island. The architecture draws inspiration from maritime sails and Arabian sea waves, featuring expansive curved shade canopies, salt-resistant engineered composites, and panoramic corner terrace decks with glass balustrades that overlook the pristine Arabian Gulf. Designed with dual-key lock-off potential to maximize short-term luxury hospitality yields.',
      ar: 'أصل استثماري فندقي استراتيجي بموقع مجاور مباشرة لمنتجع وين المتكامل في جزيرة المرجان. يستوحي التصميم خطوطه من أشرعة السفن وأمواج الخليج، مع مظلات انسيابية عريضة ومواد متطورة مقاومة للملوحة وتراسات ركنية زجاجية واسعة تطل على المياه الفيروزية. صُممت الوحدات بنظام المفتاح المزدوج لتعظيم العوائد الاستثمارية للإيجار الفندقي قصير الأجل.',
    },
    dimensions: {
      builtUpArea: '1,880 sq.ft',
      plotArea: 'Waterfront Elevation Suite',
      ceilingHeight: '3.3m - 3.8m',
    },
    virtualTourAvailable: true,
    expectedRoi: '12.2% Net Yield & Appreciation',
  },
];
