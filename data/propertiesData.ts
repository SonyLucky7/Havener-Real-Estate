import { Property } from '@/lib/types';

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
  },
];
