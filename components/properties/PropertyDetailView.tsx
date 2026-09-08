'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  X,
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Calendar,
  Check,
  CheckCircle2,
  Compass,
  Eye,
  ShieldCheck,
  Download,
  MessageSquare,
  Building2,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { Property, Language, Currency } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface PropertyDetailViewProps {
  property: Property | null;
  onClose: () => void;
  onInquire?: (property: Property) => void;
  lang?: Language;
  currency?: Currency;
}

const DETAIL_COPY = {
  en: {
    backToPortfolio: 'Return to 3D Ribbon / Back to Portfolio',
    viewOnMap: 'Google Map',
    clientDeveloper: 'Developer & Sponsor',
    locationTitle: 'Prime Location',
    scopeTitle: 'Scope & Architecture',
    completionTitle: 'Handover Target',
    defaultScope: 'Architecture & Bespoke Living',
    section1Marker: '(01)',
    section1Title: 'Architectural Vision & Spatial Dimensions',
    section1Subtitle: 'Volumetric purity, structural programming, and signature bespoke finishes.',
    bua: 'Built-Up Area (BUA)',
    plotArea: 'Private Plot Area',
    ceilingHeight: 'Ceiling Clearance',
    bedrooms: 'Bedrooms & Suites',
    highlightsTitle: 'Key Architectural & Investment Highlights',
    section2Marker: '(02)',
    section2Title: 'Interactive Blueprint & Architectural Schematics',
    section2Subtitle: 'CAD engineering drawings, axial spans, and spatial room programming.',
    cadView: 'Schematic CAD',
    specsView: 'Spatial Programming',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset 100%',
    fullscreen: 'Expand Blueprint',
    closeFullscreen: 'Minimize',
    virtualTourBadge: '360° Virtual Walkthrough Available',
    virtualTourSub: 'Experience primary living pavilions, oceanfront terraces, and master suites in 3D fidelity.',
    launchTour: 'Launch 360° Spatial Tour',
    tourClose: 'Exit Virtual Tour',
    tourViews: [
      { name: 'Grand Double-Height Ocean Salon', desc: 'Acoustic glass curtains framing panoramic Gulf sunsets' },
      { name: 'Primary Master Suite & Ocean Terrace', desc: 'Italian travertine dressing salons & cantilever plunge pool' },
      { name: 'Cantilever Infinity Pool & Private Jetty', desc: '120ft direct private beach shoreline with yacht access' },
    ],
    section3Marker: '(03)',
    section3Title: 'Acquisition, Payment Milestones & Investment Metrics',
    section3Subtitle: 'Structured phased milestone breakdown, projected yields, and residency rights.',
    startingPrice: 'Acquisition Valuation',
    paymentStructure: 'Phased Milestone Schedule',
    roiProjected: 'Projected Net ROI',
    goldenVisaTitle: '10-Year UAE Golden Visa Qualified',
    goldenVisaDesc:
      'Direct real estate investor category. Grants 10-year renewable residency for principal investor, family, and domestic personnel with 100% foreign business ownership and 0% personal tax.',
    dldEscrow: 'DLD RERA Registered · Escrow Account Protected',
    actions: {
      downloadBrochure: 'Download Investor Brochure',
      generatingBrochure: 'Compiling Investor Dossier...',
      scheduleViewing: 'Schedule Private Viewing',
      whatsappInquiry: 'Inquire via WhatsApp',
    },
    brochureNotice: 'Complimentary investor dossier formatted for family office & fiduciary review.',
    footerLegal: 'Havener Property Dubai · Licensed by Dubai Land Department (RERA). Pricing & allocations subject to developer verification.',
  },
  ar: {
    backToPortfolio: 'العودة إلى الشريط ثلاثي الأبعاد / المحفظة',
    viewOnMap: 'خريطة جوجل',
    clientDeveloper: 'المطور والجهة المنفذة',
    locationTitle: 'الموقع المتميز',
    scopeTitle: 'نطاق العمل والتصميم',
    completionTitle: 'موعد التسليم المتوقع',
    defaultScope: 'الهندسة المعمارية والمعيشة الفاخرة',
    section1Marker: '(01)',
    section1Title: 'الرؤية المعمارية والأبعاد المكانية',
    section1Subtitle: 'التخطيط المكاني، الكتل المعمارية والتشطيبات الحصرية المصممة حسب الطلب.',
    bua: 'المساحة المبنية (BUA)',
    plotArea: 'مساحة الأرض الخاصة',
    ceilingHeight: 'ارتفاع الأسقف',
    bedrooms: 'الغرف والأجنحة الفاخرة',
    highlightsTitle: 'أبرز المزايا المعمارية والاستثمارية',
    section2Marker: '(02)',
    section2Title: 'المخطط المعماري التفاعلي والمواصفات الفنية',
    section2Subtitle: 'مخططات هندسية بصيغة CAD، محاور الأبعاد والبرمجة المكانية للغرف.',
    cadView: 'مخطط CAD الهندسي',
    specsView: 'التوزيع المكاني',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    resetZoom: 'إعادة ضبط 100%',
    fullscreen: 'تكبير المخطط',
    closeFullscreen: 'تصغير',
    virtualTourBadge: 'جولة افتراضية 360° متاحة',
    virtualTourSub: 'استكشف صالونات الاستقبال، التراسات الشاطئية والأجنحة الرئيسية بدقة ثلاثية الأبعاد.',
    launchTour: 'بدء الجولة الافتراضية 360°',
    tourClose: 'إنهاء الجولة الافتراضية',
    tourViews: [
      { name: 'صالون الاستقبال المزدوج المطل على البحر', desc: 'واجهات زجاجية عازلة للصوت تؤطر إطلالات غروب الخليج' },
      { name: 'جناح الماستر الرئيسي والتراس البحري', desc: 'غرف ملابس من الترافرتين الإيطالي ومسبح خاص معلق' },
      { name: 'مسبح إنفينيتي المعلق والمرسى الخاص', desc: 'شاطئ خاص بطول 120 قدم مع إمكانية وصول اليخوت' },
    ],
    section3Marker: '(03)',
    section3Title: 'هيكل الشراء، مراحل السداد والعائد الاستثماري',
    section3Subtitle: 'جدول الدفعات المرحلية، العوائد المتوقعة وحقوق الإقامة طويلة الأمد.',
    startingPrice: 'قيمة الشراء المبدئية',
    paymentStructure: 'جدول الدفعات المرحلية',
    roiProjected: 'صافي العائد الاستثماري المتوقع',
    goldenVisaTitle: 'مؤهل للحصول على الإقامة الذهبية في الإمارات (10 سنوات)',
    goldenVisaDesc:
      'فئة المستثمر العقاري المباشر. تمنح إقامة متجددة لمدة 10 سنوات للمستثمر وأفراد أسرته مع ملكية تجارية أجنبية كاملة بنسبة 100% وإعفاء ضريبي تام.',
    dldEscrow: 'معتمد من دائرة الأراضي والأملاك · حساب ضمان بنكي معتمد',
    actions: {
      downloadBrochure: 'تحميل ملف المستثمر (PDF)',
      generatingBrochure: 'جاري إعداد ملف المستثمر...',
      scheduleViewing: 'طلب معاينة خاصة',
      whatsappInquiry: 'استفسار عبر واتساب',
    },
    brochureNotice: 'ملف المستثمر مُعد للمكاتب العائلية والمراجعة الاستثمارية والائتمانية.',
    footerLegal: 'هافينر للعقارات دبي · مرخص من دائرة الأراضي والأملاك (RERA). الأسعار والتخصيص خاضعة للتأكيد.',
  },
};

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onClose,
  onInquire,
  lang = 'en',
  currency = 'AED',
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [blueprintZoom, setBlueprintZoom] = useState(1);
  const [isBlueprintFullscreen, setIsBlueprintFullscreen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [tourViewIndex, setTourViewIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState<'cad' | 'specs'>('cad');

  const t = DETAIL_COPY[lang];
  const isRtl = lang === 'ar';

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is active, reset scroll to top, and focus container
  useEffect(() => {
    if (!property) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      scrollContainerRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [property]);

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isVirtualTourOpen) {
          setIsVirtualTourOpen(false);
        } else if (isBlueprintFullscreen) {
          setIsBlueprintFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isVirtualTourOpen, isBlueprintFullscreen]);

  // Handle blueprint zoom controls
  const handleZoomIn = useCallback(() => {
    setBlueprintZoom((prev) => Math.min(prev + 0.3, 2.2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setBlueprintZoom((prev) => Math.max(prev - 0.3, 0.7));
  }, []);

  const handleResetZoom = useCallback(() => {
    setBlueprintZoom(1);
  }, []);

  // WhatsApp link generator
  const getWhatsAppLink = useCallback(() => {
    if (!property) return '#';
    const message = isRtl
      ? `مرحباً مكتب هافينر للعقارات الفاخرة، أود الاستفسار عن عقار "${property.name.ar}" (${property.location.ar}، الرمز: ${property.slug}، السعر: ${formatPrice(property.priceAED, currency, lang)}). يرجى تزويدي بملف المستثمر وترتيب جلسة استشارية خاصة.`
      : `Hello Havener Private Client Desk, I would like to inquire about "${property.name.en}" (${property.location.en}, Ref: ${property.slug}, Price: ${formatPrice(property.priceAED, currency, lang)}). Please share the complete investor dossier and coordinate a private briefing.`;
    return `https://wa.me/97140000000?text=${encodeURIComponent(message)}`;
  }, [property, currency, lang, isRtl]);

  // Dynamic Client-Side PDF Brochure Generator
  const handleDownloadBrochure = useCallback(() => {
    if (!property) return;
    setIsGeneratingPdf(true);

    const printWin = window.open('', '_blank');
    if (!printWin) {
      setTimeout(() => {
        setIsGeneratingPdf(false);
        window.print();
      }, 500);
      return;
    }

    const priceText = formatPrice(property.priceAED, currency, lang);
    const narrativeText = property.architecturalNarrative?.[lang] || property.description[lang];
    const bldArea = property.dimensions?.builtUpArea || property.sizeSqFt;
    const plotArea = property.dimensions?.plotArea || '15,400 sq.ft';
    const ceiling = property.dimensions?.ceilingHeight || '4.2m - 7.5m';
    const activeImg = property.gallery[0] || property.image;

    const milestonesHtml = property.paymentMilestones
      .map(
        (m, idx) => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-weight: 600; color: #0A0E24;">Stage 0${idx + 1}: ${m.stage[lang]}</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; text-align: center; font-weight: 700; color: #2D3E8C;">${m.percentage}%</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; text-align: right; font-weight: 600; color: #E8922D;">${formatPrice(property.priceAED * (m.percentage / 100), currency, lang)}</td>
        </tr>`
      )
      .join('');

    const highlightsHtml = property.highlights[lang]
      .map(
        (h) => `
        <li style="margin-bottom: 8px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong>•</strong> ${h}
        </li>`
      )
      .join('');

    const printableHtml = `
      <!DOCTYPE html>
      <html lang="${lang}" dir="${isRtl ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="utf-8" />
        <title>HAVENER PROPERTY · ${property.name[lang]} · Investor Dossier</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 14mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0A0E24;
            background: #FFFFFF;
            padding: 20px;
            font-size: 14px;
            line-height: 1.6;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #2D3E8C;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .logo-title {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #2D3E8C;
          }
          .logo-sub {
            font-size: 10px;
            letter-spacing: 1.5px;
            color: #E8922D;
            font-weight: 700;
            text-transform: uppercase;
          }
          .meta-ref {
            text-align: ${isRtl ? 'left' : 'right'};
            font-size: 11px;
            color: #64748B;
          }
          .title-section {
            margin-bottom: 20px;
          }
          .property-name {
            font-size: 28px;
            font-weight: 800;
            color: #0A0E24;
            margin-bottom: 6px;
          }
          .property-location {
            font-size: 14px;
            color: #E8922D;
            font-weight: 600;
          }
          .hero-img {
            width: 100%;
            height: 280px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 24px;
            border: 1px solid #E2E8F0;
          }
          .grid-specs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
            margin-bottom: 24px;
          }
          .spec-card {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 12px;
          }
          .spec-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #64748B;
            margin-bottom: 4px;
            font-weight: 600;
          }
          .spec-value {
            font-size: 13px;
            font-weight: 700;
            color: #0A0E24;
          }
          .section-title {
            font-size: 16px;
            font-weight: 800;
            color: #2D3E8C;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #CBD5E1;
            padding-bottom: 6px;
            margin-bottom: 12px;
            margin-top: 20px;
          }
          .narrative {
            font-size: 12.5px;
            color: #334155;
            line-height: 1.7;
            margin-bottom: 20px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 20px;
          }
          .table th {
            background: #F1F5F9;
            padding: 8px 12px;
            text-align: ${isRtl ? 'right' : 'left'};
            font-size: 11px;
            text-transform: uppercase;
            color: #475569;
          }
          .badge-box {
            background: #FFFBEB;
            border: 1px solid #FCD34D;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .footer {
            margin-top: 32px;
            border-top: 1px solid #E2E8F0;
            padding-top: 14px;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #64748B;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo-title">HAVENER PROPERTY</div>
            <div class="logo-sub">DUBAI PRIVATE CLIENT ADVISORY · INVESTOR DOSSIER</div>
          </div>
          <div class="meta-ref">
            <div>REF: ${property.slug.toUpperCase()}</div>
            <div>DATE: ${new Date().toLocaleDateString('en-GB')}</div>
            <div>STATUS: DLD ESCROW APPROVED</div>
          </div>
        </div>

        <div class="title-section">
          <div class="property-name">${property.name[lang]}</div>
          <div class="property-location">${property.location[lang]} · ${property.subLocation[lang]}</div>
        </div>

        <img src="${activeImg}" alt="${property.name[lang]}" class="hero-img" />

        <div class="grid-specs">
          <div class="spec-card">
            <div class="spec-label">${isRtl ? 'قيمة الشراء' : 'Valuation'}</div>
            <div class="spec-value" style="color: #2D3E8C;">${priceText}</div>
          </div>
          <div class="spec-card">
            <div class="spec-label">${isRtl ? 'المساحة المبنية' : 'Built-Up Area'}</div>
            <div class="spec-value">${bldArea}</div>
          </div>
          <div class="spec-card">
            <div class="spec-label">${isRtl ? 'الأرض الخاصة' : 'Private Plot'}</div>
            <div class="spec-value">${plotArea}</div>
          </div>
          <div class="spec-card">
            <div class="spec-label">${isRtl ? 'ارتفاع الأسقف' : 'Ceiling Height'}</div>
            <div class="spec-value">${ceiling}</div>
          </div>
          <div class="spec-card">
            <div class="spec-label">${isRtl ? 'موعد التسليم' : 'Handover'}</div>
            <div class="spec-value" style="color: #E8922D;">${property.completion[lang]}</div>
          </div>
        </div>

        <div class="section-title">${isRtl ? '(01) الرؤية المعمارية' : '(01) Architectural Vision'}</div>
        <div class="narrative">${narrativeText}</div>

        <div class="section-title">${isRtl ? 'أبرز المزايا الاستثمارية' : 'Key Property Highlights'}</div>
        <ul style="padding-${isRtl ? 'right' : 'left'}: 16px; margin-bottom: 20px;">
          ${highlightsHtml}
        </ul>

        ${property.blueprintUrl ? `
        <div class="section-title">${isRtl ? '(02) المخطط المعماري الهندسي' : '(02) Architectural CAD Blueprint'}</div>
        <div style="background: #080D1A; padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <img src="${property.blueprintUrl}" alt="Architectural Blueprint" style="max-width: 100%; height: 260px; object-fit: contain;" />
        </div>` : ''}

        <div class="badge-box">
          <div>
            <strong style="color: #B45309; font-size: 13px;">★ ${isRtl ? 'مؤهل للإقامة الذهبية 10 سنوات' : '10-Year UAE Golden Visa Qualified'}</strong>
            <p style="font-size: 11px; color: #78350F; margin-top: 2px;">
              ${isRtl ? 'تمنح الإقامة للمستثمر وأفراد أسرته مع ملكية أجنبية كاملة 100% وإعفاء ضريبي شامل.' : 'Qualifies for 10-year residency for family office principals and direct family with 0% personal tax.'}
            </p>
          </div>
          <div style="font-size: 15px; font-weight: 800; color: #2D3E8C; white-space: nowrap;">
            ${property.expectedRoi || '8.4% Net ROI'}
          </div>
        </div>

        <div class="section-title">${isRtl ? '(03) هيكل الدفعات المرحلية' : '(03) Structured Milestone Payment Plan'}</div>
        <table class="table">
          <thead>
            <tr>
              <th>${isRtl ? 'مرحلة الإنجاز' : 'Construction Milestone'}</th>
              <th style="text-align: center;">${isRtl ? 'النسبة' : 'Percentage'}</th>
              <th style="text-align: right;">${isRtl ? 'القيمة المقدرة' : 'Estimated Capital Outlay'}</th>
            </tr>
          </thead>
          <tbody>
            ${milestonesHtml}
          </tbody>
        </table>

        <div class="footer">
          <div>HAVENER PROPERTY · LICENSED BY DUBAI LAND DEPARTMENT (RERA)</div>
          <div>DESK: +971 4 000 0000 · ADVISORY@HAVENERPROPERTY.COM</div>
        </div>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(printableHtml);
    printWin.document.close();

    setTimeout(() => {
      setIsGeneratingPdf(false);
      printWin.focus();
      printWin.print();
    }, 600);
  }, [property, currency, lang, isRtl]);

  if (!property) return null;

  const activeImage = property.gallery[selectedImageIndex] || property.image;
  const projectScope = property.scope?.[lang] || t.defaultScope;
  const mapHref = property.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(`${property.location.en} Dubai`)}`;
  const buaMetric = property.dimensions?.builtUpArea || property.sizeSqFt;
  const plotMetric = property.dimensions?.plotArea || (isRtl ? 'قطعة أرض خاصة مستقلة' : '15,400 sq.ft Private Plot');
  const ceilingMetric = property.dimensions?.ceilingHeight || (isRtl ? '4.2م – 7.5م (ارتفاع مضاعف)' : '4.2m – 7.5m Double-Height Volume');
  const isGoldenVisaEligible = property.priceAED >= 2000000;

  return (
    <div
      ref={scrollContainerRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain focus:outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={property.name[lang]}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Click outside backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-[#0A0E24]/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering / Full-width Scroll Wrapper */}
      <div className="relative z-10 min-h-full w-full flex items-start justify-center p-0 sm:p-4 md:p-8 pointer-events-none">
        {/* Main Editorial Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="relative w-full max-w-6xl my-0 sm:my-6 bg-[#FCFAF7] text-[#0A0E24] shadow-2xl rounded-none sm:rounded-3xl border border-[#0A0E24]/10 overflow-hidden shrink-0 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ============================================================== */}
          {/* 1. TOP EDITORIAL BAR (Navigation & Actions)                    */}
          {/* ============================================================== */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#FCFAF7]/95 backdrop-blur-xl border-b border-slate-200/90">
            {/* Back action */}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-600 hover:text-[#2D3E8C] transition-colors py-1.5 px-3 rounded-full hover:bg-slate-100/80 cursor-pointer"
              aria-label={t.backToPortfolio}
            >
              <span className={isRtl ? 'rotate-180' : ''}>←</span>
              <span>{t.backToPortfolio}</span>
            </button>

            {/* Status pills & Close */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D3E8C]/10 text-[#2D3E8C] text-[10px] font-bold uppercase tracking-wider">
                <Building2 className="w-3 h-3" />
                {property.categoryLabel[lang]}
              </span>

              <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {t.dldEscrow}
              </span>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-[#0A0E24] transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* ============================================================== */}
          {/* 2. HEADER TITLE & METADATA BAR (Matching Reference Video)      */}
          {/* ============================================================== */}
          <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-slate-200/80 bg-white">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E8922D]">
                    {property.tag[lang]}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    REF: {property.slug.toUpperCase()}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0A0E24] tracking-tight leading-tight">
                  {property.name[lang]}
                </h1>
              </div>

              {/* Direct Google Maps Link Button */}
              <div className="shrink-0">
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#0A0E24] hover:text-[#2D3E8C] transition-all group shadow-2xs"
                >
                  <MapPin className="w-4 h-4 text-[#E8922D]" />
                  <span>{t.viewOnMap}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2D3E8C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* 3-Column Metadata Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  {t.clientDeveloper}
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0A0E24]">
                  {property.developer}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  {t.locationTitle}
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0A0E24]">
                  {property.location[lang]} <span className="text-xs text-slate-500 font-normal">({property.subLocation[lang]})</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  {t.scopeTitle}
                </span>
                <p className="text-sm sm:text-base font-bold text-[#2D3E8C]">
                  {projectScope}
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. FULL-BLEED HERO MEDIA SHOWCASE GALLERY                      */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-10 bg-[#FAF7F2] border-b border-slate-200/80">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/90 group">
              <Image
                src={activeImage}
                alt={property.name[lang]}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Photo Counter Overlay */}
              <div className="absolute top-4 start-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-widest font-semibold">
                {String(selectedImageIndex + 1).padStart(2, '0')} / {String(property.gallery.length).padStart(2, '0')}
              </div>

              {/* Type Badge */}
              <div className="absolute top-4 end-4 px-3.5 py-1.5 rounded-full bg-[#E8922D] text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                {property.type[lang]}
              </div>

              {/* Bottom Quick Caption */}
              <div className="absolute bottom-4 start-6 end-6 flex items-end justify-between text-white">
                <div className="max-w-lg hidden sm:block">
                  <span className="text-xs uppercase tracking-widest text-[#FCD34D] font-mono font-bold block mb-1">
                    {property.developer} · ARCHITECTURAL ELEVATION
                  </span>
                  <p className="text-sm text-slate-100 font-medium truncate">
                    {property.investmentPositioning[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnail Selector */}
            {property.gallery.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none">
                {property.gallery.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#2D3E8C] ring-2 ring-[#2D3E8C]/30 scale-95 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-98'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* 4. SECTION (01) — ARCHITECTURAL VISION & DIMENSIONS            */}
          {/* ============================================================== */}
          <section className="px-6 sm:px-10 py-12 border-b border-slate-200/80 bg-white">
            <div className="max-w-4xl mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-sm font-bold text-[#2D3E8C] bg-[#2D3E8C]/10 px-2.5 py-0.5 rounded-md">
                  {t.section1Marker}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#E8922D] font-bold">
                  {isRtl ? 'المواصفات والكتل الهندسية' : 'Spatial Programming & Materials'}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A0E24] tracking-tight mb-3">
                {t.section1Title}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {t.section1Subtitle}
              </p>
            </div>

            {/* Rich Narrative */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-slate-200 mb-10">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {property.architecturalNarrative?.[lang] || property.description[lang]}
              </p>
            </div>

            {/* 4 Architectural Dimension Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-2">
                  {t.bua}
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#0A0E24] block leading-tight">
                  {buaMetric}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-2">
                  {t.plotArea}
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#0A0E24] block leading-tight">
                  {plotMetric}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-2">
                  {t.ceilingHeight}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#2D3E8C] block leading-tight">
                  {ceilingMetric}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-2">
                  {t.bedrooms}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#0A0E24] block leading-tight">
                  {property.bedrooms[lang]}
                </span>
              </div>
            </div>

            {/* Key Highlights Pill List */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
                {t.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.highlights[lang].map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#2D3E8C]/30 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#2D3E8C]/10 text-[#2D3E8C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 5. SECTION (02) — INTERACTIVE BLUEPRINT & FLOORPLAN            */}
          {/* ============================================================== */}
          <section className="px-6 sm:px-10 py-12 border-b border-slate-200/80 bg-[#F8FAFC]">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-bold text-[#2D3E8C] bg-[#2D3E8C]/10 px-2.5 py-0.5 rounded-md">
                    {t.section2Marker}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#E8922D] font-bold">
                    {isRtl ? 'المخططات الهندسية ونظام CAD' : 'Engineering Schematics & CAD'}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A0E24] tracking-tight mb-2">
                  {t.section2Title}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  {t.section2Subtitle}
                </p>
              </div>

              {/* View Switcher & Blueprint Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => setBlueprintMode('cad')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      blueprintMode === 'cad'
                        ? 'bg-[#2D3E8C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0A0E24]'
                    }`}
                  >
                    {t.cadView}
                  </button>
                  <button
                    onClick={() => setBlueprintMode('specs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      blueprintMode === 'specs'
                        ? 'bg-[#2D3E8C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0A0E24]'
                    }`}
                  >
                    {t.specsView}
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="inline-flex items-center gap-1 rounded-xl p-1 bg-white border border-slate-200 shadow-2xs">
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#2D3E8C] transition-colors cursor-pointer"
                    title={t.zoomIn}
                    aria-label={t.zoomIn}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#2D3E8C] transition-colors cursor-pointer"
                    title={t.zoomOut}
                    aria-label={t.zoomOut}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#2D3E8C] transition-colors cursor-pointer"
                    title={t.resetZoom}
                    aria-label={t.resetZoom}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsBlueprintFullscreen(true)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#2D3E8C] transition-colors cursor-pointer"
                    title={t.fullscreen}
                    aria-label={t.fullscreen}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blueprint Technical Display Canvas */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#080D1A] border-2 border-[#2D3E8C]/40 shadow-2xl overflow-hidden mb-6">
              {/* Technical Canvas Overlay Watermark */}
              <div className="absolute top-4 start-4 z-20 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#2D3E8C]/60 text-blue-200 text-[10px] font-mono tracking-widest uppercase">
                  CAD DWG 01
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold tracking-wider">
                  SCALE 1:100 @ A1
                </span>
              </div>

              {/* Blueprint Zoom Level Badge */}
              <div className="absolute top-4 end-4 z-20 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                ZOOM: {Math.round(blueprintZoom * 100)}%
              </div>

              {/* Blueprint SVG/Graphic Container */}
              <div
                className={`w-full min-h-[360px] sm:min-h-[460px] ${
                  blueprintZoom > 1 ? 'overflow-auto' : 'overflow-hidden'
                } flex items-center justify-center p-4`}
              >
                <div
                  style={{
                    transform: `scale(${blueprintZoom})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.25s ease-out',
                  }}
                  className="w-full max-w-4xl"
                >
                  {property.blueprintUrl ? (
                    /* Render SVG data URI or blueprint image */
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={property.blueprintUrl}
                      alt={`${property.name[lang]} Architectural Blueprint`}
                      className="w-full h-auto rounded-lg shadow-inner select-none pointer-events-none"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
                      <Layers className="w-12 h-12 text-[#2D3E8C] mb-3 animate-pulse" />
                      <p className="text-sm font-mono">DLD CAD VECTOR SCHEMATIC LOADED</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 360° Virtual Walkthrough Preview Badge / Launcher */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0A0E24] via-[#151E4D] to-[#2D3E8C] text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8922D]/20 border border-[#E8922D]/40 flex items-center justify-center text-[#E8922D] shrink-0 mt-0.5">
                  <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '16s' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FCD34D]">
                      {t.virtualTourBadge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {t.virtualTourSub}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="w-full sm:w-auto shadow-md"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t.launchTour}
                </Button>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 6. SECTION (03) — PAYMENT MILESTONES & INVESTMENT METRICS      */}
          {/* ============================================================== */}
          <section className="px-6 sm:px-10 py-12 border-b border-slate-200/80 bg-white">
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-sm font-bold text-[#2D3E8C] bg-[#2D3E8C]/10 px-2.5 py-0.5 rounded-md">
                  {t.section3Marker}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#E8922D] font-bold">
                  {isRtl ? 'الجدول المالي والمحفزات الاستثمارية' : 'Milestone Schedule & Capital Growth'}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A0E24] tracking-tight mb-2">
                {t.section3Title}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {t.section3Subtitle}
              </p>
            </div>

            {/* Valuation Strip */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1 font-semibold">
                  {t.startingPrice} ({currency})
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-5xl font-bold text-[#0A0E24]">
                    {formatPrice(property.priceAED, currency, lang)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    (AED {property.priceAED.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="px-4 py-3 rounded-xl bg-[#2D3E8C]/5 border border-[#2D3E8C]/15 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    {isRtl ? 'خطة السداد' : 'Payment Plan'}
                  </span>
                  <span className="text-sm font-bold text-[#2D3E8C]">
                    {property.paymentPlan[lang]}
                  </span>
                </div>

                <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block mb-0.5">
                    {t.roiProjected}
                  </span>
                  <span className="text-sm font-bold text-[#D97706]">
                    {property.expectedRoi || '8.4% Net Projected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Phased Milestone Progress Bar */}
            {property.paymentMilestones.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-slate-200 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#2D3E8C]">
                    {t.paymentStructure}
                  </h4>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {property.completion[lang]}
                  </span>
                </div>

                {/* Stacked multi-stage bar */}
                <div className="w-full h-4 rounded-full overflow-hidden bg-slate-200 flex gap-0.5 p-0.5 mb-6">
                  {property.paymentMilestones.map((m, i) => (
                    <div
                      key={i}
                      style={{ width: `${m.percentage}%` }}
                      className={`h-full rounded-full transition-all ${
                        i === 0
                          ? 'bg-[#E8922D]'
                          : i === 1
                          ? 'bg-[#2D3E8C]'
                          : 'bg-emerald-600'
                      }`}
                      title={`${m.stage[lang]}: ${m.percentage}%`}
                    />
                  ))}
                </div>

                {/* Milestone Detail Cards / Table */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {property.paymentMilestones.map((milestone, idx) => {
                    const estimatedOutlay = formatPrice(
                      property.priceAED * (milestone.percentage / 100),
                      currency,
                      lang
                    );
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            0{idx + 1}
                          </span>
                          <span className="text-base font-serif font-bold text-[#2D3E8C]">
                            {milestone.percentage}%
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#0A0E24] mb-1">
                          {milestone.stage[lang]}
                        </p>
                        <p className="text-xs font-mono text-[#E8922D] font-semibold">
                          ~ {estimatedOutlay}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 10-Year UAE Golden Visa Qualification Badge */}
            {isGoldenVisaEligible && (
              <div className="p-6 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-200/60 text-[#92400E] text-[10px] font-bold uppercase tracking-wider mb-1">
                      {isRtl ? 'حوافز المستثمرين في دبي' : 'Dubai Investor Privilege'}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#78350F] mb-1">
                      {t.goldenVisaTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-normal max-w-2xl">
                      {t.goldenVisaDesc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-center sm:text-right rtl:sm:text-left">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-amber-300 text-amber-900 font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'مؤهل فوري' : 'Instant Eligibility'}</span>
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* ============================================================== */}
          {/* 7. ACTION SUITE & DYNAMIC INVESTOR BROCHURE GENERATOR          */}
          {/* ============================================================== */}
          <footer className="p-6 sm:p-10 bg-white border-t border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E8922D] font-mono font-bold block mb-1">
                  HAVENER PRIVATE CLIENT DESK
                </span>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {t.brochureNotice}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Dynamic PDF Generator Button */}
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleDownloadBrochure}
                  disabled={isGeneratingPdf}
                  className="shadow-2xs text-xs font-bold"
                >
                  <Download className="w-4 h-4 mr-2 text-[#2D3E8C]" />
                  {isGeneratingPdf ? t.actions.generatingBrochure : t.actions.downloadBrochure}
                </Button>

                {/* WhatsApp Direct Inquire */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.actions.whatsappInquiry}</span>
                </a>

                {/* Schedule Private Viewing */}
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => {
                    if (onInquire) {
                      onInquire(property);
                    }
                  }}
                  className="shadow-md text-xs font-bold"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.actions.scheduleViewing}
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
              <p>{t.footerLegal}</p>
              <p className="font-mono">
                DUBAI REAL ESTATE REGULATORY AUTHORITY · PERMIT NO. 49821
              </p>
            </div>
          </footer>
        </motion.div>
      </div>

        {/* ============================================================== */}
        {/* MODAL: FULLSCREEN BLUEPRINT CAD INSPECTION LIGHTBOX           */}
        {/* ============================================================== */}
        {isBlueprintFullscreen && (
          <div
            className="fixed inset-0 z-60 bg-[#080D1A]/95 backdrop-blur-xl flex flex-col p-4 sm:p-8 text-white animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/60 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-[#E8922D]">
                  {property.name[lang]}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-xs font-mono text-blue-300">
                  HIGH-RES CAD SCHEMATICS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-200 hover:text-white cursor-pointer"
                  title={t.zoomIn}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-200 hover:text-white cursor-pointer"
                  title={t.zoomOut}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-200 hover:text-white cursor-pointer"
                  title={t.resetZoom}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsBlueprintFullscreen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  title={t.closeFullscreen}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2">
              <div
                style={{
                  transform: `scale(${blueprintZoom})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease-out',
                }}
                className="max-w-6xl w-full"
              >
                {property.blueprintUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={property.blueprintUrl}
                    alt="High-Res Blueprint"
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL: 360° SPATIAL VIRTUAL TOUR SIMULATOR                     */}
        {/* ============================================================== */}
        {isVirtualTourOpen && (
          <div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-xl flex flex-col p-4 sm:p-8 text-white animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#E8922D] animate-spin" style={{ animationDuration: '10s' }} />
                <div>
                  <h3 className="text-sm font-bold tracking-wider">
                    {t.virtualTourBadge}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {t.tourViews[tourViewIndex].name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsVirtualTourOpen(false)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
              >
                {t.tourClose} ✕
              </button>
            </div>

            {/* Virtual Tour 360 Viewport Container */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-900 border border-white/15 flex items-center justify-center">
              <Image
                src={property.gallery[tourViewIndex] || property.image}
                alt="360 View"
                fill
                className="object-cover transition-all duration-700 filter brightness-90"
              />

              {/* Spatial Overlay UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Compass & Bearing HUD */}
              <div className="absolute top-6 start-6 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-xs font-mono text-white flex items-center gap-3">
                <span className="text-[#E8922D] font-bold">BEARING 240° SW</span>
                <span className="text-slate-500">|</span>
                <span>ARABIAN GULF WATERFRONT SIGHTLINE</span>
              </div>

              {/* Room Description & Switcher */}
              <div className="absolute bottom-8 start-6 end-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="max-w-md">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FCD34D] font-bold block mb-1">
                    ACTIVE SPATIAL NODE 0{tourViewIndex + 1}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {t.tourViews[tourViewIndex].name}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {t.tourViews[tourViewIndex].desc}
                  </p>
                </div>

                {/* View Switcher Pills */}
                <div className="flex items-center gap-2">
                  {t.tourViews.map((view, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTourViewIndex(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tourViewIndex === idx
                          ? 'bg-[#E8922D] text-white shadow-lg scale-105'
                          : 'bg-black/60 hover:bg-black/80 text-slate-300 border border-white/20'
                      }`}
                    >
                      0{idx + 1}: {view.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
