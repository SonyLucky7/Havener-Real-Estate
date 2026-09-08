'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { LuxuryTowerScene } from '@/components/3d/LuxuryTowerScene';

interface HeroSectionProps {
  lang: Language;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  const t = TRANSLATIONS[lang].hero;
  const isRtl = lang === 'ar';

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
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-32 pb-12 sm:pt-36 sm:pb-16 px-6 sm:px-8 overflow-hidden bg-[#060709]"
    >
      {/* 3D WebGL Architectural Element */}
      <LuxuryTowerScene className="opacity-90" />

      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#060709]/50 to-[#060709] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#C5A880]/12 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#060709] to-transparent pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto flex flex-col items-start">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
            {t.eyebrow}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#F5F2EB] leading-[1.08] max-w-5xl whitespace-pre-line mb-6 sm:mb-8">
          {t.headline}
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#C0C5D2] font-light max-w-2xl leading-relaxed mb-4">
          {t.supporting}
        </p>

        {/* Additional Guidance Text */}
        <p className="text-xs sm:text-sm text-[#8E95A5] max-w-xl leading-relaxed mb-8 sm:mb-12">
          {t.additional}
        </p>

        {/* Dual CTA Stack */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Button
            variant="gold"
            size="lg"
            onClick={handleScrollToProperties}
            isRtl={isRtl}
          >
            {t.primaryCTA}
          </Button>

          <Button
            variant="glass"
            size="lg"
            onClick={onOpenConsultation}
            isRtl={isRtl}
          >
            {t.secondaryCTA}
          </Button>
        </div>
      </div>

      {/* Bottom Bar / Scroll Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-8 border-t border-white/[0.06] text-xs text-[#8E95A5]">
        <div className="flex items-center gap-6">
          <span className="font-serif tracking-widest text-[#C5A880]">DXB</span>
          <span className="hidden sm:inline">25.2048° N, 55.2708° E</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline">Tier-1 Developer Portfolio</span>
        </div>

        <a
          href="#properties"
          className="group flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#B2B8C6] hover:text-[#C5A880] transition-colors"
        >
          <span>{t.scrollIndicator}</span>
          <span className="w-5 h-5 rounded-full border border-white/20 group-hover:border-[#C5A880] flex items-center justify-center transition-colors">
            <ArrowDown className="w-3 h-3 text-[#C5A880] animate-bounce" />
          </span>
        </a>
      </div>
    </section>
  );
};
