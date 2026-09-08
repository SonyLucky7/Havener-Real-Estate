'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Scale,
  Layers,
} from 'lucide-react';
import { Language, Currency } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { motion } from 'motion/react';

export interface InvestorCalculatorProps {
  lang: Language;
  currency: Currency;
  onOpenConsultation: (portfolioSummary?: string) => void;
}

const COPY = {
  en: {
    eyebrow: 'INSTITUTIONAL YIELD ENGINE · VINODE FIDUCIARY TOOLS',
    headline: 'Dubai Investment Yield & Golden Visa Engine',
    subhead:
      'Model high-yield capital allocation, compounding appreciation, and 0% tax savings against global jurisdictions while tracking 10-Year UAE Golden Visa thresholds.',
    inputsHeader: 'Portfolio Allocation Parameters',
    portfolioValuation: 'Portfolio Acquisition Valuation',
    valuationPresets: 'Presets',
    presetLabels: {
      starter: 'Prime 2.5M',
      recommended: 'Luxury Villa 8.5M',
      penthouse: 'Penthouse 18M',
      trophy: 'Trophy Estate 35M',
    },
    rentalYield: 'Projected Net Rental Yield (p.a.)',
    rentalYieldHint: 'Dubai Prime Benchmark: 7.0% – 9.5%',
    capitalAppreciation: 'Annual Capital Appreciation',
    appreciationHint: 'Dubai 5-Yr Historic Mean: 6.5% – 12.0%',
    holdingHorizon: 'Investment Holding Horizon',
    years: 'Years',
    year: 'Year',
    financialProjections: 'Financial Projections & Cumulative Return',
    annualRentalIncome: 'Annual Rental Income',
    monthlyRentalIncome: 'Monthly Cash Flow',
    cumulativeRentalIncome: 'Cumulative Rental Cash Flow',
    totalAppreciation: 'Capital Growth Over Horizon',
    projectedExitValuation: 'Projected Portfolio Exit Valuation',
    totalNetRoi: 'Total Projected Net ROI',
    totalReturnPercent: 'Cumulative ROI',
    annualizedReturn: 'Annualized IRR',
    taxSavingsTitle: 'Global Fiduciary Tax Arbitrage (0% UAE Advantage)',
    taxSavingsSubtitle:
      'Compare Dubai’s 0% personal income and capital gains tax against top-tier Western financial centers.',
    uaeTaxRate: '0% UAE Personal & Capital Gains Tax',
    uaeTaxSavedBadge: '100% Capital Retained',
    taxUkEurope: 'Saved vs UK / Europe (45% Tax Rate)',
    taxUsNyc: 'Saved vs US / NYC (50% Tax Rate)',
    taxNote:
      'Zero capital gains tax, zero personal income tax, and zero inheritance tax under UAE federal statutes for real estate investments.',
    goldenVisaTitle: 'UAE 10-Year Golden Visa Eligibility',
    goldenVisaThreshold: 'AED 2,000,000 Minimum Investment Threshold',
    qualifiedBadge: '✓ QUALIFIED FOR UAE 10-YEAR GOLDEN VISA',
    progressBadge: 'Progress Toward 10-Year Golden Visa',
    shortfallNotice: (shortfall: string) =>
      `Allocate an additional ${shortfall} to qualify for direct 10-Year UAE Golden Visa family residency.`,
    benefits: [
      {
        title: 'Renewable 10-Year Self-Sponsored Residency',
        desc: 'Unrestricted entry & exit without mandatory minimum physical stay in the UAE.',
      },
      {
        title: 'Full Family & Dependent Sponsorship',
        desc: 'Extend renewable residency to spouse, children of any age, and parents.',
      },
      {
        title: 'Domestic & Professional Staff Visas',
        desc: 'Sponsor executive drivers, personal assistants, and private domestic personnel.',
      },
      {
        title: '100% Foreign Business Ownership',
        desc: 'Unrestricted direct enterprise ownership across mainland UAE and economic freezones.',
      },
    ],
    ctaButton: 'Lock In Strategy · Schedule VIP Portfolio Consultation',
    ctaSubtext:
      'Includes verified DLD title verification, bespoke escrow structuring, and tax attorney consultation.',
    modelSummaryNotice: 'Model Summary Pre-Filled for Private Advisory Desk',
  },
  ar: {
    eyebrow: 'محرك العوائد المؤسسية · أدوات فيند الائتمانية',
    headline: 'حاسبة العوائد الاستثمارية والإقامة الذهبية في دبي',
    subhead:
      'نمذجة تخصيص رأس المال بعوائد مجزية، النمو الرأسمالي التراكمي ومزايا الإعفاء الضريبي مقارنة بالمدن العالمية مع قياس معايير الإقامة الذهبية في دبي.',
    inputsHeader: 'معايير تخصيص المحفظة الاستثمارية',
    portfolioValuation: 'قيمة الاستحواذ على المحفظة',
    valuationPresets: 'نماذج سريعة',
    presetLabels: {
      starter: 'شقة فاخرة 2.5 م',
      recommended: 'فيلا فاخرة 8.5 م',
      penthouse: 'بنتهاوس 18 م',
      trophy: 'قصر استثنائي 35 م',
    },
    rentalYield: 'صافي العائد الإيجاري السنوي المتوقع',
    rentalYieldHint: 'المعدل المعياري لعقارات دبي: 7.0% – 9.5%',
    capitalAppreciation: 'النمو الرأسمالي السنوي المقدر',
    appreciationHint: 'متوسط النمو التاريخي لـ 5 سنوات: 6.5% – 12.0%',
    holdingHorizon: 'الأفق الزمني للاستثمار',
    years: 'سنوات',
    year: 'سنة',
    financialProjections: 'التوقعات المالية والعائد التراكمي',
    annualRentalIncome: 'الدخل الإيجاري السنوي',
    monthlyRentalIncome: 'التدفق الإيجاري الشهري',
    cumulativeRentalIncome: 'إجمالي التدفقات الإيجارية التراكمية',
    totalAppreciation: 'النمو الرأسمالي التراكمي',
    projectedExitValuation: 'القيمة التقديرية للمحفظة عند التخارج',
    totalNetRoi: 'إجمالي صافي العائد الاستثماري (ROI)',
    totalReturnPercent: 'العائد الاستثماري التراكمي',
    annualizedReturn: 'العائد الداخلي السنوي المقدر',
    taxSavingsTitle: 'فوارق الضرائب العالمية (ميزة 0% في الإمارات)',
    taxSavingsSubtitle:
      'مقارنة الإعفاء الضريبي الكامل في دبي بنسبة 0% مع أهم المراكز المالية الغربية.',
    uaeTaxRate: '0% ضريبة الدخل والأرباح الرأسمالية في الإمارات',
    uaeTaxSavedBadge: '100% من رأس المال والأرباح محفوظة بالكامل',
    taxUkEurope: 'الوفورات مقارنة ببريطانيا وأوروبا (ضريبة 45%)',
    taxUsNyc: 'الوفورات مقارنة بنيويورك وأمريكا (ضريبة 50%)',
    taxNote:
      'إعفاء كامل من ضريبة الأرباح الرأسمالية، ضريبة الدخل الشخصي، وضريبة التركات على الأصول العقارية في دبي.',
    goldenVisaTitle: 'أهلية الإقامة الذهبية في الإمارات (10 سنوات)',
    goldenVisaThreshold: 'الحد الأدنى للاستثمار: 2,000,000 درهم إماراتي',
    qualifiedBadge: '✓ مؤهل للحصول على الإقامة الذهبية في الإمارات (10 سنوات)',
    progressBadge: 'التقدم نحو معيار الإقامة الذهبية 10 سنوات',
    shortfallNotice: (shortfall: string) =>
      `أضف ${shortfall} للوصول إلى حد الـ 2.0 مليون درهم والتأهل المباشر للإقامة الذهبية العائلية.`,
    benefits: [
      {
        title: 'إقامة ذاتية متجددة لمدة 10 سنوات',
        desc: 'دخول ومغادرة غير مشروطة وبدون مدة إقامة دنيا إلزامية داخل دولة الإمارات.',
      },
      {
        title: 'كفالة شاملة لجميع أفراد الأسرة',
        desc: 'تشمل الزوج/الزوجة، الأبناء دون تحديد سن أقصى، والوالدين.',
      },
      {
        title: 'كفالة الطواقم المساعدة والسائقين',
        desc: 'إصدار تأشيرات المساعدين والموظفين الشخصيين وسائقي العائلة.',
      },
      {
        title: 'ملكية تجارية أجنبية كاملة 100%',
        desc: 'تأسيس وامتلاك الشركات بنسبة 100% في كافة مناطق دبي الحرة والبر الرئيسي.',
      },
    ],
    ctaButton: 'اعتماد النموذج المالي · حجز استشارة VIP خاصة',
    ctaSubtext:
      'يشمل التحقق القانوني من دائرة الأراضي والأملاك وحسابات الضمان المعتمدة ومراجعة المستشار المالي.',
    modelSummaryNotice: 'تم إرفاق ملخص النموذج المالي مباشرة لمكتب الاستشارات الخاصة',
  },
};

