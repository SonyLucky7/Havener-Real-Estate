'use client';

import React, { useState } from 'react';
import { ArrowDown, Layers, Building2, Sparkles } from 'lucide-react';
import { Language, Currency, Property } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { LuxuryTowerScene } from '@/components/3d/LuxuryTowerScene';
import { SerpentineRibbonScene } from '@/components/3d/SerpentineRibbonScene';
import { PropertyDetailView } from '@/components/properties/PropertyDetailView';
import { RevealText, PopIn } from '@/components/ui/MotionPrimitives';
import { motion } from 'motion/react';

export type HeroMode = 'ribbon' | 'tower';

export interface HeroSectionProps {
  lang: Language;
  onOpenConsultation: (propertyTitle?: string) => void;
  onSelectProperty?: (property: Property) => void;
  selectedProperty?: Property | null;
  onCloseDetail?: () => void;
  currency?: Currency;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenConsultation,
  onSelectProperty,
  selectedProperty,
  onCloseDetail,
  currency = 'AED',
}) => {
  const t = TRANSLATIONS[lang].hero;
  const isRtl = lang === 'ar';

  const [heroMode, setHeroMode] = useState<HeroMode>('ribbon');
  const [internalSelectedProperty, setInternalSelectedProperty] = useState<Property | null>(null);

  // Fallback to internal selection state if parent does not manage it
  const activeSelectedProperty = selectedProperty !== undefined ? selectedProperty : internalSelectedProperty;

  const handleSelectProperty = (property: Property) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
    setInternalSelectedProperty(property);
  };

  const handleCloseDetail = () => {
    if (onCloseDetail) {
      onCloseDetail();
    }
    setInternalSelectedProperty(null);
  };

  const handleInquire = (property: Property) => {
    handleCloseDetail();
    const propTitle = property.name[lang] || property.name.en;
    onOpenConsultation(propTitle);
  };

  const handleScrollToProperties = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-32 pb-12 sm:pt-36 sm:pb-16 px-6 sm:px-8 overflow-hidden bg-gradient-to-b from-[#F2F6FC] via-white to-[#F8FAFC]"
    >
      {/* 3D WebGL Canvas Layer with Dual-Mode Support */}
      {heroMode === 'ribbon' ? (
        <SerpentineRibbonScene
          className="opacity-95"
          lang={lang}
          onSelectProperty={handleSelectProperty}
          activePropertyId={activeSelectedProperty?.id}
        />
      ) : (
        <LuxuryTowerScene className="opacity-95" />
      )}

      {/* Atmospheric Luminous Background Layers */}
      <div className="absolute top-0 right-0 w-[650px] h-[550px] bg-gradient-to-bl from-[#E8922D]/12 via-[#F59E0B]/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-0 w-[600px] h-[500px] bg-gradient-to-br from-[#2D3E8C]/10 via-[#3B4FA6]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto flex flex-col items-start pointer-events-none">
        {/* Top Header Controls: Eyebrow Badge & 3D Mode Switcher */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pointer-events-none">
          {/* Eyebrow Pill with Spring Pop-In */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-md pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8922D] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#2D3E8C] font-bold">
              {t.eyebrow}
            </span>
          </motion.div>

          {/* Dual-Mode 3D Switcher Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/90 backdrop-blur-md border border-slate-200/90 p-1 rounded-full shadow-sm flex items-center gap-1 pointer-events-auto"
            role="tablist"
            aria-label={isRtl ? 'خيارات العرض ثلاثي الأبعاد' : '3D View Modes'}
          >
            <button
              type="button"
              role="tab"
              aria-selected={heroMode === 'ribbon'}
              onClick={() => setHeroMode('ribbon')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                heroMode === 'ribbon'
                  ? 'bg-[#2D3E8C] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-[#0A0E24] hover:bg-slate-100/70 font-medium'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isRtl ? 'مستكشف الشريط ثلاثي الأبعاد' : '3D Ribbon Explorer'}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={heroMode === 'tower'}
              onClick={() => setHeroMode('tower')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                heroMode === 'tower'
                  ? 'bg-[#2D3E8C] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-[#0A0E24] hover:bg-slate-100/70 font-medium'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isRtl ? 'برج معماري 360 درجة' : '360° Architectural Tower'}</span>
            </button>
          </motion.div>
        </div>

        {/* Main Headline with Staggered Word Reveal */}
        <RevealText
          text={t.headline.replace('\n', ' ')}
          as="h1"
          delay={0.15}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#0A0E24] leading-[1.08] max-w-5xl mb-6 sm:mb-8 font-bold pointer-events-auto"
        />

        {/* Supporting Copy */}
        <PopIn delay={0.4} yOffset={24}>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-normal max-w-2xl leading-relaxed mb-4 pointer-events-auto">
            {t.supporting}
          </p>
        </PopIn>

        {/* Additional Guidance Text */}
        <PopIn delay={0.5} yOffset={20}>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed mb-5 sm:mb-6 pointer-events-auto">
            {t.additional}
          </p>
        </PopIn>

        {/* 3D Ribbon Interactive Guidance Banner (Shown in Ribbon Mode) */}
        {heroMode === 'ribbon' && (
          <PopIn delay={0.55} yOffset={16}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs mb-6 sm:mb-8 text-xs text-slate-600 pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#E8922D]" />
              <span className="font-medium">
                {isRtl
                  ? 'اسحب للتنقل · انقر على أي مسكن لاستعراض المخططات وشروط الاستثمار'
                  : 'Drag to glide · Click any residence to inspect CAD blueprints & investment terms'}
              </span>
            </div>
          </PopIn>
        )}

        {/* Dual CTA Stack */}
        <PopIn delay={0.6} yOffset={25}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pointer-events-auto">
            <Button
              variant="gold"
              size="lg"
              onClick={handleScrollToProperties}
            >
              {t.primaryCTA}
            </Button>

            <Button
              variant="glass"
              size="lg"
              onClick={() => onOpenConsultation()}
            >
              {t.secondaryCTA}
            </Button>
          </div>
        </PopIn>
      </div>

      {/* Bottom Bar / Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-8 border-t border-slate-200/80 text-xs text-slate-500"
      >
        <div className="flex items-center gap-6">
          <span className="font-serif tracking-widest text-[#2D3E8C] font-bold">DXB</span>
          <span className="hidden sm:inline font-mono">25.2048° N, 55.2708° E</span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline font-medium">Tier-1 Developer Portfolio</span>
        </div>

        <a
          href="#properties"
          className="group flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-slate-600 hover:text-[#2D3E8C] transition-colors font-semibold"
        >
          <span>{t.scrollIndicator}</span>
          <span className="w-6 h-6 rounded-full bg-white border border-slate-300 group-hover:border-[#2D3E8C] group-hover:bg-[#2D3E8C]/5 flex items-center justify-center transition-colors shadow-xs">
            <ArrowDown className="w-3 h-3 text-[#2D3E8C] animate-bounce" />
          </span>
        </a>
      </motion.div>

      {/* Editorial Property Detail Modal View */}
      <PropertyDetailView
        property={activeSelectedProperty}
        onClose={handleCloseDetail}
        onInquire={handleInquire}
        lang={lang}
        currency={currency}
      />
    </section>
  );
};
