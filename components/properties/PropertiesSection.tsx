'use client';

import React, { useState } from 'react';
import { Property, Language, Currency, PropertyCategory } from '@/lib/types';
import { Compass, Download } from 'lucide-react';
import { PROPERTIES_DATA } from '@/data/propertiesData';
import { TRANSLATIONS } from '@/data/translations';
import { formatPrice } from '@/lib/utils';
import { PropertyCard } from './PropertyCard';
import { PropertyDrawer } from './PropertyDrawer';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';
import { RevealText, PopIn } from '@/components/ui/MotionPrimitives';
import { motion, AnimatePresence } from 'motion/react';

interface PropertiesSectionProps {
  lang: Language;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onInquireProperty: (propertyName: string) => void;
  onSelectEditorialProperty?: (property: Property) => void;
  onSelectProperty?: (property: Property) => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  lang,
  currency,
  onCurrencyChange,
  onInquireProperty,
  onSelectEditorialProperty,
  onSelectProperty,
}) => {
  const t = TRANSLATIONS[lang].properties;
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [generatingBrochureId, setGeneratingBrochureId] = useState<string | null>(null);

  const categories: { id: PropertyCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'off-plan', label: t.filterOffPlan },
    { id: 'apartments', label: t.filterApartments },
    { id: 'villas', label: t.filterVillas },
    { id: 'waterfront', label: t.filterWaterfront },
    { id: 'branded', label: t.filterBranded },
    { id: 'investment', label: t.filterInvestment },
  ];

  const filteredProperties =
    activeCategory === 'all'
      ? PROPERTIES_DATA
      : PROPERTIES_DATA.filter((p) => p.category === activeCategory);

  const handleOpenProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsDrawerOpen(true);
  };

  const handleSelectEditorial = (property: Property) => {
    if (onSelectEditorialProperty) {
      onSelectEditorialProperty(property);
    } else if (onSelectProperty) {
      onSelectProperty(property);
    } else {
      handleOpenProperty(property);
    }
  };

  const handleInstantBrochure = (property: Property) => {
    setGeneratingBrochureId(property.id);
    const printWin = window.open('', '_blank');
    if (!printWin) {
      setTimeout(() => {
        setGeneratingBrochureId(null);
        window.print();
      }, 400);
      return;
    }

    const isRtl = lang === 'ar';
    const priceText = formatPrice(property.priceAED, currency, lang);
    const narrativeText = property.architecturalNarrative?.[lang] || property.description[lang];
    const bldArea = property.dimensions?.builtUpArea || property.sizeSqFt;
    const plotArea = property.dimensions?.plotArea || (isRtl ? 'أرض خاصة' : '15,400 sq.ft');
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
          @page { size: A4 portrait; margin: 12mm 14mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0A0E24; background: #FFFFFF; padding: 20px; font-size: 14px; line-height: 1.6;
          }
          .header {
            display: flex; justify-content: space-between; align-items: flex-start;
            border-bottom: 2px solid #2D3E8C; padding-bottom: 16px; margin-bottom: 24px;
          }
          .logo-title { font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #2D3E8C; }
          .logo-sub { font-size: 10px; letter-spacing: 1.5px; color: #E8922D; font-weight: 700; text-transform: uppercase; }
          .meta-ref { text-align: ${isRtl ? 'left' : 'right'}; font-size: 11px; color: #64748B; }
          .property-name { font-size: 28px; font-weight: 800; color: #0A0E24; margin-bottom: 6px; }
          .property-location { font-size: 14px; color: #E8922D; font-weight: 600; margin-bottom: 18px; }
          .hero-img { width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 20px; border: 1px solid #E2E8F0; }
          .grid-specs { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 20px; }
          .spec-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; }
          .spec-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #64748B; margin-bottom: 4px; font-weight: 600; }
          .spec-value { font-size: 13px; font-weight: 700; color: #0A0E24; }
          .section-title { font-size: 15px; font-weight: 800; color: #2D3E8C; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #CBD5E1; padding-bottom: 6px; margin-bottom: 10px; margin-top: 18px; }
          .narrative { font-size: 12.5px; color: #334155; line-height: 1.7; margin-bottom: 18px; }
          .table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 18px; }
          .table th { background: #F1F5F9; padding: 8px 12px; text-align: ${isRtl ? 'right' : 'left'}; font-size: 11px; text-transform: uppercase; color: #475569; }
          .badge-box { background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
          .footer { margin-top: 28px; border-top: 1px solid #E2E8F0; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #64748B; }
          @media print { body { padding: 0; } }
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
        <div class="property-name">${property.name[lang]}</div>
        <div class="property-location">${property.location[lang]} · ${property.subLocation[lang]}</div>
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
          <img src="${property.blueprintUrl}" alt="Architectural Blueprint" style="max-width: 100%; height: 240px; object-fit: contain;" />
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
      setGeneratingBrochureId(null);
      printWin.focus();
      printWin.print();
    }, 600);
  };

  const handleInquireFromDrawer = (property: Property) => {
    setIsDrawerOpen(false);
    onInquireProperty(`${property.name[lang]} (${property.location[lang]})`);
  };

  return (
    <section
      id="properties"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <PopIn className="mb-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block">
                {t.eyebrow}
              </span>
            </PopIn>
            <RevealText
              text={t.headline}
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none mb-4 font-bold"
            />
            <PopIn delay={0.2}>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {t.subhead}
              </p>
            </PopIn>
          </div>

          {/* Currency Switcher */}
          <PopIn delay={0.25}>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold hidden sm:inline">
                {t.currency}:
              </span>
              <CurrencyToggle
                currentCurrency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>
          </PopIn>
        </div>

        {/* Filter Tabs Bar with Animated Indicator */}
        <PopIn delay={0.3} className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wider rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md shadow-blue-900/15'
                    : 'bg-white text-slate-600 hover:text-[#0A0E24] hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2D3E8C] to-[#E8922D]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </PopIn>

        {/* Properties Grid with Smooth Crossfade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property) => (
              <div key={property.id} className="flex flex-col group/estate">
                <PropertyCard
                  property={property}
                  lang={lang}
                  currency={currency}
                  onSelectProperty={handleSelectEditorial}
                />

                {/* Vinode Estate Tools Action Bar */}
                <div className="mt-3 flex items-center justify-between gap-2 px-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectEditorial(property);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-[#2D3E8C] text-slate-700 hover:text-white border border-slate-200/90 hover:border-[#2D3E8C] text-xs font-bold tracking-wide transition-all shadow-2xs group/btn cursor-pointer"
                    aria-label={
                      lang === 'ar'
                        ? `فحص مخططات CAD وشروط ${property.name.ar}`
                        : `Inspect CAD Blueprint & Terms for ${property.name.en}`
                    }
                  >
                    <Compass className="w-3.5 h-3.5 text-[#0A0E24] group-hover/btn:text-white transition-colors" strokeWidth={1.5} />
                    <span className="truncate">
                      {lang === 'ar' ? 'فحص مخططات CAD والشروط' : 'Inspect CAD Blueprint & Terms'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInstantBrochure(property);
                    }}
                    disabled={generatingBrochureId === property.id}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0A0E24] border border-slate-200/90 text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
                    title={lang === 'ar' ? 'تحميل ملف المستثمر (PDF)' : 'Instant Investor Brochure (PDF)'}
                    aria-label={lang === 'ar' ? 'تحميل ملف المستثمر' : 'Instant Brochure'}
                  >
                    <Download className="w-3.5 h-3.5 text-[#0A0E24]" strokeWidth={1.5} />
                    <span className="hidden sm:inline">
                      {generatingBrochureId === property.id
                        ? lang === 'ar'
                          ? 'جاري التحميل...'
                          : 'Compiling...'
                        : lang === 'ar'
                          ? 'ملف المستثمر'
                          : 'Brochure'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state safeguard if category is empty */}
        {filteredProperties.length === 0 && (
          <PopIn className="py-20 text-center bezel-outer">
            <div className="bezel-inner p-10">
              <p className="text-slate-600 text-sm mb-4 font-medium">
                {lang === 'ar'
                  ? 'لا توجد عقارات مطابقة حالياً ضمن هذه الفئة.'
                  : 'No properties currently listed in this specific category.'}
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs text-[#2D3E8C] uppercase tracking-wider underline font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'عرض كافة العقارات' : 'View all properties'}
              </button>
            </div>
          </PopIn>
        )}
      </div>

      {/* Property Slide-over Quick View Drawer */}
      <PropertyDrawer
        property={selectedProperty}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lang={lang}
        currency={currency}
        onInquire={handleInquireFromDrawer}
      />
    </section>
  );
};