const GOLDEN_VISA_THRESHOLD_AED = 2_000_000;

export const InvestorCalculator: React.FC<InvestorCalculatorProps> = ({
  lang,
  currency,
  onOpenConsultation,
}) => {
  const t = COPY[lang];
  const isRtl = lang === 'ar';

  // State sliders with precise default values requested in brief
  const [propertyValue, setPropertyValue] = useState<number>(8_500_000); // AED 8,500,000 default
  const [netYield, setNetYield] = useState<number>(8.4); // 8.4% default
  const [capitalAppreciation, setCapitalAppreciation] = useState<number>(7.5); // 7.5% default
  const [holdingHorizon, setHoldingHorizon] = useState<number>(5); // 5 years default

  // Preset portfolio values
  const PRESETS = useMemo(
    () => [
      { label: t.presetLabels.starter, value: 2_500_000 },
      { label: t.presetLabels.recommended, value: 8_500_000 },
      { label: t.presetLabels.penthouse, value: 18_000_000 },
      { label: t.presetLabels.trophy, value: 35_000_000 },
    ],
    [t]
  );

  // Dynamic calculations
  const calculations = useMemo(() => {
    // Annual rental income: propertyValue * (netYield / 100)
    const annualRent = propertyValue * (netYield / 100);
    const monthlyRent = annualRent / 12;
    const cumulativeRent = annualRent * holdingHorizon;

    // Total Capital Appreciation over Horizon: propertyValue * ((1 + capitalAppreciation / 100) ^ horizon - 1)
    const compoundingFactor = Math.pow(1 + capitalAppreciation / 100, holdingHorizon);
    const capitalAppreciationTotal = propertyValue * (compoundingFactor - 1);
    const exitValuation = propertyValue + capitalAppreciationTotal;

    // Total Net ROI (Cumulative Rent + Appreciation)
    const totalNetRoi = cumulativeRent + capitalAppreciationTotal;
    const totalRoiPercent = (totalNetRoi / propertyValue) * 100;

    // 0% Tax Savings Comparison
    const taxSavedUk = totalNetRoi * 0.45; // UK / Europe 45% benchmark
    const taxSavedUs = totalNetRoi * 0.5; // US / NYC 50% benchmark

    // Golden Visa Qualification
    const isGoldenVisaEligible = propertyValue >= GOLDEN_VISA_THRESHOLD_AED;
    const goldenVisaShortfall = isGoldenVisaEligible ? 0 : GOLDEN_VISA_THRESHOLD_AED - propertyValue;
    const goldenVisaProgress = Math.min(100, (propertyValue / GOLDEN_VISA_THRESHOLD_AED) * 100);

    return {
      annualRent,
      monthlyRent,
      cumulativeRent,
      capitalAppreciationTotal,
      exitValuation,
      totalNetRoi,
      totalRoiPercent,
      taxSavedUk,
      taxSavedUs,
      isGoldenVisaEligible,
      goldenVisaShortfall,
      goldenVisaProgress,
    };
  }, [propertyValue, netYield, capitalAppreciation, holdingHorizon]);

  // Construct structured summary for VIP Consultation Desk
  const handleConsultationClick = () => {
    const formattedValuation = formatPrice(propertyValue, currency, lang);
    const formattedRoi = formatPrice(calculations.totalNetRoi, currency, lang);
    const formattedAnnual = formatPrice(calculations.annualRent, currency, lang);
    const visaStatus = calculations.isGoldenVisaEligible
      ? lang === 'ar'
        ? 'مؤهل للإقامة الذهبية 10 سنوات'
        : 'UAE 10-Yr Golden Visa Qualified'
      : lang === 'ar'
        ? 'دون حد الإقامة الذهبية'
        : 'Standard Allocation';

    const summary =
      lang === 'ar'
        ? `استفسار حاسبة المستثمر: محفظة بقيمة ${formattedValuation} (AED ${(propertyValue / 1_000_000).toFixed(2)}M) · أفق زمني ${holdingHorizon} سنوات · عائد إيجاري ${netYield}% (${formattedAnnual}/سنة) · نمو رأسمالي ${capitalAppreciation}% · إجمالي العائد الصافي ${formattedRoi} (+${calculations.totalRoiPercent.toFixed(1)}%) · ${visaStatus}`
        : `Investor Calculator Portfolio: ${formattedValuation} (AED ${(propertyValue / 1_000_000).toFixed(2)}M) · ${holdingHorizon}-Yr Horizon · Net Yield ${netYield}% (${formattedAnnual}/yr) · Capital Growth ${capitalAppreciation}% · Projected Net ROI: ${formattedRoi} (+${calculations.totalRoiPercent.toFixed(1)}%) · ${visaStatus}`;

    onOpenConsultation(summary);
  };

  return (
    <section
      id="investor-calculator"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#FAF8F5] via-white to-[#F2F5F9] border-t border-slate-200/90 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Ambience Elements */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#2D3E8C]/8 via-[#E8922D]/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8922D]/8 via-[#2D3E8C]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E8922D] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-[#2D3E8C]">
              {t.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-tight font-bold mb-5">
            {t.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {t.subhead}
          </p>
        </div>

        {/* ============================================================== */}
        {/* MAIN INTERACTIVE ENGINE (2-COLUMN ARCHITECTURE)                */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          {/* ------------------------------------------------------------ */}
          {/* COLUMN 1: INPUT SLIDERS & PARAMETERS (5 cols)                */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col gap-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2D3E8C]/10 text-[#2D3E8C] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0A0E24]">
                  {t.inputsHeader}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#E8922D] uppercase tracking-wider">
                {currency}
              </span>
            </div>

            {/* Slider 1: Property Valuation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slider-property-value"
                  className="text-xs uppercase tracking-wider font-bold text-slate-700 block"
                >
                  {t.portfolioValuation}
                </label>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#2D3E8C]">
                  {formatPrice(propertyValue, currency, lang)}
                </span>
              </div>

              {/* Range Input with Native Track & Custom Accent */}
              <input
                id="slider-property-value"
                type="range"
                min={1_000_000}
                max={50_000_000}
                step={250_000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2D3E8C] focus:outline-none focus:ring-2 focus:ring-[#2D3E8C]/20"
                aria-label={t.portfolioValuation}
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{formatPrice(1_000_000, currency, lang)}</span>
                <span className="text-slate-500 font-semibold">
                  AED {(propertyValue / 1_000_000).toFixed(2)}M
                </span>
                <span>{formatPrice(50_000_000, currency, lang)}</span>
              </div>

              {/* Quick Preset Pills */}
              <div className="pt-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  {t.valuationPresets}:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((p) => {
                    const isActive = propertyValue === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPropertyValue(p.value)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer border ${
                          isActive
                            ? 'bg-[#2D3E8C] text-white border-[#2D3E8C] shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Slider 2: Net Rental Yield */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="slider-net-yield"
                    className="text-xs uppercase tracking-wider font-bold text-slate-700 block"
                  >
                    {t.rentalYield}
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {t.rentalYieldHint}
                  </span>
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#E8922D]">
                  {netYield.toFixed(1)}%
                </span>
              </div>

              <input
                id="slider-net-yield"
                type="range"
                min={5.0}
                max={12.0}
                step={0.1}
                value={netYield}
                onChange={(e) => setNetYield(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#E8922D] focus:outline-none focus:ring-2 focus:ring-[#E8922D]/20"
                aria-label={t.rentalYield}
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>5.0%</span>
                <span className="text-slate-500 font-semibold">
                  {formatPrice(calculations.annualRent, currency, lang)} / yr
                </span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Slider 3: Capital Appreciation */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="slider-capital-appreciation"
                    className="text-xs uppercase tracking-wider font-bold text-slate-700 block"
                  >
                    {t.capitalAppreciation}
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {t.appreciationHint}
                  </span>
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#2D3E8C]">
                  {capitalAppreciation.toFixed(1)}%
                </span>
              </div>

              <input
                id="slider-capital-appreciation"
                type="range"
                min={3.0}
                max={15.0}
                step={0.5}
                value={capitalAppreciation}
                onChange={(e) => setCapitalAppreciation(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2D3E8C] focus:outline-none focus:ring-2 focus:ring-[#2D3E8C]/20"
                aria-label={t.capitalAppreciation}
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>3.0%</span>
                <span className="text-slate-500 font-semibold">
                  Compounding Annual
                </span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Slider 4: Holding Horizon Pills (1, 3, 5, 10 Years) */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs uppercase tracking-wider font-bold text-slate-700 block">
                {t.holdingHorizon}
              </label>

              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 5, 10].map((yrs) => {
                  const isActive = holdingHorizon === yrs;
                  return (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setHoldingHorizon(yrs)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                        isActive
                          ? 'bg-[#0A0E24] text-white border-[#0A0E24] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {yrs} {yrs === 1 ? t.year : t.years}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 2: DYNAMIC OUTPUT CALCULATIONS & METRICS (7 cols)     */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Primary Hero Metric Showcase: Total Net ROI */}
            <div className="bg-gradient-to-br from-[#0A0E24] via-[#121A3B] to-[#1E2B63] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Luminous Glow Orbs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E8922D]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#2D3E8C]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-widest text-[#FCD34D]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#E8922D]" />
                    {holdingHorizon} {t.years} {t.financialProjections}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#E8922D]/20 border border-[#E8922D]/30 text-[#FDBA74] text-xs font-mono font-bold">
                    +{calculations.totalRoiPercent.toFixed(1)}% {t.totalReturnPercent}
                  </span>
                </div>

                <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold block mb-1">
                  {t.totalNetRoi}
                </span>

                {/* Big Bold Formatted Currency Output */}
                <div className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                  {formatPrice(calculations.totalNetRoi, currency, lang)}
                </div>

                {/* 3 Secondary Metric Badges inside the Hero Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium mb-1">
                      {t.cumulativeRentalIncome}
                    </span>
                    <span className="text-sm sm:text-base font-serif font-bold text-[#FDE68A] block">
                      {formatPrice(calculations.cumulativeRent, currency, lang)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {formatPrice(calculations.monthlyRent, currency, lang)} / mo
                    </span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium mb-1">
                      {t.totalAppreciation}
                    </span>
                    <span className="text-sm sm:text-base font-serif font-bold text-white block">
                      {formatPrice(calculations.capitalAppreciationTotal, currency, lang)}
                    </span>
                    <span className="text-[10px] text-[#34D399] mt-0.5 block font-semibold">
                      +{((calculations.capitalAppreciationTotal / propertyValue) * 100).toFixed(1)}% Growth
                    </span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium mb-1">
                      {t.projectedExitValuation}
                    </span>
                    <span className="text-sm sm:text-base font-serif font-bold text-white block">
                      {formatPrice(calculations.exitValuation, currency, lang)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">
                      Year {holdingHorizon} Exit
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 0% Tax Savings Comparison Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg shadow-slate-900/5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A0E24]">
                  {t.taxSavingsTitle}
                </h4>
              </div>

              <p className="text-xs text-slate-500 mb-5">
                {t.taxSavingsSubtitle}
              </p>

              {/* 2 Comparison Cards (UK 45% vs US 50%) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* UK / Europe */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      UK / Europe Benchmark
                    </span>
                    <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      45% Tax Rate
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    {t.taxUkEurope}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-emerald-600 block">
                    +{formatPrice(calculations.taxSavedUk, currency, lang)}
                  </span>
                </div>

                {/* US / NYC */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      US / NYC Benchmark
                    </span>
                    <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      50% Tax Rate
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    {t.taxUsNyc}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-emerald-600 block">
                    +{formatPrice(calculations.taxSavedUs, currency, lang)}
                  </span>
                </div>
              </div>

              {/* Legal Note Strip */}
              <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.taxNote}</span>
              </div>
            </div>

            {/* 10-Year UAE Golden Visa Status Meter Card */}
            <div
              className={`rounded-3xl p-6 sm:p-7 border transition-all ${
                calculations.isGoldenVisaEligible
                  ? 'bg-gradient-to-br from-[#FFFDF8] via-white to-[#FEF3C7]/20 border-[#F59E0B]/40 shadow-lg'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      calculations.isGoldenVisaEligible
                        ? 'bg-[#E8922D]/15 text-[#E8922D]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A0E24]">
                      {t.goldenVisaTitle}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {t.goldenVisaThreshold}
                    </span>
                  </div>
                </div>

                {/* Status Pill */}
                {calculations.isGoldenVisaEligible ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold tracking-wider border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {t.qualifiedBadge}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold tracking-wider border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {Math.round(calculations.goldenVisaProgress)}% / 100%
                  </span>
                )}
              </div>

              {/* Progress Bar Meter */}
              <div className="space-y-2 mb-6">
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
                  <motion.div
                    className={`h-full rounded-full ${
                      calculations.isGoldenVisaEligible
                        ? 'bg-gradient-to-r from-[#E8922D] to-[#F59E0B]'
                        : 'bg-gradient-to-r from-slate-400 to-[#2D3E8C]'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${calculations.goldenVisaProgress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>

                {!calculations.isGoldenVisaEligible && (
                  <p className="text-xs text-amber-700 font-medium">
                    {t.shortfallNotice(
                      formatPrice(calculations.goldenVisaShortfall, currency, lang)
                    )}
                  </p>
                )}
              </div>

              {/* 4 Golden Visa Statutory Privileges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                {t.benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-100 shadow-2xs"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#E8922D]/15 text-[#E8922D] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      ✓
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#0A0E24] block leading-tight">
                        {b.title}
                      </span>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIP CONSULTATION ACTION BAR                                    */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8922D] font-bold block mb-2">
            {t.modelSummaryNotice}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A0E24] mb-3">
            {t.ctaButton}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mb-6">
            {t.ctaSubtext}
          </p>

          <button
            type="button"
            onClick={handleConsultationClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2D3E8C] to-[#E8922D] text-white text-sm sm:text-base font-bold tracking-wide shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <span>{t.ctaButton}</span>
            <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};
